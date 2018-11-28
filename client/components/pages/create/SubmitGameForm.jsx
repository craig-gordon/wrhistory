import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/index.css';

import {
  createYearDropdownOptions,
  monthOptions,
  dayOptions
} from './createChartUtils.js';

const ModalHeader = styled.h2`
  text-align: center;
`;

const LineWrapper = styled.div`
  display: grid;
  grid-template-columns: 27% 73%;
  align-items: center;
  margin-bottom: 12px;
`;

const DropdownsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Label = styled.div`
  margin-right: 20px;
  font-weight: bold;
  font-size: 18px;
  justify-self: end;
  color: rgb(99, 99, 99);
`;

const ButtonWrapper = styled.div`
  display: inline;
  float: right;
  margin-top: 10px;
`;

const SubmitText = styled.span`
  margin-left: 8px;
`;

export default class SubmitGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      abbrev: '',
      year: undefined,
      month: undefined,
      day: undefined
    };
    this.changeInput = this.changeInput.bind(this);
  }

  changeInput(type, e) {
    let value = e.target ? e.target.value : e;
    let stateObj = {};
    stateObj[type] = value;
    this.setState(stateObj);
  }

  render() {
    const submitGameModalStyles = {
      modal: {
        marginTop: '8%',
        height: '235px',
        width: '500px',
        padding: '30px',
        borderRadius: '8px',
        backgroundColor: 'whitesmoke'
      }
    };
    return (
      <Modal
        open={this.props.submitGameOpen}
        onClose={this.props.closeSubmitGame}
        showCloseIcon={false}
        styles={submitGameModalStyles}
      >
        <ModalHeader>
          Submit New Game
        </ModalHeader>
        <LineWrapper>
          <Label>Title</Label>
          <Input
            value={this.state.title}
            onChange={(e) => this.changeInput('title', e)}
          />
        </LineWrapper>
        <LineWrapper>
          <Label>Abbreviation</Label>
          <Input
            placeholder='(Optional) eg, oot'
            value={this.state.abbrev}
            onChange={(e) => this.changeInput('abbrev', e)}
          />
        </LineWrapper>
        <LineWrapper>
          <Label>Release Date</Label>
          <DropdownsContainer>
            <Select
              style={{marginRight: '10px'}}
              placeholder='Year'
              onChange={(e) => this.changeInput('year', e)}
            >
              {createYearDropdownOptions()}
            </Select>
            <Select
              placeholder='Month'
              onChange={(e) => this.changeInput('month', e)}
            >
              {monthOptions}
            </Select>
            <Select
              style={{marginLeft: '10px'}}
              placeholder='Day'
              onChange={(e) => this.changeInput('day', e)}
            >
              {dayOptions}
            </Select>
          </DropdownsContainer>
        </LineWrapper>
        <ButtonWrapper>
          <Button type='primary' size='large'>
            <i className="far fa-save"></i>
            <SubmitText>
              Submit
            </SubmitText>
          </Button>
        </ButtonWrapper>
      </Modal>
    );
  }
};