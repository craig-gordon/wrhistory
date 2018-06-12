import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import GamePreviewButton from '../../GamePreviewButton.jsx';

const Module = styled.div`
  margin: 1% 0;
  background: #f4e2ff;
  border-style: solid;
  border-color: #d19bef;
  border-width: 2px;
  padding: 0 2% 1% 2%;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default class RecentlyUpdatedModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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