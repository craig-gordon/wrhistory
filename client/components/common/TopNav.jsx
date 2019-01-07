import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';

import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';

const TopNavWrapper = styled.div`
  display: grid;
  align-content: center;
  padding: 0 8%;
  background: lightgray;
  border-style: solid;
  border-color: darkgray;
  border-width: 0 0 2px 0;
  margin-bottom: 20px;
  height: 44px;
  @media screen and (max-width: 600px) {
    height: 38px;
    padding: 0 4%;
  }
`;

const LinksWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: center;
`;

const ContentGroup = styled.div`
  display: flex;
  align-items: center;
`;

const AuthGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const RouterLink = styled(Link)`
  color: rgb(82, 82, 82);
  text-decoration: none;
  font-weight: bold;
  margin-right: 3em;
  @media screen and (max-width: 600px) {
    font-size: 10px;
    margin-right: 2em;
  }
`;

const SearchBar = styled(Input)`
`;

const AuthLink = styled.div`
  color: rgb(82, 82, 82);
  text-decoration: none;
  font-weight: bold;
  margin-left: 3em;
  &:hover {
    cursor: pointer
  }
  @media screen and (max-width: 600px) {
    font-size: 10px;
    margin-left: 2em;
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
      <TopNavWrapper>
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
        <LinksWrapper>
          <ContentGroup>
            <RouterLink to='/'>RECORD HISTORY</RouterLink>
            <RouterLink to='/browse/games'>Games</RouterLink>
            <RouterLink to='/create'>Create</RouterLink>
          </ContentGroup>
          <SearchBar
            className='search'
            type='text'
            prefix={<i className="fas fa-search"></i>}
            placeholder='Site-wide search coming in the future'
            disabled
          />
          <AuthGroup>
            <AuthLink onClick={this.showSignup}>Signup</AuthLink>
            <AuthLink onClick={this.showLogin}>Login</AuthLink>
          </AuthGroup>
        </LinksWrapper>
      </TopNavWrapper>
    );
  }
};