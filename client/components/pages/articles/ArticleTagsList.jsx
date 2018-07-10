import React from 'react';
import styled from 'styled-components';

import { abbrevs } from '../../../data/abbrevs.js';

const TagsList = styled.div`
  margin-top: 16px;
`;

const Tag = styled.span`
  margin-right: 16px;
  color: #ba0000;
  font-size: 14px;
  font-weight: bold;
`;

const ArticleTagsList = (props) => {
  console.log('tags props:', props);
  let gameTags = props.relatedGameAbbrevs.map((gameAbbrev, i) => 
    <Tag key={i}>#{abbrevs[gameAbbrev]}</Tag>
  );
  let topicTags = props.relatedTopicAbbrevs.map((topicAbbrev, i) =>
    <Tag key={i + props.relatedGameAbbrevs.length}>#{abbrevs[topicAbbrev]}</Tag>
  );
  let tags = gameTags.concat(topicTags);
  return (
    <TagsList>
      {tags}
    </TagsList>
  );
};

export default ArticleTagsList;