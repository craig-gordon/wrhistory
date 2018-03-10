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
        min: Date.UTC(1998, 0, 1),
        dateTimeLabelFormats: {
          year: '%Y'
        }
      },
      yAxis: {
        title: {
          text: 'Time'
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          milliseconds: '%H:%M:%S',
          second: '%H:%M:%S',
          minute: '%H:%M:%S',
          hour: '%H:%M:%S'
        }
      },
      series: [{
        data: [
          [Date.UTC(2000, 0, 1), 1839000],
          [Date.UTC(2005, 0, 1), 1671000],
          [Date.UTC(2008, 0, 1), 1641000],
          [Date.UTC(2009, 0, 1), 1637000],
          [Date.UTC(2010, 0, 1), 1628000],
          [Date.UTC(2013, 0, 1), 1621000],
          [Date.UTC(2014, 0, 1), 1617000],
          [Date.UTC(2015, 0, 1), 1616000],
          [Date.UTC(2016, 0, 1), 1615000],
          [Date.UTC(2017, 0, 1), 1608000],
          [Date.UTC(2018, 0, 1), 1602000],
        ]
      }]
    }
  }

  render() {
    return <ReactHighcharts config={this.config} ref="chart"></ReactHighcharts>
  }
}

export default Chart;