import { useStore } from '@mohism/react-duce-ts';
import { Tag } from 'antd';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { tagColor } from '../content/func';

import Header from '../header';
import style from './page.module.css';
import { Article } from '../../service/types';
import { useParams } from 'react-router-dom';

export default function Page() {
  const { id } = useParams();
  const [{ apiUrl }] = useStore('constant');
  const [error, setError] = useState('');
  const [article, setArticle] = useState<Article>({
    id: 0,
    title: 'loading ... ',
    time: Date.now() / 1000,
    tags: [],
    desc: '',
    content: '',
  });

  useEffect(() => {
    axios.get(`${apiUrl}/article?id=${id}`)
      .then((v: AxiosResponse<any>) => {
        if (v.data?.code !== 0) {
          setError(v.data?.message || 'unknown error');
        } else {
          window.document.title = v.data?.data?.title || window.document.title;
          setArticle(v.data?.data);
        }
      })
      .catch((e: Error) => {
        setError(e.message)
      })
  }, [id, apiUrl]);

  if (error) return <p>Error!</p>

  const { time, tags, content, title } = article;

  return (
    <div className={style.article}>
      <Header title={title} hiddenSearch={true} />
      <p>
        <span>{dayjs(time * 1000).format('MMMM DD, YYYY')}</span>
        {tags.map((tag: string) => {
          return (
            <Tag
              key={tag}
              style={{ backgroundColor: "#272B35" }}
              color={tagColor(tag)}
            >{tag}</Tag>
          )
        })}
      </p>
      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: content || '' }}>
      </div>
    </div>
  );
}