import React from 'react';
import styled from 'styled-components';
import path from 'path';

import { LightBlueModule } from '../../common/styledComponents.js';

const GameCover = styled.img`
  height: 7%;
  width: 7%;
`;

const GamePageHeader = (props) => (
  <div>
    <h3>{props.document.title}</h3>
    <GameCover src={`../../../assets/images/covers/${props.gameCode}.jpg`} />
  </div>
);

export default GamePageHeader;