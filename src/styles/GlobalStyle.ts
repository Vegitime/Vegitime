import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle/*css*/ `
  @font-face {
    font-family: 'Y_Spotlight';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/Y_Spotlight.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  :root{
    --text-xs: 1rem; /* 16px */
    --text-sm: 1.25rem; /* 20px */
    --text-md: 1.5rem; /* 24px */
    --text-lg: 1.875rem; /* 30px */
    --text-xl: 2.5rem; /* 40px */
    --text-xxl: 3.125rem; /* 50px */

    /* 색깔 */
    --color-light-green: #A4C597;
    --color-normal-green:  #5F9538;
    --color-deep-green:#2E6316;
    --color-black:#01192C;
    --color-grey:#CDCDCD;
    --color-white:#ffffff;
    --color-gold:#D9A059;
    --color-red:#F13E1F;
    --color-skyblue:#EAF5F7;

    /* 여백 크기 */
    --spacing-xxs: 0.5rem /* 8px */
    --spacing-base: 1rem; /* 16px */
    --spacing-xs: 1.25rem; /* 20px */
    --spacing-sm: 2rem; /* 32px */
    --spacing-md: 2.5rem; /* 40px */
    --spacing-lg: 3rem; /* 48px */
    --spacing-xl: 3.5rem; /* 56px */
    --spacing-xxl: 4.375rem; /* 70px */
    --spacing-xxxl: 9.375rem; /* 150px */
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Y_Spotlight', sans-serif;
    background-color: var(--color-skyblue);
  }
  input, button {
    font-family: inherit;
  }
  a {
    text-decoration: none;
    color: inherit; // 부모에게서 가져와서 링크 색이 변하지 않음
  }
`;
