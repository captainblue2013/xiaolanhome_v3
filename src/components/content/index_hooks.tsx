import { Button, Empty } from 'antd';
import useAxios from 'axios-hooks';
import React, { useState } from 'react';

import Card from './card';
import style from './style.module.css';
import { Article } from './types';

const apiUrl = 'http://api.lanhao.name';
const PAGE_SIZE = 10;

let articles: Array<Article> = [];


function Content() {
  const [page, setPage] = useState(1);
  const [{ response, loading, error }] = useAxios(`${apiUrl}/articles?page=${page}`);
  // TODO
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  const { data } = response?.data;
  const hasMore = (data as Array<Article>).length >= PAGE_SIZE;
  articles = [...articles, ...data];
  return (
    <div className={style.content}>
      {
        articles.map((article: Article) => {
          return (
            <Card {...article} key={article.id} />
          )
        })
      }
      {hasMore && (
        <Button
          ghost
          block
          onClick={() => { setPage(page + 1); }}
          loading={loading}
        >
          继续阅读...
      </Button>)}


      {articles.length === 0 && !loading && (
        <Empty description={false} />
      )}
    </div>
  );
}

export default Content;