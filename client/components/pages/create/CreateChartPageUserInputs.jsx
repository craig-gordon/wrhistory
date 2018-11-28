import React from 'react';
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

import { convertHMSMsToSeconds } from '../../../utils/datetimeUtils.js';

import {
  hoursOptions,
  minutesSecondsOptions,
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

const DropdownsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Label = styled.div`
  margin-right: 28px;
  font-weight: bold;
  font-size: 18px;
  justify-self: end;
  color: rgb(99, 99, 99);
`;

const LabelWithQMark = styled(Label)`
  margin-right: 0;
`;

const LabelAndQMarkWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.page === 2 ? '84% 16%' : '82% 18%'};
`;

const QMarkWrapper = styled.span`
  display: grid;
  text-align: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

export default class CreateChartPageUserInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameList: ['Mega Man 2', 'Donkey Kong'],
      playerList: ['Richard Ureta', 'Seth Glass', 'nou1', 'cyghfer', 'shoka', 'Ellonija', 'coolkid', 'Billy Mitchell', 'Tim Sczerby', 'Steve Wiebe', 'Hank Chien', 'Wes Copeland', 'Robbie Lakeman'],
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
      milliseconds: undefined
    }
    this.changeTimeInput = this.changeTimeInput.bind(this);
  }

  changeTimeInput(type, e) {
    let stateObj = {};
    stateObj[type] = e;
    this.setState(stateObj);

    if (this.state.hours && this.state.minutes && this.state.seconds) {
      let totalSeconds = convertHMSMsToSeconds(this.state.hours, this.state.minutes, this.state.seconds, this.state.milliseconds)
      this.props.changeInput('recordInput', 'mark', totalSeconds);
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
                dataSource={this.state.gameList}
                onSelect={(e) => this.props.changeInput('chartInput', 'gameTitle', e)}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />
              <Button
                title='Submit new game'
                style={{marginLeft: '10px', padding: '0'}}
                type='primary'
                onClick={this.props.showSubmitGame}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </GameTitleContainer>
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelAndQMarkWrapper page={this.props.page}>
              <LabelWithQMark>
                Category
              </LabelWithQMark>
              <QMarkWrapper>
                <Tooltip
                  title={this.props.chartType === 'speedrun' ? `If the game's only noteworthy category is Any%, you may leave this blank` : `If the game has only one noteworthy category for scoring, you may leave this blank`}
                  mouseEnterDelay={0.3}
                >
                  <i style={{fontSize: '14px', color: 'rgb(130, 130, 130)'}} className="fas fa-question-circle"></i>
                </Tooltip>
              </QMarkWrapper>
            </LabelAndQMarkWrapper>
            <Input
              placeholder='(Optional)'
              value={this.props.chartInput.category}
              onChange={(e) => this.props.changeInput('chartInput', 'category', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <Label>
              Leaderboard URL
            </Label>
            <Input
              placeholder='(Optional)'
              value={this.props.chartInput.leaderboardUrl}
              onChange={(e) => this.props.changeInput('chartInput', 'leaderboardUrl', e)}
            />
          </InputContainer>
        </div>
      );
    } else {
      inputForms = (
        <div>
          <InputContainer page={this.props.page}>
            <Label>
              Player
            </Label>
            <AutoComplete
              dataSource={this.state.playerList}
              value={this.props.recordInput.player}
              onChange={(e) => this.props.changeInput('recordInput', 'player', e)}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          </InputContainer>

          {this.props.chartType === 'speedrun'
            ? <InputContainer page={this.props.page}>
                <Label>
                  Time
                </Label>
                <DropdownsContainer>
                  <Select
                    style={{marginRight: '10px'}}
                    placeholder='Hours'
                    onChange={(e) => this.props.changeTimeInput('hours', e)}
                  >
                    {hoursOptions}
                  </Select>
                  <Select
                    placeholder='Minutes'
                    onChange={(e) => this.props.changeTimeInput('minutes', e)}
                  >
                    {minutesSecondsOptions}
                  </Select>
                  <Select
                    style={{marginLeft: '10px'}}
                    placeholder='Seconds'
                    onChange={(e) => this.props.changeTimeInput('seconds', e)}
                  >
                    {minutesSecondsOptions}
                  </Select>
                </DropdownsContainer>
              </InputContainer>
            : <InputContainer page={this.props.page}>
                <Label>
                  Score
                </Label>
                <Input
                  value={this.props.recordInput.mark}
                  onChange={(e) => this.props.changeInput('recordInput', 'mark', e)}
                />
              </InputContainer>}

          <InputContainer page={this.props.page}>
            <Label>
              Date
            </Label>
            <DropdownsContainer>
              <Select
                style={{marginRight: '10px'}}
                placeholder='Year'
                onChange={(e) => this.props.changeInput('recordInput', 'year', e)}
              >
                {createYearDropdownOptions()}
              </Select>
              <Select
                placeholder='Month'
                onChange={(e) => this.props.changeInput('recordInput', 'month', e)}
              >
                {monthOptions}
              </Select>
              <Select
                style={{marginLeft: '10px'}}
                placeholder='Day'
                onChange={(e) => this.props.changeInput('recordInput', 'day', e)}
              >
                {dayOptions}
              </Select>
            </DropdownsContainer>
          </InputContainer>
          <InputContainer page={this.props.page}>
            <Label>
              VOD URL
            </Label>
            <Input
              placeholder='(Optional)'
              value={this.props.recordInput.vodUrl}
              onChange={(e) => this.props.changeInput('recordInput', 'vodUrl', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelAndQMarkWrapper page={this.props.page}>
              <LabelWithQMark>
                Tooltip Note
              </LabelWithQMark>
              <QMarkWrapper>
                <Tooltip
                  title={`Optional note that will appear in a record's Tooltip when hovering over its data point on the Chart`}
                  mouseEnterDelay={0.3}
                >
                  <i style={{fontSize: '14px', color: 'rgb(130, 130, 130)'}} className="fas fa-question-circle"></i>
                </Tooltip>
              </QMarkWrapper>
            </LabelAndQMarkWrapper>
            <TextArea
              placeholder='(Optional)'
              rows={2}
              value={this.props.recordInput.tooltipNote}
              onChange={(e) => this.props.changeInput('recordInput', 'tooltipNote', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelAndQMarkWrapper page={this.props.page}>
              <LabelWithQMark>
                Label Text
              </LabelWithQMark>
              <QMarkWrapper>
                <Tooltip
                  title={`Optional reference information that will appear as a static label above the record's data point on the chart`}
                  mouseEnterDelay={0.3}
                >
                  <i style={{fontSize: '14px', color: 'rgb(130, 130, 130)'}} className="fas fa-question-circle"></i>
                </Tooltip>
              </QMarkWrapper>
            </LabelAndQMarkWrapper>
            <TextArea
              placeholder='(Optional)'
              rows={2}
              value={this.props.recordInput.labelText}
              onChange={(e) => this.props.changeInput('recordInput', 'labelText', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelAndQMarkWrapper page={this.props.page}>
              <LabelWithQMark>
                Detailed Text
              </LabelWithQMark>
              <QMarkWrapper>
                <Tooltip
                  title={`Optional detailed information about the background, context, and historical information of the record and player`}
                  mouseEnterDelay={0.3}
                >
                  <i style={{fontSize: '14px', color: 'rgb(130, 130, 130)'}} className="fas fa-question-circle"></i>
                </Tooltip>
              </QMarkWrapper>
            </LabelAndQMarkWrapper>
            <TextArea
              placeholder='(Optional)'
              rows={4}
              value={this.props.recordInput.detailedText}
              onChange={(e) => this.props.changeInput('recordInput', 'detailedText', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <LabelAndQMarkWrapper page={this.props.page}>
              <LabelWithQMark>
                Milestone
              </LabelWithQMark>
              <QMarkWrapper>
                <Tooltip
                  title={`Indicates that the record in question surpassed a significant threshold, eg the first ${this.props.chartType === 'speedrun' ? 'sub-1hr time' : '1mil point score'}, and is represented on the chart as a POW symbol`}
                  mouseEnterDelay={0.3}
                >
                  <i style={{fontSize: '14px', color: 'rgb(130, 130, 130)'}} className="fas fa-question-circle"></i>
                </Tooltip>
              </QMarkWrapper>
            </LabelAndQMarkWrapper>
            <Checkbox
              onChange={(e) => this.props.changeInput('recordInput', 'isMilestone', e)}
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
            onClick={this.props.submitData}
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