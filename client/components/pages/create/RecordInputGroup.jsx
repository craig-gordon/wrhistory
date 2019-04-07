import React from 'react';

import {
  SingleInputField,
  PlayerAutocomplete,
  TimeInputCluster,
  DateDropdowns,
  InputWithLabel,
  InputWithLabelAndIcon,
  TextAreaWithLabelAndIcon,
  CheckboxWithLabelAndIcon
} from './SingleInputField.jsx';

const RecordInputGroup = (props) => (
  <div>
    {props.chartType === 'speedrun'
      ? <SingleInputField /* TIME */
          currentPage={props.currentPage}
          isOptional={false}
          hoursValue={props.hours}
          minutesValue={props.minutes}
          secondsValue={props.seconds}
          millisecondsValue={props.milliseconds}
          showMilliseconds={props.showMilliseconds}
          toggleMilliseconds={props.toggleMilliseconds}
          changeTimeInput={props.changeTimeInput}
          changeInput={props.changeInput}
          render={props => <TimeInputCluster {...props} />}
        />
      : <SingleInputField /* SCORE */
          currentPage={props.currentPage}
          labelText='Score'
          isOptional={false}
          value={props.recordInput.mark}
          chartOrRecordInput='recordInput'
          inputType='mark'
          changeInput={props.changeInput}
          render={props => <InputWithLabel {...props} />}
        />
      }

    <SingleInputField /* PLAYER NAME */
      currentPage={props.currentPage}
      isOptional={false}
      value={props.recordInput.playerName}
      changeInput={props.changeInput}
      dataSource={props.allPlayers}
      render={props => <PlayerAutocomplete {...props} />}
    />
    <SingleInputField /* DATE */
      currentPage={props.currentPage}
      isOptional={false}
      yearValue={props.recordInput.year}
      monthValue={props.recordInput.month}
      dayValue={props.recordInput.day}
      workingDoc={props.workingDoc}
      changeInput={props.changeInput}
      render={props => <DateDropdowns {...props} />} 
    />
    <SingleInputField /* VOD URL */
      currentPage={props.currentPage}
      labelText='VOD URL'
      isOptional={true}
      value={props.recordInput.vodUrl}
      chartOrRecordInput='recordInput'
      inputType='vodUrl'
      changeInput={props.changeInput}
      render={props => <InputWithLabel {...props} />}         
    />
    <SingleInputField /* LABEL TEXT */
      currentPage={props.currentPage}
      labelText='Label Text'
      isOptional={true}
      value={props.recordInput.labelText}
      chartOrRecordInput='recordInput'
      inputType='labelText'
      speedTooltipTitle={`Optional reference information that will appear as a static label above the record's data point on the chart`}
      scoreTooltipTitle={`Optional reference information that will appear as a static label above the record's data point on the chart`}
      iconClassName='fas fa-question-circle'
      changeInput={props.changeInput}
      render={props => <InputWithLabelAndIcon {...props} />}  
    />
    <SingleInputField /* TOOLTIP NOTE */
      currentPage={props.currentPage}
      labelText='Tooltip Note'
      isOptional={true}
      value={props.recordInput.tooltipNote}
      chartOrRecordInput='recordInput'
      inputType='tooltipNote'
      speedTooltipTitle={`Optional note that will appear in a record's Tooltip when hovering over its data point on the Chart`}
      scoreTooltipTitle={`Optional note that will appear in a record's Tooltip when hovering over its data point on the Chart`}
      iconClassName='fas fa-question-circle'
      changeInput={props.changeInput}
      rows={2}
      render={props => <TextAreaWithLabelAndIcon {...props} />}  
    />
    <SingleInputField /* DETAILED DESCRIPTION */
      currentPage={props.currentPage}
      labelText='Detailed Text'
      isOptional={true}
      value={props.recordInput.detailedText}
      chartOrRecordInput='recordInput'
      inputType='detailedText'
      speedTooltipTitle={`Optional detailed information about the background, context, and historical information of the record and player`}
      scoreTooltipTitle={`Optional detailed information about the background, context, and historical information of the record and player`}
      iconClassName='fas fa-question-circle'
      changeInput={props.changeInput}
      rows={8}
      render={props => <TextAreaWithLabelAndIcon {...props} />}              
    />
    <SingleInputField /* MILESTONE */
      currentPage={props.currentPage}
      labelText='Milestone'
      checked={props.recordInput.isMilestone}
      chartOrRecordInput='recordInput'
      inputType='isMilestone'
      speedTooltipTitle={`Indicates that the record in question surpassed a significant threshold, e.g. the first sub-10 minute time, and is represented on the chart as a POW symbol`}
      scoreTooltipTitle={`Indicates that the record in question surpassed a significant threshold, e.g. the first 1 million point score, and is represented on the chart as a POW symbol`}
      iconClassName='fas fa-question-circle'
      changeInput={props.changeInput}
      render={props => <CheckboxWithLabelAndIcon {...props} />}              
    />
  </div>
);

export default RecordInputGroup;