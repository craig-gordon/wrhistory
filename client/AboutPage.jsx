import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = (props) => (
  <div>
    <h1 style={{textAlign: 'center'}}>About</h1>
    <p>Record History is a website devoted to preserving and presenting the history of competitive speedrunning and high scoring.
    We allow community members to create charts and pages detailing the nitty gritty specifics of who achieved which score, what 
    technique was found when, and which games have seen the fiercest competition. The site is built on a wiki-style engine that 
    allows knowledgeable community members to collaborate in order to create the most accurate, comprehensive, and engaging 
    recordkeeping documents possible.</p>

    <p>Speedrunning is the act of playing through a video game with the intent of completing it as quickly as possible. High scoring 
    is, as the name suggests, the pursuit of achieving the highest in-game score in applicable video games.</p>

    <p>Our ultimate goal is to collect the vast, rich history of competitive single-player gaming into one collaborative resource. 
    We hope you'll join us.</p>
  </div>
);

export default AboutPage;