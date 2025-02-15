type Color = 'red' | 'black' | 'green';

const roulette: { [color in Color]: number[] } = {
  red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
  black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
  green: [0]
};

export function getColor(number: number): Color | null {
  for (const color in roulette) {
    if (roulette[color as Color].includes(number)) {
      return color as Color;
    }
  }
  return null;
}
