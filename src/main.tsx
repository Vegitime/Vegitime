import { StrictMode } from 'react';
import { render } from 'react-dom';

const App = () => (
  <figure className="react-figure">
    <a
      className="link"
      href="https://reactjs.org"
      rel="noopener noreferrer"
      target="_blank"
    >
      <img className="logo" src="@/assets/logo.svg" alt="React" />
    </a>
    <figcaption className="description">React 툴체인 매뉴얼 구성</figcaption>
  </figure>
);

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
