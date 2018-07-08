import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'antd/lib/grid/style/index.css';

import { LightPurpleModule } from '../../common/styledComponents.js';
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

const FullArticleLink = styled.div`
  color: gray;
  padding: 12px 0 0 0;
`;

const BrowseArticlesPageListItem = (props) => {
  let coverImage = props.article.videoUrl ? `https://i.ytimg.com/vi/${props.article.videoId}/hqdefault.jpg` : `../../../assets/images/articles/${props.article.coverImage}`;
  let bodyText = props.article.description || props.article.detailedText;
  let bodyTextCutoff = bodyText.slice(0, bodyText.slice(0, 300).lastIndexOf('.') + 1);
  bodyTextCutoff = bodyTextCutoff || bodyText.slice(0, bodyText.slice(0, 300).lastIndexOf(')') + 1);
  bodyTextCutoff = bodyTextCutoff || bodyText.slice(0, bodyText.slice(0, 300).lastIndexOf('!') + 1);
  return (
    <LightPurpleModule>
      <Row gutter={16}>
        <Link to={`/articles/${props.article.id}`}>
          <Col span={3}>
            <img
              src={coverImage}
              height='100%'
              width='100%'
            />
          </Col>
        </Link>
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
          <Link to={`/articles/${props.article.id}`}>
            <FullArticleLink>
              View Full Article
            </FullArticleLink>
          </Link>
        </Col>
      </Row>
    </LightPurpleModule>
  )
};

export default BrowseArticlesPageListItem;