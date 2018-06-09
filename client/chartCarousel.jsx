import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import { secsToTs } from './timeConversions.js';
import data from './mm2data.js';
import '../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import './assets/classStyles.css';

const Slide = styled.div`
  border-color: white;
  border-width: 3px;
`;

const Header = styled.h2`
  color: white;
`;

const Text = styled.h4`
  color: white;
`;

class ChartCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        width='50%'
        selectedItem={this.props.selected}
        onChange={this.props.changeSelectedChartPoint}
      >
        <Slide>
          <Header>{data[0].player} — {secsToTs(data[0].time)}</Header>
          <Text>{data[0].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[1].player} — {secsToTs(data[1].time)}</Header>
          <Text>{data[1].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[2].player} — {secsToTs(data[2].time)}</Header>
          <Text>{data[2].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[3].player} — {secsToTs(data[3].time)}</Header>
          <Text>{data[3].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[4].player} — {secsToTs(data[4].time)}</Header>
          <Text>{data[4].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[5].player} — {secsToTs(data[5].time)}</Header>
          <Text>{data[5].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[6].player} — {secsToTs(data[6].time)}</Header>
          <Text>{data[6].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[7].player} — {secsToTs(data[7].time)}</Header>
          <Text>{data[7].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[8].player} — {secsToTs(data[8].time)}</Header>
          <Text>{data[8].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[9].player} — {secsToTs(data[9].time)}</Header>
          <Text>{data[9].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{data[10].player} — {secsToTs(data[10].time)}</Header>
          <Text>{data[10].detailed}</Text>
        </Slide>
      </Carousel>
    )
  }
};

export default ChartCarousel;