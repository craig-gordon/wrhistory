import styled from 'styled-components';
import { LightBlueModule, LightGreenModule } from '../../common/styledComponents.js';


export const ColumnHeader = styled.h3`
  text-align: center;
`;


export const CreateChartPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 38% 62%;
`;


export const LeftColumn = LightBlueModule.extend`
  margin-right: 10px;
`;


export const LeftColumnHeader = ColumnHeader.extend`
  justify-self: center;
`;


export const LeftColumnHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.currentPage === 2 ? '1fr 1fr 1fr' : '1.8fr 1fr 1.8fr'};
  align-items: start;
`;


export const RightColumn = LightGreenModule.extend`
  margin-left: 10px;
`;


export const CurrentPageIcon = styled.span`
  color: whitesmoke;
  background-color: rgb(84, 84, 84);
  border-radius: 24px;
  margin-left: 6px;
  padding: 0 6px;
`;