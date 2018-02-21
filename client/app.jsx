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
        {/* <div id="container" style="width:1000px; height:800px"></div> */}
      </div>
    )
  }
}

export default App;