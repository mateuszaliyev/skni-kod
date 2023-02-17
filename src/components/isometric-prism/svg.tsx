export type IsometricPrismSvgProps = {
  background?: string;
  height: number;
  size: number;
  width: number;
};

type Triangle = [
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number
];

export const IsometricPrismSvg = ({
  background,
  height,
  size,
  width,
}: IsometricPrismSvgProps) => {
  const triangleHeight = size * Math.sqrt(3) * 0.5;

  const columns = Math.ceil(width / triangleHeight);
  const rows = Math.ceil(height / size) + 1;

  const triangles: Triangle[] = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      triangles.push(
        [
          column * triangleHeight,
          row * size,
          (column + 1) * triangleHeight,
          row * size + size * 0.5,
          column * triangleHeight,
          (row + 1) * size,
        ],
        [
          column * triangleHeight,
          row * size,
          (column + 1) * triangleHeight,
          row * size - size * 0.5,
          (column + 1) * triangleHeight,
          row * size + size * 0.5,
        ]
      );
    }
  }

  return (
    <svg
      height={height}
      style={{
        left: 0,
        position: "absolute",
        top: 0,
      }}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {background && <rect fill={background} height={height} width={width} />}
      {triangles.map(([ax, ay, bx, by, cx, cy], index) => (
        <path
          d={`M ${ax} ${ay} L ${bx} ${by} L ${cx} ${cy} Z`}
          fill={`hsl(210 16% ${Math.random() * 5 + 95}%)`}
          key={index}
        />
      ))}
    </svg>
  );
};
