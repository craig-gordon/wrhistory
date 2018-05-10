import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Chart from './Chart.jsx';

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
    this.state = {
    }
  }

  render() {
    return (
      <Module>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>Featured Chart</h3>
        <Chart />
        <Link to='/mm2'>See full chart!</Link>
      </Module>
    );
  }
};