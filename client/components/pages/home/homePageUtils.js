import React from 'react';

export const createOnThisDayHTML = function(events) {
  return (
    <ul>
      <li>{events[0].player} achieved a new world record of {events[0].mark}</li>
      <li>Lorem</li>
      <li>Ipsum</li>
    </ul>
  )
};