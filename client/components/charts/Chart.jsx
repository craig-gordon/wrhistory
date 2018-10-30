import React from 'react';
import Highcharts from 'highcharts';
import Annotations from 'highcharts/modules/annotations';
import ReactHighcharts from 'react-highcharts';
import DarkUnica from 'highcharts/themes/dark-unica';

import '../../assets/stylesheets/classStyles.css';
import darkUnicaMod from './darkUnicaMod.js';
import { secsToTs } from '../../utils/datetimeUtils.js';
import {
  formatTooltip,
  createPowSymbol,
  createTitleHTML,
  createSubtitleHTML,
  createYAxisConfig,
  createChartLabels,
  createChartData,
  createChartZones
} from './chartUtils.js';

Annotations(ReactHighcharts.Highcharts);
DarkUnica(ReactHighcharts.Highcharts);

ReactHighcharts.Highcharts.setOptions(darkUnicaMod);
ReactHighcharts.Highcharts.SVGRenderer.prototype.symbols.pow = createPowSymbol;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.records = this.props.document.records;
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
        text: createTitleHTML(this.props.document)
      },
      subtitle: {
        useHTML: true,
        text: createSubtitleHTML(this.props.document, this.currentRecord)
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
      yAxis: createYAxisConfig(this.props.document),
      tooltip: {
        useHTML: true,
        formatter: formatTooltip
      },
      annotations: [{
        labelOptions: {
          backgroundColor: '#f2f2f2',
          style: {
            fontSize: '13px'
          }
        },
        labels: createChartLabels(this.records)
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
              this.props.changeSelectedChartPoint(e, this.records);
            }
          },
          zones: createChartZones(this.records),
          data: createChartData(this.records, this.props.document.type)
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