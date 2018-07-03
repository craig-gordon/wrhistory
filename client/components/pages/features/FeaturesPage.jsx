import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
import { Link } from 'react-router-dom';

import { LightPurpleModule } from '../../common/styledComponents.js';

const Header = styled.h1`
  text-align: center;
`;

export default class FeaturesPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header>
          Features
        </Header>
        <div style={{'textAlign': 'center'}}>
          <Button.Group size='large'>
            <Button type='primary'>
              Previous Feature
            </Button>
            <Button type='primary'>
              {<i class="fas fa-home"></i>}
            </Button>
            <Button type='primary'>
              Next Feature
            </Button>
          </Button.Group>
        </div>
        <LightPurpleModule>
          Goose Video
        </LightPurpleModule>
        <LightPurpleModule>
          Article by Prier
        </LightPurpleModule>
        <LightPurpleModule>
          Summoningsalt Video
        </LightPurpleModule>
      </div>
    )
  }
};