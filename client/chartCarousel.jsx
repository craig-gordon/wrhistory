import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import data from './mm2data.js';
import '../node_modules/react-responsive-carousel/lib/styles/carousel.css';

class ChartCarousel extends React.Component {
  constructor(props) {
    super(props);
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
        <div>
          <h4 style={{color: 'white'}}>{data[0].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[1].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[2].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[3].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[4].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[5].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[6].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[7].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[8].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[9].detailed}</h4>
        </div>
        <div>
          <h4 style={{color: 'white'}}>{data[10].detailed}</h4>
        </div>
      </Carousel>
    )
  }
};

export default ChartCarousel;