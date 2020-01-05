import { Input, Row, Col } from 'antd';
import React, { Component } from 'react';

import style from './header.module.css';

const { Search } = Input;

class Header extends Component<{ hideSearch?: boolean, siteName: string, cb: (value: string) => void }, { keyword: string }> {

  state = {
    keyword: '',
  };

  doSearch(value: string) {
    const { cb } = this.props;
    cb(value);
    this.setState({
      ...this.state,
      keyword: value,
    });
  }

  render() {
    const { siteName } = this.props;

    return (
      <div className={style.headline}>


        {!this.props.hideSearch ? (
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

export default Header;