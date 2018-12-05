import React from 'react';
import $ from 'jquery';
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
  margin-bottom: 10px;
  height: 44px;
`;

const LinksWrapper = styled.div`
  display: grid;
  grid-template-columns: 25% 60% 15%;
  align-content: center;
  height: 44px;
`;

const ContentGroup = styled.div`
  display: grid;
  grid-template-columns: 50% 25% 25%;
  align-content: center;
  justify-items: start;
`;

const AuthGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  justify-items: end;
`;

const SiteLink = styled(Link)`
  color: magenta;
  text-decoration: none;
  font-weight: bold;
`;

const RouterLink = styled(Link)`
  color: blue;
  text-decoration: none;
  font-weight: bold;
`;

const SearchBar = styled(Input)`
  margin: 2% 0;
`;

const AuthLink = styled.div`
  color: blue;
  text-decoration: none;
  font-weight: bold;
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

  componentDidMount() {
    $(".search").children("input").css("border-radius", "16px");
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
            <SiteLink to='/'>RECORD HISTORY</SiteLink>
            <RouterLink to='/browse/games'>Games</RouterLink>
            <RouterLink to='/create'>Create</RouterLink>
            {/* <RouterLink to='/articles'>Articles</RouterLink> */}
          </ContentGroup>
          <SearchBar
            className='search'
            type='text'
            prefix={<i className="fas fa-search"></i>}
            placeholder='Site-wide search coming in the future'
            disabled
          />
          <AuthGroup>
            <AuthLink onClick={this.showSignup}>Sign Up</AuthLink>
            <AuthLink onClick={this.showLogin}>Log In</AuthLink>
          </AuthGroup>
        </LinksWrapper>
      </TopNavWrapper>
    );
  }
};