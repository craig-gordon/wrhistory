import React from 'react';
import Chart from './chart.jsx';
import ChartCarousel from './chartCarousel.jsx';
import VodEmbed from './vodEmbed.jsx';
import data from './mm2data.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedChartPoint: null,
      selectedCarouselItem: 0,
      selectedRun: null
    }
    this.changeSelectedChartPoint = this.changeSelectedChartPoint.bind(this);
  }

  changeSelectedChartPoint(e) {
    let pointIdx = typeof e === 'object' ? e.point.index : e;
    this.setState({
      clickedChartPoint: pointIdx,
      selectedCarouselItem: pointIdx,
      selectedRun: data[pointIdx]
    });
  }

  render() {
    return (
      <div>
        <div>Hello, World Record.</div>
        <Chart
          clicked={this.state.clickedChartPoint}
          changeSelectedChartPoint={this.changeSelectedChartPoint}
        />
        <div
          style={{
            'zIndex': 1000,
            'position': 'absolute',
            'top': '100px',
            'left': '1200px'
          }}
        >
          <ChartCarousel
            selected={this.state.selectedCarouselItem}
            changeSelectedChartPoint={this.changeSelectedChartPoint}
          />
        </div>
        {this.state.selectedRun ? <VodEmbed vodUrl={this.state.selectedRun.vodUrl} /> : null}
      </div>
    )
  }
}

export default App;