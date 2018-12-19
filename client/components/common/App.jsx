import React from 'react';
import { hot } from 'react-hot-loader/root';
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

const App = () => (
  <div>
    hi
    <TopNav />
    <AppBody>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/browse/games' component={BrowseGamesPage} />
        <Route path='/create' component={CreateChartPage} />
        <Route exact path='/articles' component={BrowseArticlesPage} />
        <Route path='/articles/:id' component={ArticlePage} />
        <Route exact path='/game/:code' component={GamePage} />
        <Route exact path='/game/:code/:category' component={GamePage} />
      </Switch>
    </AppBody>
    <Footer />
  </div>
);

export default hot(App);