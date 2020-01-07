import React, { Component } from 'react';
import style from './qrcode.module.css';
import qr from './qrcode.jpeg';
import connect from '../../state/connect';
import { StateTree } from '../../state/combine';

class QrCode extends Component {

  render() {
    const { author } = (this.props as StateTree).constant;
    return (
      <div className={style.qrcode}>
        <img src={qr} alt={author} />
      </div>
    );
  }
}

export default connect(QrCode);