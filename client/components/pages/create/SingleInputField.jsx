import React from 'react';
import styled from 'styled-components';
import Input from 'antd/lib/input';
const { TextArea } = Input;
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/index.css';
import AutoComplete from 'antd/lib/auto-complete';
import 'antd/lib/auto-complete/style/index.css';
import Tooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/index.css';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/index.css';

import { createYearDropdownOptions, monthOptions, dayOptions } from './utils.js';

const GameTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 86% 14%;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.currentPage === 2 ? '37% 63%' : '30% 70%'};
  align-items: center;
  margin-bottom: 12px;
`;

const TimeDropdownsContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.showMilliseconds ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'};
  grid-column-gap: 10px;
`;

const DateDropdownsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 10px;
`;

const Label = styled.div`
  margin-right: 28px;
  font-weight: bold;
  font-size: 18px;
  justify-self: end;
  color: rgb(99, 99, 99);
`;

const Icon = styled.i`
  font-size: 14px;
  color: rgb(130, 130, 130);
  &:hover {
    cursor: ${props => props.pointerOnHover ? 'pointer' : 'auto'};
  }
`;

const LabelWithIcon = styled(Label)`
  margin-right: 0;
`;

const LabelWithIconWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.currentPage === 2 ? '84% 16%' : '82% 18%'};
`;

const IconWrapper = styled.span`
  display: grid;
  text-align: center;
  align-items: center;
`;

export const GameTitleAutocompleteWithButton = (props) => (
  <React.Fragment>
    <Label>
      Game Title
    </Label>
    <GameTitleContainer>
      <AutoComplete
        value={props.value}
        dataSource={props.dataSource}
        onChange={(e) => props.changeInput('chartInput', 'gameTitle', e)}
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
      <Button
        title='Submit new game'
        style={{marginLeft: '10px', padding: '0'}}
        type='primary'
        onClick={props.showSubmitGame}
      >
        <i className="fas fa-plus" />
      </Button>
    </GameTitleContainer>
  </React.Fragment>
);

export const PlayerAutocomplete = (props) => (
  <React.Fragment>
    <Label>
      Player
    </Label>
    <AutoComplete
      value={props.value}
      dataSource={props.dataSource}
      onChange={(e) => props.changeInput('recordInput', 'playerName', e)}
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
  </React.Fragment>
);

export const TimeInputCluster = (props) => (
  <React.Fragment>
    <LabelWithIconWrapper currentPage={props.currentPage}>
      <LabelWithIcon>
        Time
      </LabelWithIcon>
      <IconWrapper>
        <Tooltip
          title={
            props.showMilliseconds
              ? 'Click to hide & clear milliseconds input'
              : 'Click to show milliseconds input'
          }
          mouseEnterDelay={0.2}
        >
          <Icon
            pointerOnHover={true}
            className={
              props.showMilliseconds
                ? "fas fa-minus-circle"
                : "fas fa-plus-circle"
            }
            onClick={props.toggleMilliseconds}
          />
        </Tooltip>
      </IconWrapper>
    </LabelWithIconWrapper>
    <TimeDropdownsContainer showMilliseconds={props.showMilliseconds}>
      <Input
        placeholder='0'
        addonAfter={props.showMilliseconds ? 'h' : 'hours'}
        value={props.hoursValue}
        onChange={(e) => props.changeTimeInput('hours', e.target.value)}
      />
      <Input
        placeholder='0'
        addonAfter={props.showMilliseconds ? 'm' : 'min'}
        value={props.minutesValue}
        onChange={(e) => props.changeTimeInput('minutes', e.target.value)}
      />
      <Input
        placeholder='0'
        addonAfter={props.showMilliseconds ? 's' : 'sec'}
        value={props.secondsValue}
        onChange={(e) => props.changeTimeInput('seconds', e.target.value)}
      />
      {
        props.showMilliseconds
          ? <Input
              placeholder='ms'
              addonBefore='.'
              value={props.millisecondsValue}
              onChange={(e) => props.changeTimeInput('milliseconds', e.target.value)}
            />
          : null
      }
    </TimeDropdownsContainer>
  </React.Fragment>
);

