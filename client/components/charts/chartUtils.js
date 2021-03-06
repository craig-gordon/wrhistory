import React from 'react';
import styled from 'styled-components';
import $ from 'cash-dom';
import Spin from 'antd/lib/spin';

import {
  secsToTs,
  daysToYMD,
  formatUTCMillisecsToDateStr,
  formatYMDToDateStr
} from '../../utils/datetimeUtils.js';
import '../../assets/stylesheets/classStyles.css';

export const formatHighScore = function(score) {
  let scoreStr = score.toString();
  let scoreArr = [];
  while (scoreStr.length > 0) {
    if (scoreStr.length > 3) {
      scoreArr.unshift(scoreStr.slice(-3));
      scoreStr = scoreStr.slice(0, -3);
    } else {
      scoreArr.unshift(scoreStr);
      scoreStr = '';
    }
  }
  return scoreArr.join(',');
};

const insertNewlineChars = (str, interval) => {
  let strArr = str.split('');
  let idx = interval;
  while (strArr[idx] !== undefined) {
    if (strArr[idx] !== ' ') {
      idx++;
      continue;
    }
    strArr.splice(idx, 0, '\n');
    idx = idx + interval + 3;
  }
  return strArr.join('');
};

export const formatTooltip = function() {
  let dateStr = formatUTCMillisecsToDateStr(this.x);
  const typeLabel = this.point.data.type === 'time' ? 'Time' : 'Score';
  const formattedMark =
    this.point.data.type === 'time'
      ? secsToTs(this.y / 1000)
      : formatHighScore(this.y);
  return `
    <div>
      <div><span class='ttCategory'>${typeLabel}</span>${formattedMark}</div>
      <div><span class='ttCategory'>Player</span>${
        this.point.data.playerName
      }</div>
      <div><span class='ttCategory'>Date</span>${dateStr}</div>
      <div><span class='ttCategory'>Duration</span>${daysToYMD(
        this.x,
        this.point.nextDate
      )} ${this.point.isCurrentRecord ? ' and counting!' : ''}</div>
      ${
        this.point.data.tooltipNote
          ? `<div><span class='ttCategory'>Note</span><span class='ttNote'>${
              this.point.data.tooltipNote
            }</span></div>`
          : ``
      }
    </div>
  `;
};

export const positionTooltip = function(labelWidth, labelHeight, point) {
  let x = point.plotX + this.chart.plotLeft - labelWidth / 2;
  let y = point.plotY + this.chart.plotTop - labelHeight - 15;
  // if the label would be rendered above the chart plot area,
  // render it below the point instead
  if (point.plotY - labelHeight < 0) {
    y = point.plotY + this.chart.plotTop + 15;
  }
  // if the label would be rendered outside of the horizontal viewport region,
  // render it within the viewport instead
  // TODO
  return { x, y };
};

export const createPowSymbol = function(x, y) {
  return [
    'M',
    x + 3,
    y + 3,
    'L',
    x + 9,
    y + 5,
    'L',
    x + 12,
    y + 0,
    'L',
    x + 15,
    y + 5,
    'L',
    x + 21,
    y + 3,
    'L',
    x + 19,
    y + 9,
    'L',
    x + 24,
    y + 12,
    'L',
    x + 19,
    y + 15,
    'L',
    x + 21,
    y + 21,
    'L',
    x + 15,
    y + 19,
    'L',
    x + 12,
    y + 24,
    'L',
    x + 9,
    y + 19,
    'L',
    x + 3,
    y + 21,
    'L',
    x + 5,
    y + 15,
    'L',
    x + 0,
    y + 12,
    'L',
    x + 5,
    y + 9,
    'z'
  ];
};

const determineMarker = function(record, isCurrentRecord) {
  if (isCurrentRecord) {
    return undefined;
    // {
    //   symbol: 'url(assets/images/icons/1st.png)',
    //   height: 16,
    //   width: 16
    // };
  } else if (record.isMilestone) {
    return {
      symbol: 'pow'
    };
  }
};

export const createTitleHTML = function(document) {
  return `
    <div class='chartTitle'>
      ${document.gameTitle}${document.category ? ` — ${document.category}` : ``}
    </div>
  `;
};

