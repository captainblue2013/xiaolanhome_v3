import { Spin } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { API_URL } from '../../constant';
import Card from './components/card';
import style from './style.module.css';
import { Article } from './types';

type ContentState = {
  articles: Array<Article>,
  loading: boolean,
  hasMore: boolean,
  page: number,
};

class Content extends Component<{}, ContentState> {
  state: ContentState = {
    page: 1,
    loading: true,
    hasMore: true,
    articles: []
  }

  fetchData() {
    return axios.get(`${API_URL}/articles?page=${this.state.page}`)
      .then(v => {
        const { data: { code, data } } = v;
        if (!code) {
          this.setState({
            page: this.state.page + 1,
            hasMore: data.length === 10,
            loading: false,
            articles: [...this.state.articles, ...data],
          });
        }
      }).catch(e => {
        console.log(e);
      });
  }

  handleInfiniteOnLoad = () => {
    if (!this.state.hasMore) {
      return false;
    }
    this.fetchData();
    return true;
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { articles, loading, hasMore, page } = this.state;
    return (
      <div className={style.content}>
        {window.location.pathname === '/'}
        <InfiniteScroll
          initialLoad={false}
          pageStart={page}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={hasMore}
        >
          {
            articles.map((article: Article) => {
              return (
                <Card {...article} key={article.id} />
              )
            })
          }
          {loading && (<Spin tip="Loading..."></Spin>)}
        </InfiniteScroll>
      </div>
    );
  }
}

export default Content;