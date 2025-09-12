// Simple TypeScript entry point that imports the main runtime
import "../ts/main";

// Export the runtime for CommonJS compatibility  
const runtime = require("../runtime");
module.exports = runtime;