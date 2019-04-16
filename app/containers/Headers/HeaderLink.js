import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  display: inline-flex;

  height:30px;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  color: #FFFFFF;

  &:active {
    opacity: 1.0;
    color: #112313;
  }
`;
