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
      disabled={props.chartInputButtonDisabled}
      type='primary'
      size='large'
      onClick={() => {
        props.submitData();
      }}
    >
      Save
    </Button>
  </ButtonContainer>
);

export default ChartInputButtonGroup;