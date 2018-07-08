import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopNav from './TopNav.jsx';
import HomePage from '../pages/home/HomePage.jsx';
import AboutPage from '../pages/about/AboutPage.jsx';
import BrowseGamesPage from '../pages/browse/BrowseGamesPage.jsx';
import ArticlesPage from '../pages/articles/ArticlesPage.jsx';
import GamePage from '../pages/game/GamePage.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
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
          <Route path='/articles' component={ArticlesPage} />
          <Route path='/mm2' component={GamePage} />
          <Route path='/dk' component={GamePage} />
        </Switch>
        <Footer />
      </div>
    );
  }
};