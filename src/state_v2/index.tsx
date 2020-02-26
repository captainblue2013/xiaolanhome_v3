import { createStore } from '@mohism/react-duce-ts';

import KeywordStore from './keyword';
import ConstantStore from './constant';

export const initStore = () => {
  createStore(KeywordStore);
  createStore(ConstantStore)
}

