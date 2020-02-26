import './App.css';

import { Col, Row } from 'antd';
import React from 'react';

import Author from './components/author';
import Content from './components/content/index_hooks';
import Header from './components/header';
import Links from './components/links';
import Page from './components/page';

function App() {
  return (
    <div className="App">
      <Row type="flex" justify="center">
        <Col span={24}>
          {window.location.pathname === '/' ?
            (
              <div>
                <Header />
                <Author />
                {/* <Content keyword={keyword} /> */}
                <Content />
              </div>
            ) : <Page />}
          <Links />
        </Col>
      </Row>
    </div>
  );
}

export default App;
