import React from 'react';
import Highcharts from 'highcharts';
import Annotations from 'highcharts/modules/annotations';
import ReactHighcharts from 'react-highcharts';
import DarkUnica from 'highcharts/themes/dark-unica';
import ChartCarousel from './chartCarousel.jsx';
import { secsToTs } from './timeConversions.js';
import data from './mm2data.js';

Annotations(ReactHighcharts.Highcharts);
DarkUnica(ReactHighcharts.Highcharts);

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        chart: {
          type: 'line',
          zoomType: 'x',
          panning: true,
          panKey: 'shift'
        },
        title: {
          text: 'Mega Man 2 Any% World Record History'
        },
        subtitle: {
          text: 'Current WR — 26:42 by cyghfer'
        },
        credits: false,
        plotOptions: {
          line: {
            marker: {
              enabled: true
            }
          }
        },
        // labels: {
        //   items: [{
        //     html: <ChartCarousel />,
        //     style: {
        //       left: '100px',
        //       top: '100px'
        //     }
        //   }]
        // },
        xAxis: {
          title: {
            text: 'Date'
          },
          type: 'datetime',
          min: Date.UTC(2004, 0, 1),
          dateTimeLabelFormats: {
            year: '%Y'
          },
          // plotBands: [
          //   {
          //     from: Date.UTC(data[0].year, data[0].month, data[0].day),
          //     to: Date.UTC(data[1].year, data[1].month, data[1].day),
          //     color: 'lightgray'
          //   },
          //   {
          //     from: Date.UTC(data[1].year, data[1].month, data[1].day),
          //     to: Date.UTC(data[2].year, data[2].month, data[2].day),
          //     color: 'mintcream'
          //   },
          //   {
          //     from: Date.UTC(data[2].year, data[2].month, data[2].day),
          //     to: Date.UTC(data[3].year, data[3].month, data[3].day),
          //     color: 'lightgray'
          //   },
          //   {
          //     from: Date.UTC(data[3].year, data[3].month, data[3].day),
          //     to: Date.UTC(data[4].year, data[4].month, data[4].day),
          //     color: 'mintcream'
          //   },
          //   {
          //     from: Date.UTC(data[4].year, data[4].month, data[4].day),
          //     to: Date.UTC(data[5].year, data[5].month, data[5].day),
          //     color: 'lightgray'
          //   },
          //   {
          //     from: Date.UTC(data[5].year, data[5].month, data[5].day),
          //     to: Date.UTC(data[6].year, data[6].month, data[6].day),
          //     color: 'mintcream'
          //   },
          //   {
          //     from: Date.UTC(data[6].year, data[6].month, data[6].day),
          //     to: Date.UTC(data[10].year, data[10].month, data[10].day),
          //     color: 'lightgray'
          //   },
          //   {
          //     from: Date.UTC(data[10].year, data[10].month, data[10].day),
          //     to: Date.now(),
          //     color: 'mintcream'
          //   },
          // ]
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
                  <div>Time: ${secsToTs(this.y / 1000)}</div><br/>
                  <div>Player: ${this.point.player}</div><br/>
                  <div>Date: ${(new Date(this.x)).toDateString().slice(4)}</div><br/>
                  ${this.point.note ? '<div>Note: ' + this.point.note + '</div><br/>' : ''}
                </div>
              `
            );
          }
        },
        annotations: [{
          labels: [
            {
              point: {
                x: 800,
                y: 200
              },
              y: 0,
              text: 'JPN version standardized'
            },
            {
              point: {
                x: 969,
                y: 225
              },
              y: -10,
              text: 'First 26'
            }
          ]
        }],
        series: [{
          step: 'left',
          showInLegend: false,
          cursor: 'pointer',
          zoneAxis: 'x',
          zones: [
            {
              value: Date.UTC(data[1].year, data[1].month, data[1].day),
              color: '#90ee7e'
            },
            {
              value: Date.UTC(data[2].year, data[2].month, data[2].day),
              color: '#f45b5b'
            },
            {
              value: Date.UTC(data[3].year, data[3].month, data[3].day),
              color: '#2b908f'              
            },
            {
              value: Date.UTC(data[4].year, data[4].month, data[4].day),
              color: '#7798BF'
            },
            {
              value: Date.UTC(data[5].year, data[5].month, data[5].day),
              color: 'white'
            },
            {
              value: Date.UTC(data[6].year, data[6].month, data[6].day),
              color: '#7798BF'
            },
            {
              value: Date.UTC(data[10].year, data[10].month, data[10].day),
              color: 'plum'
            },
            {
              value: Date.now(),
              color: '#7798BF'
            },
          ],
          data: [
            {
              x: Date.UTC(data[0].year, data[0].month, data[0].day),
              y: data[0].time * 1000,
              player: data[0].player,
              events: {
                click: () => {
                  console.log('clicked Richard Ureta point');
                }
              }
            },
            {
              x: Date.UTC(data[1].year, data[1].month, data[1].day),
              y: data[1].time * 1000,
              player: data[1].player
            },
            {
              x: Date.UTC(data[2].year, data[2].month, data[2].day),
              y: data[2].time * 1000,
              player: data[2].player
            },
            {
              x: Date.UTC(data[3].year, data[3].month, data[3].day),
              y: data[3].time * 1000,
              player: data[3].player
            },
            {
              x: Date.UTC(data[4].year, data[4].month, data[4].day),
              y: data[4].time * 1000,
              player: data[4].player,
              note: 'This run was performed with 10hz turbo, though it was still recognized as the legitimate record.'
            },
            {
              x: Date.UTC(data[5].year, data[5].month, data[5].day),
              y: data[5].time * 1000,
              player: data[5].player
            },
            {
              x: Date.UTC(data[6].year, data[6].month, data[6].day),
              y: data[6].time * 1000,
              player: data[6].player
            },
            {
              x: Date.UTC(data[7].year, data[7].month, data[7].day),
              y: data[7].time * 1000,
              player: data[7].player
            },
            {
              x: Date.UTC(data[8].year, data[8].month, data[8].day),
              y: data[8].time * 1000,
              player: data[8].player
            },
            {
              x: Date.UTC(data[9].year, data[9].month, data[9].day),
              y: data[9].time * 1000,
              player: data[9].player
            },
            {
              x: Date.UTC(data[10].year, data[10].month, data[10].day),
              y: data[10].time * 1000,
              player: data[10].player,
              marker: {
                symbol: 'url(assets/1st.png)',
                height: 16,
                width: 16
              }
            }
          ]
        }]
      }
    }
  }

  render() {
    return <ReactHighcharts config={this.state.config} ref="chart" />
  }
}

export default Chart;