import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const NextPageIcon = styled.span`
  color: ${props => props.disabled ? 'rgb(120, 140, 158)' : 'rgb(24,144,255)'};
  font-weight: bold;
  background-color: ${props => props.disabled ? 'rgb(217, 217, 217)' : 'white'};
  border-radius: 24px;
  padding: 0 5px;
`;

const RecordInputButtonGroup = (props) => (
  <ButtonContainer>
    {
      // Continue / Next Record / Jump To / Save button
      props.currentPage === props.totalPages
        ? <Button
            className={props.currentPage === 2 ? 'continue-btn' : 'next-btn'}
            disabled={props.isNextButtonDisabled()}
            type='primary'
            size='large'
            onClick={() => {
              props.submitData();
            }}
          >
            <span style={{marginRight: '8px'}}>
              Next Record
            </span>
            <i style={{marginRight: '8px'}} className="far fa-save" />
            <NextPageIcon disabled={props.isNextButtonDisabled()}>
              {props.totalPages + 1}
            </NextPageIcon>
          </Button>
        : <Button
            className={props.showJumpToButton ? 'jump-to-btn' : 'save-btn'}
            type='primary'
            size='large'
            onClick={() => {
              let blockPageChange = props.showJumpToButton ? false : true;
              props.showJumpToButton ? props.changePage(props.totalPages) : props.submitData(blockPageChange);
              props.showJumpToButton ? props.emptyInputFields() : props.toggleJumpToButton();
            }}
          >
            <span style={{marginRight: '8px'}}>
              {props.showJumpToButton ? 'Jump to' : 'Save'}
            </span>
            {props.showJumpToButton
              ? <i style={{marginRight: '8px'}} className={props.totalPages - props.currentPage === 1 ? "fas fa-step-forward" : "fas fa-fast-forward"} />
              : <i className="far fa-save" />}
            {props.showJumpToButton
              ? <NextPageIcon>
                  {props.totalPages - 2}
                </NextPageIcon>
              : null}             
          </Button>
    }

    {
      // Finish button
      props.totalPages >= 3
        ? <Button
            className={props.finished ? 'green-btn-view-chart' : 'green-btn-finish'}
            type='primary'
            size='large'
            onClick={props.handleFinish}
          >
            <span style={{marginRight: '8px'}}>
              {props.finished ? 'View Chart Page' : 'Finish'}
            </span>
            {props.finished ? null : <i style={{marginRight: '8px'}} className="far fa-save" />}
            <i className={props.finished ? 'fas fa-external-link-square-alt' : 'fas fa-check'} />
          </Button>
        : null
    }
  </ButtonContainer>
);

export default RecordInputButtonGroup;