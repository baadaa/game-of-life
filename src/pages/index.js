import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { useInterval } from '../hooks/useInterval';

import {
  resetGrid,
  randomizeGrid,
  determineNextGeneration,
} from '../components/GameOfLife';

const gridWidth = 500;
const WrapperStyles = styled.div`
  display: flex;
  font-size: 1.6rem;
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
  }
  .info {
    padding: 20px;
  }
  .status {
    h4 {
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
  box-shadow: var(--base-shadow);
  &[data-living='true'] {
    background: var(--hp-light-blue);
  }
  box-sizing: border-box;
`;
const IndexPage = () => {
  const [gridSize, setGridSize] = useState(10);
  const [gridData, setGridData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  function setCell(e) {
    if (isPlaying) return;
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    if (gridData[row][col] === 1) {
      gridData[row][col] = 0;
      e.target.dataset.living = false;
    } else {
      gridData[row][col] = 1;
      e.target.dataset.living = true;
    }
  }
  function drawGrid(data) {
    const arr = data.map((row, rowIndex) =>
      row.map((col, colIndex) => (
        <Cell
          key={rowIndex + colIndex}
          data-row={rowIndex}
          data-col={colIndex}
          data-living={data[rowIndex][colIndex] === 1}
          grid={data.length}
          onClick={e => setCell(e)}
        />
      ))
    );
    return arr;
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
    setGridData(resetGrid(gridSize).data);
  }
  function randomize() {
    setGridData(randomizeGrid(gridData).data);
    setPopulation(randomizeGrid(gridData).population);
  }
  useInterval(() => {
    if (isPlaying) {
      if (population === 0) setIsPlaying(false);
      setGridData(determineNextGeneration(gridData).data);
      setPopulation(determineNextGeneration(gridData).population);
      setGeneration(generation + 1);
    }
  }, 500);
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Conway's Game of Life</h1>
      <WrapperStyles>
        <div className="world">{drawGrid(gridData)}</div>
        <div className="info">
          <div className="status">
            <h4>Generation:{generation}</h4>
            <h4>Population:{population}</h4>
          </div>
          <div className="gridSizeControl">
            <button
              type="button"
              data-control="up"
              onClick={e => handleGridSize(e)}
            >
              &#9650;
            </button>
            {gridSize}
            <button
              type="button"
              data-control="down"
              onClick={e => handleGridSize(e)}
            >
              &#9660;
            </button>
          </div>
          <button type="button" onClick={() => randomize()}>
            Randomize
          </button>
          <button type="button" onClick={() => reset()}>
            Clear all
          </button>
          <button type="button" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      </WrapperStyles>
    </Layout>
  );
};

export default IndexPage;
