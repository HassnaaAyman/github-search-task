/** @format */

import React from 'react';
import './App.css';
import styled from 'styled-components';
import githubLogo from './assets/svg/iconmonstr-github.svg';

const App = () => {
  return (
    <Container>
      <img src={githubLogo} className='App-logo' alt='logo' />
      <Input
        type='search'
        placeholder='search for Github repositories'
        name='q'
      />
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
  background-position-x: 5px;
  margin-top: 30px;
  text-align: start;
`;
