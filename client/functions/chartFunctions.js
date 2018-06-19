import { secsToTs, daysToYMDFormat } from './timeConversions.js';
import '../assets/stylesheets/classStyles.css';

export const formatTooltip = function() {
  let dateStrRaw = new Date(this.x).toDateString().slice(4);
  dateStrRaw = dateStrRaw.slice(0, 6) + ', ' + dateStrRaw.slice(7);
  dateStrRaw = dateStrRaw[4] === '0' ? dateStrRaw.slice(0, 4) + dateStrRaw.slice(5) : dateStrRaw;
  let dateStr;
  let monthMap = {
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
    }
  }
  return `
    <div>
      <div><span class='ttCategory'>Time</span> ${secsToTs(this.y / 1000)}</div>
      <div><span class='ttCategory'>Player</span> ${this.point.data.player}</div>
      <div><span class='ttCategory'>Date</span> ${dateStr}</div>
      <div><span class='ttCategory'>Duration</span> ${daysToYMDFormat(this.x, this.point.nextDate)}</div>
      ${this.point.note ? `<div><span class='ttCategory'>Note</span> ${this.point.note}</div>` : ``}
    </div>
  `;
};

export const produceChartData = function(records) {
  return records.map((record, i, records) => 
    ({
      x: Date.UTC(record.year, record.month, record.day) + utcOffsetMS,
      y: record.time * 1000,
      data: record,
      nextDate: i === records.length - 1 ? Date.now() + utcOffsetMS : Date.UTC(records[i+1].year, records[i+1].month, records[i+1].day) + utcOffsetMS,
      marker: i === records.length - 1 ? {
        symbol: 'url(assets/images/icons/1st.png)',
        height: 16,
        width: 16
      } : null
    })
  )
}