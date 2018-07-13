import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LightPurpleModule } from '../../common/styledComponents.js';
import GamePreviewButton from '../../common/GamePreviewButton.jsx';

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Module = LightPurpleModule.extend`
  margin: 20px 0;
`;

export default class RecentlyUpdatedModule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Module>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>Recently Updated Histories</h3>
        <ButtonsContainer>
          <GamePreviewButton gameCode='mm2' />
          <GamePreviewButton gameCode='sm64' />
          <GamePreviewButton gameCode='supermetroid' />
        </ButtonsContainer>
      </Module>
    );
  }
};