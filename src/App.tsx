import './App.css';

import { Col, Row } from 'antd';
import React from 'react';
import Content from './components/content';
import Header from './components/header';
import Author from './components/author';
import Links from './components/links';
import Page from './components/page';
import { useStore } from '@mohism/react-duce-ts';

function App() {
  const [{ keyword }] = useStore('keyword');
  return (
    <div className="App">
      <Row type="flex" justify="center">
        <Col span={24}>
          {window.location.pathname === '/' ?
            (
              <div>
                <Header />
                <Author />
                <Content keyword={keyword} />
              </div>
            ) : <Page />}
          <Links />
        </Col>
      </Row>
    </div>
  );
}

export default App;
