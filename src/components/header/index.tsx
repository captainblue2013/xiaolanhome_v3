import { useStore } from '@mohism/react-duce-ts';
import { Col, Input, Row } from 'antd';
import React from 'react';

import style from './header.module.css';
import { setKeyword } from '../../state_v2/keyword/action';

const { Search } = Input;

function Header({ title, hiddenSearch = false }: { title?: string, hiddenSearch?: boolean }) {
  const [{ siteName }] = useStore('constant');
  const [, dispatchKeyword] = useStore('keyword');

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
              onSearch={value => dispatchKeyword(setKeyword(value))}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      ) : (
          <h1>{title}</h1>
        )}
    </div>
  )
}

export default Header;