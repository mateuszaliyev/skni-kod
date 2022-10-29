export const normalize = (
  value: number,
  min: number,
  max: number,
  newMin: number,
  newMax: number
) => newMin + ((value - min) * (newMax - newMin)) / (max - min);
