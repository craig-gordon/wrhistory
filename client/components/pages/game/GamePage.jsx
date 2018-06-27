import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import GamePageHeader from './GamePageHeader.jsx';
import Chart from '../../charts/Chart.jsx';
import EmbeddedCarousel from '../../charts/EmbeddedCarousel.jsx';
import RecordsTable from '../../charts/RecordsTable.jsx';
import VodEmbed from './VodEmbed.jsx';

import { document as dkDocument } from '../../../data/dkDocument.js';
import { document as mm2Document } from '../../../data/mm2Document.js';

const documents = {dkDocument, mm2Document};

const CarouselWrapper = styled.div`
  position: absolute;
  top: -500px;
  left: ${props => props.docType === 'speedrun' ? '1060px' : '300px'};
`;

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
      <div>
        <GamePageHeader
          gameCode={this.gameCode}
          document={this.document}
        />
        <Tabs>
          <TabList>
            <Tab>Chart</Tab>
            <Tab>Table</Tab>
          </TabList>

          <TabPanel>
            <Chart
              gameCode={this.gameCode}
              document={this.document}
              clicked={this.state.clickedChartPoint}
              changeSelectedChartPoint={this.changeSelectedChartPoint}
            />
            <CarouselWrapper
              docType={this.props.location.pathname === '/mm2' ? 'speedrun' : 'highscore'}
            >
              <EmbeddedCarousel
                gameCode={this.gameCode}
                document={this.document}
                selected={this.state.selectedCarouselItem}
                changeSelectedChartPoint={this.changeSelectedChartPoint}
              />
            </CarouselWrapper>
            {/* {this.state.selectedRun ? <VodEmbed vodUrl={this.state.selectedRun.vodUrl} /> : null} */}
          </TabPanel>
          <TabPanel>
            <RecordsTable
              gameCode={this.gameCode}
              document={this.document}
            />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
};