import { KeywordState, defaultState, KeywordAction, KeywordActionType } from './type';

const keywordReducer = (state: KeywordState = defaultState, action: KeywordAction): KeywordState => {
  switch (action.type) {
    case KeywordActionType.setKeyword:
      return {
        ...state,
        keyword: action.value.keyword,
      };
    case KeywordActionType.setHiddenSearch:
      return {
        ...state,
        hiddenSearch: action.value.hiddenSearch,
      };
    default:
      return state;
  }
}

export default keywordReducer;