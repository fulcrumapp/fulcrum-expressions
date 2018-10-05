let cache: [] = []

/**
 * Memoized store for `FACTDOUBLE` function
 */

export default function MEMOIZED_FACTDOUBLE(): [] {
  return cache
}

export function RESET_MEMOIZED_FACTDOUBLE(): [] {
  cache = []
  return cache
}
