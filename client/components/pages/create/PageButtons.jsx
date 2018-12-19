import React from 'react';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/index.css';

const PageButtons = (props) => {
  let showTopPageButton = props.totalPages >= 3;
  let showPagination = props.totalPages >= 3;
  return (
    <span>

      {showTopPageButton
        ? <Button
            className='create-chart-top-button'
            size='small'
            ghost
            disabled={props.currentPage === 2}
            onClick={() => props.changePage(2)}
          >
            Top
          </Button>
        : null}

      {showPagination
        ? <Pagination
            simple
            size='small'
            pageSize={1}
            total={props.totalPages - 2}
            current={props.currentPage === 2 ? '' : props.currentPage - 2}
            onChange={(e) => {
              if (e + 2 === props.totalPages) props.emptyInputFields();
              props.changePage(e + 2);
            }}
          />
        : null}

    </span>
  );
};

export default PageButtons;