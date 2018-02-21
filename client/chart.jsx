import React from 'react';
import Highcharts from 'highcharts';
import * as mm2Data from './mm2data.js';

class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{mm2Data.entry1.runner}</div>
    )
  }
}

export default Chart;