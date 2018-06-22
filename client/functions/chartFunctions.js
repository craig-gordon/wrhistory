import { secsToTs, daysToYMD } from './timeConversions.js';
import '../assets/stylesheets/classStyles.css';

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
  return `
    <div>
      <div><span class='ttCategory'>Time</span>${this.point.data.type === 'time' ? secsToTs(this.y / 1000) : this.y}</div>
      <div><span class='ttCategory'>Player</span>${this.point.data.player}</div>
      <div><span class='ttCategory'>Date</span>${dateStr}</div>
      <div><span class='ttCategory'>Duration</span>${daysToYMD(this.x, this.point.nextDate)} ${this.point.isCurrentRecord ? ' and counting!' : ''}</div>
      ${this.point.note ? `<div><span class='ttCategory'>Note</span>${this.point.note}</div>` : ``}
    </div>
  `;
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

export const generateYAxisConfig = function(type) {
  const configs = {

    speedrun: {
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

    highscore: {
      title: {
        text: 'Score'
      },
      type: 'linear'
    }

  };

  return configs[type];
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
}