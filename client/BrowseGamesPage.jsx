import React from 'react';
import { Link } from 'react-router-dom';

class BrowseGamesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    let scoresType = this.props.location.pathname === '/speedruns' ? 's' : 'h';
    if (scoresType === 's') {
      return (
        <div>
          <div>Super Mario 64</div>
          <div>Super Metroid</div>
          <div>Ocarina of Time</div>
        </div>
      )
    } else {
      return (
        <div>
          <div>Donkey Kong (Arcade)</div>
          <div>Pac-Man (Arcade)</div>
          <div>Galaga (Arcade)</div>
        </div>
      )
    }
  }
}

export default BrowseGamesPage;