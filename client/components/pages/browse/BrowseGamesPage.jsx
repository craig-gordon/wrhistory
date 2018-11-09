import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import GamePreviewButton from '../../common/GamePreviewButton.jsx';
import { PageHeader } from '../../common/styledComponents.js';


class BrowseGamesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    let scoresType = this.props.location.pathname === '/speedruns' ? 's' : 'h';
    if (scoresType === 's') {
      return (
        <div>
          <PageHeader>Speedruns</PageHeader>
          <GamePreviewButton gameCode='mm2' />
          <GamePreviewButton gameCode='sm64' />
          <GamePreviewButton gameCode='supermetroid' />
        </div>
      )
    } else {
      return (
        <div>
          <PageHeader>High Scores</PageHeader>
          <div>Donkey Kong</div>
          <div>Pac-Man</div>
          <div>Galaga</div>
        </div>
      )
    }
  }
}

export default BrowseGamesPage;