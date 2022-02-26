/** Get a random number in specified range */
export default (min: number, max: number): number =>
  Math.random() * (max - min) + min;
