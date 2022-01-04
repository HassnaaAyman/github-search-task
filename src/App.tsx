/** @format */

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import githubLogo from './assets/svg/iconmonstr-github.svg';
import axios from 'axios';
import queryString from 'query-string';

const GITHUB_API_BASE_URL = 'https://api.github.com';

type RepositoryResponse = {
  id: number;
  forks: number;
  stars: number;
  name: string;
  description: string;
  owner: {
    login: string;
  };
};

const initialSearchCriteria = {
  order: 'asc',
  sort: 'stars',
  q: '',
};

const App = () => {
  const [repositories, setRepositories] = useState<RepositoryResponse[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
    ...initialSearchCriteria,
  });

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setSearchCriteria((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setSearchCriteria],
  );

  const handleChangeCriteria = useCallback(() => {
    const url = queryString.stringifyUrl({
      query: {
        q: searchCriteria.q,
        order: searchCriteria.order,
        sort: searchCriteria.sort,
      },
      url: `${GITHUB_API_BASE_URL}/search/repositories`,
    });
    axios
      .get(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
      .then((res: any) => {
        setRepositories(res.data.items as RepositoryResponse[]);
      });
  }, [searchCriteria]);

  console.log({ repositories });

  return (
    <Container>
      <img src={githubLogo} className='App-logo' alt='logo' />
      <Input
        type='search'
        placeholder='search for Github repositories'
        name='q'
        onKeyPress={handleChangeCriteria}
        onChange={handleChangeInput}
        value={searchCriteria.q}
      />
      {repositories.map((repository) => (
        <div key={repository.id}>
          <ul>
            <li>{repository.name}</li>
            <li>{repository.owner.login}</li>
            <li>{repository.forks}</li>
            <li>{repository.stars}</li>
            <li>{repository.description}</li>
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default App;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 90%;
  align-items: center;
`;

export const Input = styled.input`
  padding-left: 41px;
  background: url('https://img.icons8.com/ios-glyphs/30/000000/search--v1.png')
    no-repeat left;
  background-size: 20px;
  width: 23%;
  height: 40px;
  border: 1px solid #cccc;
  background-position-x: 10px;
  margin-top: 30px;
  text-align: start;
`;
