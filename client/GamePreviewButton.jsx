import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.div`
  margin: 0 5%;
  background: #e4b8ff;
  border-style: solid;
  border-color: #c26cf7;
  border-width: 2px;
  border-radius: 5px;
  padding: 3%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const GamePreviewButton = (props) => (
  <Link to={props.gameCode === 'mm2' ? '/mm2' : (props.gameCode === 'dk' ? '/dk' : '/')}>
    <Button>
      <Image src={`./assets/images/covers/${props.gameCode}.jpg`} />
    </Button>
  </Link>
);

export default GamePreviewButton;