import React from 'react';
import styled from 'styled-components';
import icon from '../images/game_of_life_pulsar.gif';

const HeaderStyles = styled.header`
  background: #fff;
  margin-bottom: 1.45rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: var(--base-shadow);
  .wrap {
    padding: 0 1.5rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    max-width: 960px;
  }
  .pulsar {
    width: 60px;
    height: 60px;
  }
  h1 {
    margin: 0 2rem;
    line-height: 1;
    padding: 0;
  }
`;

const Header = () => (
  <HeaderStyles>
    <div className="wrap">
      <img className="pulsar" src={icon} alt="" />
      <h1>Conway's Game of Life</h1>
      <img className="pulsar" src={icon} alt="" />
    </div>
  </HeaderStyles>
);

export default Header;
