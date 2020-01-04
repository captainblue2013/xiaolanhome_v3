import React, { Component } from "react";
import style from './links.module.css';
import { Icon, Popover } from "antd";
import QrCode from '../qrcode';


class Links extends Component<{ github: string }, {}> {

  render() {
    const { github } = this.props;
    return (
      <div className={style.linksBar}>
        <a href={github}><Icon type="github" />Github</a>
        <a
          onClick={(e) => { e.preventDefault() }}
          href="."
        >
          <Popover placement="topLeft" content={<QrCode />}>
            <Icon type="wechat" />Wechat
          </Popover>
        </a>
      </div>
    );
  }
}

export default Links;