/** @format */

import React from 'react';
import ForkIcon from '../../assets/svg/git-fork';
import StarsIcon from '../../assets/svg/stars-icon';
import { RepositoryResponse } from '../../types';
import {
  RepoCard,
  RepoName,
  RepoDescription,
  IconsWrapper,
  NumbersWithIconsWrapper,
  NumbersText,
} from '../../styles';

const Card: React.FC<RepositoryResponse> = ({
  id,
  forks,
  stars,
  full_name,
  description,
}) => {
  return (
    <RepoCard key={id}>
      <RepoName>{full_name}</RepoName>
      <RepoDescription>{description}</RepoDescription>
      <IconsWrapper>
        <NumbersWithIconsWrapper>
          <StarsIcon />
          <NumbersText>{stars ? stars : 0}</NumbersText>
        </NumbersWithIconsWrapper>
        <NumbersWithIconsWrapper>
          <ForkIcon /> <NumbersText>{forks}</NumbersText>
        </NumbersWithIconsWrapper>
      </IconsWrapper>
    </RepoCard>
  );
};

export default Card;
