import React from 'react';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const CreateChartUserInputForms = (props) => {
  if (props.page === 1) {
    return (
      <div>
        <div>Game Title: <Input /></div>
        <div>Category Title: <Input /></div>
        <div>Leaderboard Link: <Input /></div>
      </div>
    )
  } else if (props.page === 2) {
    return (
      <div>
        <div>Y-Axis Tick Interval: <Input /></div>
        <div>Associate Each Player with a Color: <Input /></div>
        <div>Show Player Avatars: <Input /></div>
        <div>Show VOD URLs: <Input /></div>
      </div>
    )
  } else {
    return (
      <div>
        <div>Enter Run Information: <Input /></div>
      </div>
    )
  }
};

export default CreateChartUserInputForms;