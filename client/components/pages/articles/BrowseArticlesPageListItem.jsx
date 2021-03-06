import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ArticleTagsList from './ArticleTagsList.jsx';

import { PurpleBox } from '../../common/styledComps.js';
import { formatUTCMillisecsToDateStr } from '../../../utils/datetimeUtils.js';

const AuthorText = styled.span`
  color: gray;
  font-size: 13px;
`;

const DateText = styled.span`
  color: darkred;
  font-size: 13px;
  margin-left: 8px;
`;

const BodyText = styled.div`
  padding: 18px 0 0 0;
`;

const FullArticleLink = styled(Link)`
  color: gray;
  padding: 12px 0 0 0;
  text-decoration-line: none;
`;

const BrowseArticlesPageListItem = (props) => {
  let coverImage = props.article.videoUrl ? `https://i.ytimg.com/vi/${props.article.videoId}/hqdefault.jpg` : `../../../assets/images/articles/${props.article.coverImage}`;
  let bodyText = props.article.description || props.article.detailedText;
  let bodyTextCutoff = bodyText.slice(0, bodyText.slice(0, 300).lastIndexOf('.') + 1);
  bodyTextCutoff = bodyTextCutoff || bodyText.slice(0, bodyText.slice(0, 300).lastIndexOf(')') + 1);
  bodyTextCutoff = bodyTextCutoff || bodyText.slice(0, bodyText.slice(0, 300).lastIndexOf('!') + 1);
  return (
    <PurpleBox>
      {/* <Row gutter={16}>
        <Col span={3}>
          <Link to={`/articles/${props.article.id}`}>
            <img
              src={coverImage}
              height='100%'
              width='100%'
            />
          </Link>
        </Col>
        <Col span={21}>
          <Link to={`/articles/${props.article.id}`}>
            <b>
              {props.article.title}
            </b>
          </Link>
          <div>
            <AuthorText>
              by {props.article.creator}
            </AuthorText>
            <DateText>
              {formatUTCMillisecsToDateStr(props.article.publicationTimestamp)}
            </DateText>
          </div>
          <BodyText>
            {bodyTextCutoff}
          </BodyText>
          <ArticleTagsList
            relatedGameAbbrevs={props.article.relatedGameAbbrevs}
            relatedTopicAbbrevs={props.article.relatedTopicAbbrevs}
          />
        </Col>
      </Row> */}
    </PurpleBox>
  )
};

export default BrowseArticlesPageListItem;