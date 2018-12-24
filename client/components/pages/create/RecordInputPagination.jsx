import React from 'react';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/index.css';

const RecordInputPagination = (props) => (
  <Pagination
    simple
    size='small'
    pageSize={1}
    total={props.totalPages}
    current={props.currentPage}
    onChange={(e) => {
      if (e === props.totalPages) props.emptyInputFields();
      props.changePage(e);
    }}
  />
);

export default RecordInputPagination;