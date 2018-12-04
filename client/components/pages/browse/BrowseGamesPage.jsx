import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

// import GamePreviewButton from '../../common/GamePreviewButton.jsx';
import StandardButton from '../../common/StandardButton.jsx';
import { PageHeader } from '../../common/styledComponents.js';

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;

class BrowseGamesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <PageHeader>Games</PageHeader>
        <ButtonsContainer>
          <StandardButton
            text='Donkey Kong'
            iconClasses='fas fa-trophy'
            iconSide='left'
          />
          <StandardButton
            text='Pac-Man'
            iconClasses='fas fa-trophy'
            iconSide='left'
          />
          <StandardButton
            text='Galaga'
            iconClasses='fas fa-trophy'
            iconSide='left'
          />
          <StandardButton
            text='Mega Man 2'
            iconClasses='fas fa-stopwatch'
            iconSide='left'
          />
          <StandardButton
            text='The Legend of Zelda: Ocarina of Time'
            iconClasses='fas fa-stopwatch'
            iconSide='left'
          />
          <StandardButton
            text='Super Mario Bros.'
            iconClasses='fas fa-stopwatch'
            iconSide='left'
          />
          <StandardButton
            text='Battle Garegga'
            iconClasses='fas fa-trophy'
            iconSide='left'
          />
        </ButtonsContainer>
      </div>
    )
  }
}

export default BrowseGamesPage;