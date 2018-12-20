import React from 'react';
import ReactHighcharts from 'react-highcharts';
import MulticolorSeries from 'highcharts-multicolor-series';
import Annotations from 'highcharts/modules/annotations';
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
  createChartSeries,
  // addSpinnerToChart
} from './chartUtils.js';

MulticolorSeries(ReactHighcharts.Highcharts);
Annotations(ReactHighcharts.Highcharts);
DarkUnica(ReactHighcharts.Highcharts);

ReactHighcharts.Highcharts.setOptions(darkUnicaMod);
ReactHighcharts.Highcharts.SVGRenderer.prototype.symbols.pow = createPowSymbol;


class Chart extends React.PureComponent {
  render() {
    let document = this.props.document;
    let records = document ? document.records : undefined;
    let currentRecord = records ? records[records.length - 1] : undefined;
    let config = {
      chart: {
        type: 'line',
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        // events: {
        //   load: this.props.dataLoaded === false ? addSpinnerToChart : null
        // }
      },
      title: {
        useHTML: true,
        text: document ? createTitleHTML(document) : ''
      },
      subtitle: {
        useHTML: true,
        text: document && currentRecord ? createSubtitleHTML(document, currentRecord) : ''
      },
      credits: false,
      plotOptions: {
        line: {
          allowPointSelect: true,
          marker: {
            enabled: true,
            states: {
              select: {
                fillColor: 'rgb(221, 13, 13)',
                radius: 12
              }
            }
          }
        },
      },
      xAxis: {
        title: {
          text: 'Date'
        },
        type: 'datetime',
        endOnTick: false,
        min: Date.UTC(records && records.length > 0 ? records[0].year : 1970, 0, 1),
        max: Date.now() + utcOffsetMS,
        minTickInterval: 86400000,
        // tickInterval: 31104000000,
        dateTimeLabelFormats: {
          year: '%Y'
        }
      },
      yAxis: createYAxisConfig(document ? document : {type: 'speedrun'}),
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
        labels: createChartLabels(records ? records : [])
      }],
      legend: {
        layout: 'horizontal'
      },
      series: createChartSeries(records, document ? document.type : undefined, this.props.changeSelectedChartPoint)
    };

    return (
      <ReactHighcharts
        config={config}
        ref="chart"
      />
    );
  }
}

export default Chart;