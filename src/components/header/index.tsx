import React, { Component } from "react";
import style from './header.module.css';

class Header extends Component<{ siteName: string }, {}> {
  render() {
    const { siteName } = this.props;
    return (
      <div className={style.headline}>
        <h1>{siteName}</h1>
      </div>
    )
  }
}

export default Header;