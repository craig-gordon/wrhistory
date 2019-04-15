import React from 'react';
import styled from 'styled-components';

import { secsToTs, formatYMDToMonthDayYear } from '../../../utils/datetimeUtils.js';

const colors = {
  chart: {
    headerBackground: 'rgb(166, 255, 166)',
    bodyBackground: 'honeydew',
    border: '1px solid mediumaquamarine'
  },
  record: {
    headerBackground: '#beffff',
    bodyBackground: 'azure',
    border: '1px solid skyblue'
  },
  example: {
    headerBackground: '#d19bef',
    bodyBackground: 'rgb(232, 193, 255)',
    border: '1px solid #d19bef'
  }
};

const Card = styled.div`
  border-radius: 8px;
  text-align: start;
  word-wrap: break-word;
  opacity: ${props => props.obsolete ? '0.35' : '1'};
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: 1em;
  margin: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: rgb(56, 56, 56);
  background: ${props => colors[props.cardType].headerBackground};
  border: ${props => colors[props.cardType].border};
`;

const RecordNumber = styled.span`
  color: white;
  background-color: rgb(84, 84, 84);
  border-radius: 1.5em;
  padding: 0 0.3em;
  margin-right: 0.4em;
`;

const Title = styled.h4`
  margin-bottom: 0;
  margin-right: 1em;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderIcon = styled.i`
  transition: font-size .1s;
  margin-left: 0.5em;

  :hover {
    color: black;
    cursor: pointer;
  }
`;

const Body = styled.div`
  padding: 1em;
  margin: 0;
  border-left: ${props => colors[props.cardType].border};
  border-bottom: ${props => colors[props.cardType].border};
  border-right: ${props => colors[props.cardType].border};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: ${props => colors[props.cardType].bodyBackground};
  min-height: 12.5em;
`;

const Item = styled.div`
  margin-bottom: 0.5em;
  line-height: 1.3;
`;

const Label = styled.span`
  color: rgb(66, 66, 66);
  margin-right: 0.75em;
  font-weight: bold;
  white-space: nowrap;
`;

const Text = styled.span`
  color: rgb(95, 95, 95);
`;

const ChangelogCard = (props) => {
  let { gameTitle, category, leaderboardUrl, playerName, mark, year, month, day, vodUrl, labelText, tooltipNote, detailedText, isMilestone, exampleTitle } = props.card;
  let title;
  if (props.cardType === 'chart') {
    title = `${gameTitle}${category ? ` — ${category}` : ''}`;
  } else if (props.cardType === 'record') {
    title = `${playerName} — ${props.chartType === 'speedrun' ? secsToTs(mark) : mark}`;
  } else {
    title = exampleTitle;
  }
  return (
    <Card
      cardType={props.cardType}
      obsolete={props.obsolete}
      style={{display: props.hide ? 'none' : 'initial'}}
    >
      <Header cardType={props.cardType}>
        {props.cardType === 'record' ? <RecordNumber cardType={props.cardType}>{props.recordPage}</RecordNumber> : <span />}
        <Title>{title}</Title>
        {props.cardType === 'example'
          ? null
          : <IconContainer>
              {
                props.cardType === 'record'
                  ? <HeaderIcon
                      title='View Record in Editor'
                      className='fas fa-reply'
                      onClick={(e) => {
                        if (props.currentPage !== props.recordPage) {
                          props.changePage(props.recordPage);
                        }
                      }}
                    />
                  : null
              }
              <HeaderIcon
                title='Undo Change'
                className='fas fa-times-circle'
                onClick={(e) => {
                  props.deleteChangelogItem(props.cardType, props.changelogIdx);
                }}
              />
              <HeaderIcon
                title={`Delete All Changes ${props.cardType === 'chart' ? 'to the Central Chart Information' : 'for this Record'}`}
                className="far fa-trash-alt"
              />
            </IconContainer>}
      </Header>
      <Body cardType={props.cardType}>
        {/* Chart */}
        {gameTitle ? <Item><Label>Game</Label><Text>{gameTitle}</Text></Item> : null}
        {category ? <Item><Label>Category</Label><Text>{category}</Text></Item> : null}
        {leaderboardUrl ? <Item><Label>Leaderboard</Label><Text>{leaderboardUrl}</Text></Item> : null}

        {/* Record */}
        {playerName ? <Item><Label>Player</Label><Text>{playerName}</Text></Item> : null}
        {mark ? <Item><Label>{props.chartType === 'speedrun' ? 'Time' : 'Score'}</Label><Text>{props.chartType === 'speedrun' ? secsToTs(mark) : mark}</Text></Item> : null}
        {year ? <Item><Label>Date</Label><Text>{formatYMDToMonthDayYear(year, month, day)}</Text></Item> : null}
        {vodUrl ? <Item><Label>VOD</Label><Text>{vodUrl}</Text></Item> : null}
        {labelText ? <Item><Label>Label</Label><Text>{labelText}</Text></Item> : null}
        {tooltipNote ? <Item><Label>Tooltip</Label><Text>{tooltipNote}</Text></Item> : null}
        {detailedText ? <Item><Label>Detailed</Label><Text>{detailedText}</Text></Item> : null} {/* also for Example */}
        {isMilestone ? <Item><Label>Milestone</Label><Text>{isMilestone ? 'Yes' : 'No'}</Text></Item> : null}
      </Body>
    </Card>
  )
}

export default ChangelogCard;