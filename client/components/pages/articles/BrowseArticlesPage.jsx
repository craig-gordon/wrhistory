import React from 'react';
import styled from 'styled-components';

import BrowseArticlesPageList from './BrowseArticlesPageList.jsx';
import { PageHeader } from '../../common/styledComps.js';

import { articles } from '../../../data/sampleArticles.js';


export default class BrowseArticlesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <PageHeader>
          Articles
        </PageHeader>
        <BrowseArticlesPageList
          articles={articles}
        />
      </div>
    )
  }
};