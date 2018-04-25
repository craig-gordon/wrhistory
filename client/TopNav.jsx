import React from 'react';
import { Link } from 'react-router-dom';

class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>Speedruns </span>
        <span>High Scores </span>
        <span>More </span>
      </div>
    )
  }
}

export default TopNav;