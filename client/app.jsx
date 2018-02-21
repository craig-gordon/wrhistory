import React from 'react';
import Chart from './chart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Hello, World Record.</div>
        <Chart />
      </div>
    )
  }
}

export default App;