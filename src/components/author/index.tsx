import { useStore } from '@mohism/react-duce-ts';
import React from 'react';

import View from './view';

function Author() {
  const [{ github, author }] = useStore('constant');
  return (
    <View
      github={github}
      author={author}
    />
  );
}

export default Author;