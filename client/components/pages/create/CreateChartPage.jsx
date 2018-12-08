import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import SubmitGameForm from './SubmitGameForm.jsx';
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
    if (convertToNumbers.includes(key)) newObj[key] = Number(obj[key]);
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
      submitGameOpen: false,
      allGames: [],
      allPlayers: [],
      allConsoles: [],
      allConsolesMap: {},
      chartInput: {
        gameTitle: '',
        category: '',
        leaderboardUrl: ''
      },
      recordInput: {
        player: '',
        mark: '',
        year: 1970,
        month: 0,
        day: 1,
        vodUrl: '',
        isMilestone: false,
        tooltipNote: '',
        labelText: '',
        detailedText: ''
      },
      dbIds: {
        documentId: undefined,
        gameId: undefined
      },
      gameReleaseDate: undefined,
      templateChartDoc: undefined
    };
    this.changePage = this.changePage.bind(this);
    this.showSubmitGame = this.showSubmitGame.bind(this);
    this.closeSubmitGame = this.closeSubmitGame.bind(this);
    this.setChartType = this.setChartType.bind(this);
    this.addNewGameToAllGames = this.addNewGameToAllGames.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    axios.get('/api/create/allGames')
      .then(res => {
        let titlesOnly = res.data.map(game => game.title);
        this.setState({allGames: titlesOnly});
      })
      .catch(err => {
        console.log('error:', err);
      });
    
    axios.get('/api/create/allPlayers')
      .then(res => {
        let namesOnly = res.data.map(player => player.username);
        this.setState({allPlayers: namesOnly});
      })
      .catch(err => {
        console.log('error:', err);
      });
    
    axios.get('/api/create/allConsoles')
      .then(res => {
        let allConsoles = res.data;
        allConsoles.sort((a, b) => a.abbrev > b.abbrev ? 1 : -1);
        let sortedAllConsoles = allConsoles;
        let allConsolesMap = {}
        for (var i = 0; i < sortedAllConsoles.length; i++) {
          let console = sortedAllConsoles[i];
          allConsolesMap[console.name] = console.abbrev;
        }
        this.setState({allConsoles: sortedAllConsoles, allConsolesMap});
      })
      .catch(err => {
        console.log('error:', err);
      });
  }

  changePage() {
    this.setState({page: this.state.page + 1});
  }

  showSubmitGame() {
    this.setState({submitGameOpen: true});
  }

  closeSubmitGame() {
    this.setState({submitGameOpen: false});
  }

  setChartType(type) {
    let doc = type === 'speedrun' ? speedrunDocument : highscoreDocument;
    this.setState({chartType: type, templateChartDoc: doc});
    this.changePage();
  }

  addNewGameToAllGames(gameTitle) {
    this.setState({allGames: this.state.allGames.concat(gameTitle)});
  }

  changeInput(chartOrRecord, type, value) {
    let innerObj = this.state[chartOrRecord];
    innerObj[type] = value;
    let stateObj = {};
    stateObj[chartOrRecord] = innerObj;
    this.setState(stateObj);
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
          let emptyRecordInputObj = {
            player: '',
            mark: '',
            year: Number(res.data.gameReleaseDate.slice(0, 4)),
            month: 0,
            day: 1,
            vodUrl: '',
            isMilestone: false,
            tooltipNote: '',
            labelText: '',
            detailedText: ''
          }
          let stateObj = {
            dbIds: dbIdsObj,
            templateChartDoc: templateChartDocObj,
            gameReleaseDate: res.data.gameReleaseDate,
            recordInput: emptyRecordInputObj
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
          if (!this.state.allPlayers.includes(res.data.playerName)) {
            this.setState({allPlayers: this.state.allPlayers.concat(res.data.playerName)});
          }
          let templateChartDocObj = {...this.state.templateChartDoc};
          templateChartDocObj.records.push(res.data);
          if (templateChartDocObj.records[0].createdAt === undefined) {
            templateChartDocObj.records.shift();
          }
          console.log('templateChartDocObj after submitting new Record to DB, before updating State:', templateChartDocObj);
          let emptyRecordInputObj = {
            player: '',
            mark: '',
            year: Number(this.state.gameReleaseDate.slice(0, 4)),
            month: 0,
            day: 1,
            vodUrl: '',
            isMilestone: false,
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

  render() {
    return (
      <div>
        <SubmitGameForm
          allConsoles={this.state.allConsoles}
          allConsolesMap={this.state.allConsolesMap}
          submitGameOpen={this.state.submitGameOpen}
          showSubmitGame={this.showSubmitGame}
          closeSubmitGame={this.closeSubmitGame}
          addNewGameToAllGames={this.addNewGameToAllGames}
          changeInput={this.changeInput}
        />
        <PageHeader>Create {this.state.chartType === undefined ? '' : (this.state.chartType === 'speedrun' ? 'Speedrun' : 'High Score')} Chart</PageHeader>
        {
          this.state.page === 1
            ?
              <CreateChartPageInitialButtons
                setChartType={this.setChartType}
              />
            :
              (<CreateChartPageWrapper>
                <LeftColumn>
                  <ColumnHeader>{this.state.page === 2 ? 'Chart Information' : `Record Information (${this.state.page - 2})`}</ColumnHeader>
                  <CreateChartPageUserInputs
                    page={this.state.page}
                    chartType={this.state.chartType}
                    allGames={this.state.allGames}
                    allPlayers={this.state.allPlayers}
                    gameReleaseDate={this.state.gameReleaseDate}
                    showSubmitGame={this.showSubmitGame}
                    chartInput={this.state.chartInput}
                    recordInput={this.state.recordInput}
                    submitData={this.submitData}
                    changeInput={this.changeInput}
                  />
                  {/* <DownshiftForm /> */}
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