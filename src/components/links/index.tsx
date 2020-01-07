import React, { Component } from "react";
import style from './links.module.css';
import { Icon, Popover } from "antd";
import QrCode from '../qrcode';
import connect from "../../state/connect";
import { StateTree } from "../../state/combine";


class Links extends Component {

  render() {
    const { github } = (this.props as StateTree).constant;
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
export default connect(Links);
// export default Links;