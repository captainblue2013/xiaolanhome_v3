
export enum KeywordActionType {
  'setKeyword',
  'setHiddenSearch',
}

export type KeywordState = {
  keyword: string,
  hiddenSearch: boolean,
}

export const defaultState: KeywordState = {
  keyword: '',
  hiddenSearch: false,
}

export type KeywordAction = {
  type: KeywordActionType,
  value: any,
}
