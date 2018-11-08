import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

export default class CreateChartPageUserInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      title: '',
      category: '',
      leaderboardLink: '',
      player: '',
      mark: '',
      platform: '',
      version: '',
      year: '',
      month: '',
      day: '',
      vodUrl: '',
      isMilestone: '',
      note: '',
      labelText: '',
      detailed: ''
    };
    this.changePage = this.changePage.bind(this);
    this.submitData = this.submitData.bind(this);
    this.changeSimpleInput = this.changeSimpleInput.bind(this);
  }

  changePage() {
    this.setState({page: this.state.page + 1});
  }

  submitData() {
    let dataObj;

    if (this.state.page === 1) {
      dataObj = {
        title: this.state.title,
        category: this.state.category,
        leaderboardLink: this.state.leaderboardLink
      };
    }

    axios.post('/api/create/newDocument', dataObj)
      .then((res) => {
        console.log('response:', res);
        this.changePage();
      })
      .catch((err) => {
        console.log('error:', err);
      });
  }

  changeSimpleInput(type, e) {
    let stateObj = {};
    stateObj[type] = e.target.value;
    this.setState(stateObj);
  }

  render() {
    let inputForms;

    if (this.state.page === 1) {
      inputForms = (
        <div>
          <div>
            Game Title: <Input
              value={this.state.title}
              onChange={(e) => this.changeSimpleInput('title', e)}
            />
          </div>
          <div>
            Category Title: <Input
              value={this.state.category}
              onChange={(e) => this.changeSimpleInput('category', e)}
            />
          </div>
          <div>
            Leaderboard Link: <Input
              value={this.state.leaderboardLink}
              onChange={(e) => this.changeSimpleInput('leaderboardLink', e)}
            />
          </div>
        </div>
      );
    } else {
      inputForms = (
        <div>
          <div>Enter Run Information: <Input /></div>
        </div>
      );
    }

    return (
      <div>
        {inputForms}
        <Button
          type='primary'
          onClick={this.submitData}>Save & Continue</Button>
      </div>
    );
  }
};