import React from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';
import 'antd/lib/collapse/style/index.css';
import { Tabs } from 'antd';
import 'antd/lib/tabs/style/index.css';

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import GamePageHeader from './GamePageHeader.jsx';
import Chart from '../../charts/Chart.jsx';
import InfoCarousel from '../../charts/InfoCarousel.jsx';
import RecordsTable from '../../charts/RecordsTable.jsx';
import VodEmbed from './VodEmbed.jsx';

import { document as dkDocument } from '../../../data/dkDocument.js';
import { document as mm2Document } from '../../../data/mm2Document.js';

const documents = {dkDocument, mm2Document};

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

const EmbeddedCarouselWrapper = styled.div`
  position: absolute;
  top: -500px;
  left: ${props => props.docType === 'speedrun' ? '1060px' : '300px'};
`;

const RecordDetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`

export default class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedChartPoint: null,
      selectedCarouselItem: 0,
      selectedRun: null
    };
    this.gameCode = this.props.location.pathname.slice(1);
    this.document = documents[`${this.gameCode}Document`];
    this.changeSelectedChartPoint = this.changeSelectedChartPoint.bind(this);
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
    return (
      // <div>
      //   <GamePageHeader
      //     gameCode={this.gameCode}
      //     document={this.document}
      //   />
      //   <Tabs>
      //     <TabList>
      //       <Tab>Chart</Tab>
      //       <Tab>Table</Tab>
      //     </TabList>

      //     <TabPanel>
      //       <Chart
      //         gameCode={this.gameCode}
      //         document={this.document}
      //         clicked={this.state.clickedChartPoint}
      //         changeSelectedChartPoint={this.changeSelectedChartPoint}
      //       />
      //       <CarouselWrapper
      //         docType={this.props.location.pathname === '/mm2' ? 'speedrun' : 'highscore'}
      //       >
      //         <InfoCarousel
      //           gameCode={this.gameCode}
      //           document={this.document}
      //           selected={this.state.selectedCarouselItem}
      //           changeSelectedChartPoint={this.changeSelectedChartPoint}
      //         />
      //       </CarouselWrapper>
      //       {/* {this.state.selectedRun ? <VodEmbed vodUrl={this.state.selectedRun.vodUrl} /> : null} */}
      //     </TabPanel>
      //     <TabPanel>
      //       <RecordsTable
      //         gameCode={this.gameCode}
      //         document={this.document}
      //       />
      //     </TabPanel>
      //   </Tabs>
      // </div>
      <div>
        <Collapse defaultActiveKey={['1']}>
          <Panel header='Game Information' key='1' showArrow={false}>
            <GamePageHeader
              gameCode={this.gameCode}
              document={this.document}
            />
          </Panel>
        </Collapse>
        <Tabs size='large' type='card'>
          <TabPane tab={<i className="fas fa-chart-line"></i>} key='1'>
            <Chart
              gameCode={this.gameCode}
              document={this.document}
              clicked={this.state.clickedChartPoint}
              changeSelectedChartPoint={this.changeSelectedChartPoint}
            />
            <EmbeddedCarouselWrapper
              docType={this.props.location.pathname === '/mm2' ? 'speedrun' : 'highscore'}
            >
              <InfoCarousel
                embedded={true}
                gameCode={this.gameCode}
                document={this.document}
                selected={this.state.selectedCarouselItem}
                changeSelectedChartPoint={this.changeSelectedChartPoint}
              />
            </EmbeddedCarouselWrapper>
          </TabPane>
          <TabPane tab={<i className="fas fa-table"></i>} key='2'>
            <RecordsTable
              gameCode={this.gameCode}
              document={this.document}
            />
          </TabPane>
        </Tabs>
        {
          this.state.selectedRun ? 
            <RecordDetailWrapper>
              <VodEmbed vodUrl={this.state.selectedRun.vodUrl} />
              <InfoCarousel
                embedded={false}
                gameCode={this.gameCode}
                document={this.document}
                selected={this.state.selectedCarouselItem}
                changeSelectedChartPoint={this.changeSelectedChartPoint}
              />
            </RecordDetailWrapper>
          : 
            null
        }
      </div>
    )
  }
};