import { Button, Empty, notification, Icon } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';

import Card from './card';
import style from './style.module.css';
import { Article } from './types';

const apiUrl = 'http://api.lanhao.name';

type ContentState = {
  articles: Array<Article>,
  loading: boolean,
  hasMore: boolean,
  page: number,
};

type ContentProps = {
  keyword?: string
};

class Content extends Component<ContentProps, ContentState> {
  state: ContentState = {
    page: 1,
    loading: true,
    hasMore: true,
    articles: []
  }

  fetchData(clear: boolean = false, keyword: string = '') {
    const { page } = this.state;
    return axios.get(`${apiUrl}/articles?page=${clear ? 1 : page}&keyword=${keyword}`)
      .then(v => {
        const { data: { code, data } } = v;
        if (!code) {
          this.setState({
            page: (clear ? 1 : page) + 1,
            hasMore: data.length === 10,
            loading: false,
            articles: [...(clear ? [] : this.state.articles), ...data],
          });
          if ((data as Array<Article>).length === 0) {
            notification.warning({
              icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
              message: '够了！',
              description:
                '已经没有更多的内容了。',
              placement: 'bottomRight',
            });
          }
        }
      }).catch(e => {
        console.log(e);
      });
  }


  componentDidMount() {
    this.fetchData(true);
  }

  componentWillReceiveProps(nextProps: ContentProps) {
    console.log('clear?');
    console.log(nextProps);
    const { keyword } = nextProps;
    this.fetchData(true, keyword);
  }

  buttonClick = () => {
    if (this.state.loading) {
      return false;
    }
    this.setState({
      ...this.state,
      loading: true,
    });
    setTimeout(() => {
      this.fetchData();
    }, 500);

  }

  render() {
    const { articles, loading, hasMore, /*page*/ } = this.state;

    const buttonClick = this.buttonClick.bind(this);
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
            onClick={buttonClick}
            loading={loading}
          >
            继续阅读...
        </Button>)}


        {this.state.articles.length === 0 && !this.state.loading && (
          <Empty description={false} />
        )}
      </div>
    );
  }
}

export default Content;