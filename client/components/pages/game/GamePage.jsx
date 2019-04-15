import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import 'antd/lib/tabs/style/index.css';

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import GamePageHeader from './GamePageHeader.jsx';
import Chart from '../../charts/Chart.jsx';
import InfoCarousel from '../../charts/InfoCarousel.jsx';
import RecordsTable from '../../charts/RecordsTable.jsx';
import VodEmbed from './VodEmbed.jsx';
import { GreenBox, BlueBox, PurpleBox } from '../../common/styledComps.js';
import { convertNullsToEmptyStrs } from '../create/utils.js';
import throttle from 'lodash.throttle';

const GamePageContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 0.913fr 1.087fr;
  grid-gap: 20px;
`;

const EmbeddedCarouselWrapper = styled.div`
  position: absolute;
  top: -500px;
  left: ${props => props.docType === 'speedrun' ? '1060px' : '300px'};
`;

const RecordDetailWrapper = styled.div`
  display: grid;
`;

const TabContentsContainer = styled(GreenBox)`
  margin-top: 0px;
`;

const VodContainer = styled(BlueBox)`
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  color: rgb(81, 81, 81);
  font-style: italic;
`;

const CarouselContainer = styled(PurpleBox)`
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  color: rgb(81, 81, 81);
  font-style: italic;
`;

export default class GamePage extends React.Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {
      loaded: false,
      document: undefined,
      selectedChartPoint: -1,
      selectedCarouselItem: 0,
      selectedRun: null
    };
    this.listenForArrowKeys = throttle(this.listenForArrowKeys.bind(this), 500);
  }

  componentDidMount() {
    axios.post('/api/chartPage/document', {uriEndpoint: this.props.location.pathname.slice(6)})
      .then(res => {
        console.log('response:', res);
        let document = res.data;
        this.setState({document, loaded: true});
      })
      .catch(err => {
        console.log('Error retrieving Document from database:', err);
      });
    
    window.addEventListener('keydown', this.listenForArrowKeys);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenForArrowKeys);
  }

  listenForArrowKeys(e) {
    const records = this.state.document.records;
    if (e.keyCode === 39 && this.state.selectedChartPoint !== records.length - 1) {
      this.changeSelectedChartPoint(this.state.selectedChartPoint + 1, records);
    } else if (e.keyCode === 37 && this.state.selectedChartPoint !== 0) {
      this.changeSelectedChartPoint(this.state.selectedChartPoint - 1, records);
    }
  };

  changeSelectedChartPoint = (e, records) => {
    let pointIdx = typeof e === 'object' ? e.point.index : e;
    this.setState({
      selectedChartPoint: pointIdx,
      selectedCarouselItem: pointIdx,
      selectedRun: records[pointIdx]
    });
  }

  render() {
    if (!this.state.loaded) {
      return <div style={{textAlign: 'center', marginTop: '100px'}}><div className="pixel-loader" /></div>;
    }
    return (
      <GamePageContainer>
        <Tabs
          style={{gridColumn: 'span 2'}}
          type='card'
          onTabClick={(e) => {
            if (e === '3') {
              let doc = this.state.document;
              let recordsWithNullsConverted = doc.records.map(record => convertNullsToEmptyStrs(record));
              let newDoc = {...doc, records: recordsWithNullsConverted};
              let stateToPipe = {currentPage: 1, totalPages: doc.records.length, chartType: doc.type, workingDoc: newDoc};
              this.props.history.push(`/edit${doc.uriEndpoint}`, stateToPipe);
            }
          }}>
          <TabPane tab={<i className="fas fa-chart-line" />} key='1'>
            <TabContentsContainer>
              <Chart
                document={this.state.document}
                dataLoaded={this.state.loaded}
                location='game'
                selectedChartPoint={this.state.selectedChartPoint}
                changeSelectedChartPoint={this.changeSelectedChartPoint}
                neverReflow={true}
              />
            </TabContentsContainer>
              {/* <EmbeddedCarouselWrapper
                docType={this.props.location.pathname === '/mm2' ? 'speedrun' : 'highscore'}
              >
                <InfoCarousel
                  embedded={true}
                  document={this.state.document}
                  selected={this.state.selectedCarouselItem}
                  changeSelectedChartPoint={this.changeSelectedChartPoint}
                />
              </EmbeddedCarouselWrapper> */}
            </TabPane>
          <TabPane tab={<i className="fas fa-table" />} key='2'>
            <TabContentsContainer>
              <RecordsTable
                document={this.state.document}
              />
            </TabContentsContainer>
          </TabPane>
          <TabPane
            className='right-side-tab-pane'
            tab={<i className="fas fa-pencil-alt" />}
            key='3'
          />
        </Tabs>
        <VodContainer className='vod-container'>
          {
            this.state.selectedRun
              ? (
                  this.state.selectedRun.vodUrl
                    ? <VodEmbed vodUrl={this.state.selectedRun.vodUrl} />
                    : 'No VOD available for this record'
                )
              : `Click a chart point to see the record's VOD`
          }
        </VodContainer>
        <CarouselContainer>
          {
            this.state.selectedRun
              ? <InfoCarousel
                  document={this.state.document}
                  selected={this.state.selectedCarouselItem}
                  changeSelectedChartPoint={this.changeSelectedChartPoint}
                />
              : `Click a chart point to see the record's detailed description`
          }
        </CarouselContainer>
      </GamePageContainer>
    )
  }
};