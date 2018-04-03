import React from 'react';
import { Carousel } from 'react-responsive-carousel';
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const ChartCarousel = (props) => (
  <Carousel showThumbs={false} showStatus={false}>
    <div>
      <div>Carousel Item 1</div>
    </div>
    <div>
      <div>Carousel Item 2</div>
    </div>
    <div>
      <div>Carousel Item 3</div>
    </div>
  </Carousel>
);

export default ChartCarousel;