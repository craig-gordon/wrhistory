import React from 'react';
import styled from 'styled-components';

import BrowseArticlesPageList from './BrowseArticlesPageList.jsx';

import { articles } from '../../../data/sampleArticles.js';

const Header = styled.h1`
  text-align: center;
`;

export default class BrowseArticlesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header>
          Articles
        </Header>
        <BrowseArticlesPageList
          articles={articles}
        />
      </div>
    )
  }
};