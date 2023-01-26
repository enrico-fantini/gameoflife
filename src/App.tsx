import { useEffect, useState } from "react";
import Button from "./components/Button";
import Grid from "./components/Grid";
import RangeInput from "./components/RangeInput";
import Input from "./components/TextInput";
import { copyGrid, generateGrid, getNextGen, GridSize } from "./rules";

export default function App() {
  const [gridSize, setGridSize] = useState<GridSize>({ cols: 40, rows: 20 });
  const [grid, setGrid] = useState(generateGrid(gridSize));
  const [running, setRunning] = useState(false);
  const [gen, setGen] = useState(0);
  const [speed, setSpeed] = useState(50);

  function handleToggleTile(i: number, j: number) {
    let newGrid = copyGrid(grid);
    newGrid[i][j] = newGrid[i][j] ? 0 : 1;
    setGrid(newGrid);
  }

  function handleClear() {
    setGrid(generateGrid(gridSize));
    setGen(0);
  }

  useEffect(() => {
    handleClear();
  }, [gridSize]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setGrid((current) => {
        const nextGen = getNextGen(current);
        if (JSON.stringify(current) === JSON.stringify(nextGen)) {
          setRunning(false);
        }
        return getNextGen(current);
      });
      setGen((gen) => gen + 1);
    }, 1000 - speed * 10);

    return () => clearInterval(timer);
  }, [running, speed]);

  return (
    <>
      <div className="w-full justify-center gap-4">
        <div className="bg-white sticky top-0 p-6 mb-6 grid xl:flex xl:justify-center gap-4 xl:gap-8">
          <div className="flex justify-center items-center gap-8 sm:w-full xl:w-1/5">
            <p className="font-semibold text-lg">Generation: {gen}</p>
          </div>

          <div className="flex justify-center items-center gap-8 sm:w-full xl:w-2/5">
            <Input
              label="Width"
              value={gridSize.cols ? gridSize.cols : ""}
              onChange={(e) =>
                setGridSize({ ...gridSize, cols: +e.target.value })
              }
              type="number"
              id="width"
              placeholder="Width"
              disabled={running}
            />
            <Input
              label="Height"
              value={gridSize.rows ? gridSize.rows : ""}
              onChange={(e) =>
                setGridSize({ ...gridSize, rows: +e.target.value })
              }
              type="number"
              id="height"
              className="px-3 w-full outline-none"
              placeholder="Height"
              disabled={running}
            />
          </div>

          <div className="flex justify-center items-center gap-8 sm:w-full xl:w-2/5">
            <RangeInput
              label={`Speed: ${speed}`}
              min="0"
              max="100"
              id="speed"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div>
          <h1 className="text-center text-5xl text-white font-black pt-1 mb-6">
            Game of Life
          </h1>
          <div className="flex justify-center gap-4 mb-6">
            <Button
              color={running ? "yellow" : "green"}
              onClick={() => setRunning(!running)}
            >
              {running ? "Stop" : "Start"}
            </Button>
            <Button color="red" onClick={handleClear} disabled={running}>
              Clear
            </Button>
          </div>
        </div>
      </div>
      <Grid grid={grid} onClick={handleToggleTile} />
    </>
  );
}
