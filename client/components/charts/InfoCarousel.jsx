import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { createCarouselSlides } from '../../functions/chartFunctions.js';
import { secsToTs } from '../../functions/timeConversions.js';
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
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        width={this.props.embedded ? '600px' : null}
        selectedItem={this.props.selected}
        onChange={(e) => this.props.changeSelectedChartPoint(e, this.records)}
      >
        {createCarouselSlides(this.records)}
      </Carousel>
    )
  }
};

export default InfoCarousel;