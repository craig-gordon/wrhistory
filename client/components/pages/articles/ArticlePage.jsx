import React from 'react';
// import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

import { BlueBox } from '../../common/styledComps.js';
import { articles } from '../../../data/sampleArticles.js';

const ArticlePageWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ArticlePage = (props) => {
  let article = articles[props.match.params.id]
  return (
    <ArticlePageWrapper>
      <Button.Group size='large'>
        <Button
          type='primary'
          href={`/articles/${article.id - 1}`}
        >
          <i className="fas fa-arrow-left"></i>
        </Button>
        <Button
          type='primary'
          href='/articles'
        >
          <i className="fas fa-home"></i>
        </Button>
        <Button
          type='primary'
          href={`/articles/${article.id + 1}`}
        >
          <i className="fas fa-arrow-right"></i>
        </Button>
      </Button.Group>
      <BlueBox>
        <h2>{article.title}</h2>
        {/* <VideoWrapper>
          <ReactPlayer
            url={article.videoUrl}
            height='540px'
            width='960px'
          />
        </VideoWrapper> */}
        <div>{article.description}</div>
      </BlueBox>
    </ArticlePageWrapper>
  );
};

export default ArticlePage;