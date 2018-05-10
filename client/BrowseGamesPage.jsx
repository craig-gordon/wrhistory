import React from 'react';
import { Link } from 'react-router-dom';

import GamePreviewButton from './GamePreviewButton.jsx';

class BrowseGamesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    let scoresType = this.props.location.pathname === '/speedruns' ? 's' : 'h';
    if (scoresType === 's') {
      return (
        <div>
          <h1 style={{textAlign: 'center'}}>Speedruns</h1>
          <GamePreviewButton code='mm2' />
          <GamePreviewButton code='sm64' />
          <GamePreviewButton code='supermetroid' />
        </div>
      )
    } else {
      return (
        <div>
          <h1 style={{textAlign: 'center'}}>High Scores</h1>
          <div>Donkey Kong</div>
          <div>Pac-Man</div>
          <div>Galaga</div>
        </div>
      )
    }
  }
}

export default BrowseGamesPage;