import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';
// import Row from 'antd/lib/row';
// import Col from 'antd/lib/col';
// import 'antd/lib/grid/style/index.css';

import { articles } from '../../../data/sampleArticles.js';

const ArticlePage = (props) => {
  let article = articles[props.match.params.id]
  return (
    <div style={{'textAlign': 'center'}}>
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
      <div>{article.title}</div>
      <ReactPlayer url={article.videoUrl} />
    </div>
  );
};

export default ArticlePage;