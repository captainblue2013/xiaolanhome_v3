import { KeywordAction, KeywordActionType } from './type';

export const setKeyword = (keyword: string): KeywordAction => {
  return {
    type: KeywordActionType.setKeyword,
    value: {
      keyword
    },
  }
}

export const setHiddenSearch = (hiddenSearch: boolean): KeywordAction => {
  return {
    type: KeywordActionType.setHiddenSearch,
    value: {
      hiddenSearch,
    },
  }
}