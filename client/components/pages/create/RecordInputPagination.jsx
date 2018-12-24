import React from 'react';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/index.css';

const RecordInputPagination = (props) => (
  <Pagination
    simple
    size='small'
    pageSize={1}
    total={props.totalPages - 2}
    current={props.currentPage === 2 ? 0 : props.currentPage - 2}
    onChange={(e) => {
      if (e + 2 === props.totalPages) props.emptyInputFields();
      props.changePage(e + 2);
    }}
  />
);

export default RecordInputPagination;