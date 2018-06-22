import React from 'react';
import styled from 'styled-components';

import Chart from '../../charts/Chart.jsx';
import ChartCarousel from '../../charts/ChartCarousel.jsx';
import VodEmbed from './VodEmbed.jsx';

const CarouselWrapper = styled.div`
  position: absolute;
  top: 120px;
  left: ${props => props.docType === 'speedrun' ? '1060px' : '300px'};
`;

export default class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedChartPoint: null,
      selectedCarouselItem: 0,
      selectedRun: null
    };
    this.gameCode = this.props.location.pathname.slice(1);
    this.changeSelectedChartPoint = this.changeSelectedChartPoint.bind(this);
  }

  changeSelectedChartPoint(e, records) {
    console.log('event fire:', e);
    let pointIdx = typeof e === 'object' ? e.point.index : e;
    this.setState({
      clickedChartPoint: pointIdx,
      selectedCarouselItem: pointIdx,
      selectedRun: records[pointIdx]
    });
  }

  render() {
    return (
      <div>
        <Chart
          gameCode={this.gameCode}
          clicked={this.state.clickedChartPoint}
          changeSelectedChartPoint={this.changeSelectedChartPoint}
        />
        <CarouselWrapper docType={this.props.location.pathname === '/mm2' ? 'speedrun' : 'highscore'}>
          <ChartCarousel
            gameCode={this.gameCode}
            selected={this.state.selectedCarouselItem}
            changeSelectedChartPoint={this.changeSelectedChartPoint}
          />
        </CarouselWrapper>
        {/* {this.state.selectedRun ? <VodEmbed vodUrl={this.state.selectedRun.vodUrl} /> : null} */}
      </div>
    )
  }
};