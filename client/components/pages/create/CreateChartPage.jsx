import React from 'react';
import axios from 'axios';

import SubmitGameForm from './SubmitGameForm.jsx';
import CreateChartPageInitialButtons from './CreateChartPageInitialButtons.jsx';
import CreateChartPageUserInputs from './CreateChartPageUserInputs.jsx';
import PageButtons from './PageButtons.jsx';
import Chart from '../../charts/Chart.jsx';
import { PageHeader } from '../../common/styledComponents.js';
import { ColumnHeader, CreateChartPageWrapper, LeftColumn, LeftColumnHeader, LeftColumnHeaderWrapper, RightColumn, CurrentPageIcon } from './createChartStyledComps.js';

import { convertHMSMsToSecondsStr, secsToTs, spreadTimestampToHMSMs } from '../../../utils/datetimeUtils.js';
import { createEmptyRecordInputObj, convertInputs, isTimeInputValid } from './createChartUtils.js';
import { speedrunDocument, highscoreDocument } from '../../../data/genericDocument.js';

export default class CreateChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.location = this.props.location.pathname.includes('/edit') ? '/edit' : '/create';
    this.forwardedState = this.location === '/edit' ? this.props.location.state : {workingDoc: {gameReleaseDate: '1970-01-01'}};
    this.state = {
      currentPage: this.forwardedState.currentPage || 1,
      totalPages: this.forwardedState.totalPages || 1,
      chartType: this.forwardedState.chartType || undefined,
      workingDoc: this.forwardedState.workingDoc || undefined,
      submitGameOpen: false,
      allGames: [],
      allPlayers: [],
      allConsoles: [],
      chartInput: {
        gameTitle: this.forwardedState.workingDoc.gameTitle || '',
        category: this.forwardedState.workingDoc.category || '',
        leaderboardUrl: this.forwardedState.workingDoc.leaderboardUrl || ''
      },
      recordInput: undefined,
      // [Speedrun Record] Time inputs
      hours: '',
      minutes: '',
      seconds: '',
      milliseconds: '',
      showMilliseconds: false,
      finished: false,
      showJumpToButton: false,
      dbIds: {
        documentId: undefined,
        gameId: undefined
      }
    };
  }

  componentDidMount() {
    this.setState({recordInput: createEmptyRecordInputObj(this.state.workingDoc)});
    axios.get('/api/create/allGames')
      .then(res => this.setState({allGames: res.data.map(game => game.title).sort((a, b) => a.toUpperCase() > b.toUpperCase() ? 1 : -1)}))
      .catch(err => console.log('error:', err));
    
    axios.get('/api/create/allPlayers')
      .then(res => this.setState({allPlayers: res.data.map(player => player.username).sort((a, b) => a.toUpperCase() > b.toUpperCase() ? 1 : -1)}))
      .catch(err => console.log('error:', err));
    
    axios.get('/api/create/allConsoles')
      .then(res => this.setState({allConsoles: res.data.sort((a, b) => a.abbrev > b.abbrev ? 1 : -1)}))
      .catch(err => console.log('error:', err));
  }

  emptyInputFields = () => {
    this.setState({
      recordInput: {
        playerName: '',
        mark: '',
        year: Number(this.state.workingDoc.gameReleaseDate.slice(0, 4)),
        month: 0,
        day: 1,
        vodUrl: '',
        isMilestone: false,
        tooltipNote: '',
        labelText: '',
        detailedText: ''
      },
      hours: '',
      minutes: '',
      seconds: '',
      milliseconds: '',
      showMilliseconds: false
    });
  }

  changePage = (pageNum) => {
    this.setState({showJumpToButton: false});
    // turning to next page
    if (pageNum === undefined) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        totalPages: this.state.totalPages + 1
      });
    // jumping ahead to [this.state.totalPages] page
    } else if (pageNum === this.state.totalPages) {
      this.setState({
        currentPage: this.state.totalPages,
        totalPages: this.state.totalPages
      });
    // returning to earlier page
    } else {
      this.setState({currentPage: pageNum});
      this.hydrateEarlierPage(pageNum);
    }
  }

  hydrateEarlierPage = (pageNum) => {
    if (pageNum === 2) {
      let workingDoc = this.state.workingDoc;
      let emptyChartInputObj = {
        gameTitle: '',
        category: '',
        leaderboardUrl: ''
      };
      let chartInputObj = {};
      for (var key in emptyChartInputObj) {
        if (workingDoc[key] !== null) {
          chartInputObj[key] = workingDoc[key];
        } else {
          chartInputObj[key] = emptyChartInputObj[key];
        }
      }
      this.setState({
        chartInput: chartInputObj
      });
    } else {
      let workingRecord = this.state.workingDoc.records[pageNum - 3];
      let recordInputObj = {};
      let emptyRecordInputObj = createEmptyRecordInputObj(this.state.workingDoc);
      for (var key in emptyRecordInputObj) {
        if (workingRecord && workingRecord[key] !== null) {
          recordInputObj[key] = workingRecord[key];
        } else {
          recordInputObj[key] = emptyRecordInputObj[key];
        }
      }
      if (this.state.chartType === 'speedrun') {
        var timestamp = secsToTs(workingRecord.mark);
        var {hours, minutes, seconds, milliseconds} = spreadTimestampToHMSMs(timestamp);
      }
      this.setState({
        recordInput: recordInputObj,
        hours,
        minutes,
        seconds,
        milliseconds
      });
    }
  }

  showSubmitGame = () => this.setState({submitGameOpen: true});

  closeSubmitGame = () => this.setState({submitGameOpen: false});

  setChartType = (type) => {
    let doc = type === 'speedrun' ? speedrunDocument : highscoreDocument;
    this.setState({chartType: type, workingDoc: doc});
    this.changePage();
  }

  addNewGameToAllGames = (gameTitle) => this.setState({allGames: this.state.allGames.concat(gameTitle)});

  changeInput = (chartOrRecord, type, value) => {
    let innerObj = this.state[chartOrRecord];
    innerObj[type] = value;
    let stateObj = {};
    stateObj[chartOrRecord] = innerObj;
    this.setState(stateObj);
  }

  changeTimeInput = (type, value) => {
    if (!isTimeInputValid(type, value)) return;
    let stateObj = {};
    stateObj[type] = value;
    this.setState(stateObj, () => {
      let totalSecondsStr = convertHMSMsToSecondsStr(this.state.hours, this.state.minutes, this.state.seconds, this.state.milliseconds).toString();
      this.changeInput('recordInput', 'mark', totalSecondsStr);
    });
  }

  toggleMilliseconds = () => {
    if (this.state.showMilliseconds) {
      this.setState({milliseconds: '', showMilliseconds: false}, () => {
        let totalSecondsStr = convertHMSMsToSecondsStr(this.state.hours, this.state.minutes, this.state.seconds, this.state.milliseconds).toString();
        this.changeInput('recordInput', 'mark', totalSecondsStr);
      });
    } else {
      this.setState({showMilliseconds: true});
    }
  }

  toggleJumpToButton = () => this.setState({showJumpToButton: true});

  isNextButtonDisabled = () => {
    if (this.state.currentPage === 2) {
      if (!this.state.allGames.includes(this.state.chartInput.gameTitle)) return true;
      else return false;
    } else {
      let { mark, playerName } = this.state.recordInput;
      if (mark === '' || playerName === '') return true;
      else if (this.state.finished) return true;
      return false
    }
  }

  goToChartPage = () => this.props.history.push(`/chart${this.state.workingDoc.uriEndpoint}`)

  submitData = (blockPageChange) => {
    let dataObj;

    // submitting Chart data
    if (this.state.currentPage === 2) {
      let convertedChartInputs = convertInputs(this.state.chartInput);
      dataObj = {...convertedChartInputs, chartType: this.state.chartType};
      if (this.state.dbIds.documentId) dataObj.id = this.state.dbIds.documentId;
      axios.post('/api/create/newDocument', dataObj)
        .then(res => {
          console.log('response:', res);
          let dbIdsObj = {documentId: res.data.id, gameId: res.data.gameId};
          let workingDocObj = {...this.state.workingDoc, ...res.data};
          let emptyRecordInputObj = createEmptyRecordInputObj(this.state.workingDoc);
          let stateObj = {
            dbIds: dbIdsObj,
            workingDoc: workingDocObj,
            recordInput: emptyRecordInputObj,
            hours: '',
            minutes: '',
            seconds: '',
            milliseconds: '',
            showMilliseconds: false
          };
          this.setState((state, props) => stateObj, () => {
            if (blockPageChange === undefined) this.changePage();
            else if (blockPageChange === false) this.changePage(this.state.totalPages);
          });
        })
        .catch(err => {
          console.log('error:', err);
        });
    // submitting individual Record data
    } else {
      dataObj = {...this.state.recordInput, ...this.state.dbIds, recordType: this.state.chartType === 'speedrun' ? 'time' : 'score'};
      if (this.state.workingDoc.records[this.state.currentPage - 3] !== undefined) {
        dataObj.id = this.state.workingDoc.records[this.state.currentPage - 3].id;
      }
      dataObj = convertInputs(dataObj);
      console.log('dataObj before /api/create/newRecord:', dataObj);
      axios.post('/api/create/newRecord', dataObj)
        .then(res => {
          console.log('response:', res);
          if (!this.state.allPlayers.includes(res.data.playerName)) {
            this.setState({allPlayers: this.state.allPlayers.concat(res.data.playerName)});
          }
          let workingDocObj = {...this.state.workingDoc};
          if (workingDocObj.records[0].createdAt === undefined) {
            workingDocObj.records.shift();
            workingDocObj.records.push(res.data);
          } else if (workingDocObj.records[this.state.currentPage - 3] !== undefined && workingDocObj.records[this.state.currentPage - 3].id === res.data.id) {
            var updatedEarlierPage = true;
            workingDocObj.records[this.state.currentPage - 3] = res.data;
          } else {
            workingDocObj.records.push(res.data);
          }
          workingDocObj.records.sort((a, b) => Date.UTC(a.year, a.month, a.day) > Date.UTC(b.year, b.month, b.day) ? 1 : -1);
          console.log('workingDocObj after submitting new Record to DB, before updating State:', workingDocObj);
          let emptyRecordInputObj = createEmptyRecordInputObj(this.state.workingDoc);
          let stateObj = {
            recordInput: updatedEarlierPage ? this.state.recordInput : emptyRecordInputObj,
            workingDoc: workingDocObj,
            hours: updatedEarlierPage ? this.state.hours : '',
            minutes: updatedEarlierPage ? this.state.minutes : '',
            seconds: updatedEarlierPage ? this.state.seconds : '',
            milliseconds: updatedEarlierPage ? this.state.milliseconds : '',
            showMilliseconds: updatedEarlierPage ? this.state.showMilliseconds : false
          };
          this.setState((state, props) => stateObj, () => {
            if (blockPageChange === undefined) this.changePage();
            else if (blockPageChange === false) this.changePage(this.state.totalPages);
          });
        })
        .catch(err => console.log('error:', err));
    }
  }

  handleFinish = () => {
    if (this.state.finished) {
      this.goToChartPage();
      this.setState({
        hours: '',
        minutes: '',
        seconds: '',
        milliseconds: '',
        showMilliseconds: false,
        finished: false
      });
    } else {
      this.setState({finished: true});
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
        <PageHeader>
          {
            this.location === '/create'
              ? `Create ${
                  this.state.chartType === undefined
                    ? ''
                    : (this.state.chartType === 'speedrun' ? 'Speedrun' : 'High Score')
                } Chart`
              : `Edit Chart: ${this.state.workingDoc.gameTitle} — ${this.state.workingDoc.category}`
          }
        </PageHeader>
        {
          this.state.currentPage === 1
            ?
              <CreateChartPageInitialButtons
                setChartType={this.setChartType}
              />
            :
              (<CreateChartPageWrapper>
                <LeftColumn>
                  <LeftColumnHeaderWrapper currentPage={this.state.currentPage}>
                    <PageButtons
                      currentPage={this.state.currentPage}
                      totalPages={this.state.totalPages}
                      emptyInputFields={this.emptyInputFields}
                      changePage={this.changePage}
                    />
                    <LeftColumnHeader>
                      {this.state.currentPage === 2
                        ? 'Chart Information'
                        : <span>
                            <span style={{color: 'rgb(84, 84, 84)', fontSize: '20px'}}>
                              Record
                            </span>
                            <CurrentPageIcon
                              >{this.state.currentPage - 2}
                            </CurrentPageIcon>
                          </span>}
                    </LeftColumnHeader>
                  </LeftColumnHeaderWrapper>
                  <CreateChartPageUserInputs
                    currentPage={this.state.currentPage}
                    totalPages={this.state.totalPages}
                    chartType={this.state.chartType}
                    allGames={this.state.allGames}
                    allPlayers={this.state.allPlayers}
                    workingDoc={this.state.workingDoc}
                    showSubmitGame={this.showSubmitGame}
                    chartInput={this.state.chartInput}
                    recordInput={this.state.recordInput}
                    hours={this.state.hours}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                    milliseconds={this.state.milliseconds}
                    showMilliseconds={this.state.showMilliseconds}
                    showJumpToButton={this.state.showJumpToButton}
                    finished={this.state.finished}
                    emptyInputFields={this.emptyInputFields}
                    changePage={this.changePage}
                    submitData={this.submitData}
                    changeInput={this.changeInput}
                    changeTimeInput={this.changeTimeInput}
                    toggleMilliseconds={this.toggleMilliseconds}
                    toggleJumpToButton={this.toggleJumpToButton}
                    isNextButtonDisabled={this.isNextButtonDisabled}
                    goToChartPage={this.goToChartPage}
                    handleFinish={this.handleFinish}
                  />
                </LeftColumn>
                <RightColumn>
                  <ColumnHeader>
                    <span style={{color: 'rgb(84, 84, 84)', fontSize: '20px'}}>
                      Template Chart
                    </span>
                  </ColumnHeader>
                  <Chart
                    document={this.state.workingDoc}
                  />
                </RightColumn>
              </CreateChartPageWrapper>)
        }
      </div>
    );
  }
};