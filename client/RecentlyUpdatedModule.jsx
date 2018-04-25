import React from 'react';
import { Link } from 'react-router-dom';

class RecentlyUpdatedModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h3 style={{'text-align': 'center'}}>Recently Updated Histories</h3>
        <div>Super Mario 64</div>
        <div>Super Metroid</div>
        <div>Ocarina of Time</div>
      </div>
    )
  }
}

export default RecentlyUpdatedModule;