import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

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

const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
  font-weight: bold;
  margin: 4% auto;
`;

const StyledInput = styled.input`
  border-radius: 4px;
  margin: 2% 0;
`;

const StyledText = styled.div`
  color: blue;
  text-decoration: none;
  font-weight: bold;
  margin: 4% auto;
`;

const LineWrapper = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  align-items: center;
  margin: 15px 0;
`;

const Label = styled.div`
  font-weight: bold;
  justify-self: right;
  padding-right: 15px;
`;

const ButtonsPanel = styled.div`
  display: inline;
  margin: 15px 0;
  float: right;
`;

const ButtonWrapper = styled.span`
  margin-left: 15px;
`;

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFormOpen: false,
      registerFormOpen: false
    };
    this.showLoginForm = this.showLoginForm.bind(this);
    this.closeLoginForm = this.closeLoginForm.bind(this);
  }

  showLoginForm() {
    this.setState({loginFormOpen: true});
  }

  closeLoginForm() {
    this.setState({loginFormOpen: false});
  }

  render() {
    const registerModalStyles = {
      modal: {
        height: '270px',
        width: '600px',
        padding: '30px',
        borderRadius: '8px'
      }
    };
    return (
      <div>
        <Modal
          open={this.state.loginFormOpen}
          onClose={this.closeLoginForm}
          showCloseIcon={false}
          styles={registerModalStyles}
        >
          <h2>Register</h2>
          <hr />
          <LineWrapper>
            <Label>Username</Label>
            <Input placeholder='Username' />
          </LineWrapper>
          <LineWrapper>
            <Label>Email</Label>
            <Input placeholder='you@example.com' />
          </LineWrapper>
          <LineWrapper>
            <Label>Confirm Email</Label>
            <Input placeholder='you@example.com' />
          </LineWrapper>
          <hr />
          <ButtonsPanel>
            <ButtonWrapper>
              <Button type='primary' size='large'>Sign Up</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button type='default' size='large'>Cancel</Button>
            </ButtonWrapper>
          </ButtonsPanel>
        </Modal>
        <TopNavWrapper>
          <SiteLink to='/'>Record History</SiteLink>
          <StyledLink to='/speedruns'>Speedruns</StyledLink>
          <StyledLink to='/highscores'>High Scores</StyledLink>
          <StyledLink to='/articles'>Articles</StyledLink>
          <StyledInput type='text' placeholder='Search for Games, Users, etc...'></StyledInput>
          <StyledText onClick={this.showLoginForm}>Register</StyledText>
          <StyledText>Log In</StyledText>
        </TopNavWrapper>
      </div>
    );
  }
};