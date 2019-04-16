import styled from 'styled-components';
import React from 'react';

const Required = styled.span`
  color: red;
`;

const RequiredAsterisk = () =>
  <Required>*</Required>;

export default RequiredAsterisk;
