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
  grid-template-columns: ${props => props.currentPage === 2 ? '37% 63%' : '30% 70%'};
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
  grid-template-columns: ${props => props.currentPage === 2 ? '84% 16%' : '82% 18%'};
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

const NextPageIcon = styled.span`
  color: ${props => props.disabled ? 'rgb(120, 140, 158)' : 'rgb(24,144,255)'};
  font-weight: bold;
  background-color: ${props => props.disabled ? 'rgb(217, 217, 217)' : 'white'};
  border-radius: 24px;
  padding: 0 5px;
`;

export default class CreateChartPageUserInputs extends React.Component {
  render() {
    let inputForms;

    if (this.props.currentPage === 2) {
      inputForms = (
        <div>
          <InputContainer currentPage={this.props.currentPage}>
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
          <InputContainer currentPage={this.props.currentPage}>
            <LabelWithIconWrapper currentPage={this.props.currentPage}>
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
          <InputContainer currentPage={this.props.currentPage}>
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
            ? <InputContainer currentPage={this.props.currentPage}>
                <LabelWithIconWrapper currentPage={this.props.currentPage}>
                  <LabelWithIcon>
                    Time
                  </LabelWithIcon>
                  <IconWrapper>
                    <Tooltip
                      title={
                        this.props.showMilliseconds
                          ? 'Click to hide & clear milliseconds input'
                          : 'Click to show milliseconds input'
                      }
                      mouseEnterDelay={0.3}
                    >
                      <Icon
                        pointerOnHover={true}
                        className={
                          this.props.showMilliseconds
                            ? "fas fa-minus-circle"
                            : "fas fa-plus-circle"
                        }
                        onClick={this.props.toggleMilliseconds}
                      />
                    </Tooltip>
                  </IconWrapper>
                </LabelWithIconWrapper>
                <TimeDropdownsContainer showMilliseconds={this.props.showMilliseconds}>
                  <Input
                    placeholder='0'
                    addonAfter={this.props.showMilliseconds ? 'h' : 'hours'}
                    value={this.props.hours}
                    onChange={(e) => this.props.changeTimeInput('hours', e.target.value)}
                  />
                  <Input
                    placeholder='0'
                    addonAfter={this.props.showMilliseconds ? 'm' : 'min'}
                    value={this.props.minutes}
                    onChange={(e) => this.props.changeTimeInput('minutes', e.target.value)}
                  />
                  <Input
                    placeholder='0'
                    addonAfter={this.props.showMilliseconds ? 's' : 'sec'}
                    value={this.props.seconds}
                    onChange={(e) => this.props.changeTimeInput('seconds', e.target.value)}
                  />
                  {
                    this.props.showMilliseconds
                      ? <Input
                          placeholder='ms'
                          addonBefore='.'
                          value={this.props.milliseconds}
                          onChange={(e) => this.props.changeTimeInput('milliseconds', e.target.value)}
                        />
                      : null
                  }
                </TimeDropdownsContainer>
              </InputContainer>
            : <InputContainer currentPage={this.props.currentPage}>
                <Label>
                  Score
                </Label>
                <Input
                  value={this.props.recordInput.mark}
                  onChange={(e) => this.props.changeInput('recordInput', 'mark', e.target.value)}
                />
              </InputContainer>}

          <InputContainer currentPage={this.props.currentPage}>
            <Label>
              Player
            </Label>
            <AutoComplete
              dataSource={this.props.allPlayers}
              value={this.props.recordInput.playerName}
              onChange={(e) => this.props.changeInput('recordInput', 'playerName', e)}
              filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            />
          </InputContainer>
          <InputContainer currentPage={this.props.currentPage}>
            <Label>
              Date
            </Label>
            <DateDropdownsContainer>
              <Select
                value={this.props.recordInput.year}
                onChange={(e) => this.props.changeInput('recordInput', 'year', e)}
              >
                {createYearDropdownOptions(this.props.gameReleaseDate ? Number(this.props.gameReleaseDate.slice(0, 4)) : 1970)}
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
          <InputContainer currentPage={this.props.currentPage}>
            <Label>
              VOD URL
            </Label>
            <Input
              placeholder='(Optional)'
              value={this.props.recordInput.vodUrl}
              onChange={(e) => this.props.changeInput('recordInput', 'vodUrl', e.target.value)}
            />
          </InputContainer>
          <InputContainer currentPage={this.props.currentPage}>
            <LabelWithIconWrapper currentPage={this.props.currentPage}>
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
          <InputContainer currentPage={this.props.currentPage}>
            <LabelWithIconWrapper currentPage={this.props.currentPage}>
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
              rows={1}
              value={this.props.recordInput.labelText}
              onChange={(e) => this.props.changeInput('recordInput', 'labelText', e.target.value)}
            />
          </InputContainer>
          <InputContainer currentPage={this.props.currentPage}>
            <LabelWithIconWrapper currentPage={this.props.currentPage}>
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
          <InputContainer currentPage={this.props.currentPage}>
            <LabelWithIconWrapper currentPage={this.props.currentPage}>
              <LabelWithIcon>
                Milestone
              </LabelWithIcon>
              <IconWrapper>
                <Tooltip
                  title={`Indicates that the record in question surpassed a significant threshold, eg the first ${this.props.chartType === 'speedrun' ? 'sub-10min time' : '1mil score'}, and is represented on the chart as a POW symbol`}
                  mouseEnterDelay={0.3}
                >
                  <Icon className="fas fa-question-circle" />
                </Tooltip>
              </IconWrapper>
            </LabelWithIconWrapper>
            <Checkbox
              checked={this.props.recordInput.isMilestone}
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

          {
            // Continue / Next Record / Jump To / Save button
            this.props.currentPage === this.props.totalPages
              ? <Button
                  className={this.props.currentPage === 2 ? 'continue-btn' : 'next-btn'}
                  disabled={this.props.isNextButtonDisabled()}
                  type='primary'
                  size='large'
                  onClick={() => {
                    this.props.submitData();
                  }}
                >
                  <span style={{marginRight: '8px'}}>
                    {this.props.currentPage === 2 ? 'Continue' : 'Next Record'}
                  </span>
                  <i style={{marginRight: this.props.currentPage === 2 ? '0' : '8px'}} className="far fa-save" />
                  {this.props.currentPage === 2
                    ? null
                    : <NextPageIcon disabled={this.props.isNextButtonDisabled()}>
                        {this.props.totalPages - 1}
                      </NextPageIcon>}
                </Button>
              : <Button
                  className={this.props.showJumpToButton ? 'jump-to-btn' : 'save-btn'}
                  type='primary'
                  size='large'
                  onClick={() => {
                    let blockPageChange = this.props.showJumpToButton ? false : true;
                    this.props.showJumpToButton ? this.props.changePage(this.props.totalPages) : this.props.submitData(blockPageChange);
                    this.props.showJumpToButton ? this.props.emptyInputFields() : this.props.toggleJumpToButton();
                  }}
                >
                  <span style={{marginRight: '8px'}}>
                    {this.props.showJumpToButton ? 'Jump to' : 'Save'}
                  </span>
                  {this.props.showJumpToButton
                    ? <i style={{marginRight: '8px'}} className={this.props.totalPages - this.props.currentPage === 1 ? "fas fa-step-forward" : "fas fa-fast-forward"} />
                    : <i className="far fa-save" />}
                  {this.props.showJumpToButton
                    ? <NextPageIcon>
                        {this.props.totalPages - 2}
                      </NextPageIcon>
                    : null}             
                </Button>
          }

          {
            // Finish button
            this.props.totalPages >= 3
              ? <Button
                  className={this.props.finished ? 'green-btn-view-chart' : 'green-btn-finish'}
                  type='primary'
                  size='large'
                  onClick={this.props.handleFinish}
                >
                  <span style={{marginRight: '8px'}}>
                    {this.props.finished ? 'View Chart Page' : 'Finish'}
                  </span>
                  {this.props.finished ? null : <i style={{marginRight: '8px'}} className="far fa-save" />}
                  <i className={this.props.finished ? 'fas fa-external-link-square-alt' : 'fas fa-check'} />
                </Button>
              : null
          }
        </ButtonContainer>
      </div>
    );
  }
};