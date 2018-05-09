import React from 'react';
import styled from 'styled-components';

const Module = styled.div`
  margin: 1% 0;
  background: azure;
  border-style: solid;
  border-color: skyblue;
  border-width: 2px;
  padding: 1% 2% 1% 2%;
`;

const IntroModule = (props) => {
  return (
    <Module>
      <div>
        Welcome to <b>Record History</b>! The aim of this site is to allow members of the Speedrunning and High Score
        communities to organize, archive, and present the storied histories of the games they compete in. Players 
        have the ability to create beautifully customizable charts plotting the evolution of strategies and world 
        records over time in a wiki-style collaborative setting.
      </div>
      <br />
      <div>
        Come in and explore the histories of your favorite speedruns and high scores.
      </div>
    </Module>
  )
}

export default IntroModule;