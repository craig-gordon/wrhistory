import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import ArticlesPageList from './ArticlesPageList.jsx';

import { articles } from '../../../data/sampleArticles.js';

const Header = styled.h1`
  text-align: center;
`;

export default class ArticlesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header>
          Articles
        </Header>
        <div style={{'textAlign': 'center'}}>
          <Button.Group size='large'>
            <Button type='primary'>
              <i className="fas fa-arrow-left"></i>
            </Button>
            <Button type='primary'>
              <i className="fas fa-home"></i>
            </Button>
            <Button type='primary'>
              <i className="fas fa-arrow-right"></i>
            </Button>
          </Button.Group>
        </div>
        <ArticlesPageList
          articles={articles}
        />
      </div>
    )
  }
};