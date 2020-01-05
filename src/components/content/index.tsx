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

type ContentProps = {
  keyword?: string
}

class Content extends Component<ContentProps, ContentState> {
  state: ContentState = {
    page: 1,
    loading: true,
    hasMore: true,
    articles: []
  }

  fetchData(clear: boolean = false) {
    const { page } = this.state;
    const { keyword = '' } = this.props;
    return axios.get(`${API_URL}/articles?page=${clear ? 1 : page}&keyword=${keyword}`)
      .then(v => {
        const { data: { code, data } } = v;
        if (!code) {
          this.setState({
            page: (clear ? 1 : page) + 1,
            hasMore: data.length === 10,
            loading: false,
            articles: [...(clear ? [] : this.state.articles), ...data],
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
    this.fetchData(true);
  }

  componentWillReceiveProps(nextProps: ContentProps) {
    this.fetchData(true);
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