import React, { Component } from "react";
import style from './links.module.css';
import { Icon } from "antd";

class Links extends Component<{ github: string }, {}> {

  render() {
    const { github } = this.props;
    return (
      <div className={style.linksBar}>
        <a href={github}><Icon type="github" />Github</a>
        <a
          onClick={(e) => { e.preventDefault() }}
          href="."
        ><Icon type="wechat" />Wechat</a>
      </div>
    );
  }
}

export default Links;