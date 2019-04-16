import { css } from 'styled-components';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.4em 1em;
  text-decoration: none;
  border-radius: 8px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #3c8fde;
  color: #3c8fde;

  border: 1px solid #3C8FDE;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 3px 3px 0 rgba(0,0,0,0.15);

  &:active {
    background: #3c8fde;
    color: #fff;
  }
  text-align: left;
  width: 100%;
`;

export default buttonStyles;
