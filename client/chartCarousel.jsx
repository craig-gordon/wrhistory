import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import { secsToTs } from './timeConversions.js';
import { document as dkDocument } from './dkDocument.js';
import { document as mm2Document } from './mm2document.js';
import '../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import './assets/stylesheets/classStyles.css';

const Slide = styled.div`
  margin: 0 7%;
`;

const Header = styled.h2`
  color: white;
`;

const Text = styled.h4`
  color: white;
`;

const documents = {dkDocument, mm2Document};

class ChartCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.gameCode = this.props.gameCode || 'mm2';
    this.document = documents[`${this.gameCode}Document`];
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
          <Header>{this.document.data[0].player} — {secsToTs(this.document.data[0].time)}</Header>
          <Text>{this.document.data[0].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[1].player} — {secsToTs(this.document.data[1].time)}</Header>
          <Text>{this.document.data[1].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[2].player} — {secsToTs(this.document.data[2].time)}</Header>
          <Text>{this.document.data[2].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[3].player} — {secsToTs(this.document.data[3].time)}</Header>
          <Text>{this.document.data[3].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[4].player} — {secsToTs(this.document.data[4].time)}</Header>
          <Text>{this.document.data[4].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[5].player} — {secsToTs(this.document.data[5].time)}</Header>
          <Text>{this.document.data[5].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[6].player} — {secsToTs(this.document.data[6].time)}</Header>
          <Text>{this.document.data[6].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[7].player} — {secsToTs(this.document.data[7].time)}</Header>
          <Text>{this.document.data[7].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[8].player} — {secsToTs(this.document.data[8].time)}</Header>
          <Text>{this.document.data[8].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[9].player} — {secsToTs(this.document.data[9].time)}</Header>
          <Text>{this.document.data[9].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.document.data[10].player} — {secsToTs(this.document.data[10].time)}</Header>
          <Text>{this.document.data[10].detailed}</Text>
        </Slide>
      </Carousel>
    )
  }
};

export default ChartCarousel;