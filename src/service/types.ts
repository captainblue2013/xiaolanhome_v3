export type Article = {
  id: number,
  title: string,
  time: number,
  tags: Array<string>,
  desc: string,
  content?: string,
};