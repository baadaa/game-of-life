import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --hp-light-blue: #0d9bd5;
    --hp-navy: #0c3258;
    --hp-green: #23d58c;
    --hp-white: #fff;
    --hp-off-white: #f6f6f6;
    --hp-coolgray: #d7e2e6;
    --hp-gold: #f7aa00;
    --hp-yellow: #ffc852;
    --hp-hot-orange: #ff7741;
    --hp-purple: #6a52ce;
    --hp-turquoise: #18b8b1;
    --hp-indigo: #062742;
    --hp-dark-gray: #595959;
    --hp-medium-gray: #b8b8b8;
    --hp-legal-navy: #4e7d90;
    --hp-cold-black: #001c2c;
    --sidebar-width: 260px;
    --topbar-height: 80px;
    --base-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    --hover-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
    --container-width: 1200px;
  }
  html {
    margin: 0;
    font-family: Poppins, sans-serif;
    padding: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font: 20px/1.45 "Poppins", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    overflow-y: scroll;    
    font-size: 10px;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: inherit;
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
    transition: background .2s, color .2s;
    color: var(--hp-indigo);
    --content: var(--hp-indigo);
    --nav-highlight: var(--hp-coolgray);
    --text-color: var(--hp-indigo);
    --menu-bg: var(--hp-off-white);
    --day-clear: var(--hp-gold);
    --night-clear: var(--hp-gold);
    --day-cloud: var(--hp-coolgray);
    --bg: var(--hp-off-white);
    --sun: var(--hp-gold);
    --moon: var(--hp-gold);
    --cloud: var(--hp-medium-gray);
    --star: var(--hp-yellow);
    --precip: var(--hp-medium-gray);
    --thermo: var(--hp-coolgray);
    background: var(--bg);
    &.dark {
      --bg: var(--hp-cold-black);
      background: var(--bg);
      color:var(--hp-off-white);
      --content: var(--hp-off-white);
      --nav-highlight: var(--hp-indigo);
      --text-color: var(--hp-medium-gray);
      --menu-bg: var(--hp-navy);
      --day-clear: var(--hp-navy);
      --night-clear: var(--hp-navy);
      --cloud: var(--hp-navy);
      --star: var(--hp-coolgray);
      --precip: var(--hp-coolgray);
      --thermo: var(--hp-navy);
    }
    margin: 0;
    padding: 0;
    min-height: 100vh;
    position: relative;
  }
  *, * > * {
    box-sizing: border-box;
  }
  p {
    font-size: 1.5rem;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    line-height: 1.2;
    text-rendering: optimizeLegibility;
    font-weight: 600;
  }
  h1 {
    font-size: 2.5rem;
    padding-bottom: 1rem;
  }
  h2 {
    font-size: 1.62671rem;
  }
  h3 {
    font-size: 1.38316rem;
  }
  h4 {
    font-size: 1rem;
  }
  h5 {
    font-size: 0.85028rem;
  }
  h6 {
    font-size: 0.78405rem;
  }
  hr {
  box-sizing: content-box;
  overflow: visible;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: calc(1.45rem - 1px);
  background: hsla(0, 0%, 0%, 0.2);
  border: none;
  height: 1px;
}
button {
  font: inherit;
  margin: 0;
  overflow: visible;
}
`;

export default GlobalStyles;
