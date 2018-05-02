import React from 'react';
import { Link } from 'react-router-dom';

class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to='/'><span>Record History </span></Link>
        <Link to='/speedruns'><span>Speedruns </span></Link>
        <Link to='/highscores'><span>High Scores </span></Link>
        <span>Search </span>
        <span>Log In </span>
        <span>Register </span>
      </div>
    )
  }
}

export default TopNav;