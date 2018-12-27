import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const NextPageIcon = styled.span`
  color: ${props => props.disabled ? 'rgb(245, 245, 245)' : 'rgb(24,144,255)'};
  font-weight: bold;
  background-color: ${props => props.disabled ? 'rgb(217, 217, 217)' : 'white'};
  border-radius: 24px;
  padding: 0 5px;
`;

const RecordInputButtonGroup = (props) => (
  <ButtonContainer>
    {
      props.location === '/create' && props.currentPage === props.totalPages
        ? <Button
            className='next-btn'
            disabled={props.recordInputButtonDisabled}
            type='primary'
            size='large'
            onClick={() => {
              props.submitData();
            }}
          >
            <span style={{marginRight: '8px'}}>
              Next
            </span>
            <NextPageIcon disabled={props.recordInputButtonDisabled}>
              {props.totalPages + 1}
            </NextPageIcon>
          </Button>
        : <Button
            className='save-btn'
            disabled={props.recordInputButtonDisabled}
            type='primary'
            size='large'
            onClick={() => {
              props.submitData();
            }}
          >
            Save        
          </Button>
    }
  </ButtonContainer>
);

export default RecordInputButtonGroup;