import React from 'react';
import { Link } from 'react-router-dom';

import { LightGreenModule } from '../../styledComponents.js';
import Chart from '../../charts/Chart.jsx';

import { document as dkDocument } from '../../../data/dkDocument.js';
import { document as mm2Document } from '../../../data/mm2Document.js';

const documents = {dkDocument, mm2Document};

export default class FeaturedChartModule extends React.Component {
  constructor(props) {
    super(props);
    this.gameCode = Math.random() >= 0.5 ? 'dk' : 'mm2';
    this.document = documents[`${this.gameCode}Document`];
  }

  render() {
    return (
      <LightGreenModule>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>Featured Chart</h3>
        <Chart gameCode={this.gameCode} document={this.document} />
        <Link to={'/' + this.gameCode}>See full chart!</Link>
      </LightGreenModule>
    );
  }
};