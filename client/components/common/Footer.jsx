import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const About = styled.div`
  text-align: center;
  font-weight: bold;
  color: rgb(162, 162, 162);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
`;

const AboutLink = styled(Link)`
  text-decoration: none;
  color: rgb(162, 162, 162);
  &:hover {
    text-decoration: underline;
  }
`;

const BottomAbout = (props) => (
  <About>
    © 2019 · <AboutLink to='/about'>About</AboutLink>
  </About>
);

export default BottomAbout;