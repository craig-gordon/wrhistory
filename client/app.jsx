import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopNav from './TopNav.jsx';
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import BrowseGamesPage from './BrowseGamesPage.jsx';
import GamePage from './GamePage.jsx';
import BottomAbout from './BottomAbout.jsx';

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
          <Route path='/mm2' component={GamePage} />
        </Switch>
        <BottomAbout />
      </div>
    );
  }
};