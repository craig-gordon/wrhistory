export const convertHMSMsToSecondsStr = (h, m, s, ms) => {
  let totalSeconds = (h * 3600) + (m * 60) + s;
  if (ms) totalSeconds = totalSeconds + Number(`0.${ms}`);
  return totalSeconds;
};

export const tsToSecs = (ts) => {
  let tsArr = ts.split(':');
  let secs = Number(tsArr[tsArr.length - 1]);
  let mins = Number(tsArr[tsArr.length - 2]) || 0;
  let hours = Number(tsArr[tsArr.length - 3]) || 0;
  let days = Number(tsArr[tsArr.length - 4]) || 0;
  return secs + mins * 60 + hours * 3600 + days * 86400;
};

export const secsToTs = (secs) => {
  let secsStr = secs.toString();
  let tsMillisecs;
  if (secsStr.indexOf('.') > -1) {
    let pointIdx = secsStr.indexOf('.');
    tsMillisecs = secsStr.slice(pointIdx);
    secs = Number(secsStr.slice(0, pointIdx));
  }
  let tsSecs = secs % 60;
  let tsMins = Math.floor(secs / 60) % 60;
  let tsHours = Math.floor(secs / 3600) % 24;
  let tsDays = Math.floor(secs / 86400);
  let tsArr = [tsDays, tsHours, tsMins, tsSecs];
  while (tsArr[0] === 0 && tsArr.length !== 1) {
    tsArr = tsArr.slice(1);
  }
  for (var i = 1; i < tsArr.length; i++) {
    if (tsArr[i] < 10) {
      tsArr[i] = '0' + tsArr[i];
    }
  }
  return tsArr.join(':') + (tsMillisecs ? tsMillisecs : '');
};

const getIsolatedYMDFromMS = (ms) => {
  let years = Math.floor(ms / 31556952000);
  let yearsInMS = years * 31556952000;
  let months = Math.floor((ms - (yearsInMS)) / 2592000000);
  let monthsInMS = months * 2592000000;
  let days = Math.floor((ms - yearsInMS - monthsInMS) / 86400000);
  return {years, months, days};
};

export const daysToYMD = (currDateMS, nextDateMS) => {
  let diffMS = nextDateMS - currDateMS;
  let {years, months, days} = getIsolatedYMDFromMS(diffMS);

  let yearsStr = years > 0 ? `${years} year${years === 1 ? '' : 's'}` : ``;
  let monthsStr = months > 0 ? `${months} month${months === 1 ? '' : 's'}` : ``;
  let daysStr = days > 0 ? `${days} day${days === 1 ? '' : 's'}` : ``;
  
  return `${yearsStr}${yearsStr && (monthsStr || daysStr) ? ', ' : ''}${monthsStr}${monthsStr && daysStr ? ', ' : ''}${daysStr}`;
};

export const formatUTCMillisecsToDateStr = function(utcMs) {
  let dateStrRaw = new Date(utcMs).toDateString().slice(4);
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
  return dateStr;
};

export const formatNowToDayMonth = function(utcMs) {
  let fullDateStr = formatUTCMillisecsToDateStr(utcMs);
  let commaIdx = fullDateStr.indexOf(',');
  return fullDateStr.slice(0, commaIdx);
};

export const formatYMDToDateStr = function(year, month, day) {
  let dateStr = '';
  const monthMap = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };
  dateStr = dateStr + monthMap[month] + ' ';
  dateStr = dateStr + day + ', ' + year;
  return dateStr;
}