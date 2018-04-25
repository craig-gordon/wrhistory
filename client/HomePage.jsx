import React from 'react';
import { Link } from 'react-router-dom';

import IntroModule from './IntroModule.jsx';
import RandomChartModule from './RandomChartModule.jsx';
import RecentlyUpdatedModule from './RecentlyUpdatedModule.jsx';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Record History</h1>
        <IntroModule />
        <RandomChartModule />
        <RecentlyUpdatedModule />
      </div>
    )
  }
}

export default HomePage;