// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; padding: 0; box-sizing: border-box;
  }
  body {
    font-family: 'Poppins', 'Noto Sans Korean', sans-serif;
    background-color: #fff;
    color: #222;
  }
  html {
    scroll-behavior: smooth;
  }
`;

export default GlobalStyle;
