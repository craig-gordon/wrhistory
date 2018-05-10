import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.div`
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
`;

const GamePreviewButton = (props) => (
  <Button>
    <Image src={`./assets/${props.code}box.jpg`} />
  </Button>
);

export default GamePreviewButton;