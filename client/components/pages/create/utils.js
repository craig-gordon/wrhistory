import React from 'react';
import styled from 'styled-components';
import Select from 'antd/lib/select';
const Option = Select.Option;
import 'antd/lib/select/style/index.css';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/index.css';
import '../../../assets/stylesheets/classStyles.css';

import { formatYMDToDateStr } from '../../../utils/datetimeUtils.js';

// No-Values Record Input State Object

export const createEmptyRecordInputObj = (doc) => ({
  playerName: '',
  mark: '',
  year: doc ? Number(doc.gameReleaseDate.slice(0, 4)) : 1970,
  month: 0,
  day: 1,
  vodUrl: '',
  isMilestone: false,
  tooltipNote: '',
  labelText: '',
  detailedText: ''
});

export const convertNullsToEmptyStrs = (record) => {
  let newRecord = {};
  for (var key in record) {
    if (record[key] === null) newRecord[key] = '';
    else newRecord[key] = record[key];
  }
  return newRecord;
};

// Change emptry string state values to null
// Convert 'mark' state value to a number

export const convertInputs = (obj) => {
  let convertToNumbers = ['mark', 'year', 'month', 'day'];
  let newObj = {};
  for (var key in obj) {
    if (convertToNumbers.includes(key)) newObj[key] = Number(obj[key]);
    else if (obj[key] === '') newObj[key] = null;
    else newObj[key] = obj[key];
  }
  return newObj;
};

// Check if hours, minutes, seconds, and milliseconds inputs are valid
// hours: integer string 0-999
// minutes: integer string 0-59
// seconds: integer string 0-59
// milliseconds: integer string 0-999

export const isTimeInputValid = (type, value) => {
  if (Number.isNaN(Number(value))) return false;
  else if (type === 'hours' && value.length === 4) return false;
  else if (type === 'minutes' && 59 < Number(value)) return false;
  else if (type === 'seconds' && 59 < Number(value)) return false;
  else if (type === 'milliseconds' && value.length === 4) return false;
  return true;
}

// Hours Options

export const hoursOptions = (function() {
  let optionsArray = [];

  for (var i = 0; i <= 99; i++) {
    optionsArray.push(
      <Option key={i} value={i}>
        {i} h
      </Option>
    );
  }

  return optionsArray;
})();


// Minutes Options

export const minutesOptions = (function() {
  let optionsArray = [];

  for (var i = 0; i <= 59; i++) {
    optionsArray.push(
      <Option key={i} value={i}>
        {i} m
      </Option>
    );
  }

  return optionsArray;
})();


// Seconds Options

export const secondsOptions = (function() {
  let optionsArray = [];

  for (var i = 0; i <= 59; i++) {
    optionsArray.push(
      <Option key={i} value={i}>
        {i} s
      </Option>
    );
  }

  return optionsArray;
})();


// Year Function

