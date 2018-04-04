import React from 'react';
import Chart from './chart.jsx';
import ChartCarousel from './chartCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedChartPoint: null,
      selectedCarouselItem: 0
    }
    this.changeSelectedChartPoint = this.changeSelectedChartPoint.bind(this);
  }

  changeSelectedChartPoint(e) {
    this.setState({
      clickedChartPoint: e.point.index,
      selectedCarouselItem: e.point.index
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
          />
        </div>
      </div>
    )
  }
}

export default App;