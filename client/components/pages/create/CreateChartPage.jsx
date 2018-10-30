import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import Chart from '../../charts/Chart.jsx';

import { document } from '../../../data/genericDocument.js';

const Header = styled.h1`
  text-align: center;
`;

const CreateChartPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const OptionsColumn = styled.div`

`;

const ChartColumn = styled.div`

`;

export default class CreateChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Header>Create Chart</Header>
        <CreateChartPageWrapper>
          <OptionsColumn>
            <Input />
          </OptionsColumn>
          <ChartColumn>
            <Chart gameCode='mm2' document={document} />
          </ChartColumn>
        </CreateChartPageWrapper>
      </div>
    );
  }
};