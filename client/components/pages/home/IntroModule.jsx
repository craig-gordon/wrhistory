import React from 'react';
import styled from 'styled-components';

import { LightBlueModule } from '../../styledComponents.js';

const IntroModule = (props) => {
  return (
    <LightBlueModule>
      <h3 style={{'text-align': 'center'}}>Welcome!</h3>
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
    </LightBlueModule>
  );
};

export default IntroModule;