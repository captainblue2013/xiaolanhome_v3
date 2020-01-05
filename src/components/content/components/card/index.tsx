import dayjs from 'dayjs';
import React, { Component } from 'react';
import { Tag } from 'antd';
import { Article } from '../../types';
import style from './card.module.css';

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

class Card extends Component<Article, {}>{
  tagColor(tag: string): string {
    let index: number = 0;
    for (let i = 0; i < tag.length; i++) {
      index += tag.charCodeAt(i);
    }
    return COLORS[index % COLORS.length];
  }
  render() {
    const { title, time, tags, desc, id } = this.props;
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
                color={this.tagColor(tag)}
              >{tag}</Tag>
            )
          })}
        </p>
        <p className={style.desc}>
          {desc.repeat(4)}
        </p>
      </div>
    );
  }
}

export default Card;