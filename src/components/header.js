import React from 'react';

const Header = () => (
  <header
    style={{
      background: `#fff`,
      marginBottom: `1.45rem`,
      position: `absolute`,
      top: 0,
      left: 0,
      right: 0,
      boxShadow: `var(--base-shadow)`,
    }}
  >
    <div
      style={{
        padding: '2rem 1.5rem',
        display: `flex`,
        width: `100%`,
        alignItems: 'center',
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >
      <h1 style={{ margin: 0, lineHeight: 1, padding: 0 }}>
        Conway's Game of Life
      </h1>
    </div>
  </header>
);

export default Header;
