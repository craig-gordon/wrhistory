import React from 'react';
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
  createChartZones,
  createChartSeries
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
        }
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
      series: createChartSeries(this.records, this.props.document.type, this.props.changeSelectedChartPoint)
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

  componentDidMount() {
    
  }

  render() {
    return <ReactHighcharts
      config={this.config}
      ref="chart"
    />
  }
}

export default Chart;