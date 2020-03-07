import { useStore } from '@mohism/react-duce-ts';
import React from 'react';

import View from './view';

function Author() {
  const [{ github, author }] = useStore('constant');
  const [{ keyword }] = useStore('keyword');
  return (
    <View
      github={github}
      author={author}
      keyword={keyword}
    />
  );
}

export default Author;