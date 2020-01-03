import React, { Component } from "react";
import style from './style.module.css';
import { Article } from "./types";
import Card from './components/card';

class Content extends Component<{}, { articles: Array<Article> }> {
  state = {
    articles: [
      {
        id: 1,
        title: 'test article 01,test article 01',
        time: 1578042472796,
        tags: ['javascript', 'test'],
        desc: 'test descriptions, test descriptions, test descriptions, test descriptions, test descriptions, ',
      },
      {
        id: 1,
        title: 'test article 01,test article 01',
        time: 1578042472796,
        tags: ['javascript', 'test'],
        desc: 'test descriptions, test descriptions, test descriptions, test descriptions, test descriptions, ',
      }
    ]
  }
  render() {
    const { articles } = this.state;
    return (
      <div className={style.content}>
        {
          articles.map((article) => {
            return (
              <Card {...article} />
            )
          })
        }
      </div>
    );
  }
}

export default Content;