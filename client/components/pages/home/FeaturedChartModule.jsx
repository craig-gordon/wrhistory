import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { LightGreenModule } from '../../common/styledComponents.js';
import Chart from '../../charts/Chart.jsx';

import { document as dkDocument } from '../../../data/dkDocument.js';
import { document as mm2Document } from '../../../data/mm2Document.js';

const documents = {dkDocument, mm2Document};

export default class FeaturedChartModule extends React.Component {
  constructor(props) {
    super(props);
    let code = Math.random() >= 1 ? 'dk' : 'mm2';
    this.state = {
      gameCode: code,
      document: documents[`${code}Document`]
    };
  }

  componentDidMount() {
    axios.get('/api/home/getRandomFeaturedChart')
      .then(res => {
        console.log('response:', res);
        let document = res.data;
        // this.setState({document});
      })
      .catch(err => {
        console.log('Error retrieving Document from database:', err);
      });
  }

  render() {
    return (
      <LightGreenModule>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>Featured Chart</h3>
        <Chart gameCode={this.state.gameCode} document={this.state.document} />
        <Link to={'/' + this.gameCode}>See full chart!</Link>
      </LightGreenModule>
    );
  }
};