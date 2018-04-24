import React from 'react';
import { Link } from 'react-router-dom';

import IntroModule from './IntroModule.jsx';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>Record History</h1>
        <IntroModule />
        <Link to='/mm2'>Mega Man 2 World Record History</Link>
      </div>
    )
  }
}

export default HomePage;