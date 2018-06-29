import React from 'react';
import { Link } from 'react-router-dom';

import { LightBlueModule } from '../../common/styledComponents.js';
import { formatNowToDayMonth } from '../../../utils/datetimeUtils.js';
import { createOnThisDayHTML } from './homePageUtils.js';

import { document as dkDocument } from '../../../data/dkDocument.js';
import { document as mm2Document } from '../../../data/mm2Document.js';

const documents = { dkDocument, mm2Document };

const findCurrentDateEvents = (docs) => {
  let now = new Date(Date.now());
  let currentDay = now.getDate();
  let currentMonth = now.getMonth();
  let events = [];
  for (var doc in docs) {
    docs[doc].records.forEach((record) => {
      if (record.day === currentDay && record.month === currentMonth) {
        events.push(record);
      }
    });
  }
  return events;
}

export default class OnThisDayModule extends React.Component {
  constructor(props) {
    super(props);
    this.currentDateEvents = findCurrentDateEvents(documents);
  }

  render() {
    return (
      <LightBlueModule>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>On this day...</h3>
        <h4>{formatNowToDayMonth(Date.now())}:</h4>
        {createOnThisDayHTML(this.currentDateEvents)}
      </LightBlueModule>
    );
  }
};