export const DateDropdowns = (props) => (
  <React.Fragment>
    <Label>
      Date
    </Label>
    <DateDropdownsContainer>
      <Select
        value={props.yearValue}
        onChange={(e) => props.changeInput('recordInput', 'year', e)}
      >
        {createYearDropdownOptions(props.workingDoc ? Number(props.workingDoc.gameReleaseDate.slice(0, 4)) : 1970)}
      </Select>
      <Select
        value={props.monthValue}
        onChange={(e) => props.changeInput('recordInput', 'month', e)}
      >
        {monthOptions}
      </Select>
      <Select
        value={props.dayValue}         
        onChange={(e) => props.changeInput('recordInput', 'day', e)}
      >
        {dayOptions}
      </Select>
    </DateDropdownsContainer>
  </React.Fragment>
);

export const InputWithLabel = (props) => (
  <React.Fragment>
    <Label>
      {props.labelText}
    </Label>
    <Input
      placeholder={props.isOptional ? '(Optional)' : null}
      value={props.value}
      onChange={(e) => props.changeInput(props.chartOrRecordInput, props.inputType, e.target.value)}
    />
  </React.Fragment>
);

export const InputWithLabelAndIcon = (props) => (
  <React.Fragment>
    <LabelWithIconWrapper currentPage={props.currentPage}>
      <LabelWithIcon>
        {props.labelText}
      </LabelWithIcon>
      <IconWrapper>
        <Tooltip
          title={props.chartType === 'speedrun' ? props.speedTooltipTitle : props.scoreTooltipTitle}
          mouseEnterDelay={0.2}
        >
          <Icon className={props.iconClassName} />
        </Tooltip>
      </IconWrapper>
    </LabelWithIconWrapper>
    <Input
      placeholder={props.isOptional ? '(Optional)' : null}
      value={props.value}
      onChange={(e) => props.changeInput(props.chartOrRecordInput, props.inputType, e.target.value)}
    />
  </React.Fragment>
);

export const TextAreaWithLabelAndIcon = (props) => (
  <React.Fragment>
    <LabelWithIconWrapper currentPage={props.currentPage}>
      <LabelWithIcon>
        {props.labelText}
      </LabelWithIcon>
      <IconWrapper>
        <Tooltip
          title={props.chartType === 'speedrun' ? props.speedTooltipTitle : props.scoreTooltipTitle}
          mouseEnterDelay={0.2}
        >
          <Icon className={props.iconClassName} />
        </Tooltip>
      </IconWrapper>
    </LabelWithIconWrapper>
    <TextArea
      placeholder={props.isOptional ? '(Optional)' : null}
      rows={props.rows}
      value={props.value}
      onChange={(e) => props.changeInput(props.chartOrRecordInput, props.inputType, e.target.value)}
    />
  </React.Fragment>
);

export const CheckboxWithLabelAndIcon = (props) => (
  <React.Fragment>
    <LabelWithIconWrapper currentPage={props.currentPage}>
      <LabelWithIcon>
        {props.labelText}
      </LabelWithIcon>
      <IconWrapper>
        <Tooltip
          title={props.chartType === 'speedrun' ? props.speedTooltipTitle : props.scoreTooltipTitle}
          mouseEnterDelay={0.2}
        >
          <Icon className={props.iconClassName} />
        </Tooltip>
      </IconWrapper>
    </LabelWithIconWrapper>
    <Checkbox
      checked={props.checked}
      onChange={(e) => props.changeInput(props.chartOrRecordInput, props.inputType, e.target.checked)}
    />
  </React.Fragment>
);

export const SingleInputField = (props) => (
  <InputContainer currentPage={props.currentPage}>
    {props.render(props)}
  </InputContainer>
);