import React from 'react';
import styled from 'styled-components';
import { Rule01, Rule02, Rule03, Rule04 } from '../images/icons';

const ExplanationStyles = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: var(--hp-navy);
  .content {
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    position: relative;
    padding: 4rem;
    font-size: 1.5rem;
    border-radius: 1rem;
    svg {
      width: 120px;
      margin-left: 2rem;
      flex-basis: 120px;
      flex-shrink: 0;
    }
    @media screen and (max-width: 600px) {
      padding: 2rem;
      svg {
        display: none;
      }
    }
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    margin-top: 1rem;
  }
  button {
    position: absolute;
    top: -3.5rem;
    font-size: 1.5rem;
    line-height: 1;
    background-color: transparent;
    color: #fff;
    border: none;
    border-radius: 4rem;
    outline: none;
    padding: 0.5rem 1rem;
    right: 0;
    cursor: pointer;
  }
  p {
    margin: 0;
  }
  p + p {
    margin-top: 1em;
  }
`;
const Explanation = ({ close }) => {
  console.log('tt');
  return (
    <ExplanationStyles close={close}>
      <div className="content">
        <button type="button" onClick={close}>
          &times; Close
        </button>
        <p>
          Created by the British mathematician John Conway, it is a zero-player
          game of cellular automaton. You set the initial state of cells, and
          its rules determine what'll happen next. Each cell can live, die, or
          multiply as time passes based on simple set of mathematical rules.
        </p>
        <p>
          <strong>RULES</strong>
          <ul>
            <li>
              A live cell with fewer than two neighbors dies, as if by solitude.
              <Rule01 />
            </li>
            <li>
              A live cell with more than three live neighbors dies, as if by
              overpopulation.
              <Rule02 />
            </li>
            <li>
              A live cell with two or three live neighbors will live on to the
              next generation.
              <Rule03 />
            </li>
            <li>
              A dead cell with exactly three live neighbors becomes a live cell,
              as if by reproduction.
              <Rule04 />
            </li>
          </ul>
        </p>
      </div>
    </ExplanationStyles>
  );
};

export default Explanation;
