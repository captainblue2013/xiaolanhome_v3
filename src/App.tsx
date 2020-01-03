import './App.css';

import { Col, Row } from 'antd';
import React from 'react';
import Content from './components/content';
import Header from './components/header';
import Author from './components/author';
import Links from './components/links';

import { GITHUB, AUTHOR, SITE_NAME } from './constant';

const App: React.FC = () => {

  return (
    <div className="App">
      <Row type="flex" justify="center">
        <Col span={24}>
          <Header siteName={SITE_NAME} />
          <Author github={GITHUB} author={AUTHOR} />
          <Content />
          <Links github={GITHUB} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
