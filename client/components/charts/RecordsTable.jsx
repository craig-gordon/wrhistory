import React from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';

// import { createTableRows } from '../../functions/chartFunctions.js';
import { secsToTs } from '../../functions/timeConversions.js';
import '../../../node_modules/react-table/react-table.css';
import '../../assets/stylesheets/classStyles.css';

class RecordsTable extends React.Component {
  constructor(props) {
    super(props);
    this.records = this.props.document.records;
  }

  render() {
    const columns = [
      {
        Header: 'Date',
        accessor: 'date'
      },
      {
        Header: 'Score',
        accessor: 'mark'
      },
      {
        Header: 'Player',
        accessor: 'player'
      },
      {
        Header: 'Note',
        accessor: 'note'
      }
    ]
    return (
      <ReactTable
        data={this.records}
        columns={columns}
      />
    )
  }
};

export default RecordsTable;