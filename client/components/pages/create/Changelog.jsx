import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { createChangelogSlides } from './utils.js';
import '../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../assets/stylesheets/classStyles.css';

class Changelog extends React.PureComponent {
  render() {
    return (
      <Carousel
        dynamicHeight={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
      >
        {createChangelogSlides(this.props.changelog, this.props.chartType, this.props.changePage)}
      </Carousel>
    );
  }
};

export default Changelog;