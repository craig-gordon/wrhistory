import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ChartInputButtonGroup = (props) => (
  <ButtonContainer>
    <Button
      className='save-btn'
      disabled={props.chartSaveButtonDisabled}
      type='primary'
      size='large'
      onClick={() => {
        props.saveToChangelog('chartInput');
      }}
    >
      Save
    </Button>
  </ButtonContainer>
);

export default ChartInputButtonGroup;