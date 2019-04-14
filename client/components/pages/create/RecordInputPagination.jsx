import React from 'react';
import styled from 'styled-components';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/index.css';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const DoubleArrow = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, ${props => props.active ? '0.65' : '0.25'});
  cursor: ${props => props.active ? 'pointer' : 'default'};
  display: inline-block !important;
  transition: all .3s;

  ${props => props.active
    ? `:hover {
        color: #1890ff;
      }

      :focus {
        color: #1890ff;
      }`
    : ''
  }
`;

const RecordInputPagination = (props) => (
  <Container>
    <DoubleArrow
      title='First Page'
      className='anticon anticon-double-left'
      active={props.doubleLeftActive}
      onClick={() => {
        if (props.doubleLeftActive) {
          props.changePage(1)
        }
      }}
    />
    <Pagination
      simple
      size='small'
      pageSize={1}
      total={props.totalPages}
      current={props.currentPage}
      onChange={(e) => props.changePage(e)}
    />
    <DoubleArrow
      title='Last Page'
      className='anticon anticon-double-right'
      active={props.doubleRightActive}
      onClick={() => {
        if (props.doubleRightActive) {
          props.changePage(props.totalPages)
        }
      }}
    />
  </Container>
);

export default RecordInputPagination;