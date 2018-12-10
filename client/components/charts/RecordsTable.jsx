import React from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';

import { formatHighScore } from './chartUtils.js';
import { secsToTs, formatUTCMillisecsToDateStr } from '../../utils/datetimeUtils.js';
import '../../../node_modules/react-table/react-table.css';
import '../../assets/stylesheets/classStyles.css';

class RecordsTable extends React.Component {
  constructor(props) {
    super(props);
    this.records = this.props.document.records;
  }

  render() {
    let markHeader = this.props.document.type === 'speedrun' ? 'Time' : 'Score';
    let markAccessor = this.props.document.type === 'speedrun' ? secsToTs : formatHighScore;
    const columns = [
      {
        id: 'date',
        Header: 'Date',
        accessor: r => formatUTCMillisecsToDateStr(Date.UTC(r.year, r.month, r.day) + utcOffsetMS)
      },
      {
        id: 'mark',
        Header: markHeader,
        accessor: r => markAccessor(r.mark)
      },
      {
        Header: 'Player',
        accessor: 'playerName'
      },
      {
        Header: 'Note',
        accessor: 'tooltipNote'
      }
    ]
    return (
      <ReactTable
        data={this.records}
        columns={columns}
        pageSize={12}
      />
    )
  }
};

export default RecordsTable;