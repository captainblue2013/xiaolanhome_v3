import './App.css';

import { Col, Row } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Author from './components/author';
import Content from './components/content';
import Header from './components/header';
import Links from './components/links';
import Page from './components/page';


function App() {
  return (
    <div className='App'>
      <Row type='flex' justify='center'>
        <Col span={24}>
          <Router>
            <Switch>
              <Route exact path='/'>
                  <Header />
                  <Author />
                  <Content />
              </Route>
              <Route path='/:id'>
                <Page />
              </Route>
            </Switch>
          </Router>
          <Links />
        </Col>
      </Row>
    </div>
  );
}

export default App;
