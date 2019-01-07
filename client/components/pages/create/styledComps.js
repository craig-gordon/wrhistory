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
  grid-template-columns: 38% 62%;
`;

export const LeftColumn = styled.div`
  margin-right: 10px;
`;

export const ChartInputBox = BlueBox.extend`
`;

export const RecordInputBox = BlueBox.extend`
  margin-top: 20px;
`;

export const RecordInputHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.currentPage === 2 ? '1fr 1fr 1fr' : '1.8fr 1fr 1.8fr'};
  align-items: start;
`;

export const RecordInputHeader = ColumnHeader.extend`
  justify-self: center;
`;

export const RightColumn = styled.div`
  margin-left: 10px;
`;

export const ChartBox = GreenBox.extend`
`;

export const ChangelogBox = PurpleBox.extend`
  margin-top: 20px;
`;

export const CurrentPageIcon = styled.span`
  color: whitesmoke;
  background-color: rgb(84, 84, 84);
  border-radius: 24px;
  margin-left: 6px;
  padding: 0 6px;
`;

// Create Chart Page User Inputs