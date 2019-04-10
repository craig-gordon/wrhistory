import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { GreenBox } from '../../common/styledComps.js';
import Chart from '../../charts/Chart.jsx';

class FeaturedChartModule extends React.Component {
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
        this.setState(() => ({dataLoaded: true}), () => {
          this.setState({document: res.data});
        })
      })
      .catch(err => {
        console.log('Error retrieving Document from database:', err);
      });
  }

  render() {
    return (
      <GreenBox>
        <h3 style={{textAlign: 'center', fontSize: '1.25em'}}>Featured Chart</h3>
        <Chart
          document={this.state.document}
          dataLoaded={this.state.dataLoaded}
          history={this.props.history}
          location='home'
          allowReflow={true}
        />
      </GreenBox>
    );
  }
};

export default FeaturedChartModule;