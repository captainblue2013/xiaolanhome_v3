import { combineReducers, Store } from 'redux';

import { constantReducer, ConstantState } from './constant';
import { keywordReducer, KeywordState } from './keyword';

export interface StateTree extends Store {
  keyword: KeywordState,
  constant: ConstantState,
}

export default combineReducers({
  keyword: keywordReducer,
  constant: constantReducer,
});