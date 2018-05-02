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
          <h1 style={{textAlign: 'center'}}>Speedruns</h1>
          <Link to='/mm2'><div>Mega Man 2</div></Link>
          <div>Super Metroid</div>
          <div>Ocarina of Time</div>
        </div>
      )
    } else {
      return (
        <div>
          <h1 style={{textAlign: 'center'}}>High Scores</h1>
          <div>Donkey Kong (Arcade)</div>
          <div>Pac-Man (Arcade)</div>
          <div>Galaga (Arcade)</div>
        </div>
      )
    }
  }
}

export default BrowseGamesPage;