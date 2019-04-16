import React from 'react';

import ReactMarkdown from 'react-markdown';
import { contentFi } from './content';

const EULAPage = () => (
  <div style={{ padding: '1rem' }}>
    <ReactMarkdown source={contentFi} />
  </div>
);

export default EULAPage;
