import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import 'antd/lib/tabs/style/index.css';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import GamePageHeader from './GamePageHeader.jsx';
import Chart from '../../charts/Chart.jsx';
import InfoCarousel from '../../charts/InfoCarousel.jsx';
import RecordsTable from '../../charts/RecordsTable.jsx';
import VodEmbed from './VodEmbed.jsx';
import { LightGreenModule, LightBlueModule, LightPurpleModule } from '../../common/styledComponents.js';

const GamePageContainer = styled.div`
  margin-top: 20px;
`;

const EmbeddedCarouselWrapper = styled.div`
  position: absolute;
  top: -500px;
  left: ${props => props.docType === 'speedrun' ? '1060px' : '300px'};
`;

const RecordDetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.913fr 1.087fr;
  grid-column-gap: 20px;
`;

const TabContentsContainer = styled(LightGreenModule)`
  margin-top: 0px;
`;

const VodContainer = styled(LightBlueModule)`
  display: grid;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  color: rgb(81, 81, 81);
  font-style: italic;
`;

const CarouselContainer = styled(LightPurpleModule)`
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
      clickedChartPoint: null,
      selectedCarouselItem: 0,
      selectedRun: null
    };
    this.changeSelectedChartPoint = this.changeSelectedChartPoint.bind(this);
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
  }

  changeSelectedChartPoint(e, records) {
    console.log('event fire:', e);
    let pointIdx = typeof e === 'object' ? e.point.index : e;
    this.setState({
      clickedChartPoint: pointIdx,
      selectedCarouselItem: pointIdx,
      selectedRun: records[pointIdx]
    });
  }

  render() {
    if (!this.state.loaded) {
      return <div style={{textAlign: 'center', marginTop: '50px'}}><Spin size='large' /></div>;
    }
    return (
      <GamePageContainer>
        <Tabs
          type='card'
          onTabClick={(e) =>
            e === '3'
              ? this.props.history.push(
                  `/edit${this.state.document.uriEndpoint}`,
                  {
                    currentPage: 2,
                    totalPages: this.state.document.records.length + 3,
                    chartType: this.state.document.type,
                    workingDoc: this.state.document
                  }
                )
              : null
          }>
          <TabPane tab={<i className="fas fa-chart-line" />} key='1'>
            <TabContentsContainer>
              <Chart
                document={this.state.document}
                changeSelectedChartPoint={this.changeSelectedChartPoint}
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
        <RecordDetailWrapper>
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
        </RecordDetailWrapper>
      </GamePageContainer>
    )
  }
};