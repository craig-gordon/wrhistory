import React from 'react';
import styled from 'styled-components';

import { secsToTs, daysToYMD } from './timeConversions.js';
import '../assets/stylesheets/classStyles.css';

const formatHighScore = function(score) {
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
  let dateStrRaw = new Date(this.x).toDateString().slice(4);
  dateStrRaw = dateStrRaw.slice(0, 6) + ', ' + dateStrRaw.slice(7);
  dateStrRaw = dateStrRaw[4] === '0' ? dateStrRaw.slice(0, 4) + dateStrRaw.slice(5) : dateStrRaw;
  let dateStr;
  const monthMap = {
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sep': 'September',
    'Oct': 'October',
    'Nov': 'November',
    'Dec': 'December'
  };
  for (var month in monthMap) {
    if (dateStrRaw.indexOf(month) > -1) {
      let dateArr = dateStrRaw.split(' ');
      dateArr[0] = monthMap[month];
      dateStr = dateArr.join(' ');
      break;
    }
  }

  const typeLabel = this.point.data.type === 'time' ? 'Time' : 'Score';
  const formattedMark = this.point.data.type === 'time' ? secsToTs(this.y / 1000) : formatHighScore(this.y);
  return `
    <div>
      <div><span class='ttCategory'>${typeLabel}</span>${formattedMark}</div>
      <div><span class='ttCategory'>Player</span>${this.point.data.player}</div>
      <div><span class='ttCategory'>Date</span>${dateStr}</div>
      <div><span class='ttCategory'>Duration</span>${daysToYMD(this.x, this.point.nextDate)} ${this.point.isCurrentRecord ? ' and counting!' : ''}</div>
      ${this.point.note ? `<div><span class='ttCategory'>Note</span>${this.point.note}</div>` : ``}
    </div>
  `;
};

export const generatePowSymbol = function(x, y) {
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
    return {
      symbol: 'url(assets/images/icons/1st.png)',
      height: 16,
      width: 16
    };
  } else if (record.isMilestone) {
    return {
      symbol: 'pow'
    };
  }
};

export const generateTitleHTML = function(document) {
  return `
    <div class='chartTitle'>${document.title}${document.category ? `— ${document.category}` : ``}</div>
  `
};

export const generateSubtitleHTML = function(document, currentRecord) {
  let formattedMark = document.type === 'speedrun' ? secsToTs(currentRecord.mark) : formatHighScore(currentRecord.mark);
  return `
    <div class='chartSubtitle'>
      <div>Current WR — <a href=${currentRecord.vodUrl} class='chartLink score'>${formattedMark}</a> by ${currentRecord.player}</div>
      <a href=${document.leaderboard} class='chartLink lbLink'>LEADERBOARD</a>
    </div>
  `
};

export const generateYAxisConfig = function(document) {
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
      tickInterval: document.yAxisTickInterval,
      tickLength: 0
    }

  };

  return configs[document.type];
};

export const generateChartData = function(records, type) {
  const yMultipliers = {
    speedrun: 1000,
    highscore: 1
  };

  return records.map((record, i) => {
    let isCurrentRecord = i === records.length - 1;
    return {
      x: Date.UTC(record.year, record.month, record.day) + utcOffsetMS,
      y: record.mark * yMultipliers[type],
      data: record,
      isCurrentRecord,
      nextDate: isCurrentRecord ? Date.now() + utcOffsetMS : Date.UTC(records[i+1].year, records[i+1].month, records[i+1].day) + utcOffsetMS,
      marker: determineMarker(record, isCurrentRecord)
    };
  });
};

export const generateChartZones = function(records) {
  const mappings = {
    '#90ee7e': undefined,
    '#f45b5b': undefined,
    '#2b908f': undefined,
    '#7798BF': undefined,
    'orange': undefined,
    'plum': undefined,
    'white': undefined
  };

  let nonRepeatRecords = records.filter((record, i) => {
    if (i === 0) return true;
    else return records[i-1].player !== record.player;
  });

  return nonRepeatRecords.map((record, i) => {
    let playerColor;
    for (var color in mappings) {
      if (mappings[color] === record.player) playerColor = color;
    }
    if (playerColor === undefined) {
      for (var color in mappings) {
        if (mappings[color] === undefined) {
          mappings[color] = record.player;
          playerColor = color;
          break;
        }
      }
    }
    let next = nonRepeatRecords[i+1];
    return {
      value: next ? Date.UTC(records[next.id].year, records[next.id].month, records[next.id].day) + utcOffsetMS : Date.now() + utcOffsetMS,
      color: playerColor
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

export const generateCarouselSlides = function(records) {
  return records.map((record, i) => {
    let formattedMark = record.type === 'time' ? secsToTs(record.mark) : formatHighScore(record.mark);
    return (
      <Slide key={i}>
        <Header>{record.player} — {formattedMark}</Header>
        <Text>{record.detailed}</Text>
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