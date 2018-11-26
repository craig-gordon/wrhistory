import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import CreateChartPageInitialButtons from './CreateChartPageInitialButtons.jsx';
import CreateChartPageUserInputs from './CreateChartPageUserInputs.jsx';
import DownshiftForm from './DownshiftForm.jsx';
import Chart from '../../charts/Chart.jsx';
import { LightBlueModule, LightGreenModule, PageHeader } from '../../common/styledComponents.js';

import { speedrunDocument, highscoreDocument } from '../../../data/genericDocument.js';


const ColumnHeader = styled.h3`
  text-align: center;
`;

const CreateChartPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 36% 64%;
`;

const LeftColumn = LightBlueModule.extend`
  margin-right: 10px;
`;

const RightColumn = LightGreenModule.extend`
  margin-left: 10px;
`;

// Change emptry string state values to null
// Convert 'mark' state value to a number
const convertInputs = (obj) => {
  let convertToNumbers = ['mark', 'year', 'month', 'day'];
  let newObj = {};
  for (var key in obj) {
    if (convertToNumbers.indexOf(key) > -1) newObj[key] = Number(obj[key]);
    else if (obj[key] === '') newObj[key] = null;
    else newObj[key] = obj[key];
  }
  return newObj;
};


export default class CreateChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      chartType: undefined,
      chartInput: {
        gameTitle: '',
        category: '',
        leaderboardUrl: ''
      },
      recordInput: {
        player: '',
        mark: '',
        console: '',
        platform: '',
        region: '',
        version: '',
        year: '',
        month: '',
        day: '',
        vodUrl: '',
        isMilestone: '',
        tooltipNote: '',
        labelText: '',
        detailedText: ''
      },
      dbIds: {
        documentId: undefined,
        gameId: undefined
      },
      templateChartDoc: undefined
    };
    this.changePage = this.changePage.bind(this);
    this.setChartType = this.setChartType.bind(this);
    this.submitData = this.submitData.bind(this);
    this.changeSimpleInput = this.changeSimpleInput.bind(this);
  }

  changePage() {
    this.setState({page: this.state.page + 1});
  }

  setChartType(type) {
    let doc = type === 'speedrun' ? speedrunDocument : highscoreDocument;
    this.setState({chartType: type, templateChartDoc: doc});
    this.changePage();
  }

  submitData() {
    let dataObj;

    if (this.state.page === 2) {
      let convertedChartInputs = convertInputs(this.state.chartInput);
      dataObj = {...convertedChartInputs, chartType: this.state.chartType};
      axios.post('/api/create/newDocument', dataObj)
        .then(res => {
          console.log('response:', res);
          let dbIdsObj = {documentId: res.data.id, gameId: res.data.gameId};
          let templateChartDocObj = {...this.state.templateChartDoc, ...res.data};
          let stateObj = {
            dbIds: dbIdsObj,
            templateChartDoc: templateChartDocObj
          };
          this.setState(stateObj);
          this.changePage();
        })
        .catch(err => {
          console.log('error:', err);
        });
    } else {
      dataObj = {...this.state.recordInput, ...this.state.dbIds, recordType: this.state.chartType === 'speedrun' ? 'time' : 'score'};
      dataObj = convertInputs(dataObj);
      axios.post('/api/create/newRecord', dataObj)
        .then(res => {
          console.log('response:', res);
          let templateChartDocObj = {...this.state.templateChartDoc};
          templateChartDocObj.records.push(res.data);
          if (templateChartDocObj.records[0].createdAt === undefined) {
            templateChartDocObj.records.shift();
          }
          console.log('templateChartDocObj after submitting new Record to DB, before updating State:', templateChartDocObj);
          let emptyRecordInputObj = {
            player: '',
            mark: '',
            console: '',
            platform: '',
            region: '',
            version: '',
            year: '',
            month: '',
            day: '',
            vodUrl: '',
            isMilestone: '',
            tooltipNote: '',
            labelText: '',
            detailedText: ''
          }
          this.setState({recordInput: emptyRecordInputObj, templateChartDoc: templateChartDocObj});
          this.changePage();
        })
        .catch(err => {
          console.log('error:', err);
        });
    }
  }

  changeSimpleInput(chartOrRecord, type, e) {
    let stateObj = this.state[chartOrRecord];
    stateObj[type] = e.target.value;
    this.setState(stateObj);
  }

  render() {
    return (
      <div>
        <PageHeader>Create Chart</PageHeader>
        {
          this.state.page === 1
            ?
              <CreateChartPageInitialButtons
                setChartType={this.setChartType}
              />
            :
              (<CreateChartPageWrapper>
                <LeftColumn>
                  <ColumnHeader>{this.state.page === 2 ? 'Enter Chart Information' : 'Enter Record Information'}</ColumnHeader>
                  <CreateChartPageUserInputs
                    page={this.state.page}
                    chartInput={this.state.chartInput}
                    recordInput={this.state.recordInput}
                    submitData={this.submitData}
                    changeSimpleInput={this.changeSimpleInput}
                  />
                  <DownshiftForm />
                </LeftColumn>
                <RightColumn>
                  <ColumnHeader>Template Chart</ColumnHeader>
                  <Chart
                    document={this.state.templateChartDoc}
                  />
                </RightColumn>
              </CreateChartPageWrapper>)
        }
      </div>
    );
  }
};