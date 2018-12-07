import React from 'react';
import Select from 'antd/lib/select';
const Option = Select.Option;
import 'antd/lib/select/style/index.css';

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
      <Option key={i - releaseYear} value={i}>
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