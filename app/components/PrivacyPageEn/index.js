import React from 'react';

import ReactMarkdown from 'react-markdown';
import { contentEn } from './content';

const PrivacyPageEn = () => (
  <div style={{ padding: '1rem' }}>
    <ReactMarkdown source={contentEn} />
  </div>
);

export default PrivacyPageEn;
