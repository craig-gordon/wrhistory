import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import { secsToTs } from '../../functions/timeConversions.js';
import { document as dkDocument } from '../../data/dkDocument.js';
import { document as mm2Document } from '../../data/mm2document.js';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/stylesheets/classStyles.css';

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
    this.records = this.document.records;
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
          <Header>{this.records[0].player} — {secsToTs(this.records[0].time)}</Header>
          <Text>{this.records[0].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[1].player} — {secsToTs(this.records[1].time)}</Header>
          <Text>{this.records[1].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[2].player} — {secsToTs(this.records[2].time)}</Header>
          <Text>{this.records[2].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[3].player} — {secsToTs(this.records[3].time)}</Header>
          <Text>{this.records[3].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[4].player} — {secsToTs(this.records[4].time)}</Header>
          <Text>{this.records[4].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[5].player} — {secsToTs(this.records[5].time)}</Header>
          <Text>{this.records[5].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[6].player} — {secsToTs(this.records[6].time)}</Header>
          <Text>{this.records[6].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[7].player} — {secsToTs(this.records[7].time)}</Header>
          <Text>{this.records[7].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[8].player} — {secsToTs(this.records[8].time)}</Header>
          <Text>{this.records[8].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[9].player} — {secsToTs(this.records[9].time)}</Header>
          <Text>{this.records[9].detailed}</Text>
        </Slide>
        <Slide>
          <Header>{this.records[10].player} — {secsToTs(this.records[10].time)}</Header>
          <Text>{this.records[10].detailed}</Text>
        </Slide>
      </Carousel>
    )
  }
};

export default ChartCarousel;