import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import data from './mm2data.js';
import '../node_modules/react-responsive-carousel/lib/styles/carousel.css';

const ChartCarousel = (props) => (
  <Carousel
    showThumbs={false}
    showStatus={false}
    showIndicators={false}
  >
    <div>
      <h3 style={{color: 'white'}}>{data[0].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[1].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[2].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[3].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[4].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[5].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[6].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[7].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[8].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[9].detailed}</h3>
    </div>
    <div>
      <h3 style={{color: 'white'}}>{data[10].detailed}</h3>
    </div>
  </Carousel>
);

export default ChartCarousel;