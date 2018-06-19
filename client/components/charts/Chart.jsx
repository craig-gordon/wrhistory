import React from 'react';
import Highcharts from 'highcharts';
import Annotations from 'highcharts/modules/annotations';
import ReactHighcharts from 'react-highcharts';
import DarkUnica from 'highcharts/themes/dark-unica';

import ChartCarousel from './chartCarousel.jsx';

import '../../assets/stylesheets/classStyles.css';
import darkUnicaMod from './darkUnicaMod.js';
import { secsToTs } from '../../functions/timeConversions.js';
import { formatTooltip } from '../../functions/chartFunctions.js';
import { document as dkDocument } from '../../data/dkDocument.js';
import { document as mm2Document } from '../../data/mm2Document.js';

Annotations(ReactHighcharts.Highcharts);
DarkUnica(ReactHighcharts.Highcharts);

ReactHighcharts.Highcharts.setOptions(darkUnicaMod);

const documents = {dkDocument, mm2Document};

const addImagesToChart = function() {
  let boxArt = this.renderer.image(
    './assets/images/covers/mm2.jpg',
    300,
    135,
    '15%',
    '30%'
  ).attr({
    zIndex: 10
  });
  boxArt.add();
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.gameCode = this.props.gameCode || 'mm2';
    this.document = documents[`${this.gameCode}Document`];
    this.data = this.document.data;
    this.currentRecord = this.data[this.data.length - 1];
    this.config = {
      chart: {
        type: 'line',
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        events: {
          // load: addImagesToChart
        }
      },
      title: {
        useHTML: true,
        text: `
          <div class='chartTitle'>${this.document.title} — ${this.document.category}</div>
        `
      },
      subtitle: {
        useHTML: true,
        text: `
          <div class='chartSubtitle'>
            <div>Current WR — <a href=${this.currentRecord.vodUrl} class='chartLink score'>${secsToTs(this.currentRecord.time)}</a> by ${this.currentRecord.player}</div>
            <a href=${this.document.leaderboard} class='chartLink lbLink'>LEADERBOARD</a>
          </div>
        `
      },
      credits: false,
      plotOptions: {
        line: {
          marker: {
            enabled: true
          }
        }
      },
      xAxis: {
        title: {
          text: 'Date'
        },
        type: 'datetime',
        min: Date.UTC(this.data[0].year, 0, 1),
        dateTimeLabelFormats: {
          year: '%Y'
        },
        // plotBands: [
        //   {
        //     from: Date.UTC(data[0].year, data[0].month, data[0].day) + utcOffsetMS,
        //     to: Date.UTC(data[1].year, data[1].month, data[1].day) + utcOffsetMS,
        //     color: 'lightgray'
        //   },
        //   {
        //     from: Date.UTC(data[1].year, data[1].month, data[1].day) + utcOffsetMS,
        //     to: Date.UTC(data[2].year, data[2].month, data[2].day) + utcOffsetMS,
        //     color: 'mintcream'
        //   },
        //   {
        //     from: Date.UTC(data[2].year, data[2].month, data[2].day) + utcOffsetMS,
        //     to: Date.UTC(data[3].year, data[3].month, data[3].day) + utcOffsetMS,
        //     color: 'lightgray'
        //   },
        //   {
        //     from: Date.UTC(data[3].year, data[3].month, data[3].day) + utcOffsetMS,
        //     to: Date.UTC(data[4].year, data[4].month, data[4].day) + utcOffsetMS,
        //     color: 'mintcream'
        //   },
        //   {
        //     from: Date.UTC(data[4].year, data[4].month, data[4].day) + utcOffsetMS,
        //     to: Date.UTC(data[5].year, data[5].month, data[5].day) + utcOffsetMS,
        //     color: 'lightgray'
        //   },
        //   {
        //     from: Date.UTC(data[5].year, data[5].month, data[5].day) + utcOffsetMS,
        //     to: Date.UTC(data[6].year, data[6].month, data[6].day) + utcOffsetMS,
        //     color: 'mintcream'
        //   },
        //   {
        //     from: Date.UTC(data[6].year, data[6].month, data[6].day) + utcOffsetMS,
        //     to: Date.UTC(data[10].year, data[10].month, data[10].day) + utcOffsetMS,
        //     color: 'lightgray'
        //   },
        //   {
        //     from: Date.UTC(data[10].year, data[10].month, data[10].day) + utcOffsetMS,
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
      /**********
      * TOOLTIP *
      **********/
      tooltip: {
        useHTML: true,
        formatter: formatTooltip
      },
      /**************
      * ANNOTATIONS *
      **************/
      annotations: [{
        labelOptions: {
          backgroundColor: '#f2f2f2',
          style: {
            fontSize: '13px'
          }
        },
        labels: [
          {
            point: {
              x: Date.UTC(this.document.data[3].year, this.document.data[3].month, this.document.data[3].day) + utcOffsetMS,
              y: this.document.data[3].time * 1000,
              xAxis: 0,
              yAxis: 0
            },
            y: -15,
            shape: 'rect',
            text: 'JPN version standardized'
          },
          {
            point: {
              x: Date.UTC(this.document.data[6].year, this.document.data[6].month, this.document.data[6].day) + utcOffsetMS,
              y: this.document.data[6].time * 1000,
              xAxis: 0,
              yAxis: 0
            },
            y: -15,
            text: 'First 26'
          }
        ]
      }],
      legend: {
        layout: 'horizontal'
      },
      series: [
        {
          grouping: false,
          name: 'Richard Ureta',
          color: '#90ee7e',
          data: []
        },
        {
          grouping: false,
          name: 'Seth Glass',
          color: '#f45b5b',
          data: []
        },
        {
          name: 'nou1',
          step: 'left',
          cursor: 'pointer',
          zoneAxis: 'x',
          events: {
            click: (e) => {
              this.props.changeSelectedChartPoint(e);
            }
          },
          zones: [
            {
              value: Date.UTC(this.document.data[1].year, this.document.data[1].month, this.document.data[1].day) + utcOffsetMS,
              color: '#90ee7e'
            },
            {
              value: Date.UTC(this.document.data[2].year, this.document.data[2].month, this.document.data[2].day) + utcOffsetMS,
              color: '#f45b5b'
            },
            {
              value: Date.UTC(this.document.data[3].year, this.document.data[3].month, this.document.data[3].day) + utcOffsetMS,
              color: '#2b908f'
            },
            {
              value: Date.UTC(this.document.data[4].year, this.document.data[4].month, this.document.data[4].day) + utcOffsetMS,
              color: '#7798BF'
            },
            {
              value: Date.UTC(this.document.data[5].year, this.document.data[5].month, this.document.data[5].day) + utcOffsetMS,
              color: 'orange'
            },
            {
              value: Date.UTC(this.document.data[6].year, this.document.data[6].month, this.document.data[6].day) + utcOffsetMS,
              color: '#7798BF'
            },
            {
              value: Date.UTC(this.document.data[10].year, this.document.data[10].month, this.document.data[10].day) + utcOffsetMS,
              color: 'plum'
            },
            {
              value: Date.now(),
              color: '#7798BF'
            },
          ],
          /*********
          * SCORES *
          *********/
          data: [
            {
              x: Date.UTC(this.data[0].year, this.data[0].month, this.data[0].day) + utcOffsetMS,
              y: this.data[0].time * 1000,
              data: this.data[0],
              nextDate: Date.UTC(this.data[1].year, this.data[1].month, this.data[1].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[1].year, this.data[1].month, this.data[1].day) + utcOffsetMS,
              y: this.data[1].time * 1000,
              data: this.data[1],
              nextDate: Date.UTC(this.data[2].year, this.data[2].month, this.data[2].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[2].year, this.data[2].month, this.data[2].day) + utcOffsetMS,
              y: this.data[2].time * 1000,
              data: this.data[2],
              nextDate: Date.UTC(this.data[3].year, this.data[3].month, this.data[3].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[3].year, this.data[3].month, this.data[3].day) + utcOffsetMS,
              y: this.data[3].time * 1000,
              data: this.data[3],
              nextDate: Date.UTC(this.data[4].year, this.data[4].month, this.data[4].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[4].year, this.data[4].month, this.data[4].day) + utcOffsetMS,
              y: this.data[4].time * 1000,
              data: this.data[4],
              nextDate: Date.UTC(this.data[5].year, this.data[5].month, this.data[5].day) + utcOffsetMS,
              note: this.data[4].note
            },
            {
              x: Date.UTC(this.data[5].year, this.data[5].month, this.data[5].day) + utcOffsetMS,
              y: this.data[5].time * 1000,
              data: this.data[5],
              nextDate: Date.UTC(this.data[6].year, this.data[6].month, this.data[6].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[6].year, this.data[6].month, this.data[6].day) + utcOffsetMS,
              y: this.data[6].time * 1000,
              data: this.data[6],
              nextDate: Date.UTC(this.data[7].year, this.data[7].month, this.data[7].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[7].year, this.data[7].month, this.data[7].day) + utcOffsetMS,
              y: this.data[7].time * 1000,
              data: this.data[7],
              nextDate: Date.UTC(this.data[8].year, this.data[8].month, this.data[8].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[8].year, this.data[8].month, this.data[8].day) + utcOffsetMS,
              y: this.data[8].time * 1000,
              data: this.data[8],
              nextDate: Date.UTC(this.data[9].year, this.data[9].month, this.data[9].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[9].year, this.data[9].month, this.data[9].day) + utcOffsetMS,
              y: this.data[9].time * 1000,
              data: this.data[9],
              nextDate: Date.UTC(this.data[10].year, this.data[10].month, this.data[10].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[10].year, this.data[10].month, this.data[10].day) + utcOffsetMS,
              y: this.data[10].time * 1000,
              data: this.data[10],
              nextDate: Date.UTC(this.data[11].year, this.data[11].month, this.data[11].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[11].year, this.data[11].month, this.data[11].day) + utcOffsetMS,
              y: this.data[11].time * 1000,
              data: this.data[11],
              nextDate: Date.UTC(this.data[12].year, this.data[12].month, this.data[12].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[12].year, this.data[12].month, this.data[12].day) + utcOffsetMS,
              y: this.data[12].time * 1000,
              data: this.data[12],
              nextDate: Date.UTC(this.data[13].year, this.data[13].month, this.data[13].day) + utcOffsetMS
            },
            {
              x: Date.UTC(this.data[13].year, this.data[13].month, this.data[13].day) + utcOffsetMS,
              y: this.data[13].time * 1000,
              data: this.data[13],
              nextDate: Date.now(),
              marker: {
                symbol: 'url(assets/images/icons/1st.png)',
                height: 16,
                width: 16
              }
            }
          ]
        },
        {
          grouping: false,
          name: 'cyghfer',
          color: '#7798BF',
          data: []
        },
        {
          grouping: false,
          name: 'shoka',
          color: 'orange',
          data: []
        },
        {
          grouping: false,
          name: 'Ellonija',
          color: 'plum',
          data: []
        },
        {
          grouping: false,
          name: 'coolkid',
          color: 'white',
          data: []
        }
      ]
      // {
      //   grouping: false,
      //   name: 'Current TAS',
      //   color: 'white',
      //   dashStyle: 'ShortDash',
      //   data: [
      //     {
      //       x: Date.UTC(2004, 1, 1),
      //       y: 1428 * 1000,
      //       data: 'aglasscage (Seth GlanalFighter, pirohiko, & Shinryuu'
      //     },
      //     {
      //       x: Date.UTC(2018, 4, 18),
      //       y: 1428 * 1000,
      //       data: 'aglasscage (Seth GlanalFighter, pirohiko, & Shinryuu'              
      //     }
      //   ]
      // }
    }
  }

  render() {
    return <ReactHighcharts
      config={this.config}
      ref="chart"
    />
  }
}

export default Chart;