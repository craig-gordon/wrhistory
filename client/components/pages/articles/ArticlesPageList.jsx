import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ArticlesPageListItem from './ArticlesPageListItem.jsx';

export default class ArticlesPageList extends React.Component {
  constructor() {
    super();
  }

  render() {
    let ListItems = this.props.articles.map((article, i) =>
      <ArticlesPageListItem
        key={i}
        idx={i}
        article={article}
      />
    );
    return (
      <div>
        {ListItems}
      </div>
    )
  }
};