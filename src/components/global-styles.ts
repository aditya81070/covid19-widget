import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
  }
  html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
