import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import '../node_modules/react-responsive-carousel/lib/styles/carousel.css';

const ChartCarousel = (props) => (
  <Carousel
    showThumbs={false}
    showStatus={false}
    showIndicators={false}
  >
    <div>
      <h1 style={{color: 'white'}}>Carousel Item 1</h1>
    </div>
    <div>
      <h1 style={{color: 'white'}}>Carousel Item 2</h1>
    </div>
    <div>
      <h1 style={{color: 'white'}}>Carousel Item 3</h1>
    </div>
  </Carousel>
);

export default ChartCarousel;