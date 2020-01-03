import React, { Component } from "react";
import style from './style.module.css';
import { Article } from "./types";
import Card from './components/card';
import { Button } from "antd";

class Content extends Component<{}, { articles: Array<Article>, empty: boolean }> {
  state = {
    empty: true,
    articles: []
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        empty: false,
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
      });
    }, 3000);
  }

  render() {
    const { articles,empty } = this.state;
    return (
      <div className={style.content}>
        {
          articles.map((article) => {
            return (
              <Card {...article} />
            )
          })
        }
        {empty && (<Button shape="circle" loading />)}
      </div>
    );
  }
}

export default Content;