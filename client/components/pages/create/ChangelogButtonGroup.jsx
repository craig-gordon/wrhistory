import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ChangelogButtonGroup = (props) => (
  <ButtonContainer>
    <Button
      type='primary'
      size='large'
      disabled={props.finishButtonDisabled}
      onClick={props.handleFinish}
    >
      <span style={{marginRight: '8px'}}>
        {props.finished ? 'View Chart Page' : 'Finish'}
      </span>
      {props.finished ? null : <i style={{marginRight: '8px'}} className="far fa-save" />}
      <i className={props.finished ? 'fas fa-external-link-square-alt' : 'fas fa-check'} />
    </Button>
  </ButtonContainer>
);

export default ChangelogButtonGroup;