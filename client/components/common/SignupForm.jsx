import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const LineWrapper = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
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
  }

  render() {
    const signupModalStyles = {
      modal: {
        height: '300px',
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
          <Input placeholder='Username' />
        </LineWrapper>
        <LineWrapper>
          <Label>Password</Label>
          <Input placeholder='Password' />
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
    );
  }
};