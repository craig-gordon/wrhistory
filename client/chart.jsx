import React from 'react';
import ReactHighcharts from 'react-highcharts';
import data from './mm2data.js';

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
      credits: false,
      xAxis: {
        title: {
          text: 'Date'
        },
        type: 'datetime',
        min: Date.UTC(2004, 0, 1),
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
          minute: '%M:%S',
          hour: '%H:%M:%S'
        }
      },
      tooltip: {
        formatter: function() {
          return (
            `
              <div>
                <div>Time: ${this.y}</div><br/>
                <div>Player: Lorem Ipsum</div><br/>
                <div>Date: ${this.x}</div><br/>
              </div>
            `
          );
        }
      },
      series: [{
        step: 'left',
        data: [
          [Date.UTC(data[0].year, data[0].month, data[0].day), data[0].time * 1000],
          [Date.UTC(data[1].year, data[1].month, data[1].day), data[1].time * 1000],
          [Date.UTC(data[2].year, data[2].month, data[2].day), data[2].time * 1000],
          [Date.UTC(data[3].year, data[3].month, data[3].day), data[3].time * 1000],
          [Date.UTC(data[4].year, data[4].month, data[4].day), data[4].time * 1000],
          [Date.UTC(data[5].year, data[5].month, data[5].day), data[5].time * 1000],
          [Date.UTC(data[6].year, data[6].month, data[6].day), data[6].time * 1000],
          [Date.UTC(data[7].year, data[7].month, data[7].day), data[7].time * 1000],
          [Date.UTC(data[8].year, data[8].month, data[8].day), data[8].time * 1000],
          [Date.UTC(data[9].year, data[9].month, data[9].day), data[9].time * 1000],
          [Date.UTC(data[10].year, data[10].month, data[10].day), data[10].time * 1000],
        ]
      }]
    }
  }

  render() {
    return <ReactHighcharts config={this.config} ref="chart"></ReactHighcharts>
  }
}

export default Chart;