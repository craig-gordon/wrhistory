import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { createCarouselSlides } from './chartUtils.js';
import { secsToTs } from '../../utils/datetimeUtils.js';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/stylesheets/classStyles.css';

class InfoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.records = this.props.document.records;
  }

  render() {
    return (
      <Carousel
        dynamicHeight={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        selectedItem={this.props.selected}
        onChange={e => this.props.changeSelectedChartPoint(e, this.records)}
      >
        {createCarouselSlides(this.records)}
      </Carousel>
    );
  }
}

export default InfoCarousel;
