import RandomNumber from '../util/random-number';

/**
 * Returns a random number between 0 and 1.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rand/
 * @example
 * RAND() // returns 0.45
 * RAND() // returns 0.91
 */

const RAND = (): number => RandomNumber(1);

export default RAND;
