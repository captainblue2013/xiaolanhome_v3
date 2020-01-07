import { Input, Row, Col } from 'antd';
import React, { Component } from 'react';

import style from './header.module.css';
import { StateTree } from '../../state/combine';
import connect from '../../state/connect';
import { setKeyword } from '../../state/keyword/action';

const { Search } = Input;

class Header extends Component {

  state = {
    keyword: '',
  };

  doSearch(value: string) {
    (this.props as StateTree).dispatch(setKeyword(value));
  }

  render() {
    const { constant: { siteName }, keyword: { hiddenSearch } } = (this.props as StateTree);
    return (
      <div className={style.headline}>
        {!hiddenSearch ? (
          <Row type="flex" justify="center" align="middle">
            <Col lg={12} md={12} sm={24} xs={24}>
              <h1>{siteName}</h1>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Search
                placeholder="输入标签名"
                onSearch={value => this.doSearch(value)}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        ) : (
            <h1>{siteName}</h1>
          )}
      </div>
    )
  }
}

export default connect(Header);