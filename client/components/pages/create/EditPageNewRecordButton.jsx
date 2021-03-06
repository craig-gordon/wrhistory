import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const EditPageNewRecordButton = (props) => (
  <Button
    className='edit-page-new-record-btn'
    type='primary'
    size='small'
    onClick={() => {
      props.changePage(props.totalPages + 1);
    }}
  >
    Add Record
  </Button>
);

export default EditPageNewRecordButton;