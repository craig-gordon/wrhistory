import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/index.css';
import Tooltip from 'antd/lib/tooltip';
import 'antd/lib/tooltip/style/index.css';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';

import {
  createYearDropdownOptions,
  monthOptions,
  dayOptions,
  createConsoleDropdownOptions,
  autoGenerateAbbrev
} from './utils.js';

const ModalHeader = styled.h2`
  text-align: center;
`;

const LineWrapper = styled.div`
  display: grid;
  grid-template-columns: 33% 67%;
  align-items: center;
  margin-bottom: 12px;
`;

const DropdownsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Label = styled.div`
  margin-right: 28px;
  font-weight: bold;
  font-size: 18px;
  justify-self: end;
  color: rgb(99, 99, 99);
`;

const LabelWithQMark = styled(Label)`
  margin-right: 0;
`;

const LabelWrapper = styled.div`
  display: grid;
  grid-template-columns: 84% 16%;
`;

const QMarkWrapper = styled.span`
  display: grid;
  text-align: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: inline;
  float: right;
  margin-top: 10px;
`;

export default class SubmitGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      abbrev: '',
      year: undefined,
      month: undefined,
      day: undefined,
      consoles: [],
      submitButtonStatus: 'default'
    };
    this.changeGameInput = this.changeGameInput.bind(this);
    this.submitNewGame = this.submitNewGame.bind(this);
  }

  changeGameInput(type, value) {
    let stateObj = {};
    stateObj[type] = value;
    this.setState(stateObj);
  }

  submitNewGame() {
    this.setState({submitButtonStatus: 'spin'})
    let dataObj = {...this.state};
    if (dataObj.abbrev === '') dataObj.abbrev = autoGenerateAbbrev(this.state.title);
    axios.post('/api/gameData/newGame', dataObj)
      .then(res => {
        console.log('response:', res);
        this.setState(() => ({submitButtonStatus: 'success'}));
        this.props.addNewGameToAllGames(this.state.title);

        setTimeout(() => {
          this.props.closeSubmitGame();
          this.props.changeInput('chartInput', 'gameTitle', this.state.title);
        }, 1500);
        
        setTimeout(() => this.setState((state, props) => (
          {
            title: '',
            abbrev: '',
            year: undefined,
            month: undefined,
            day: undefined,
            consoles: [],
            submitButtonStatus: 'default'
          }
        )), 3000);
      })
      .catch(err => {
        console.log('error:', err);
      });
  }

  render() {
    const submitGameModalStyles = {
      modal: {
        marginTop: '8%',
        height: '270px',
        width: '500px',
        padding: '30px',
        borderRadius: '8px',
        backgroundColor: 'whitesmoke'
      }
    };

    const btnDefault = (
      <Button
        type='primary'
        size='large'
        onClick={this.submitNewGame}
      >
        <i className="far fa-save"></i>
        <span style={{marginLeft: '8px'}}>
          Submit
        </span>
      </Button>
    );
    
    const btnSpin = (
      <Button
        type='primary'
        size='large'
      >
        <Spin />
      </Button>
    );
    
    const btnSuccess = (
      <Button
        type='primary'
        size='large'
      >
        <i className="fas fa-check"></i>
      </Button>
    );
    
    const buttonMap = {
      default: btnDefault,
      spin: btnSpin,
      success: btnSuccess
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
            onChange={(e) => this.changeGameInput('title', e.target.value)}
          />
        </LineWrapper>
        <LineWrapper>
          <Label>Abbreviation</Label>
          <Input
            placeholder='(Optional) eg, oot'
            value={this.state.abbrev}
            onChange={(e) => this.changeGameInput('abbrev', e.target.value)}
          />
        </LineWrapper>
        <LineWrapper>
          <LabelWrapper>
            <LabelWithQMark>
              Release Date
            </LabelWithQMark>
            <QMarkWrapper>
              <Tooltip
                title='Please enter the first official release date, regardless of region'
                mouseEnterDelay={0.3}
              >
                <i style={{fontSize: '14px', color: 'rgb(130, 130, 130)'}} className="fas fa-question-circle"></i>
              </Tooltip>
            </QMarkWrapper>
          </LabelWrapper>
          <DropdownsContainer>
            <Select
              style={{marginRight: '10px'}}
              placeholder='Year'
              onChange={(e) => this.changeGameInput('year', e)}
            >
              {createYearDropdownOptions()}
            </Select>
            <Select
              placeholder='Month'
              onChange={(e) => this.changeGameInput('month', e)}
            >
              {monthOptions}
            </Select>
            <Select
              style={{marginLeft: '10px'}}
              placeholder='Day'
              onChange={(e) => this.changeGameInput('day', e)}
            >
              {dayOptions}
            </Select>
          </DropdownsContainer>
        </LineWrapper>
        <LineWrapper>
          <LabelWrapper>
            <LabelWithQMark>
              Consoles
            </LabelWithQMark>
            <QMarkWrapper>
              <Tooltip
                title='Select all consoles that this game was released for, but ensure the original console is included'
                mouseEnterDelay={0.3}
                placement='bottom'
              >
                <i style={{fontSize: '14px', color: 'rgb(130, 130, 130)'}} className="fas fa-question-circle"></i>
              </Tooltip>
            </QMarkWrapper>
          </LabelWrapper>
          <Select
            mode='multiple'
            value={this.state.consoles}
            onChange={(e) => this.changeGameInput('consoles', e)}
          >
            {createConsoleDropdownOptions(this.props.allConsoles)}
          </Select>
        </LineWrapper>
        <ButtonWrapper>
          {buttonMap[this.state.submitButtonStatus]}
        </ButtonWrapper>
      </Modal>
    );
  }
};