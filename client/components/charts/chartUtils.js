import React from 'react';
import styled from 'styled-components';

import { secsToTs, daysToYMD, formatUTCMillisecsToDateStr } from '../../utils/datetimeUtils.js';
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

export const formatTooltip = function() {
  let dateStr = formatUTCMillisecsToDateStr(this.x);
  const typeLabel = this.point.data.type === 'time' ? 'Time' : 'Score';
  const formattedMark = this.point.data.type === 'time' ? secsToTs(this.y / 1000) : formatHighScore(this.y);
  return `
    <div>
      <div><span class='ttCategory'>${typeLabel}</span>${formattedMark}</div>
      <div><span class='ttCategory'>Player</span>${this.point.data.playerName}</div>
      <div><span class='ttCategory'>Date</span>${dateStr}</div>
      <div><span class='ttCategory'>Duration</span>${daysToYMD(this.x, this.point.nextDate)} ${this.point.isCurrentRecord ? ' and counting!' : ''}</div>
      ${this.point.data.tooltipNote ? `<div><span class='ttCategory'>Note</span>${this.point.data.tooltipNote}</div>` : ``}
    </div>
  `;
};

export const createPowSymbol = function(x, y) {
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
      ${document.title}${document.category ? ` — ${document.category}` : ``}
    </div>
  `
};

export const createSubtitleHTML = function(document, currentRecord) {
  let formattedMark = document.type === 'speedrun' ? secsToTs(currentRecord.mark) : formatHighScore(currentRecord.mark);
  return `
    <div class='chartSubtitle'>
      <div>Current WR — <a href=${currentRecord.vodUrl} class='chartLink score'>${formattedMark}</a> by ${currentRecord.playerName}</div>
      <a href=${document.leaderboardUrl} class='chartLink lbLink'>LEADERBOARD</a>
    </div>
  `
};

export const createYAxisConfig = function(document) {
  const configs = {

    speedrun: {
      title: {
        text: 'Time'
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
      }
    },

    highscore: {
      title: {
        text: 'Score'
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
      tickLength: 0
    }

  };

  return configs[document.type];
};

export const createChartLabels = function(records) {
  return records.filter(record => record.labelText).map(record => {
    return {
      point: {
        x: Date.UTC(record.year, record.month, record.day) + utcOffsetMS,
        y: record.mark * 1000,
        xAxis: 0,
        yAxis: 0
      },
      y: -15,
      text: record.labelText
    }
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
    'rgb(144, 238, 126, 0.7)': undefined,
    'rgb(244, 91, 91, 0.7)': undefined,
    'rgb(43, 144, 143, 0.7)': undefined,
    'rgb(119, 152, 191, 0.7)': undefined,
    'rgb(255, 165, 0, 0.7)': undefined,
    'rgb(221, 160, 221, 0.7)': undefined,
    'rgb(255, 255, 255, 0.7)': undefined
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
      nextDate: isCurrentRecord ? Date.now() : Date.UTC(records[i+1].year, records[i+1].month, records[i+1].day) + utcOffsetMS,
      marker: determineMarker(record, isCurrentRecord)
    };
  });

  let finalDummyRecord = {...recordsArray[recordsArray.length - 1]};
  finalDummyRecord.x = Date.now() + 2592000000;

  return recordsArray.concat(finalDummyRecord);
};

// export const createChartZones = function(records) {
//   const mappings = {
//     'rgb(144, 238, 126, 0.7)': undefined,
//     'rgb(244, 91, 91, 0.7)': undefined,
//     'rgb(43, 144, 143, 0.7)': undefined,
//     'rgb(119, 152, 191, 0.7)': undefined,
//     'rgb(255, 165, 0, 0.7)': undefined,
//     'rgb(221, 160, 221, 0.7)': undefined,
//     'rgb(255, 255, 255, 0.7)': undefined
//   };

//   let nonRepeatRecords = records.filter((record, i) => {
//     if (i === 0) return true;
//     else return records[i-1].playerName !== record.playerName;
//   });

//   return nonRepeatRecords.map((record, i) => {
//     let playerColor;
//     for (var color in mappings) {
//       if (mappings[color] === record.playerName) playerColor = color;
//     }
//     if (playerColor === undefined) {
//       for (var color in mappings) {
//         if (mappings[color] === undefined) {
//           mappings[color] = record.playerName;
//           playerColor = color;
//           break;
//         }
//       }
//     }
//     let next = nonRepeatRecords[i+1];
//     return {
//       value: next ? Date.UTC(records[next.id].year, records[next.id].month, records[next.id].day) + utcOffsetMS : Date.now(),
//       color: playerColor
//     }
//   });
// };

export const createChartSeries = function(records, documentType, changeSelectedChartPoint) {
  const playerColors = [
    'rgb(144, 238, 126, 0.7)',
    'rgb(244, 91, 91, 0.7)',
    'rgb(43, 144, 143, 0.7)',
    'rgb(119, 152, 191, 0.7)',
    'rgb(255, 165, 0, 0.7)',
    'rgb(221, 160, 221, 0.7)',
    'rgb(255, 255, 255, 0.7)'
  ];

  let playerList = [];

  return records.filter((record, i) => {
    if (playerList.indexOf(record.playerName) > -1) {
      return false;
    } else {
      playerList.push(record.playerName);
      return true;
    }
  }).map((record, i) => {
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
          click: (e) => {
            changeSelectedChartPoint(e, records);
          }
        },
        // zones: createChartZones(records),
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
  margin: 0 7%;
`;

const Header = styled.h2`
  color: white;
`;

const Text = styled.h4`
  color: white;
`;

export const createCarouselSlides = function(records) {
  return records.map((record, i) => {
    let formattedMark = record.type === 'time' ? secsToTs(record.mark) : formatHighScore(record.mark);
    return (
      <Slide key={i}>
        <Header>{record.playerName} — {formattedMark}</Header>
        <Text>{record.detailedText}</Text>
      </Slide>
    );
  });
};

// const addImagesToChart = function() {
//   let boxArt = this.renderer.image(
//     './assets/images/covers/mm2.jpg',
//     300,
//     135,
//     '15%',
//     '30%'
//   ).attr({
//     zIndex: 10
//   });
//   boxArt.add();
// };