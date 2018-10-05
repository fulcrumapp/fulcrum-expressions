let cache: [] = []

/**
 * Memoized store for `FACTDOUBLE` function
 */

export default function MEMOIZED_FACTDOUBLE(): number[] {
  return cache
}

export function RESET_MEMOIZED_FACTDOUBLE(): number[] {
  cache = []
  return cache
}
