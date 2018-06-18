import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import IntroModule from './IntroModule.jsx';
import FeaturedChartModule from './FeaturedChartModule.jsx';
import RecentlyUpdatedModule from './RecentlyUpdatedModule.jsx';

const HomePageHeader = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: darkblue
`;

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <IntroModule />
        <FeaturedChartModule />
        <RecentlyUpdatedModule />
      </div>
    );
  }
};