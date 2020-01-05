import './App.css';

import { Col, Row } from 'antd';
import React, { Component } from 'react';
import Content from './components/content';
import Header from './components/header';
import Author from './components/author';
import Links from './components/links';
import Page from './components/page';

import { GITHUB, AUTHOR, SITE_NAME } from './constant';

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
                  <Header siteName={SITE_NAME} cb={this.setKeyword.bind(this)} />
                  <Author github={GITHUB} author={AUTHOR} />
                  <Content keyword={this.state.keyword} />
                </div>
              ) : <Page />}
            <Links github={GITHUB} />
          </Col>
        </Row>
      </div>
    );
  }
}


export default App;
