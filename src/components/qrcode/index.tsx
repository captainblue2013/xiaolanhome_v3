import { useStore } from '@mohism/react-duce-ts';
import React from 'react';

import qr from './qrcode.jpeg';
import style from './qrcode.module.css';

function QrCode() {
  const [{author}] = useStore('constant');
  return (
    <div className={style.qrcode}>
      <img src={qr} alt={author} />
    </div>
  );
}
export default QrCode;