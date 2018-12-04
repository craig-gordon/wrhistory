import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const LineWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 82%;
  align-items: center;
  margin: 20px 0;
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

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loginModalStyles = {
      modal: {
        height: '235px',
        width: '600px',
        padding: '30px',
        borderRadius: '8px'
      }
    };
    return (
      <Modal
        open={this.props.loginOpen}
        onClose={this.props.closeLogin}
        showCloseIcon={false}
        styles={loginModalStyles}
      >
        <h2>Log In</h2>
        <hr />
        <LineWrapper>
          <Label>Username</Label>
          <Input placeholder='Username' />
        </LineWrapper>
        <LineWrapper>
          <Label>Password</Label>
          <Input placeholder='Password' />
        </LineWrapper>
        <hr />
        <ButtonsPanel>
          <ButtonWrapper>
            <Button disabled type='primary' size='large'>Log In</Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button disabled type='default' size='large'>Forgot Password</Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button type='default' size='large'>Cancel</Button>
          </ButtonWrapper>
        </ButtonsPanel>
      </Modal>
    );
  }
};