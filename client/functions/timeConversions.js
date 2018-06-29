import moment from 'moment';

export const tsToSecs = (ts) => {
  let tsArr = ts.split(':');
  let secs = Number(tsArr[tsArr.length - 1]);
  let mins = Number(tsArr[tsArr.length - 2]) || 0;
  let hours = Number(tsArr[tsArr.length - 3]) || 0;
  let days = Number(tsArr[tsArr.length - 4]) || 0;
  return secs + mins * 60 + hours * 3600 + days * 86400;
};

export const secsToTs = (secs) => {
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
  return tsArr.join(':');
};

export const daysToYMD = (currDateMS, nextDateMS) => {
  let currDateMoment = moment(currDateMS);
  let nextDateMoment = moment(nextDateMS);
  let diff = moment.duration(nextDateMoment.diff(currDateMoment));

  let yearsStr = diff.years() > 0 ? `${diff.years()} year${diff.years() === 1 ? '' : 's'}` : ``;
  let monthsStr = diff.months() > 0 ? `${diff.months()} month${diff.months() === 1 ? '' : 's'}` : ``;
  let daysStr = diff.days() > 0 ? `${diff.days()} day${diff.days() === 1 ? '' : 's'}` : ``;
  
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
}