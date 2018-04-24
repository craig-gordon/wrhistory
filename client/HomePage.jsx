import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        Welcome to the Home Page!
        <Link to='/mm2'>Mega Man 2 World Record History</Link>
      </div>
    )
  }
}

export default HomePage;