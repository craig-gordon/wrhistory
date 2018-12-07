import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/index.css';
import Input from 'antd/lib/input';
const { TextArea } = Input;
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/index.css';
import AutoComplete from 'antd/lib/auto-complete';
import 'antd/lib/auto-complete/style/index.css';
import Tooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/index.css';

import { convertHMSMsToSecondsStr } from '../../../utils/datetimeUtils.js';

import {
  hoursOptions,
  minutesOptions,
  secondsOptions,
  createYearDropdownOptions,
  monthOptions,
  dayOptions
} from './createChartUtils.js';

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.page === 2 ? '37% 63%' : '30% 70%'};
  align-items: center;
  margin-bottom: 12px;
`;

const GameTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 86% 14%;
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
  grid-template-columns: ${props => props.page === 2 ? '84% 16%' : '82% 18%'};
`;

const IconWrapper = styled.span`
  display: grid;
  text-align: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export default class CreateChartPageUserInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: '',
      showMilliseconds: false
    }
    this.changeTimeInput = this.changeTimeInput.bind(this);
    this.toggleMilliseconds = this.toggleMilliseconds.bind(this);
  }

  changeTimeInput(type, e) {
    let stateObj = {};
    stateObj[type] = e;
    this.setState(stateObj, () => {
      if (this.state.hours !== undefined && this.state.minutes !== undefined && this.state.seconds !== undefined) {
        let totalSecondsStr = convertHMSMsToSecondsStr(this.state.hours, this.state.minutes, this.state.seconds, this.state.milliseconds)
        this.props.changeInput('recordInput', 'mark', totalSecondsStr);
      }
    });
  }

  toggleMilliseconds() {
    if (this.state.showMilliseconds) {
      this.setState({milliseconds: '', showMilliseconds: false}, () => {
        if (this.state.hours !== '' && this.state.minutes !== '' && this.state.seconds !== '') {
          let totalSecondsStr = convertHMSMsToSecondsStr(this.state.hours, this.state.minutes, this.state.seconds, this.state.milliseconds)
          this.props.changeInput('recordInput', 'mark', totalSecondsStr);
        }
      });
    } else {
      this.setState({showMilliseconds: true});
    }
  }

  render() {
    let inputForms;

    if (this.props.page === 2) {
      inputForms = (
        <div>
          <InputContainer page={this.props.page}>
            <Label>
              Game Title
            </Label>
            <GameTitleContainer>
              <AutoComplete
                value={this.props.chartInput.gameTitle}
                dataSource={this.props.allGames}
                onChange={(e) => this.props.changeInput('chartInput', 'gameTitle', e)}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />
              <Button
                title='Submit new game'
                style={{marginLeft: '10px', padding: '0'}}
                type='primary'
                onClick={this.props.showSubmitGame}
              >
                <i className="fas fa-plus" />
              </Button>
            </GameTitleContainer>
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelWithIconWrapper page={this.props.page}>
              <LabelWithIcon>
                Category
              </LabelWithIcon>
              <IconWrapper>
                <Tooltip
                  title={this.props.chartType === 'speedrun' ? `If the game's only noteworthy category is Any%, you may leave this blank` : `If the game has only one noteworthy category for scoring, you may leave this blank`}
                  mouseEnterDelay={0.3}
                >
                  <Icon className="fas fa-question-circle" />
                </Tooltip>
              </IconWrapper>
            </LabelWithIconWrapper>
            <Input
              placeholder='(Optional)'
              value={this.props.chartInput.category}
              onChange={(e) => this.props.changeInput('chartInput', 'category', e.target.value)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <Label>
              Leaderboard URL
            </Label>
            <Input
              placeholder='(Optional)'
              value={this.props.chartInput.leaderboardUrl}
              onChange={(e) => this.props.changeInput('chartInput', 'leaderboardUrl', e.target.value)}
            />
          </InputContainer>
        </div>
      );
    } else {
      inputForms = (
        <div>
          {this.props.chartType === 'speedrun'
            ? <InputContainer page={this.props.page}>
                <LabelWithIconWrapper page={this.props.page}>
                  <LabelWithIcon>
                    Time
                  </LabelWithIcon>
                  <IconWrapper>
                    <Tooltip
                      title={
                        this.state.showMilliseconds
                          ? 'Click to hide & clear milliseconds input'
                          : 'Click to show milliseconds input'
                      }
                      mouseEnterDelay={0.3}
                    >
                      <Icon
                        pointerOnHover={true}
                        className={
                          this.state.showMilliseconds
                            ? "fas fa-minus-circle"
                            : "fas fa-plus-circle"
                        }
                        onClick={this.toggleMilliseconds}
                      />
                    </Tooltip>
                  </IconWrapper>
                </LabelWithIconWrapper>
                <TimeDropdownsContainer showMilliseconds={this.state.showMilliseconds}>
                  <Select
                    value={this.state.hours}
                    onChange={(e) => this.changeTimeInput('hours', e)}
                  >
                    {hoursOptions}
                  </Select>
                  <Select
                    value={this.state.minutes}
                    onChange={(e) => this.changeTimeInput('minutes', e)}
                  >
                    {minutesOptions}
                  </Select>
                  <Select
                    value={this.state.seconds}
                    onChange={(e) => this.changeTimeInput('seconds', e)}
                  >
                    {secondsOptions}
                  </Select>
                  {
                    this.state.showMilliseconds
                      ? <Input
                          placeholder='ms'
                          addonBefore='.'
                          value={this.state.milliseconds}
                          onChange={(e) => this.changeTimeInput('milliseconds', e.target.value)}
                        />
                      : null
                  }
                </TimeDropdownsContainer>
              </InputContainer>
            : <InputContainer page={this.props.page}>
                <Label>
                  Score
                </Label>
                <Input
                  value={this.props.recordInput.mark}
                  onChange={(e) => this.props.changeInput('recordInput', 'mark', e.target.value)}
                />
              </InputContainer>}

          <InputContainer page={this.props.page}>
            <Label>
              Player
            </Label>
            <AutoComplete
              dataSource={this.props.allPlayers}
              value={this.props.recordInput.player}
              onChange={(e) => this.props.changeInput('recordInput', 'player', e)}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <Label>
              Date
            </Label>
            <DateDropdownsContainer>
              <Select
                value={this.props.recordInput.year}
                onChange={(e) => this.props.changeInput('recordInput', 'year', e)}
              >
                {createYearDropdownOptions(this.props.gameReleaseDate)}
              </Select>
              <Select
                value={this.props.recordInput.month}
                onChange={(e) => this.props.changeInput('recordInput', 'month', e)}
              >
                {monthOptions}
              </Select>
              <Select
                value={this.props.recordInput.day}         
                onChange={(e) => this.props.changeInput('recordInput', 'day', e)}
              >
                {dayOptions}
              </Select>
            </DateDropdownsContainer>
          </InputContainer>
          <InputContainer page={this.props.page}>
            <Label>
              VOD URL
            </Label>
            <Input
              placeholder='(Optional)'
              value={this.props.recordInput.vodUrl}
              onChange={(e) => this.props.changeInput('recordInput', 'vodUrl', e.target.value)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelWithIconWrapper page={this.props.page}>
              <LabelWithIcon>
                Tooltip Note
              </LabelWithIcon>
              <IconWrapper>
                <Tooltip
                  title={`Optional note that will appear in a record's Tooltip when hovering over its data point on the Chart`}
                  mouseEnterDelay={0.3}
                >
                  <Icon className="fas fa-question-circle" />
                </Tooltip>
              </IconWrapper>
            </LabelWithIconWrapper>
            <TextArea
              placeholder='(Optional)'
              rows={2}
              value={this.props.recordInput.tooltipNote}
              onChange={(e) => this.props.changeInput('recordInput', 'tooltipNote', e.target.value)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelWithIconWrapper page={this.props.page}>
              <LabelWithIcon>
                Label Text
              </LabelWithIcon>
              <IconWrapper>
                <Tooltip
                  title={`Optional reference information that will appear as a static label above the record's data point on the chart`}
                  mouseEnterDelay={0.3}
                >
                  <Icon className="fas fa-question-circle" />
                </Tooltip>
              </IconWrapper>
            </LabelWithIconWrapper>
            <TextArea
              placeholder='(Optional)'
              rows={2}
              value={this.props.recordInput.labelText}
              onChange={(e) => this.props.changeInput('recordInput', 'labelText', e.target.value)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelWithIconWrapper page={this.props.page}>
              <LabelWithIcon>
                Detailed Text
              </LabelWithIcon>
              <IconWrapper>
                <Tooltip
                  title={`Optional detailed information about the background, context, and historical information of the record and player`}
                  mouseEnterDelay={0.3}
                >
                  <Icon className="fas fa-question-circle" />
                </Tooltip>
              </IconWrapper>
            </LabelWithIconWrapper>
            <TextArea
              placeholder='(Optional)'
              rows={4}
              value={this.props.recordInput.detailedText}
              onChange={(e) => this.props.changeInput('recordInput', 'detailedText', e.target.value)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelWithIconWrapper page={this.props.page}>
              <LabelWithIcon>
                Milestone
              </LabelWithIcon>
              <IconWrapper>
                <Tooltip
                  title={`Indicates that the record in question surpassed a significant threshold, eg the first ${this.props.chartType === 'speedrun' ? 'sub-1hr time' : '1mil point score'}, and is represented on the chart as a POW symbol`}
                  mouseEnterDelay={0.3}
                >
                  <Icon className="fas fa-question-circle" />
                </Tooltip>
              </IconWrapper>
            </LabelWithIconWrapper>
            <Checkbox
              onChange={(e) => this.props.changeInput('recordInput', 'isMilestone', e.target.checked)}
            />
          </InputContainer>
        </div>
      );
    }

    return (
      <div>
        {inputForms}
        <ButtonContainer>
          <Button
            type='primary'
            size='large'
            onClick={() => {
              this.props.submitData();
              this.setState({hours: 0, minutes: 0, seconds: 0});
            }}
          >
            <span style={{marginRight: '8px'}}>
              Save + Continue
            </span>
            <i className="fas fa-arrow-circle-right"></i>
          </Button>
        </ButtonContainer>
      </div>
    );
  }
};