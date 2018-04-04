import React from 'react';
import Chart from './chart.jsx';
import ChartCarousel from './chartCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Hello, World Record.</div>
        <Chart />
        <div
          style={{
            'z-index': 1000,
            'position': 'absolute',
            'top': '100px',
            'right': '100px'
          }}
        >
          <ChartCarousel />
        </div>
      </div>
    )
  }
}

export default App;