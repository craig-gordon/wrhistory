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
  positionTooltip,
  createPowSymbol,
  createTitleHTML,
  createSubtitleHTML,
  createYAxisConfig,
  createChartLabels,
  createChartData,
  createChartZones,
  createChartSeries,
  addViewFullChartButton,
  addSpinnerToChart
} from './chartUtils.js';

import isEqual from 'lodash.isEqual';

MulticolorSeries(ReactHighcharts.Highcharts);
Annotations(ReactHighcharts.Highcharts);
DarkUnica(ReactHighcharts.Highcharts);

ReactHighcharts.Highcharts.setOptions(darkUnicaMod);
ReactHighcharts.Highcharts.SVGRenderer.prototype.symbols.pow = createPowSymbol;


class Chart extends React.PureComponent {
  state = {
    neverReflowFirstCheck: true
  }

  componentDidMount() {
    if (this.props.location === 'create') {
      this.focusOnPoint();
    }
  }

  componentDidUpdate(prevProps) {
    // updating selected point on Chart page
    if (this.props.selectedChartPoint !== prevProps.selectedChartPoint) {
      const chart = this.refs.chart.getChart();
      const point = chart.series[0].data[this.props.selectedChartPoint];
      point.select();
    } else if (this.props.location === 'create') {
      this.focusOnPoint(prevProps.currentRecordPage);
      if (!isEqual(prevProps.document, this.props.document)) {
        this.setState(
          () => ({neverReflowFirstCheck: false}),
          () => {
            this.focusOnPoint();
            this.setState({neverReflowFirstCheck: true});
          }
        );
      }
    }
  }

  focusOnPoint = (prevPage, shouldSelect = true) => {
    const chart = this.refs.chart.getChart();
    const pointsArr = chart.series[0].data;
    if (pointsArr.length === this.props.currentRecordPage) {
      const point = pointsArr[prevPage - 1];
      point.setState('');
      point.selected ? point.select() : null;
      chart.tooltip.hide(point);
    } else {
      const point = pointsArr[this.props.currentRecordPage - 1];
      point.setState('hover');
      shouldSelect && point.selected ? null : point.select();
      chart.tooltip.refresh(point);
    }
  }

  render() {
    let location = this.props.location;
    let history = this.props.history;
    let document = this.props.document;
    let records = document ? document.records : undefined;
    let currentRecord = records ? records[records.length - 1] : undefined;
    let gameEndpoint = document ? document.uriEndpoint : null;
    let dataLoaded = this.props.dataLoaded;

    let config = {
      chart: {
        type: 'line',
        zoomType: 'x',
        panning: true,
        panKey: 'shift',
        events: {
          load: dataLoaded
                  ? function() {
                      location === 'home' ? addViewFullChartButton.call(this, gameEndpoint, history) : null;
                    }
                  : addSpinnerToChart
        }
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
        series: {
          stickyTracking: false
        }
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
        outside: true,
        hideDelay: 200,
        formatter: formatTooltip,
        positioner: positionTooltip
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
      series: createChartSeries(
        records,
        document ? document.type : undefined,
        this.props.location,
        this.props.changeSelectedChartPoint,
        this.props.changePage
      )
    };

    return (
      <ReactHighcharts
        config={config}
        neverReflow={this.state.neverReflowFirstCheck ? this.props.neverReflow : false}
        ref="chart"
      />
    );
  }
}

export default Chart;