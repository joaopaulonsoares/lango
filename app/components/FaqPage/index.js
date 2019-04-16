import React from 'react';

import ReactMarkdown from 'react-markdown';
import { content } from './content';

const FaqPage = () => (
  <div style={{ padding: '1rem' }}>
    <ReactMarkdown source={content} />
  </div>
);

export default FaqPage;
