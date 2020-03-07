import { Article } from "../../../service/types";

export type ContentState = {
  articles: Array<Article>,
  loading: boolean,
  hasMore: boolean,
  page: number,
};
