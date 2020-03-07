import { useStore } from '@mohism/react-duce-ts';
import { Icon, Popover } from 'antd';
import React from 'react';

import QrCode from '../qrcode';
import style from './links.module.css';

function Links() {
  const [{ github }] = useStore('constant');
  
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
      <p>build: 200215</p>
    </div>
  );
}

export default Links;