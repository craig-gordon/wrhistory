import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { LightGreenModule } from '../../common/styledComponents.js';
import Chart from '../../charts/Chart.jsx';

import { document as mm2Document } from '../../../data/mm2Document.js';

export default class FeaturedChartModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: mm2Document
    };
  }

  componentDidMount() {
    axios.get('/api/home/getRandomFeaturedChart')
      .then(res => {
        console.log('response for getRandomFeaturedChart:', res);
        let document = res.data;
        console.log('this.state.document before setState:', this.state.document);
        this.setState({document});
        console.log('this.state.document after setState:', this.state.document);
      })
      .catch(err => {
        console.log('Error retrieving Document from database:', err);
      });
  }

  render() {
    return (
      <LightGreenModule>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>Featured Chart</h3>
        <Chart document={this.state.document} />
        <Link to={`/game${this.state.document.uriEndpoint}`}>See full chart!</Link>
      </LightGreenModule>
    );
  }
};