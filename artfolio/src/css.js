import { createGlobalStyle } from "styled-components";
// Import fonts
import lobster from "./assets/fonts/Lobster/Lobster-Regular.ttf";
import latoRegular from "./assets/fonts/Lato/Lato-Regular.ttf";
import latoBold from "./assets/fonts/Lato/Lato-Bold.ttf";
import latoItalic from "./assets/fonts/Lato/Lato-Italic.ttf";

const GlobalStyles = createGlobalStyle`
body, html{
  @font-face {
    font-family: 'Lobster';
    src: url(${lobster});
    font-style: normal;
    font-weight: 400;
    font-display: cursive
  }
@font-face {
    font-family: 'Lato';
    src: url(${latoRegular});
    font-style: normal;
    font-weight: 400;
    font-display: sans-serif
  }
@font-face {
    font-family: 'Lato';
    src: url(${latoBold});
    font-weight: bold;
    font-display: sans-serif
  }
@font-face {
    font-family: 'LatoIta';
    src: url(${latoItalic});
    font-style: italic, oblique;
    font-display: sans-serif
  }
}
  :root{
    font-size: 62.5%;
  }
  *, *::before, *::after, a{
    box-sizing: border-box;
    font-family: 'lato'
  }
`;

export default GlobalStyles;