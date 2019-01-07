import React from 'react';

import { BlueBox } from '../../common/styledComps.js';

const WelcomeModule = (props) => (
  <BlueBox>
    <h3 style={{'textAlign': 'center'}}>Welcome!</h3>
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
  </BlueBox>
);

export default WelcomeModule;