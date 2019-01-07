import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  display: grid;
  grid-auto-rows: auto;
`;

const Item = styled.li`
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: min-content 1fr;
`;

const LastItem = styled(Item)`
  margin-bottom: 0;
`;

const Year = styled.b`
  margin-right: 1em;
`;

export const findCurrentDateEvents = (docs) => {
  let now = new Date(Date.now());
  let currentDay = now.getDate();
  let currentMonth = now.getMonth();
  return [
    'Richard Ureta completed the first recorded Mega Man 2 speedrun in 30:39',
    'Jorf improved the Kid Icarus any% record to 25:23',
    'Robbie Lakeman achieved the current top score in Donkey Kong with a monumental 1,247,700'
  ]
};

export const createOnThisDayHTML = function(events) {
  return (
    <List>
      <Item>
        <Year>2004</Year>
        {events[0]}
      </Item>
      <Item>
        <Year>2014</Year>
        {events[1]}
      </Item>
      <LastItem>
        <Year>2018</Year>
        {events[2]}
      </LastItem>
    </List>
  )
};