import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import TopNav from './TopNav.jsx';
import HomePage from '../pages/home/HomePage.jsx';
import AboutPage from '../pages/about/AboutPage.jsx';
import BrowseGamesPage from '../pages/browse/BrowseGamesPage.jsx';
import BrowseArticlesPage from '../pages/articles/BrowseArticlesPage.jsx';
import CreateChartPage from '../pages/create/CreateChartPage.jsx';
import ArticlePage from '../pages/articles/ArticlePage.jsx';
import GamePage from '../pages/game/GamePage.jsx';
import Footer from './Footer.jsx';

const AppBody = styled.div`
  padding: 0 8%;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TopNav />
        <AppBody>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/games' component={BrowseGamesPage} />
            <Route path='/create' component={CreateChartPage} />
            <Route exact path='/articles' component={BrowseArticlesPage} />
            <Route path='/articles/:id' component={ArticlePage} />
            <Route path='/mm2' component={GamePage} />
            <Route path='/dk' component={GamePage} />
          </Switch>
        </AppBody>
        <Footer />
      </div>
    );
  }
};