/**
 * Returns a random number between 0 and 1.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rand/
 * @example
 * RAND() // returns 0.45
 * RAND() // returns 0.91
 */

export default function RAND(): number {
  return Math.random()
}