export const createSubtitleHTML = function(document, currentRecord) {
  let formattedMark =
    document.type === 'speedrun'
      ? secsToTs(currentRecord.mark)
      : formatHighScore(currentRecord.mark);
  return `
    <div class='chartSubtitle'>
      <div>Current WR — <a href=${
        currentRecord.vodUrl
      } class='chartLink score'>${formattedMark}</a> by ${
    currentRecord.playerName
  }</div>
      ${
        document.leaderboardUrl
          ? `<a href=${
              document.leaderboardUrl
            } class='chartLink lbLink'>LEADERBOARD</a>`
          : ''
      }
    </div>
  `;
};

export const createXAxisConfig = function(records) {
  return {
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
    },
    labels: {
      style: {
        fontSize: window.widthType === 'lg' ? '1rem' : '0.75rem'
      }
    }
  };
};

export const createYAxisConfig = function(document) {
  const configs = {
    speedrun: {
      title: {
        text: window.widthType === 'lg' ? 'Time' : null
      },
      type: 'datetime',
      alternateGridColor: '#3f3f3f',
      tickInterval: document.yAxisTickInterval,
      tickLength: 0,
      dateTimeLabelFormats: {
        milliseconds: '%H:%M:%S',
        second: '%H:%M:%S',
        minute: '%M:%S',
        hour: '%H:%M:%S'
      },
      labels: {
        style: {
          fontSize: window.widthType === 'lg' ? '1rem' : '0.75rem'
        }
      }
    },

    highscore: {
      title: {
        text: window.widthType === 'lg' ? 'Score' : null
      },
      labels: {
        rotation: 25,
        formatter: function() {
          return formatHighScore(this.value);
        }
      },
      type: 'linear',
      alternateGridColor: '#3f3f3f',
      // tickInterval: document.yAxisTickInterval,
      tickInterval: 100000,
      tickLength: 0,
      labels: {
        style: {
          fontSize: window.widthType === 'lg' ? '1rem' : '0.75rem'
        }
      }
    }
  };

  return configs[document.type];
};

export const createChartLabels = function(records) {
  return records
    .filter(record => record.labelText)
    .map(record => {
      return {
        point: {
          x: Date.UTC(record.year, record.month, record.day) + utcOffsetMS,
          y: record.mark * 1000,
          xAxis: 0,
          yAxis: 0
        },
        y: -15,
        text: record.labelText
      };
    });
};

const convertTransparentToSolid = function(colorStr) {
  let lastCommaIdx = colorStr.lastIndexOf(',');
  return colorStr.slice(0, lastCommaIdx) + ')';
};

export const createChartData = function(records, documentType) {
  const yMultipliers = {
    speedrun: 1000,
    highscore: 1
  };

  const mappings = {
    'rgba(144, 238, 126, 0.7)': undefined,
    'rgba(244, 91, 91, 0.7)': undefined,
    'rgba(43, 144, 143, 0.7)': undefined,
    'rgba(119, 152, 191, 0.7)': undefined,
    'rgba(255, 165, 0, 0.7)': undefined,
    'rgba(221, 160, 221, 0.7)': undefined,
    'rgba(255, 255, 255, 0.7)': undefined
  };

  let recordsArray = records.map((record, i) => {
    let playerColor;

    for (var color in mappings) {
      if (mappings[color] === record.playerName) playerColor = color;
    }
    if (playerColor === undefined) {
      for (var color in mappings) {
        if (mappings[color] === undefined) {
          mappings[color] = record.playerName;
          playerColor = color;
          break;
        }
      }
    }

    let isCurrentRecord = i === records.length - 1;

    return {
      x: Date.UTC(record.year, record.month, record.day) + utcOffsetMS,
      y: Number(record.mark) * yMultipliers[documentType],
      segmentColor: playerColor,
      color: convertTransparentToSolid(playerColor),
      data: record,
      isCurrentRecord,
      nextDate: isCurrentRecord
        ? Date.now()
        : Date.UTC(
            records[i + 1].year,
            records[i + 1].month,
            records[i + 1].day
          ) + utcOffsetMS,
      marker: determineMarker(record, isCurrentRecord)
    };
  });

  let finalDummyRecord = { ...recordsArray[recordsArray.length - 1] };
  finalDummyRecord.x = Date.now() + 2592000000;

  return recordsArray.concat(finalDummyRecord);
};

