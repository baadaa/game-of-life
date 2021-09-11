import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import { useInterval } from '../hooks/useInterval';

import {
  resetGrid,
  randomizeGrid,
  determineNextGeneration,
} from '../components/GameOfLife';
import { patterns } from '../data/patterns';
import {
  NextIcon,
  PlayIcon,
  PauseIcon,
  RandomIcon,
  DeleteIcon,
} from '../images/icons';
import Explanation from '../components/Explanation';

const gridWidth = 600;
const WrapperStyles = styled.div`
  display: flex;
  font-size: 1.6rem;
  h4 {
    font-size: 1.5rem;
    padding: 1rem 0;
    span {
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
      background: var(--hp-coolgray);
      box-shadow: var(--base-shadow);
      border-radius: 0.5rem;
    }
  }
  h4 + h4 {
    margin-left: 2rem;
  }
  .startPrompt {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .msg {
      padding: 2rem;
      animation: bgRotate 10s linear infinite;
      box-shadow: var(--hover-shadow);
      border-radius: 2rem;
    }
    ul {
      padding-left: 2rem;
      margin-top: 1rem;
      margin-bottom: 0;
    }
  }
  @keyframes bgRotate {
    0% {
      background-color: rgba(255, 255, 255, 0.8);
    }
    25% {
      background-color: rgba(255, 239, 204, 0.8);
    }
    50% {
      background-color: rgba(218, 241, 240, 0.8);
    }
    75% {
      background-color: rgba(228, 217, 242, 0.8);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
  .world {
    background: var(--hp-coolgray);
    width: ${gridWidth}px;
    height: ${gridWidth}px;
    flex-basis: ${gridWidth}px;
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;
    position: relative;
  }
  .explanation {
    background-color: var(--hp-legal-navy);
    border: none;
    border-radius: 5rem;
    padding: 1.5rem 2rem;
    width: 100%;
    color: #fff;
    font-size: 1.8rem;
    margin-top: 2rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--hover-shadow);
      background-color: var(--hp-purple);
    }
  }
  .info {
    flex: 1;
    width: 100%;
    flex-shrink: 0;
    margin-left: 15px;
  }
  @media screen and (max-width: 980px) {
    flex-direction: column;
    align-items: center;
    .info {
      max-width: ${gridWidth - 10}px;
      margin: 10px 0 0;
    }
  }
  @media screen and (max-width: 620px) {
    .world {
      width: ${gridWidth / 1.3}px;
      height: ${gridWidth / 1.3}px;
      flex-basis: ${gridWidth / 1.3}px;
    }
    .info {
      max-width: ${gridWidth / 1.3 - 10}px;
    }
  }
  @media screen and (max-width: 480px) {
    .world {
      width: ${gridWidth / 1.6}px;
      height: ${gridWidth / 1.6}px;
      flex-basis: ${gridWidth / 1.6}px;
    }
    .info {
      max-width: ${gridWidth / 1.6 - 10}px;
    }
  }
  @media screen and (max-width: 380px) {
    .world {
      width: ${gridWidth / 1.8}px;
      height: ${gridWidth / 1.8}px;
      flex-basis: ${gridWidth / 1.8}px;
    }
    .info {
      max-width: ${gridWidth / 1.8 - 10}px;
    }
  }
  .dashboardSection {
    margin-bottom: 1rem;
    background: #fff;
    border-radius: 1rem;
    padding: 1rem 2rem;
    box-shadow: inset var(--inset-shadow);
  }
  .status {
    display: flex;
    align-items: center;
  }
  select,
  option {
    width: 100%;
  }
  select {
    margin-bottom: 0.5rem;
  }
  .gameControls {
    button {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      background: var(--hp-hot-orange);
      align-items: center;
      justify-content: center;
      color: #fff;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 1px solid var(--hp-hot-orange);
      border-radius: 3rem;
      outline: none;
      &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      &:hover,
      &:focus {
        box-shadow: var(--hover-shadow);
        transform: translateY(-1.5px);
      }
      &.playBack,
      &.layout {
        padding: 0.5rem 1rem;
        border-color: var(--hp-hot-orange);
        background: var(--hp-hot-orange);
        color: #fff;
        svg {
          fill: #fff;
        }
        &.secondary {
          background: #fff;
          color: var(--hp-hot-orange);
          svg {
            fill: var(--hp-hot-orange);
          }
        }
      }
      &.layout {
        border-color: var(--hp-hot-orange);
        background: #fff;
        color: var(--hp-hot-orange);
        padding: 0.5rem 1.5rem;
        svg {
          fill: var(--hp-hot-orange);
          width: 1.5rem;
          margin-right: 0.5rem;
        }
      }
    }
    .playBack + .playBack,
    .layout + .layout {
      margin-left: 0.5rem;
    }
    svg {
      width: 20px;
      height: 20px;
      fill: var(--hp-light-blue);
    }
  }
  .gridSizeControl {
    display: flex;
    align-items: center;
    button {
      width: 2rem;
      height: 2rem;
      font-size: 1.5rem;
    }
  }
`;
const Cell = styled.div`
  border-radius: 5px;
  width: ${props =>
    props.grid ? `${(gridWidth - 10) / props.grid - 4}px` : '10px'};
  height: ${props =>
    props.grid ? `${(gridWidth - 10) / props.grid - 4}px` : '10px'};
  background: #fff;
  margin: 2px;
  transition: background-color 0.2s;
  cursor: pointer;
  box-shadow: var(--base-shadow);
  &[data-living='true'] {
    background: var(--hp-hot-orange);
  }
  box-sizing: border-box;
  @media screen and (max-width: 620px) {
    width: ${props =>
      props.grid ? `${(gridWidth / 1.3 - 10) / props.grid - 4}px` : '10px'};
    height: ${props =>
      props.grid ? `${(gridWidth / 1.3 - 10) / props.grid - 4}px` : '10px'};
    border-radius: 2px;
  }
  @media screen and (max-width: 480px) {
    width: ${props =>
      props.grid ? `${(gridWidth / 1.6 - 10) / props.grid - 4}px` : '10px'};
    height: ${props =>
      props.grid ? `${(gridWidth / 1.6 - 10) / props.grid - 4}px` : '10px'};
  }
  @media screen and (max-width: 380px) {
    width: ${props =>
      props.grid ? `${(gridWidth / 1.8 - 10) / props.grid - 4}px` : '10px'};
    height: ${props =>
      props.grid ? `${(gridWidth / 1.8 - 10) / props.grid - 4}px` : '10px'};
  }
`;
const IndexPage = () => {
  const [gridSize, setGridSize] = useState(10);
  const [gridData, setGridData] = useState([]);
  const [loadedPattern, setLoadedPattern] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  function setCell(e) {
    const currentGrid = [...gridData];
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    if (currentGrid[row][col] === 1) {
      currentGrid[row][col] = 0;
      setPopulation(population - 1);
      e.target.dataset.living = false;
    } else {
      currentGrid[row][col] = 1;
      setPopulation(population + 1);
      e.target.dataset.living = true;
    }
    setGridData([...currentGrid]);
  }
  useEffect(() => {
    setGridData(resetGrid(gridSize).data);
  }, [gridSize]);
  const handleGridSize = e => {
    if (e.target.dataset.control === 'up' && gridSize < 20) {
      setGridSize(gridSize + 1);
      return;
    }
    if (e.target.dataset.control === 'down' && gridSize > 5) {
      setGridSize(gridSize - 1);
    }
  };
  function reset() {
    setIsPlaying(0);
    setPopulation(0);
    setGeneration(0);
    setLoadedPattern('');
    setGridData(resetGrid(gridSize).data);
  }
  function randomize() {
    setLoadedPattern('');
    setGridData(randomizeGrid(gridData).data);
    setPopulation(randomizeGrid(gridData).population);
  }
  function getPopulation(arr) {
    return arr.flat().reduce((acc, cur) => acc + cur);
  }
  function loadPattern(e) {
    const targetVal = e.target.value;
    if (!targetVal) {
      reset();
      return;
    }
    const { pattern } = patterns.find(item => item.name === targetVal);
    const size = pattern.length;
    const pop = getPopulation(pattern);
    setGridSize(size);
    setLoadedPattern(targetVal);
    setTimeout(() => {
      setGeneration(0);
      setPopulation(pop);
      setGridData([...pattern]);
      // setIsPlaying(true);
    }, 0);
  }
  function evolveOneGeneration(option) {
    if (option === 'manual') {
      setIsPlaying(false);
    }
    if (population === 0) {
      setIsPlaying(false);
      setGridData(resetGrid(gridSize).data);
      setGeneration(0);
      return;
    }
    setGridData(determineNextGeneration(gridData).data);
    setPopulation(determineNextGeneration(gridData).population);
    setGeneration(generation + 1);
  }
  useInterval(() => {
    if (isPlaying) {
      evolveOneGeneration();
    }
  }, 500);
  return (
    <Layout>
      <WrapperStyles>
        <div className="world">
          {gridData.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <Cell
                key={rowIndex + colIndex}
                data-row={rowIndex}
                data-col={colIndex}
                data-living={gridData[rowIndex][colIndex] === 1}
                grid={gridData.length}
                onClick={e => setCell(e)}
              />
            ))
          )}
          {population === 0 && (
            <div className="startPrompt">
              <div className="msg">
                <strong>To start the game: </strong>
                <ul>
                  <li>Manually add cells on the grid,</li>
                  <li>Randomly generate cells, or</li>
                  <li>load a pre-built cellular pattern</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="info">
          <div className="status dashboardSection">
            <h4>
              Generation:<span>{generation}</span>
            </h4>
            <h4>
              Population:<span>{population}</span>
            </h4>
          </div>
          <div className="gameControls dashboardSection">
            <div className="gridSizeControl">
              <h4 style={{ marginRight: '1rem' }}>Grid Size:</h4>
              <button
                type="button"
                data-control="up"
                disabled={isPlaying}
                onClick={e => handleGridSize(e)}
              >
                &#x2B;
              </button>
              <h4>
                <span>{gridSize}</span>
              </h4>
              <button
                type="button"
                data-control="down"
                disabled={isPlaying}
                onClick={e => handleGridSize(e)}
              >
                &#x2212;
              </button>
            </div>
          </div>
          <div className="gameControls dashboardSection">
            <div className="gridLayoutControl">
              <h4>Layout Control</h4>
              <button
                type="button"
                className="layout"
                disabled={isPlaying}
                onClick={() => randomize()}
              >
                <RandomIcon /> Randomize
              </button>
              <button className="layout" type="button" onClick={() => reset()}>
                <DeleteIcon /> Clear Grid
              </button>
            </div>
          </div>
          <div className="gameControls dashboardSection">
            <h4>Load a pre-built pattern</h4>
            <select
              onChange={e => loadPattern(e)}
              value={loadedPattern}
              disabled={isPlaying}
            >
              <option value="">Choose...</option>
              {patterns.map(item => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="gameControls dashboardSection">
            <h4>Playback Control</h4>
            <button
              type="button"
              className="playBack"
              disabled={population === 0}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}{' '}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              className="playBack secondary"
              disabled={population === 0}
              onClick={() => evolveOneGeneration('manual')}
            >
              <NextIcon />
              Next Step
            </button>
          </div>
          <button
            type="button"
            className="explanation"
            onClick={() => setIsExplaining(!isExplaining)}
          >
            What is <em>The Game of Life</em>?
          </button>
        </div>
      </WrapperStyles>
      {isExplaining && (
        <Explanation close={() => setIsExplaining(!isExplaining)} />
      )}
    </Layout>
  );
};

export default IndexPage;
