/** @format */

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import githubLogo from './assets/svg/iconmonstr-github.svg';
import axios from 'axios';
import queryString from 'query-string';
import StarsIcon from './assets/svg/stars-icon';
import ForkIcon from './assets/svg/git-fork';
import InfiniteScroll from 'react-infinite-scroller';

import {
  Container,
  Input,
  SelectInputsWrapper,
  SelectInputs,
  ListingContainer,
  RepoCard,
  RepoName,
  RepoDescription,
  IconsWrapper,
  NumbersWithIconsWrapper,
  NumbersText,
} from './styles';

const GITHUB_API_BASE_URL = 'https://api.github.com';

type RepositoryResponse = {
  id: number;
  node_id: string;
  forks: number;
  stars: number;
  full_name: string;
  description: string;
};

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

  const url = queryString.stringifyUrl({
    query: {
      q: searchCriteria.q,
      order: searchCriteria.order,
      sort: searchCriteria.sort,
      page: searchCriteria.page,
    },
    url: `${GITHUB_API_BASE_URL}/search/repositories`,
  });

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

  const handleInfiniteOnLoad = async () => {
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

  console.log(repositories);

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
            <SelectInputs
              name='sort'
              onChange={handleChangeInput}
              value={searchCriteria.sort}
              placeholder='Sort by'>
              <option value=''>Sort by</option>
              <option value='stars'>Stars</option>
              <option value='fork'>Forks</option>
            </SelectInputs>
            <SelectInputs
              name='order'
              onChange={handleChangeInput}
              value={searchCriteria.order}
              placeholder='Order by'>
              <option value=''>Order by</option>
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
            </SelectInputs>
            <button type='reset' onClick={handleResetClick}>
              Reset
            </button>
          </SelectInputsWrapper>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleInfiniteOnLoad}
            hasMore={hasMore}
            loader={
              <div className='loader' key={0}>
                Loading ...
              </div>
            }>
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
          </InfiniteScroll>
        </>
      )}
    </Container>
  );
};

export default App;
