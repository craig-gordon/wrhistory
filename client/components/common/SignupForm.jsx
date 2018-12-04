import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const LineWrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  margin: 12px 0;
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

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedUsername: '',
      typedPassword: '',
      typedEmail: ''
    }
    this.updateTypedUsername = this.updateTypedUsername.bind(this);
    this.updateTypedPassword = this.updateTypedPassword.bind(this);
    this.updateTypedEmail = this.updateTypedEmail.bind(this);
    this.submitNewAccount = this.submitNewAccount.bind(this);
  }

  updateTypedUsername(e) {
    this.setState({typedUsername: e.target.value});
  }

  updateTypedPassword(e) {
    this.setState({typedPassword: e.target.value});
  }

  updateTypedEmail(e) {
    this.setState({typedEmail: e.target.value});
  }

  submitNewAccount(e) {
    console.log(this.state.typedUsername, this.state.typedPassword, this.state.typedEmail)
    e.preventDefault();
    // axios.post('/signup', {
    //   username: this.state.typedUsername,
    //   password: this.state.typedPassword,
    //   email: this.state.typedEmail
    // })
    //   .then(res => {
    //     this.props.history.push('/');
    //   })
    //   .catch(err => {
    //     console.log('submitNewAccount Error:', err);
    //   })
  }

  render() {
    const signupModalStyles = {
      modal: {
        height: '255px',
        width: '600px',
        padding: '30px',
        borderRadius: '8px'
      }
    };
    return (
      <Modal
        open={this.props.signupOpen}
        onClose={this.props.closeSignup}
        showCloseIcon={false}
        styles={signupModalStyles}
      >
        <h2>Sign Up</h2>
        <hr />
        <LineWrapper>
          <Label>Username</Label>
          <Input
            type='text'
            placeholder='Username'
            value={this.state.typedUsername}
            onChange={this.updateTypedUsername}
          />
        </LineWrapper>
        <LineWrapper>
          <Label>Password</Label>
          <Input
            type='password'
            placeholder='Password'
            value={this.state.typedPassword}
            onChange={this.updateTypedPassword}
          />
        </LineWrapper>
        <LineWrapper>
          <Label>Email</Label>
          <Input
            type='text'
            placeholder='you@example.com'
            value={this.state.typedEmail}
            onChange={this.updateTypedEmail}
          />
        </LineWrapper>
        <hr />
        <ButtonsPanel>
          <ButtonWrapper>
            <Button
              disabled
              type='primary'
              size='large'
              onClick={this.submitNewAccount}
            >
              Sign Up
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              type='default'
              size='large'
              onClick={this.props.closeSignup}
            >
              Cancel
            </Button>
          </ButtonWrapper>
        </ButtonsPanel>
      </Modal>
    );
  }
};