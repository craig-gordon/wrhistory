import React from 'react';
import { Link } from 'react-router-dom';

import Chart from './Chart.jsx';

class RandomChartModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Random Chart</h3>
        <Chart />
        <Link to='/mm2'>See full chart!</Link>
      </div>
    )
  }
}

export default RandomChartModule;