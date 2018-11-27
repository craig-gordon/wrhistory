import React from 'react';
import Select from 'antd/lib/select';
const Option = Select.Option;
import 'antd/lib/select/style/index.css';

// Hours Options

export const hoursOptions = (function() {
  let optionsArray = [];

  for (var i = 0; i <= 500; i++) {
    optionsArray.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  return optionsArray;
})();


// Minutes & Seconds Options

export const minutesSecondsOptions = (function() {
  let optionsArray = [];

  for (var i = 0; i <= 59; i++) {
    optionsArray.push(
      <Option key={i} value={i}>
        {i}
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