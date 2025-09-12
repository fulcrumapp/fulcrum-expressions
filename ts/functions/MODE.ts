/**
 * Returns the current mode of the runtime
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mode/
 */

export default function MODE(): string | null {
  if (typeof globalThis !== 'undefined' && (globalThis as any).$$runtime) {
    return (globalThis as any).$$runtime.mode || null;
  }
  
  if (typeof global !== 'undefined' && (global as any).$$runtime) {
    return (global as any).$$runtime.mode || null;
  }
  
  return null;
}