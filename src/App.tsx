/** @format */

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import githubLogo from './assets/svg/iconmonstr-github.svg';
import axios from 'axios';
import queryString from 'query-string';
import StarsIcon from './assets/svg/stars-icon';
import ForkIcon from './assets/svg/git-fork';

const GITHUB_API_BASE_URL = 'https://api.github.com';

type RepositoryResponse = {
  id: number;
  forks: number;
  stars: number;
  full_name: string;
  description: string;
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
      <ListingContainer>
        {repositories.map((repository) => (
          <RepoCard key={repository.id}>
            <RepoName>{repository.full_name}</RepoName>
            <RepoDescription>{repository.description}</RepoDescription>
            <IconsWrapper>
              <NumbersWithIconsWrapper>
                <StarsIcon />
                <NumbersText>
                  {repository.stars ? repository.stars : 0}
                </NumbersText>
              </NumbersWithIconsWrapper>
              <NumbersWithIconsWrapper>
                <ForkIcon /> <NumbersText>{repository.forks}</NumbersText>
              </NumbersWithIconsWrapper>
            </IconsWrapper>
          </RepoCard>
        ))}
      </ListingContainer>
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
  margin: 50px auto;
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

export const ListingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  margin-top: 20px;
`;

export const RepoCard = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin-bottom: 20px;
  position: relative;
  min-height: 150px;
`;

export const RepoName = styled.h3`
  color: black;
  font-weight: bold;
  margin: 0px;
`;

export const RepoDescription = styled.p`
  color: rgba(52, 66, 71, 0.38);
  font-size: 14px;
`;

export const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 30%;
  position: absolute;
  bottom: 16px;
`;

export const NumbersText = styled.h4`
  text-align: center;
  color: black;
  font-weight: bold;
  margin: 0px;
`;

export const NumbersWithIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`;
