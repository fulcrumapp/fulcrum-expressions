"use strict";

const fs = require("fs");
const trustedOrigins = require("../trusted-origins");

let policy;
try {
  policy = JSON.parse(process.env.EXPRESSION_SANDBOX_ALLOWED_ORIGINS || "");
} catch {
  console.error("EXPRESSION_SANDBOX_ALLOWED_ORIGINS must be a JSON array of exact trusted origins");
  process.exit(1);
}

const origins = trustedOrigins(policy);
if (!origins.length) {
  console.error("EXPRESSION_SANDBOX_ALLOWED_ORIGINS must contain canonical HTTPS origins or HTTP loopback origins without wildcards");
  process.exit(1);
}

const proxy = fs.readFileSync(process.argv[2], "utf8");
process.stdout.write(`window.EXPRESSION_SANDBOX_ALLOWED_ORIGINS = ${JSON.stringify(origins)};\n${proxy}`);
