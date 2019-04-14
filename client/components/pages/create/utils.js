import React from 'react';
import styled from 'styled-components';

import ChangelogCard from './ChangelogCard.jsx';
import Select from 'antd/lib/select';
const Option = Select.Option;
import 'antd/lib/select/style/index.css';
import '../../../assets/stylesheets/classStyles.css';

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
  grid-template-columns: repeat(2, calc((100% / 2) - 10px));
  grid-gap: 15px;
  margin: 0 30px 4% 30px;
  background: inherit !important;
  border: #d19bef !important;
`;

// Create Changelog Slides

export const createChangelogSlides = (changelog, chartType, changePage, deleteChangelogItem) => {
  // 1 card = 1 chart / record / example entry
  // 1 slide = 2 cards
  const cards = changelog.map((card, i) => {
    if (card.changeType === 'chart') {
      return (
        <ChangelogCard
          key={i}
          chartType={chartType}
          cardType='chart'
          card={card}
          changelogIdx={i}
          obsolete={card.isPrevVersion}
          deleteChangelogItem={deleteChangelogItem}
        />
      );
    } else if (card.changeType === 'record') {
      return (
        <ChangelogCard
          key={i}
          chartType={chartType}
          cardType='record'
          card={card}
          changelogIdx={i}
          recordPage={card.recordPage}
          changePage={changePage}
          obsolete={card.isPrevVersion}
          deleteChangelogItem={deleteChangelogItem}
        />
      );
    } else {
      return (
        <ChangelogCard
          key={i}
          chartType={chartType}
          cardType='example'
          card={card}
          title={'No changes yet'}
          changelogIdx={null}
        />
      )
    }
  });

  const slides = [];

  for (let i = cards.length - 1; i >= 0; i -= 2) {
    // only 1 entry left to process
    if (i === 0) {
      slides.push(
        <Slide key={i}>
          {cards[0]}
          <ChangelogCard
            title={' '}
            chartType={chartType}
            cardType='example'
            card={{}}
            hide={true}
          />
        </Slide>
      );

    // 2 or more entries left to process
    } else {
      slides.push(
        <Slide key={i}>
          {cards[i]}
          {cards[i-1]}
        </Slide>
      );
    }
  }

  return slides;
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