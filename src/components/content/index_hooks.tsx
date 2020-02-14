import { Button } from 'antd';
import React, { useState, useEffect } from 'react';

import Card from './card';
import style from './style.module.css';
import { Article } from './types';
import Axios, { AxiosResponse } from 'axios';
import { useStore } from '@mohism/react-duce-ts';


const apiUrl = 'http://api.lanhao.name';
const PAGE_SIZE = 10;


function Content() {
  const [{ keyword }] = useStore('keyword');
  const [page, setPage] = useState(1);
  const [articles, setList] = useState([] as Array<Article>);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setList([]);
  }, [keyword]);
  useEffect(() => {
    setLoading(true);
    Axios.get(`${apiUrl}/articles?page=${page}&keyword=${keyword}`)
      .then((v: AxiosResponse<any>) => {
        if (v.data?.code !== 0) {
          setLoading(false);
        } else {
          const appendList: Array<Article> = (v.data?.data || []);
          if (appendList.length < PAGE_SIZE) {
            setHasMore(false);
          }
          setList((prevState: Array<Article>): Array<Article> => {
            return [...prevState, ...appendList];
          });
          setLoading(false);
        }
      })
      .catch((e: Error) => {
        setLoading(false);
      });
  }, [page, keyword]);

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


      {/* {articles.length === 0 && !loading && (
        <Empty description={false} />
      )} */}
    </div>
  );
}

export default Content;