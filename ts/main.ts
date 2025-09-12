// Main expressions runtime entry point - replaces runtime.coffee
import Runtime from "./runtime";

// Create and export runtime instance (same pattern as runtime.coffee)
const runtimeInstance = new Runtime();

// Export for CommonJS
export = runtimeInstance;