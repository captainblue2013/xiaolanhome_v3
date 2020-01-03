import React, { Component } from 'react';
import style from './index.module.css';
import logo from './logo.png';

class Logo extends Component {
  render() {
    return (
      <div className={style.logo}>
        <img src={logo} alt="logo" />
      </div>
    );
  }
}

export default Logo;