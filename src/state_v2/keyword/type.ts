
export enum KeywordActionType {
  'setKeyword',
  'setHiddenSearch',
}

export type KeywordState = {
  keyword: string,
}

export interface IReducer {
  (state: KeywordState, action: KeywordAction): KeywordState 
}

export const defaultState: KeywordState = {
  keyword: '',
}

export type KeywordAction = {
  type: KeywordActionType,
  value: any,
}
