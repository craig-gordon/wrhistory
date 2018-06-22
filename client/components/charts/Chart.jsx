import React from 'react';
import Highcharts from 'highcharts';
import Annotations from 'highcharts/modules/annotations';
import ReactHighcharts from 'react-highcharts';
import DarkUnica from 'highcharts/themes/dark-unica';

import ChartCarousel from './chartCarousel.jsx';

import '../../assets/stylesheets/classStyles.css';
import darkUnicaMod from './darkUnicaMod.js';
import { secsToTs } from '../../functions/timeConversions.js';
import { formatTooltip, produceChartData, produceChartZones } from '../../functions/chartFunctions.js';
import { document as dkDocument } from '../../data/dkDocument.js';
import { document as mm2Document } from '../../data/mm2Document.js';

Annotations(ReactHighcharts.Highcharts);
DarkUnica(ReactHighcharts.Highcharts);

ReactHighcharts.Highcharts.setOptions(darkUnicaMod);

ReactHighcharts.Highcharts.SVGRenderer.prototype.symbols.pow = function(x, y, w, h) {
  return [
    'M', x+3, y+3,
    'L', x+9, y+5,
    'L', x+12, y+0,
    'L', x+15, y+5, 
    'L', x+21, y+3, 
    'L', x+19, y+9, 
    'L', x+24, y+12, 
    'L', x+19, y+15, 
    'L', x+21, y+21, 
    'L', x+15, y+19, 
    'L', x+12, y+24, 
    'L', x+9, y+19, 
    'L', x+3, y+21, 
    'L', x+5, y+15, 
    'L', x+0, y+12, 
    'L', x+5, y+9,
    'z'
  ]
}

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
    // this.gameCode = 'dk';
    this.document = documents[`${this.gameCode}Document`];
    this.records = this.document.records;
    this.currentRecord = this.records[this.records.length - 1];
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
        min: Date.UTC(this.records[0].year, 0, 1),
        dateTimeLabelFormats: {
          year: '%Y'
        },
        // plotBands: [
        //   {
        //     from: Date.UTC(records[0].year, records[0].month, records[0].day) + utcOffsetMS,
        //     to: Date.UTC(records[1].year, records[1].month, records[1].day) + utcOffsetMS,
        //     color: 'lightgray'
        //   },
        //   {
        //     from: Date.UTC(records[1].year, records[1].month, records[1].day) + utcOffsetMS,
        //     to: Date.UTC(records[2].year, records[2].month, records[2].day) + utcOffsetMS,
        //     color: 'mintcream'
        //   },
        //   {
        //     from: Date.UTC(records[2].year, records[2].month, records[2].day) + utcOffsetMS,
        //     to: Date.UTC(records[3].year, records[3].month, records[3].day) + utcOffsetMS,
        //     color: 'lightgray'
        //   },
        //   {
        //     from: Date.UTC(records[3].year, records[3].month, records[3].day) + utcOffsetMS,
        //     to: Date.UTC(records[4].year, records[4].month, records[4].day) + utcOffsetMS,
        //     color: 'mintcream'
        //   },
        //   {
        //     from: Date.UTC(records[4].year, records[4].month, records[4].day) + utcOffsetMS,
        //     to: Date.UTC(records[5].year, records[5].month, records[5].day) + utcOffsetMS,
        //     color: 'lightgray'
        //   },
        //   {
        //     from: Date.UTC(records[5].year, records[5].month, records[5].day) + utcOffsetMS,
        //     to: Date.UTC(records[6].year, records[6].month, records[6].day) + utcOffsetMS,
        //     color: 'mintcream'
        //   },
        //   {
        //     from: Date.UTC(records[6].year, records[6].month, records[6].day) + utcOffsetMS,
        //     to: Date.UTC(records[10].year, records[10].month, records[10].day) + utcOffsetMS,
        //     color: 'lightgray'
        //   },
        //   {
        //     from: Date.UTC(records[10].year, records[10].month, records[10].day) + utcOffsetMS,
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
              x: Date.UTC(this.records[3].year, this.records[3].month, this.records[3].day) + utcOffsetMS,
              y: this.records[3].time * 1000,
              xAxis: 0,
              yAxis: 0
            },
            y: -15,
            shape: 'rect',
            text: 'JPN version standardized'
          },
          {
            point: {
              x: Date.UTC(this.records[6].year, this.records[6].month, this.records[6].day) + utcOffsetMS,
              y: this.records[6].time * 1000,
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
          /********
          * ZONES *
          ********/
          zones: produceChartZones(this.records),
          /*******
          * DATA *
          *******/
          data: produceChartData(this.records)
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