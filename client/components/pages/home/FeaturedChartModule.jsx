import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Chart from '../../charts/Chart.jsx';

const Module = styled.div`
  margin: 1% 0;
  background: honeydew;
  border-style: solid;
  border-color: mediumaquamarine;
  border-width: 2px;
  padding: 0% 2% 1% 2%;
`;

export default class FeaturedChartModule extends React.Component {
  constructor(props) {
    super(props);
    this.randomGameCode = Math.random() > 1 ? 'dk' : 'mm2';
  }

  render() {
    return (
      <Module>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>Featured Chart</h3>
        <Chart gameCode={this.randomGameCode} />
        <Link to={'/' + this.randomGameCode}>See full chart!</Link>
      </Module>
    );
  }
};