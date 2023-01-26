interface Props {
  grid: number[][];
  onClick: (i: number, j: number) => void;
}

export default function Grid({ grid, onClick }: Props) {
  return (
    <div className={`mx-[3vw] border-white border"`}>
      {grid.map((row, i) => (
        <div className="flex">
          {row.map((cell, j) => (
            <div
              key={`${i},${j}`}
              onClick={() => onClick(i, j)}
              className={`w-full aspect-square border border-white
            ${cell && "bg-red-400"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
