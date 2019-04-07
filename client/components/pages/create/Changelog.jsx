import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { createChangelogSlides, createSampleChangelogSlides } from './utils.js';
import '../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../assets/stylesheets/classStyles.css';

const Changelog = (props) => (
  <Carousel
    dynamicHeight={true}
    showIndicators={true}
    showThumbs={false}
    showStatus={false}
    selectedItem={props.selected}
  >
    {createChangelogSlides(props.changelog)}
  </Carousel>
);

export default Changelog;