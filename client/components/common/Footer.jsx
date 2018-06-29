import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const About = styled.div`
  margin: 2% 0 2% 0;
  text-align: center;
  font-weight: bold;
`

const BottomAbout = (props) => (
  <About>
    © 2018 · <Link to='/about'>About</Link>
  </About>
);

export default BottomAbout;