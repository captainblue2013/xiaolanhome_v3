import { Col, Row } from 'antd';
import React from 'react';

import Logo from '../logo';
import style from './author.module.css';

type props = {
  github: string,
  author: string,
}

export default ({ github, author }: props) => {
  return (
    <div>
      <Row type="flex" justify="center">
        <Col lg={3} md={6} sm={6} xs={6}>
          <Logo />
        </Col>
        <Col lg={21} md={18} sm={18} xs={16}>
          <p className={style.slogan}>
            <a href={github} >{author}</a> 个人博客
          </p>
        </Col>
      </Row>
    </div>
  );
}