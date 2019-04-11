import styled from 'styled-components';
import { BlueBox, GreenBox, PurpleBox } from '../../common/styledComps.js';

// Create Chart Page

export const ColumnHeader = styled.h3`
  text-align: center;
  color: rgb(84, 84, 84);
  font-size: 20px;
`;

export const CreateChartPageWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 40% 60%;
  grid-gap: 20px;
  grid-auto-flow: column;
`;

export const ChartInputBox = GreenBox.extend`
`;

export const RecordInputBox = BlueBox.extend`
  grid-row: span 2;
`;

export const RecordInputHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.currentPage === 2 ? '1fr 1fr 1fr' : '1.8fr 1fr 1.8fr'};
  align-items: start;
`;

export const RecordInputHeader = ColumnHeader.extend`
  justify-self: center;
`;

export const ChartBox = GreenBox.extend`
  grid-row: span 2;
`;

export const ChangelogBox = PurpleBox.extend`
  padding: 20px 0;
`;

export const CurrentPageIcon = styled.span`
  color: whitesmoke;
  background-color: rgb(84, 84, 84);
  border-radius: 24px;
  margin-left: 6px;
  padding: 0 6px;
`;

// Create Chart Page User Inputs