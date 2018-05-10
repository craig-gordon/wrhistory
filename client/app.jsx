import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopNav from './TopNav.jsx';
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import BrowseGamesPage from './BrowseGamesPage.jsx';
import Chart from './Chart.jsx';
import ChartCarousel from './ChartCarousel.jsx';
import VodEmbed from './VodEmbed.jsx';
import BottomAbout from './BottomAbout.jsx';

import data from './mm2data.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedChartPoint: null,
      selectedCarouselItem: 0,
      selectedRun: null
    };
    this.changeSelectedChartPoint = this.changeSelectedChartPoint.bind(this);
  }

  changeSelectedChartPoint(e) {
    let pointIdx = typeof e === 'object' ? e.point.index : e;
    this.setState({
      clickedChartPoint: pointIdx,
      selectedCarouselItem: pointIdx,
      selectedRun: data[pointIdx]
    });
  }

  render() {
    return (
      <div>
        <TopNav />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/speedruns' component={BrowseGamesPage} />
          <Route path='/highscores' component={BrowseGamesPage} />
          <Route path='/mm2' component={Chart} />
          <Route path='/mm2' component={ChartCarousel} />
        {/* <Chart
          clicked={this.state.clickedChartPoint}
          changeSelectedChartPoint={this.changeSelectedChartPoint}
        />
        <div
          style={{
            'zIndex': 1000,
            'position': 'absolute',
            'top': '70px',
            'left': '1200px'
          }}
        >
          <ChartCarousel
            selected={this.state.selectedCarouselItem}
            changeSelectedChartPoint={this.changeSelectedChartPoint}
          />
        </div>
        {this.state.selectedRun ? <VodEmbed vodUrl={this.state.selectedRun.vodUrl} /> : null} */}
        </Switch>
        <BottomAbout />
      </div>
    );
  }
};