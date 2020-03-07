import { Tag } from 'antd';
import dayjs from 'dayjs';
import React, { memo } from 'react';
import { useHistory } from 'react-router';

import { Article } from '../../../service/types';
import { tagColor } from '../func';
import style from './card.module.css';


function Card(props: Article) {
  const history = useHistory();
  const { title, time, tags, desc, id } = props;
  return (
    <div className={style.card} key={id}>
      <h3>
        <a
          target="_blank"
          href='/'
          rel="noopener noreferrer"
          onClick={(e)=>{
            e.preventDefault();
            history.push(`/${id}`);
          }}
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


export default memo(Card);