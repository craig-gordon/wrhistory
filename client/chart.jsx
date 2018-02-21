import React from 'react';
import ReactHighcharts from 'react-highcharts';
import * as mm2Data from './mm2data.js';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.config = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Mega Man 2 Any% World Record History'
      },
      yAxis: {
        title: {
          text: 'Time'
        }
      },
      plotOptions: {
        series: {
          pointStart: 2004
        }
      },
      series: [{
        name: 
        data: [
          1839,
          1671,
          1641,
          1637,
          1628,
          1621,
          1617,
          1616,
          1615,
          1608,
          1602,
        ]
      }]
    }
  }

  render() {
    return <ReactHighcharts config={this.config} ref="chart"></ReactHighcharts>
  }
}

export default Chart;