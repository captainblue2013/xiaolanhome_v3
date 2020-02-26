import { Tag } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

import { Article } from '../types';
import style from './card.module.css';
import { tagColor } from '../func';


function Card(props: Article) {
  const { title, time, tags, desc, id } = props;
  return (
    <div className={style.card} key={id}>
      <h3>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`/${id}`}
        >
          {title}
        </a>
      </h3>
      <p>
        <span>{dayjs(time * 1000).format('MMMM DD, YYYY')}</span>
        {tags.map((tag) => {
          return (
            <Tag
              key={tag}
              style={{ backgroundColor: "#272B35" }}
              color={tagColor(tag)}
            >{tag}</Tag>
          )
        })}
      </p>
      <p className={style.desc}>
        {desc}
      </p>
    </div>
  );
}


export default Card;