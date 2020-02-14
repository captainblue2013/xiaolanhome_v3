import constantReducer from './reducer';
import { defaultState } from './type';

export default {
  name: 'constant',
  initState: defaultState,
  reducer: constantReducer
};