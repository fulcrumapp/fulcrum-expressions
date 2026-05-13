## @fulcrumapp/expressions

Expression runtime for Fulcrum. TypeScript-first, dual ESM/CJS package.

### Install

```sh
npm install @fulcrumapp/expressions
```

### Usage

```typescript
// ESM
import { Runtime, functions } from "@fulcrumapp/expressions"

// CJS
const { Runtime, functions } = require("@fulcrumapp/expressions")

// Create a runtime instance (sets up global functions)
const runtime = new Runtime()

// Use functions directly
functions.ABS(-5) // 5
functions.SUM(1, 2, 3) // 6
```

### Development

```sh
# Install dependencies
npm install

# Type check
npm run typecheck

# Build (ESM + CJS)
npm run build

# Run tests
npm test

# Watch tests
npm run test:watch
```

### Publishing

The package is published to GitHub Packages (`@fulcrumapp/expressions`) automatically via CI on merge to `main`.
