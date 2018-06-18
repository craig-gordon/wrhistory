import { secsToTs } from './timeConversions.js';

export const tooltipFormatter = function() {
  return `
    <div>
      <div>Time: ${secsToTs(this.y / 1000)}</div><br/>
      <div>Player: ${this.point.data.player}</div><br/>
      <div>Date: ${(new Date(this.x)).toDateString().slice(4)}</div><br/>
      <div>Duration as WR: ${Math.floor((this.point.nextDate - this.x) / 86400000)} Days</div><br/>
      ${this.point.note ? '<div>Note: ' + this.point.note + '</div><br/>' : ''}
    </div>
  `;
};