import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import CreateChartUserInputForms from './CreateChartUserInputForms.jsx';

export default class CreateChartPageUserInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.changeFormPage = this.changeFormPage.bind(this);
  }

  changeFormPage() {
    this.setState({page: this.state.page + 1});
  }

  render() {
    return (
      <div>
        <CreateChartUserInputForms page={this.state.page}/>
        <Button type='primary' onClick={this.changeFormPage}>Save & Continue</Button>
      </div>
    );
  }
};