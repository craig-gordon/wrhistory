import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import BrowseArticlesPageListItem from './BrowseArticlesPageListItem.jsx';

export default class BrowseArticlesPageList extends React.Component {
  constructor() {
    super();
  }

  render() {
    let ListItems = this.props.articles.map((article, i) =>
      <BrowseArticlesPageListItem
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