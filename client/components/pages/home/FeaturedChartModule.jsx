import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { LightGreenModule } from '../../common/styledComponents.js';
import Chart from '../../charts/Chart.jsx';

export default class FeaturedChartModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      document: undefined
    };
  }

  componentDidMount() {
    axios.get('/api/home/getRandomFeaturedChart')
      .then(res => {
        this.setState((state, props) => ({dataLoaded: true}), () => {
          this.setState({document: res.data});
        })
      })
      .catch(err => {
        console.log('Error retrieving Document from database:', err);
      });
  }

  render() {
    return (
      <LightGreenModule>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>Featured Chart</h3>
        <Chart document={this.state.document} dataLoaded={this.state.dataLoaded} />
        {this.state.document ? <Link to={`/chart${this.state.document.uriEndpoint}`}>See full chart!</Link> : null}
      </LightGreenModule>
    );
  }
};