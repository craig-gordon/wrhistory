import React from 'react';

import { BlueBox } from '../../common/styledComps.js';
import { formatNowToDayMonth } from '../../../utils/datetimeUtils.js';
import { createOnThisDayHTML, findCurrentDateEvents } from './homePageUtils.js';

const OnThisDayModule = (props) => (
  <BlueBox>
    <h3 style={{textAlign: 'center', fontSize: '1.25em', marginBottom: '2px'}}>On This Day</h3>
    <h4 style={{textAlign: 'center', color: 'rgb(95, 95, 95)'}}>{formatNowToDayMonth(Date.now())}</h4>
    {createOnThisDayHTML(findCurrentDateEvents())}
  </BlueBox>
);

export default OnThisDayModule;