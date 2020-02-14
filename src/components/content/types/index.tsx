export type Article = {
  id: number,
  title: string,
  time: number,
  tags: Array<string>,
  desc: string,
  content?: string,
};

export type ContentState = {
  articles: Array<Article>,
  loading: boolean,
  hasMore: boolean,
  page: number,
};