export const createChartSeries = function(
  records = [],
  documentType = 'speedrun',
  location,
  changeSelectedChartPoint,
  changePage
) {
  const playerColors = [
    'rgba(144, 238, 126, 0.7)',
    'rgba(244, 91, 91, 0.7)',
    'rgba(43, 144, 143, 0.7)',
    'rgba(119, 152, 191, 0.7)',
    'rgba(255, 165, 0, 0.7)',
    'rgba(221, 160, 221, 0.7)',
    'rgba(255, 255, 255, 0.7)'
  ];

  let playerList = [];

  return records
    .filter((record, i) => {
      if (playerList.indexOf(record.playerName) > -1) {
        return false;
      } else {
        playerList.push(record.playerName);
        return true;
      }
    })
    .map((record, i) => {
      if (i === 0) {
        return {
          grouping: false,
          type: 'coloredline',
          name: record.playerName,
          color: convertTransparentToSolid(playerColors[i]),
          step: 'left',
          cursor: 'pointer',
          zoneAxis: 'x',
          events: {
            click: function(e) {
              if (location === 'create') {
                changePage(e.point.index + 1);
              } else if (location === 'game') {
                changeSelectedChartPoint(e, records);
              }
            }
          },
          data: createChartData(records, documentType)
        };
      } else {
        return {
          grouping: false,
          name: record.playerName,
          color: convertTransparentToSolid(playerColors[i]),
          data: []
        };
      }
    });
};

const Slide = styled.div`
  display: grid;
  align-items: end;
  margin: 0% 8% 5% 8%;
`;

const Header = styled.h1`
  font-style: normal !important;
  margin-bottom: 2px !important;
`;

const SubHeader = styled.h3`
  font-style: normal !important;
  color: rgba(153, 142, 160, 1) !important;
`;

const Text = styled.h4`
  ${props => (props.hasDetailed ? 'font-style: normal !important;' : '')}
  margin: 0 !important;
`;

export const createCarouselSlides = function(records) {
  return records.map((record, i) => {
    let formattedMark =
      record.type === 'time'
        ? secsToTs(record.mark)
        : formatHighScore(record.mark);
    let recordDateStr = formatYMDToDateStr(
      record.year,
      record.month,
      record.day
    );
    let durationStr =
      i === records.length - 1
        ? daysToYMD(
            Date.UTC(record.year, record.month, record.day) + utcOffsetMS,
            Date.now() + utcOffsetMS
          ) + ' and counting!'
        : daysToYMD(
            Date.UTC(record.year, record.month, record.day) + utcOffsetMS,
            Date.UTC(
              records[i + 1].year,
              records[i + 1].month,
              records[i + 1].day
            ) + utcOffsetMS
          );
    return (
      <Slide key={i}>
        <Header>
          {record.playerName} — {formattedMark}
        </Header>
        <SubHeader>
          {recordDateStr} — held for {durationStr}
        </SubHeader>
        <Text hasDetailed={record.detailedText !== undefined}>
          {record.detailedText
            ? record.detailedText
            : 'No detailed description available for this record'}
        </Text>
      </Slide>
    );
  });
};

export const addSpinnerToChart = function() {
  this.renderer
    .text(
      `<div class="pixel-loader" />`,
      this.chartWidth / 2,
      this.chartHeight / 2,
      true
    )
    .add();
};

export const addViewFullChartButton = function(endpoint, history) {
  this.renderer
    .text(
      `<div class="viewFullChartBtn">${
        window.widthType === 'lg' ? 'View Full Chart' : 'Full'
      }</div>`,
      window.widthType === 'lg' ? 20 : 10,
      window.widthType === 'lg' ? 30 : 20,
      true
    )
    .add()
    .on('click', e => {
      e.stopPropagation();
      history.push(`/chart${endpoint}`);
    });
};
