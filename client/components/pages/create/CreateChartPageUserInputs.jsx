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
  grid-template-columns: ${props => props.page === 2 ? '35% 65%' : '27% 73%'};
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

const StyledLabel = styled.div`
  margin-right: 20px;
  font-weight: bold;
  font-size: 18px;
  justify-self: end;
  color: rgb(99, 99, 99);
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
            <StyledLabel>
              Game Title
            </StyledLabel>
            <GameTitleContainer>
              <AutoComplete
                dataSource={this.state.gameList}
                onSelect={(e) => this.props.changeInput('chartInput', 'gameTitle', e)}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />
              <Tooltip
                title='Submit new game'
                placement='topRight'
                mouseEnterDelay={0.5}
              >
                <Button
                  style={{marginLeft: '10px', padding: '0'}}
                  type='primary'
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </Tooltip>
            </GameTitleContainer>
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Category
            </StyledLabel>
            <Input
              value={this.props.chartInput.category}
              onChange={(e) => this.props.changeInput('chartInput', 'category', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Leaderboard URL
            </StyledLabel>
            <Input
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
            <StyledLabel>
              Player
            </StyledLabel>
            <AutoComplete
              dataSource={this.state.playerList}
              value={this.props.recordInput.player}
              onChange={(e) => this.props.changeInput('recordInput', 'player', e)}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          </InputContainer>
          {this.props.chartType === 'speedrun'
            ? <InputContainer page={this.props.page}>
                <StyledLabel>
                  Time
                </StyledLabel>
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
                <StyledLabel>
                  Score
                </StyledLabel>
                <Input
                  value={this.props.recordInput.mark}
                  onChange={(e) => this.props.changeInput('recordInput', 'mark', e)}
                />
              </InputContainer>}
          {/* <InputContainer page={this.props.page}>
            <StyledLabel>
              Console
            </StyledLabel>
            <Input
              value={this.props.recordInput.console}
              onChange={(e) => this.props.changeInput('recordInput', 'console', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Platform
            </StyledLabel>
            <Input
              value={this.props.recordInput.platform}
              onChange={(e) => this.props.changeInput('recordInput', 'platform', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Version
            </StyledLabel>
            <Input
              value={this.props.recordInput.version}
              onChange={(e) => this.props.changeInput('recordInput', 'version', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Region
            </StyledLabel>
            <Input
              value={this.props.recordInput.region}
              onChange={(e) => this.props.changeInput('recordInput', 'region', e)}
            />
          </InputContainer> */}
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Date
            </StyledLabel>
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
            <StyledLabel>
              VOD URL
            </StyledLabel>
            <Input
              value={this.props.recordInput.vodUrl}
              onChange={(e) => this.props.changeInput('recordInput', 'vodUrl', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Tooltip Note
            </StyledLabel>
            <TextArea
              rows={2}
              value={this.props.recordInput.tooltipNote}
              onChange={(e) => this.props.changeInput('recordInput', 'tooltipNote', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Label Text
            </StyledLabel>
            <TextArea
              rows={2}
              value={this.props.recordInput.labelText}
              onChange={(e) => this.props.changeInput('recordInput', 'labelText', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Detailed Text
            </StyledLabel>
            <TextArea
              rows={4}
              value={this.props.recordInput.detailedText}
              onChange={(e) => this.props.changeInput('recordInput', 'detailedText', e)}
            />
          </InputContainer>
          <InputContainer page={this.props.page}>
            <StyledLabel>
              Milestone
            </StyledLabel>
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
            Save & Continue
          </Button>
        </ButtonContainer>
      </div>
    );
  }
};