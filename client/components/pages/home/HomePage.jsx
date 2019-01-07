import React from 'react';
import styled from 'styled-components';

import WelcomeModule from './WelcomeModule.jsx';
import OnThisDayModule from './OnThisDayModule.jsx';
import FeaturedChartModule from './FeaturedChartModule.jsx';
// import RecentlyUpdatedModule from './RecentlyUpdatedModule.jsx';

const Grid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Col2 = styled.div`
  grid-column: span 2;
  @media screen and (max-width: 600px) {
    grid-column: span 1;
  }
`;

const HomePage = (props) => (
  <Grid>
    <WelcomeModule />
    <OnThisDayModule />
    <Col2>
      <FeaturedChartModule history={props.history}/>
    </Col2>
    {/* <RecentlyUpdatedModule /> */}
  </Grid>
);

export default HomePage;