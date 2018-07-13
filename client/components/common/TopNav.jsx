import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';

const TopNavWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-style: solid;
  border-color: darkgray;
  border-width: 0 2px 2px 2px;
  background: lightgray;
`;

const SiteLink = styled(Link)`
  color: magenta;
  text-decoration: none;
  font-weight: bold;
  margin: 4% auto;
`

const StyledReactLink = styled(Link)`
  color: blue;
  text-decoration: none;
  font-weight: bold;
  margin: 4% auto;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  margin: 2% 0;
`;

const StyledLink = styled.div`
  color: blue;
  text-decoration: none;
  font-weight: bold;
  margin: 4% auto;
  &:hover {
    cursor: pointer
  }
`;

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      signupOpen: false
    };
    this.showLogin = this.showLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
    this.showSignup = this.showSignup.bind(this);
    this.closeSignup = this.closeSignup.bind(this);
  }

  showLogin() {
    this.setState({loginOpen: true});
  }

  closeLogin() {
    this.setState({loginOpen: false});
  }

  showSignup() {
    this.setState({signupOpen: true});
  }

  closeSignup() {
    this.setState({signupOpen: false});
  }

  render() {
    return (
      <div>
        <SignupForm
          signupOpen={this.state.signupOpen}
          showSignup={this.showSignup}
          closeSignup={this.closeSignup}
        />
        <LoginForm
          loginOpen={this.state.loginOpen}
          showLogin={this.showLogin}
          closeLogin={this.closeLogin}
        />
        <TopNavWrapper>
          <SiteLink to='/'>Record History</SiteLink>
          <StyledReactLink to='/speedruns'>Speedruns</StyledReactLink>
          <StyledReactLink to='/highscores'>High Scores</StyledReactLink>
          <StyledReactLink to='/articles'>Articles</StyledReactLink>
          <StyledInput type='text' placeholder='Search for Games, Users, etc...'></StyledInput>
          <StyledLink onClick={this.showSignup}>Sign Up</StyledLink>
          <StyledLink onClick={this.showLogin}>Log In</StyledLink>
        </TopNavWrapper>
      </div>
    );
  }
};