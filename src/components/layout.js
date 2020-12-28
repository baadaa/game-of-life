import React from 'react';
import { Helmet } from 'react-helmet';
import 'normalize.css';
import Header from './header';
import GlobalStyles from '../styles/GlobalStyles';

const Layout = ({ children }) => (
  <>
    <Header />
    <Helmet>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap"
        rel="stylesheet"
      />
      <title>Conway's Game of Life</title>
      <meta
        name="description"
        content="Just another Game of Life exercise | B"
      />
    </Helmet>
    <GlobalStyles />
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0 1.0875rem 1.45rem`,
      }}
    >
      <main>{children}</main>
      <footer
        style={{
          marginTop: `2rem`,
        }}
      >
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  </>
);

export default Layout;
