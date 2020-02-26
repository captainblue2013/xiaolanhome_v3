import keywordReducer from './reducer';
import { defaultState } from './type';

export default {
  name: 'keyword',
  initState: defaultState,
  reducer: keywordReducer
};