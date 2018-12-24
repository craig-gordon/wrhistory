import React from 'react';
// import Button from 'antd/lib/button';
// import 'antd/lib/button/style/index.css';

import StandardButton from '../../common/StandardButton.jsx';

const InitialButtonGroup = (props) => {
  return (
    <div style={{'textAlign': 'center'}}>
      <StandardButton
        title='Speedrun'
        iconClasses='fas fa-stopwatch'
        iconSide='left'
        onClickFn={() => props.setChartType('speedrun')}
      /> <StandardButton
        title='High Score'
        iconClasses='fas fa-trophy'
        iconSide='left'
        onClickFn={() => props.setChartType('highscore')}
      />
    </div>
  );
};

export default InitialButtonGroup;