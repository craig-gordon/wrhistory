import React from 'react';
import axios from 'axios';
import isEqual from 'lodash.isequal';

import SubmitGameForm from './SubmitGameForm.jsx';
import InitialButtonGroup from './InitialButtonGroup.jsx';
import ChartInputGroup from './ChartInputGroup.jsx';
import ChartInputButtonGroup from './ChartInputButtonGroup.jsx';
import EditPageNewRecordButton from './EditPageNewRecordButton.jsx';
import RecordInputGroup from './RecordInputGroup.jsx';
import RecordInputButtonGroup from './RecordInputButtonGroup.jsx';
import RecordInputPagination from './RecordInputPagination.jsx';
import Chart from '../../charts/Chart.jsx';
import Changelog from './Changelog.jsx';
import ChangelogButtonGroup from './ChangelogButtonGroup.jsx';
import { PageHeader } from '../../common/styledComps.js';
import {
  ColumnHeader,
  CreateChartPageWrapper,
  ChartInputBox,
  RecordInputHeader,
  RecordInputHeaderWrapper,
  RecordInputBox,
  ChartBox,
  ChangelogBox,
  CurrentPageIcon
} from './styledComps.js';

import { convertHMSMsToSecondsStr, secsToTs, spreadTimestampToHMSMs } from '../../../utils/datetimeUtils.js';
import { createEmptyRecordInputObj, convertNullsToEmptyStrs, convertInputs, isTimeInputValid } from './utils.js';
import { speedrunDocument, highscoreDocument } from '../../../data/genericDocument.js';

