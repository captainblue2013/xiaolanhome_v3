import './App.css';

import { Col, Row } from 'antd';
import React, { Component } from 'react';
import Content from './components/content';
import Header from './components/header';
import Author from './components/author';
import Links from './components/links';
import Page from './components/page';

class App extends Component<{}, { keyword: string }> {

  state = {
    keyword: '',
  }

  setKeyword(word: string) {
    this.setState({
      ...this.state,
      keyword: word,
    });
  }

  render() {
    return (
      <div className="App">
        <Row type="flex" justify="center">
          <Col span={24}>
            {window.location.pathname === '/' ?
              (
                <div>
                  <Header />
                  <Author />
                  <Content />
                </div>
              ) : <Page />}
            <Links />
          </Col>
        </Row>
      </div>
    );
  }
}


export default App;
