export function resetGrid(size) {
  const arr = [];
  for (let row = 0; row < size; row += 1) {
    arr[row] = [];
    for (let col = 0; col < size; col += 1) {
      arr[row].push(0);
    }
  }
  return { data: arr, population: 0 };
}

export function randomizeGrid(arr) {
  const size = arr.length;
  let population = 0;
  const newArr = [];
  for (let row = 0; row < size; row += 1) {
    newArr[row] = [];
    for (let col = 0; col < size; col += 1) {
      const num = Math.random() > 0.66 ? 1 : 0;
      newArr[row].push(num);
      population += num;
    }
  }
  return { data: newArr, population };
}

export function countCellsAround(arr, row, col) {
  const topLeft = row === 0 || col === 0 ? 0 : arr[row - 1][col - 1];
  const top = row === 0 ? 0 : arr[row - 1][col];
  const topRight =
    row === 0 || col === arr.length - 1 ? 0 : arr[row - 1][col + 1];
  const left = col === 0 ? 0 : arr[row][col - 1];
  const right = col === arr.length - 1 ? 0 : arr[row][col + 1];
  const bottomLeft =
    row === arr.length - 1 || col === 0 ? 0 : arr[row + 1][col - 1];
  const bottom = row === arr.length - 1 ? 0 : arr[row + 1][col];
  const bottomRight =
    row === arr.length - 1 || col === arr.length - 1
      ? 0
      : arr[row + 1][col + 1];
  return (
    topLeft + top + topRight + left + right + bottomLeft + bottom + bottomRight
  );
}

export function determineNextGeneration(arr) {
  const nextRound = [];
  let population = 0;
  for (let row = 0; row < arr.length; row += 1) {
    nextRound[row] = [];
    for (let col = 0; col < arr.length; col += 1) {
      const cellsAround = countCellsAround(arr, row, col);
      if (arr[row][col] === 1) {
        switch (cellsAround) {
          case 0:
          case 1:
            nextRound[row].push(0);
            break;
          case 2:
          case 3:
            nextRound[row].push(1);
            population += 1;
            break;
          default:
            nextRound[row].push(0);
            break;
        }
      } else {
        nextRound[row].push(cellsAround === 3 ? 1 : 0);
        if (cellsAround === 3) {
          population += 1;
        }
      }
    }
  }
  return { data: nextRound, population };
}
