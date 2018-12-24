import React from 'react';

import {
  SingleInputField,
  GameTitleAutocompleteWithButton,
  InputWithLabel,
  InputWithLabelAndIcon
} from './SingleInputField.jsx';

const ChartInputGroup = (props) => (
  <div>
    <SingleInputField /* GAME TITLE */
      currentPage={props.currentPage}
      isOptional={false}
      value={props.chartInput.gameTitle}
      changeInput={props.changeInput}
      dataSource={props.allGames}
      showSubmitGame={props.showSubmitGame}
      render={props => <GameTitleAutocompleteWithButton {...props} />}
    />
    <SingleInputField /* CATEGORY */
      currentPage={props.currentPage}
      labelText='Category'
      isOptional={true}
      value={props.chartInput.category}
      chartType={props.chartType}
      chartOrRecordInput='chartInput'
      inputType='category'
      speedTooltipTitle={`If the game's only noteworthy category is Any%, you may leave this blank`}
      scoreTooltipTitle={`If the game has only one noteworthy category for scoring, you may leave this blank`}
      iconClassName='fas fa-question-circle'
      changeInput={props.changeInput}
      render={props => <InputWithLabelAndIcon {...props} />}
    />
    <SingleInputField /* LEADERBOARD URL */
      currentPage={props.currentPage}
      labelText='Leaderboard URL'
      isOptional={true}
      value={props.chartInput.leaderboardUrl}
      chartOrRecordInput='chartInput'
      inputType='leaderboardUrl'
      changeInput={props.changeInput}
      render={props => <InputWithLabel {...props} />}
    />
  </div>
);

export default ChartInputGroup;