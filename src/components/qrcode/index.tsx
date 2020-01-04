import React, { Component } from 'react';
import style from './qrcode.module.css';
import qr from './qrcode.jpeg';
import { AUTHOR } from '../../constant';

class QrCode extends Component {

  render() {
    return (
      <div className={style.qrcode}>
        <img src={qr} alt={AUTHOR} />
      </div>
    );
  }
}

export default QrCode;