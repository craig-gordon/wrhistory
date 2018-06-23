import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';

import { generateCarouselSlides } from '../../functions/chartFunctions.js';
import { secsToTs } from '../../functions/timeConversions.js';
import { document as dkDocument } from '../../data/dkDocument.js';
import { document as mm2Document } from '../../data/mm2document.js';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/stylesheets/classStyles.css';

const documents = {dkDocument, mm2Document};

class ChartCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.document = documents[`${this.props.gameCode}Document`];
    this.records = this.document.records;
  }

  render() {
    return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        width='600px'
        selectedItem={this.props.selected}
        onChange={(e) => this.props.changeSelectedChartPoint(e, this.records)}
      >
        {generateCarouselSlides(this.records)}
      </Carousel>
    )
  }
};

export default ChartCarousel;