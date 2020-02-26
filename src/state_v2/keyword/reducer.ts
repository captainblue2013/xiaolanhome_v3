import { KeywordState, defaultState, KeywordAction, KeywordActionType, IReducer } from './type';

const keywordReducer: IReducer = (state: KeywordState = defaultState, action: KeywordAction): KeywordState => {
  switch (action.type) {
    case KeywordActionType.setKeyword:
      return {
        ...state,
        keyword: action.value.keyword,
      };
    default:
      return state;
  }
}

export default keywordReducer;