export default class CreateChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.location = this.props.location.pathname.includes('/edit') ? '/edit' : '/create';
    this.pipedState = this.location === '/edit' ? this.props.location.state : {workingDoc: {gameReleaseDate: '1970-01-01'}};
    if (this.pipedState.chartType === 'speedrun') {
      var {hours, minutes, seconds, milliseconds} = spreadTimestampToHMSMs(secsToTs(this.pipedState.workingDoc.records[0].mark));
    }
    this.state = {
      viewingInitialButtons: this.location === '/create' ? true : false,
      currentPage: this.pipedState.currentPage || 1,
      totalPages: this.pipedState.totalPages || 1,
      chartType: this.pipedState.chartType || undefined,
      workingDoc: this.pipedState.workingDoc || undefined,
      changelog: [{exampleTitle: 'Example', detailedText: 'This is an example changelog item.'}],
      submitGameOpen: false,
      allGames: [],
      allPlayers: [],
      allConsoles: [],
      chartInput: {
        gameTitle: this.pipedState.workingDoc.gameTitle || '',
        category: this.pipedState.workingDoc.category || '',
        leaderboardUrl: this.pipedState.workingDoc.leaderboardUrl || undefined
      },
      recordInput: {
        playerName: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].playerName : '',
        mark: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].mark : '',
        year: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].year : Number(this.pipedState.workingDoc.gameReleaseDate.slice(0, 4)),
        month: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].month: 0,
        day: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].day : 1,
        vodUrl: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].vodUrl : '',
        isMilestone: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].isMilestone : false,
        labelText: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].labelText : '',
        tooltipNote: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].tooltipNote : '',
        detailedText: this.pipedState.workingDoc.records ? this.pipedState.workingDoc.records[0].detailedText : ''
      },
      // [Speedrun Record] Time inputs
      hours: hours || '',
      minutes: minutes || '',
      seconds: seconds || '',
      milliseconds: milliseconds || '',
      showMilliseconds: false,
      finished: false,
      dbIds: {
        documentId: undefined,
        gameId: undefined
      },
      chartSaveButtonDisabled: true,
      recordSaveButtonDisabled: true,
      finishButtonDisabled: true
    };
  }

  componentDidMount() {
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

  setChartType = (type) => {
    let doc = type === 'speedrun' ? speedrunDocument : highscoreDocument;
    this.setState({
      chartType: type,
      workingDoc: doc,
      viewingInitialButtons: false
    });
  }

  showSubmitGame = () => this.setState({submitGameOpen: true});

  closeSubmitGame = () => this.setState({submitGameOpen: false});

  addNewGameToAllGames = (gameTitle) => {
    this.setState({
      allGames: this.state.allGames.concat(gameTitle)
                                   .sort((a, b) => a.toUpperCase() > b.toUpperCase() ? 1 : -1)
    });
  };

  changePage = (pageNum) => {
    // turning to next blank page
    if (pageNum === undefined) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        totalPages: this.state.totalPages + 1
      });
    // going to any page
    } else {
      this.setState({currentPage: pageNum});
      this.hydratePage(pageNum);
    }
  }

  hydratePage = (pageNum) => {
    let workingRecord = this.state.workingDoc.records[pageNum - 1];
    let recordInputObj = {};
    let emptyRecordInputObj = createEmptyRecordInputObj(this.state.workingDoc);
    let timestamp;
    for (let key in emptyRecordInputObj) {
      if (workingRecord && workingRecord[key] !== null) {
        recordInputObj[key] = workingRecord[key];
      } else {
        recordInputObj[key] = emptyRecordInputObj[key];
      }
    }
    if (this.state.chartType === 'speedrun') {
      timestamp = secsToTs(workingRecord.mark);
      var {hours, minutes, seconds, milliseconds} = spreadTimestampToHMSMs(timestamp);
    }
    this.setState({
      recordInput: recordInputObj,
      hours: hours || '',
      minutes: minutes || '',
      seconds: seconds || '',
      milliseconds: milliseconds || ''
    });
  }

  changeInput = (chartOrRecord, type, value) => {
    let innerObj = this.state[chartOrRecord];
    innerObj[type] = value;
    let stateObj = {};
    stateObj[chartOrRecord] = innerObj;
    this.setState(() => stateObj, () => this.shouldSaveButtonBeDisabled(chartOrRecord));
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

  shouldSaveButtonBeDisabled = (chartOrRecord) => {
    // If Create/Edit process is finished, always disable both buttons
    if (this.state.finished) {
      this.setState({chartSaveButtonDisabled: true, recordSaveButtonDisabled: true});
      return;
    }

    if (chartOrRecord === 'chartInput') {
      let { gameTitle, category, leaderboardUrl } = this.state.workingDoc;

      // Game Title input does not match any game in the database -> DISABLE BUTTON and EXIT FUNCTION
      if (!this.state.allGames.includes(this.state.chartInput.gameTitle)) {
        this.setState({chartSaveButtonDisabled: true});
        return;
      }

      // Current Chart Information inputs DO NOT EQUAL the Working Document values -> ENABLE BUTTON
      if (!isEqual({ gameTitle, category, leaderboardUrl }, this.state.chartInput)) {
        this.setState({chartSaveButtonDisabled: false});
      
      // Current Chart Information inputs DO EQUAL the Working Document values -> DISABLE BUTTON
      } else {
        this.setState({chartSaveButtonDisabled: true});
      }
    } else if (chartOrRecord === 'recordInput') {
      // No Record Information values have been saved yet
      if (this.state.recordInput.mark === '' || this.state.recordInput.playerName === '') {
        this.setState({recordSaveButtonDisabled: true});
      } else {
        let record = this.state.workingDoc.records[this.state.currentPage - 1];
        let { playerName, mark, year, month, day, vodUrl, isMilestone, labelText, tooltipNote, detailedText } = record;
        // Current Record Information inputs DO NOT EQUAL the Working Document values -> ENABLE BUTTON
        if (!isEqual({ playerName, mark, year, month, day, vodUrl, isMilestone, labelText, tooltipNote, detailedText }, this.state.recordInput)) {
          this.setState({recordSaveButtonDisabled: false});

        // Current Record Information inputs DO EQUAL the Working Document values -> DISABLE BUTTON
        } else {
          this.setState({recordSaveButtonDisabled: true});
        }
      }
    }
  }

  shouldFinishButtonBeDisabled = () => {
    if (this.location === '/create') {
      if (this.state.workingDoc.gameTitle !== 'Game' && this.state.currentPage > 1) {
        this.setState({finishButtonDisabled: false});
      }
    } else {
      if (!this.state.changelog[0].exampleTitle) {
        this.setState({finishButtonDisabled: false});
      }
    }
  }

  saveToChangelog = (chartOrRecord) => {
    // saving new Chart data
    if (chartOrRecord === 'chartInput') {
      const newChange = {
        ...this.state.chartInput,
        changeType: 'chart'
      };
      const changelog = this.state.changelog[0].exampleTitle
                        ? [newChange]
                        : [...this.state.changelog, newChange];
      const workingDoc = {
        ...this.state.workingDoc,
        gameTitle: newChange.gameTitle,
        category: newChange.category,
        leaderboardUrl: newChange.leaderboardUrl
      };

      this.setState(() => ({
        changelog,
        workingDoc
      }), () => {
        this.shouldSaveButtonBeDisabled('chartInput');
        this.shouldFinishButtonBeDisabled();
      });
    
    // saving new Record data
    } else {
      let newChange = {
        ...this.state.recordInput,
        changeType: 'record',
        recordPage: this.state.currentPage
      };
      let allRecords = [...this.state.workingDoc.records];
      let recordsCount = allRecords.length;

      // if saving a new record
      if (this.state.currentPage === recordsCount + 1) {
        allRecords.push(newChange);
      // if editing an existing record
      } else {
        allRecords.splice(this.state.currentPage - 1, 1, newChange);
      }

      let changelog = this.state.changelog[0].exampleTitle
                        ? [newChange]
                        : [...this.state.changelog, newChange];
      let workingDoc = {
        ...this.state.workingDoc,
        records: allRecords
      };

      this.setState(() => ({
        changelog,
        workingDoc
      }), () => {
        this.location === '/create' ? this.changePage() : null;
        this.shouldSaveButtonBeDisabled('recordInput');
        this.shouldFinishButtonBeDisabled();
      });
    }
  }

  // REWORK THIS ENTIRE FUNCTION!
  // SUBMIT DATA ONLY AT CONCLUSION OF CREATE/EDIT PROCESS!
  submitData = () => {

    // submitting a new Document + Records
    if (this.location === '/create') {
      const { gameTitle, category, leaderboardUrl, uriEndpoint } = convertInputs(this.state.workingDoc);
      const records = this.state.workingDoc.records.map(record => convertInputs(record));
      const data = {
        chartType: this.state.chartType,
        gameTitle,
        category,
        leaderboardUrl,
        uriEndpoint,
        records
      };
      
      // axios.post('/api/create/newDocument', data)
      //   .then(res => {
      //     console.log('response:', res);
      //   })
      //   .catch(err => {
      //     console.log('error:', err);
      //   });

    // editing an existing Document
    } else {
      const changes = this.state.changelog.map(change => convertInputs(change));

      // axios.post('/api/create/editDocument', changes)
      //   .then(res => {
      //     console.log('response:', res);
      //   })
      //   .catch(err => {
      //     console.log('error:', err);
      //   });
    }

    // // submitting Chart data
    // if (this.state.currentPage === 2) {
    //   let convertedChartInputs = convertInputs(this.state.chartInput);
    //   dataObj = {...convertedChartInputs, chartType: this.state.chartType};
    //   if (this.state.dbIds.documentId) dataObj.id = this.state.dbIds.documentId;
    //   axios.post('/api/create/newDocument', dataObj)
    //     .then(res => {
    //       console.log('response:', res);
    //       let dbIdsObj = {documentId: res.data.id, gameId: res.data.gameId};
    //       let workingDocObj = {...this.state.workingDoc, ...res.data};
    //       let emptyRecordInputObj = createEmptyRecordInputObj(this.state.workingDoc);
    //       let stateObj = {
    //         dbIds: dbIdsObj,
    //         workingDoc: workingDocObj,
    //         recordInput: emptyRecordInputObj,
    //         hours: '',
    //         minutes: '',
    //         seconds: '',
    //         milliseconds: '',
    //         showMilliseconds: false
    //       };
    //       this.setState(() => stateObj, () => {
    //         if (blockPageChange === undefined) this.changePage();
    //         else if (blockPageChange === false) this.changePage(this.state.totalPages);
    //       });
    //     })
    //     .catch(err => {
    //       console.log('error:', err);
    //     });
    // // submitting individual Record data
    // } else {
    //   dataObj = {...this.state.recordInput, ...this.state.dbIds, recordType: this.state.chartType === 'speedrun' ? 'time' : 'score'};
    //   if (this.state.workingDoc.records[this.state.currentPage - 3] !== undefined) {
    //     dataObj.id = this.state.workingDoc.records[this.state.currentPage - 3].id;
    //   }
    //   dataObj = convertInputs(dataObj);
    //   console.log('dataObj before /api/create/newRecord:', dataObj);
    //   axios.post('/api/create/newRecord', dataObj)
    //     .then(res => {
    //       console.log('response:', res);
    //       if (!this.state.allPlayers.includes(res.data.playerName)) {
    //         this.setState({allPlayers: this.state.allPlayers.concat(res.data.playerName)});
    //       }
    //       let workingDocObj = {...this.state.workingDoc};
    //       if (workingDocObj.records[0].createdAt === undefined) {
    //         workingDocObj.records.shift();
    //         workingDocObj.records.push(res.data);
    //       } else if (workingDocObj.records[this.state.currentPage - 3] !== undefined && workingDocObj.records[this.state.currentPage - 3].id === res.data.id) {
    //         var updatedEarlierPage = true;
    //         workingDocObj.records[this.state.currentPage - 3] = res.data;
    //       } else {
    //         workingDocObj.records.push(res.data);
    //       }
    //       workingDocObj.records.sort((a, b) => Date.UTC(a.year, a.month, a.day) > Date.UTC(b.year, b.month, b.day) ? 1 : -1);
    //       console.log('workingDocObj after submitting new Record to DB, before updating State:', workingDocObj);
    //       let emptyRecordInputObj = createEmptyRecordInputObj(this.state.workingDoc);
    //       let stateObj = {
    //         recordInput: updatedEarlierPage ? this.state.recordInput : emptyRecordInputObj,
    //         workingDoc: workingDocObj,
    //         hours: updatedEarlierPage ? this.state.hours : '',
    //         minutes: updatedEarlierPage ? this.state.minutes : '',
    //         seconds: updatedEarlierPage ? this.state.seconds : '',
    //         milliseconds: updatedEarlierPage ? this.state.milliseconds : '',
    //         showMilliseconds: updatedEarlierPage ? this.state.showMilliseconds : false
    //       };
    //       this.setState(() => stateObj, () => {
    //         if (blockPageChange === undefined) this.changePage();
    //         else if (blockPageChange === false) this.changePage(this.state.totalPages);
    //       });
    //     })
    //     .catch(err => console.log('error:', err));
    // }
  }

  handleFinish = () => {
    if (this.state.finished) this.goToChartPage();
    else this.setState({finished: true});
  }

  goToChartPage = () => this.props.history.push(`/chart${this.state.workingDoc.uriEndpoint}`)

  render() {
    let titleCategoryStr = `${this.state.workingDoc.gameTitle} — ${this.state.workingDoc.category}`;
    let pageHeaderStr = this.location === '/create'
                          ? `Create ${
                              this.state.chartType === undefined
                                ? ''
                                : (this.state.chartType === 'speedrun' ? 'Speedrun' : 'High Score')
                            } Chart${this.state.workingDoc.gameTitle !== undefined && this.state.workingDoc.gameTitle !== 'Game' ? (': ' + titleCategoryStr) : ''}`
                          : `Edit Chart: ${titleCategoryStr}`;
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
        <PageHeader>{pageHeaderStr}</PageHeader>
        {
          this.state.viewingInitialButtons
            ?
              <InitialButtonGroup setChartType={this.setChartType} />
            :
              (
                <CreateChartPageWrapper>
                  {/* CHART INPUT BOX */}
                  <ChartInputBox >
                    <ColumnHeader>Chart Information</ColumnHeader>
                    <ChartInputGroup
                      currentPage={this.state.currentPage}
                      chartType={this.state.chartType}
                      allGames={this.state.allGames}
                      showSubmitGame={this.showSubmitGame}
                      chartInput={this.state.chartInput}
                      changeInput={this.changeInput}
                    />
                    <ChartInputButtonGroup
                      location={this.location}
                      chartSaveButtonDisabled={this.state.chartSaveButtonDisabled}
                      saveToChangelog={this.saveToChangelog}
                    />
                  </ChartInputBox>
                  {/* RECORD INPUT BOX */}
                  <RecordInputBox >
                    <RecordInputHeaderWrapper currentPage={this.state.currentPage}>
                      <RecordInputPagination
                        currentPage={this.state.currentPage}
                        totalPages={this.state.totalPages}
                        changePage={this.changePage}
                      />
                      <RecordInputHeader>
                        <span style={{color: 'rgb(84, 84, 84)', fontSize: '20px'}}>
                          Record
                        </span>
                        <CurrentPageIcon>{this.state.currentPage}</CurrentPageIcon>
                      </RecordInputHeader>
                      { this.location === '/edit' ? <EditPageNewRecordButton /> : null}
                    </RecordInputHeaderWrapper>
                    <RecordInputGroup
                      currentPage={this.state.currentPage}
                      chartType={this.state.chartType}
                      allPlayers={this.state.allPlayers}
                      workingDoc={this.state.workingDoc}
                      recordInput={this.state.recordInput}
                      hours={this.state.hours}
                      minutes={this.state.minutes}
                      seconds={this.state.seconds}
                      milliseconds={this.state.milliseconds}
                      showMilliseconds={this.state.showMilliseconds}
                      changeInput={this.changeInput}
                      changeTimeInput={this.changeTimeInput}
                      toggleMilliseconds={this.toggleMilliseconds}
                    />
                    <RecordInputButtonGroup
                      currentPage={this.state.currentPage}
                      totalPages={this.state.totalPages}
                      finished={this.state.finished}
                      recordSaveButtonDisabled={this.state.recordSaveButtonDisabled}
                      saveToChangelog={this.saveToChangelog}
                      changePage={this.changePage}
                      handleFinish={this.handleFinish}
                    />
                  </RecordInputBox>
                  {/* CHART BOX */}
                  <div style={{gridRow: 'span 2'}}>
                    <Chart
                      document={this.state.workingDoc}
                      dataLoaded={true}
                      allowReflow={true}
                      location='create'
                      changePage={this.changePage}
                    />
                  </div>
                  {/* CHANGELOG BOX */}
                  <ChangelogBox>
                    <ColumnHeader>Changelog</ColumnHeader>
                    <Changelog
                      changelog={this.state.changelog}
                      chartType={this.state.chartType}
                      changePage={this.changePage}
                    />
                    <ChangelogButtonGroup
                      finished={this.state.finished}
                      handleFinish={this.handleFinish}
                      finishButtonDisabled={this.state.finishButtonDisabled}
                    />
                  </ChangelogBox>
                </CreateChartPageWrapper>
              )
        }
      </div>
    );
  }
};