import React from 'react';
import Chart from './chart.jsx';
// import ChartCarousel from './chartCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Hello, World Record.</div>
        <Chart />
        {/* <ChartCarousel /> */}
      </div>
    )
  }
}

export default App;