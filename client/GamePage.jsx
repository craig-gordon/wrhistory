import React from 'react';
import styled from 'styled-components';

import Chart from './Chart.jsx';
import ChartCarousel from './ChartCarousel.jsx';
import VodEmbed from './VodEmbed.jsx';

const CarouselWrapper = styled.div`
  position: absolute;
  top: 120px;
  left: 1060px;
`;

export default class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedChartPoint: null,
      selectedCarouselItem: 0,
      selectedRun: null
    };
    this.changeSelectedChartPoint = this.changeSelectedChartPoint.bind(this);
  }

  changeSelectedChartPoint(e) {
    console.log('event fire:', e);
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
        <Chart
          clicked={this.state.clickedChartPoint}
          changeSelectedChartPoint={this.changeSelectedChartPoint}
        />
        <CarouselWrapper>
          <ChartCarousel
            selected={this.state.selectedCarouselItem}
            changeSelectedChartPoint={this.changeSelectedChartPoint}
          />
        </CarouselWrapper>
        {/* {this.state.selectedRun ? <VodEmbed vodUrl={this.state.selectedRun.vodUrl} /> : null} */}
      </div>
    )
  }
};