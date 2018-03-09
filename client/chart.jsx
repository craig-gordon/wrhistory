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
      xAxis: {
        title: {
          text: 'Date'
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          year: '%Y'
        }
      },
      yAxis: {
        title: {
          text: 'Time'
        }
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC(2000),
          pointInterval: 365 * 24 * 3600 * 1000
        }
      },
      series: [{
        data: [
          [Date.UTC(2000, 0, 1), 1839],
          [Date.UTC(2005, 0, 1), 1671],
          [Date.UTC(2008, 0, 1), 1641],
          [Date.UTC(2009, 0, 1), 1637],
          [Date.UTC(2010, 0, 1), 1628],
          [Date.UTC(2013, 0, 1), 1621],
          [Date.UTC(2014, 0, 1), 1617],
          [Date.UTC(2015, 0, 1), 1616],
          [Date.UTC(2016, 0, 1), 1615],
          [Date.UTC(2017, 0, 1), 1608],
          [Date.UTC(2018, 0, 1), 1602],
        ],
        pointStart: Date.UTC(2000),
        pointInterval: 365 * 24 * 3600 * 1000
      }]
    }
  }

  render() {
    return <ReactHighcharts config={this.config} ref="chart"></ReactHighcharts>
  }
}

export default Chart;