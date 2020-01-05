import { Tag } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { Component } from 'react';

import { API_URL } from '../../constant';
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
    return axios.get(`${API_URL}/article?id=${id}`)
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
    const id: number = Number.parseInt(window.location.pathname.replace('/', ''), 10);
    this.fetchData(id);
  }

  render() {
    const {
      title,
      time,
      tags,
      content,
      // desc, 
    } = this.state;
    return (
      <div className={style.article}>
        <Header hideSearch={true} siteName={title} cb={(value: string): void => { }} />
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

export default Page;