import React, { Component } from "react";
import { Col, Row } from "antd";
import Logo from "../logo";
import style from './author.module.css';

class Author extends Component<{ github: string, author: string }, {}> {
  render() {
    const { github, author } = this.props;
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={3}>
            <Logo />
          </Col>
          <Col span={21}>
            <p className={style.slogan}>
              <a href={github} >{author}</a> 个人博客
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Author;