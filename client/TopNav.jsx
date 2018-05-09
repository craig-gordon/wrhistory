import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopNavWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  border-style: solid;
  border-color: darkgray;
  border-width: 0 2px 2px 2px;
  background: lightgray;
`;

const StyledLink = styled(Link)`
  color: blue;
  font-weight: bold;
  margin: 4% auto;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  margin: 2% 0;
`

class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TopNavWrapper>
        <StyledLink to='/'>Record History</StyledLink>
        <StyledLink to='/speedruns'>Speedruns</StyledLink>
        <StyledLink to='/highscores'>High Scores</StyledLink>
        <StyledInput type='text' placeholder='Search for Games, Users, etc...'></StyledInput>
        <StyledLink to='/'>Log In</StyledLink>
        <StyledLink to='/'>Register</StyledLink>
      </TopNavWrapper>
    )
  }
}

export default TopNav;