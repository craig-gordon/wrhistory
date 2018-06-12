import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import GamePreviewButton from '../../GamePreviewButton.jsx';

const Header = styled.h1`
  text-align: center;
`;

class BrowseGamesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    let scoresType = this.props.location.pathname === '/speedruns' ? 's' : 'h';
    if (scoresType === 's') {
      return (
        <div>
          <Header>Speedruns</Header>
          <GamePreviewButton gameCode='mm2' />
          <GamePreviewButton gameCode='sm64' />
          <GamePreviewButton gameCode='supermetroid' />
        </div>
      )
    } else {
      return (
        <div>
          <Header>High Scores</Header>
          <div>Donkey Kong</div>
          <div>Pac-Man</div>
          <div>Galaga</div>
        </div>
      )
    }
  }
}

export default BrowseGamesPage;