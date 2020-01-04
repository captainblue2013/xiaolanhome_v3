import './App.css';

import { Col, Row } from 'antd';
import React from 'react';
import Content from './components/content';
import Header from './components/header';
import Author from './components/author';
import Links from './components/links';
import Page from './components/page';

import { GITHUB, AUTHOR, SITE_NAME } from './constant';

const App: React.FC = () => {

  return (
    <div className="App">
      <Row type="flex" justify="center">
        <Col span={24}>
          {window.location.pathname === '/' ?
            (
              <div>
                <Header siteName={SITE_NAME} />
                <Author github={GITHUB} author={AUTHOR} />
                <Content />
              </div>
            ) : <Page />}
          <Links github={GITHUB} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
