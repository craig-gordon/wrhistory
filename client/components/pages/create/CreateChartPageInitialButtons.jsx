import React from 'react';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const CreateChartPageInitialButtons = (props) => {
  return (
    <div style={{'textAlign': 'center'}}>
      <Button
        type='primary'
        size='large'
        onClick={() => props.setChartType('speedrun')}
      >
        Speedrun
      </Button>
      <Button
        type='primary'
        size='large'
        onClick={() => props.setChartType('highscore')}
      >
        High Score
      </Button>
    </div>
  );
};

export default CreateChartPageInitialButtons;