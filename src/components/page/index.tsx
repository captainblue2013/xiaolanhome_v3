import { Tag } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Component } from 'react';

import { StateTree } from '../../state/combine';
import connect from '../../state/connect';
import { setHiddenSearch } from '../../state/keyword';
import { Article } from '../content/types';
import Header from '../header';
import style from './page.module.css';

const COLORS = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

class Page extends Component<{}, Article> {
  state: Article = {
    id: 0,
    title: '',
    time: 0,
    tags: [],
    desc: '',
    content: '',
  }

  tagColor(tag: string): string {
    let index: number = 0;
    for (let i = 0; i < tag.length; i++) {
      index += tag.charCodeAt(i);
    }
    return COLORS[index % COLORS.length];
  }

  fetchData(id: number) {
    const { apiUrl } = (this.props as StateTree).constant;
    return axios.get(`${apiUrl}/article?id=${id}`)
      .then(v => {
        const { data: { code, data } } = v;
        if (!code) {
          this.setState(data);
          window.document.title = (data as Article).title;
        }
      }).catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    (this.props as StateTree).dispatch(setHiddenSearch(true));
    const id: number = Number.parseInt(window.location.pathname.replace('/', ''), 10);
    this.fetchData(id);
  }

  render() {
    const {
      time,
      tags,
      content,
    } = this.state;
    return (
      <div className={style.article}>
        <Header />
        <p>
          <span>{dayjs(time * 1000).format('MMMM DD, YYYY')}</span>
          {tags.map((tag) => {
            return (
              <Tag
                key={tag}
                style={{ backgroundColor: "#272B35" }}
                color={this.tagColor(tag)}
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
}

export default connect(Page);