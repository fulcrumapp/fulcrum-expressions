let cache: [] = []

/**
 * Memoized store for `FACT` function
 */

export default function MEMOIZED_FACT(): number[] {
  return cache
}

export function RESET_MEMOIZED_FACT(): number[] {
  cache = []
  return cache
}
