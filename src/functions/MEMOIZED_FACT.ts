let cache: [] = []

/**
 * Memoized store for `FACT` function
 */

export default function MEMOIZED_FACT(): [] {
  return cache
}

export function RESET_MEMOIZED_FACT(): [] {
  cache = []
  return cache
}