export const createYearDropdownOptions = (releaseYear) => {
  releaseYear = releaseYear || 1970;
  let currentYear = new Date().getFullYear();
  let optionsArray = [];

  for (var i = releaseYear; i <= currentYear; i++) {
    optionsArray.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  return optionsArray;
};


// Month Options

export const monthOptions = (function() {
  const monthsMap = {
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
  let optionsArray = [];

  for (var i = 0; i <= 11; i++) {
    optionsArray.push(
      <Option key={i} value={i}>
        {monthsMap[i]}
      </Option>
    );
  }

  return optionsArray;
})();


// Day Options

export const dayOptions = (function() {
  let optionsArray = [];

  for (var i = 1; i <= 31; i++) {
    optionsArray.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  return optionsArray;
})();


// All Consoles Function

export const createConsoleDropdownOptions = (allConsoles) => {
  let optionsArray = [];

  for (var i = 0; i < allConsoles.length; i++) {
    let name = allConsoles[i].name;
    let abbrev = allConsoles[i].abbrev
    optionsArray.push(
      <Option title={name} key={abbrev}>
        {abbrev}
      </Option>
    );
  }

  return optionsArray;
};


// Console Map Function

export const createConsoleMap = (allConsolesStateObj) => {
  let consoleMap = {};

  for (var name in allConsolesStateObj) {
    consoleMap[name] = allConsolesStateObj[name];
  }

  return consoleMap;
};


const Slide = styled.div`
  display: grid;
  grid-template-columns: repeat(3, calc(100% / 3));
  margin-bottom: 5%;
  background: inherit !important;
  border: #d19bef !important;
`;

const Slot = styled(Card)`
  background: inherit !important;
  border: #d19bef !important;
  text-align: start !important;
`;

const Label = styled.span`
  color: rgb(66, 66, 66);
  margin-right: 8px;
  font-weight: bold;
`;

// Create Changelog Slides

export const createChangelogSlides = (changelog) => {
  // 1 slot = 1 chart / record entry
  // 1 slide = 3 slots
  const slots = changelog.map((item, i) => {

    // create Chart info slot
    if (item.gameTitle) {
      return (
        <Slot
          key={i}
          title={`${item.gameTitle} — ${item.category}`}
          hoverable={true}
          extra={`change #${i + 1}`}
        >
          <div><Label>Leaderboard URL</Label>{item.leaderboardUrl}</div>
        </Slot>
      );

    // create Record info slot
    } else if (item.playerName) {
      return (
        <Slot
          key={i}
          title={`${item.playerName} — ${item.mark}`}
          hoverable={true}
          extra={`change #${i + 1}`}
        >
          <div><Label>Date</Label>{formatYMDToDateStr(item.year, item.month, item.day)}</div>
          <div><Label>VOD</Label>{item.vodUrl}</div>
          <div><Label>Label</Label>{item.labelText}</div>
          <div><Label>Tooltip</Label>{item.tooltipNote}</div>
          <div><Label>Detailed</Label>{item.detailedText}</div>
          <div><Label>Milestone</Label>{item.isMilestone}</div>
        </Slot>
      );

    // create initial info slot
    } else {
      return (
        <Slot
          key={i}
          title={'No changes yet'}
          hoverable={true}
          extra={`example`}
        >
          <div><Label>Date</Label>{formatYMDToDateStr(1970, 0, 1)}</div>
          <div><Label>Detailed</Label>This is an example changelog item.</div>
          <div><Label>Milestone</Label>false</div>
        </Slot>
      )
    }
  });

  const slides = [];

  for (let i = slots.length - 1; i >= 0; i -= 3) {
    // only 2 entries left to process
    if (i === 1) {
      slides.push(
        <Slide>
          {slots[1]}
          {slots[0]}
          <Slot />
        </Slide>
      );

    // only 1 entry left to process
    } else if (i === 0) {
      slides.push(
        <Slide>
          {slots[0]}
          <Slot />
          <Slot />
        </Slide>
      );

    // 3 or more entries left to process
    } else {
      slides.push(
        <Slide>
          {slots[i]}
          {slots[i-1]}
          {slots[i-2]}
        </Slide>
      );
    }
  }

  return slides;
};

// Create Sample Changelog Slides

export const createSampleChangelogSlides = (changelog) => {
  return ['', '', ''].map((elem, i) => (
    <Slide key={i}>
      <Slot
        title='coolkid — 26:37.01'
        hoverable={true}
        extra={`change #${1+i*3}`}
      >
        <div><Label>Date</Label>05/08/2018</div>
        <div><Label>VOD</Label>https://www.twitch.tv/videos/...</div>
        <div><Label>Label</Label></div>
        <div><Label>Tooltip</Label></div>
        <div><Label>Detailed</Label>After some 8500 attempts and months of dedicated grinding, ...</div>
        <div><Label>Milestone</Label>no</div>
      </Slot>
      <Slot
        title='cyghfer — 26:37.17'
        hoverable={true}
        extra={`change #${2+i*3}`}
      >
        <div><Label>Date</Label>04/04/2018</div>
        <div><Label>VOD</Label>https://www.twitch.tv/videos/...</div>
        <div><Label>Label</Label></div>
        <div><Label>Tooltip</Label></div>
        <div><Label>Detailed</Label>cyghfer finally achieved a milestone once thought to be an unattainable dream, ...</div>
        <div><Label>Milestone</Label>no</div>
      </Slot>
      <Slot
        title='cyghfer — 26:41'
        hoverable={true}
        extra={`change #${3+i*3}`}
      >
        <div><Label>Date</Label>04/04/2018</div>
        <div><Label>VOD</Label>https://www.twitch.tv/videos/...</div>
        <div><Label>Label</Label></div>
        <div><Label>Tooltip</Label></div>
        <div><Label>Detailed</Label>cyghfer finally achieved a milestone once thought to be an unattainable dream, ...</div>
        <div><Label>Milestone</Label>no</div>
      </Slot>
    </Slide>
  ))
};

// Strip game of punctuation for auto-generated abbreviations

export const autoGenerateAbbrev = (title) => {
  const charsMap = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
    j: 'j',
    k: 'k',
    l: 'l',
    m: 'm',
    n: 'n',
    o: 'o',
    p: 'p',
    q: 'q',
    r: 'r',
    s: 's',
    t: 't',
    u: 'u',
    v: 'v',
    w: 'w',
    x: 'x',
    y: 'y',
    z: 'z',
    A: 'a',
    B: 'b',
    C: 'c',
    D: 'd',
    E: 'e',
    F: 'f',
    G: 'g',
    H: 'h',
    I: 'i',
    J: 'j',
    K: 'k',
    L: 'l',
    M: 'm',
    N: 'n',
    O: 'o',
    P: 'p',
    Q: 'q',
    R: 'r',
    S: 's',
    T: 't',
    U: 'u',
    V: 'v',
    W: 'w',
    X: 'x',
    Y: 'y',
    Z: 'z',
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    ' ': '-'
  };

  let abbrev = '';
  for (var i = 0; i < title.length; i++) {
    let char = title[i];
    if (charsMap[char] !== undefined) abbrev = abbrev + (charsMap[char]);
  }
  return abbrev;
};