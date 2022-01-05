/** @format */

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import githubLogo from './assets/svg/iconmonstr-github.svg';
import axios from 'axios';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import Select from './components/select';
import Card from './components/card';
import { RepositoryResponse } from './types';
import {
  Container,
  Input,
  SelectInputsWrapper,
  ListingContainer,
} from './styles';

const GITHUB_API_BASE_URL = 'https://api.github.com';

const initialSearchCriteria = {
  order: '',
  sort: '',
  q: '',
  page: 1,
};

const App = () => {
  const [repositories, setRepositories] = useState<RepositoryResponse[]>([]);
  const [searchCriteria, setSearchCriteria] = useState({
    ...initialSearchCriteria,
  });

  const [loading, setLoading] = useState(false);
  const [changingQuery, setChangingQuery] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const url = queryString.stringifyUrl({
    query: {
      q: searchCriteria.q,
      order: searchCriteria.order,
      sort: searchCriteria.sort,
      page: searchCriteria.page,
    },
    url: `${GITHUB_API_BASE_URL}/search/repositories`,
  });

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setSearchCriteria((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      if (e.target.name === 'q') {
        setChangingQuery(true);
      } else {
        setChangingQuery(false);
      }
    },
    [setSearchCriteria],
  );

  const handleChangeCriteria = useCallback(() => {
    setLoading(true);
    if (!searchCriteria.q) {
      setLoading(false);
      return;
    }
    axios
      .get(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
      .then((res) => {
        setLoading(false);
        setRepositories(res.data.items as RepositoryResponse[]);
      });
  }, [searchCriteria.q, url]);

  useEffect(() => {
    if (!changingQuery) {
      handleChangeCriteria();
    }
  }, [changingQuery, handleChangeCriteria]);

  const handleResetClick = useCallback(() => {
    setLoading(false);
    setSearchCriteria({ ...initialSearchCriteria });
  }, []);

  const fetchReposotiries = useCallback(async () => {
    const response: any = await axios.get(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });
    return response.data.items;
  }, [url]);

  const handleFetchOnLoad = async () => {
    if (searchCriteria.page !== 1) {
      const newRepositories = await fetchReposotiries();
      setRepositories([...repositories, ...newRepositories]);
      if (newRepositories.length === 0) {
        setHasMore(false);
      }
    }
    setSearchCriteria({
      ...searchCriteria,
      page: searchCriteria.page + 1,
    });
  };

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

      {loading && <p>Loading...</p>}

      {repositories.length > 0 && (
        <>
          <SelectInputsWrapper>
            <Select
              onChange={handleChangeInput}
              value={searchCriteria.sort}
              name='sort'
              options={[
                { name: 'Sort by', value: '' },
                { name: 'Stars', value: 'stars' },
                { name: 'Forks', value: 'fork' },
              ]}
            />
            <Select
              onChange={handleChangeInput}
              value={searchCriteria.order}
              name='order'
              options={[
                { name: 'Order by', value: '' },
                { name: 'Ascending', value: 'asc' },
                { name: 'Descending', value: 'desc' },
              ]}
            />
            <button type='reset' onClick={handleResetClick}>
              Reset
            </button>
          </SelectInputsWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleFetchOnLoad}
            hasMore={hasMore}
            loader={
              <div className='loader' key={0}>
                Loading ...
              </div>
            }>
            <ListingContainer>
              {repositories.map((repository) => (
                <Card
                  id={repository.id}
                  full_name={repository.full_name}
                  forks={repository.forks}
                  stars={repository.stars}
                  description={repository.description}
                />
              ))}
            </ListingContainer>
          </InfiniteScroll>
        </>
      )}
    </Container>
  );
};

export default App;
