import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import WelcomeModule from './WelcomeModule.jsx';
import OnThisDayModule from './OnThisDayModule.jsx';
import FeaturedChartModule from './FeaturedChartModule.jsx';
import RecentlyUpdatedModule from './RecentlyUpdatedModule.jsx';

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
        <TopRow>
          <WelcomeModule />
          <OnThisDayModule />
        </TopRow>
        <FeaturedChartModule />
        <RecentlyUpdatedModule />
      </div>
    );
  }
};