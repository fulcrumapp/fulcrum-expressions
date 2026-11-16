"use strict";

const fs = require("fs");

const marker = "__EXPRESSION_SANDBOX_ALLOWED_ORIGINS__";
const originPattern = /^https?:\/\/(?:[a-z0-9.-]+|\[[a-f0-9:]+\])(?::[0-9]+)?$/i;
const wildcardPattern = /^https:\/\/\*\.(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

function configureProxy(source, value, environment) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("Trusted origins must be configured as a comma-separated list.");
  }
  const origins = value.split(",").map((origin) => origin.trim());
  for (const origin of origins) {
    if (origin.includes("*") && environment === "development" && wildcardPattern.test(origin)) {
      continue;
    }
    if (!originPattern.test(origin)) {
      throw new Error(`Invalid trusted origins entry: ${origin}`);
    }
    let url;
    try {
      url = new URL(origin);
    } catch (error) {
      throw new Error(`Invalid trusted origins entry: ${origin}`);
    }
    if (url.origin !== origin || !["http:", "https:"].includes(url.protocol)) {
      throw new Error(`Trusted origins must be canonical HTTP(S) origins: ${origin}`);
    }
  }
  const index = source.indexOf(marker);
  if (index === -1 || index !== source.lastIndexOf(marker)) {
    throw new Error("Sandbox trusted-origin marker must occur exactly once.");
  }
  return source.replace(marker, [...new Set(origins)].join(","));
}

if (require.main === module) {
  try {
    if (process.argv.length !== 4 && process.argv.length !== 5) {
      throw new Error("Expected input and output proxy paths, and an optional deployment environment.");
    }
    const source = fs.readFileSync(process.argv[2], "utf8");
    const configured = configureProxy(source, process.env.EXPRESSION_SANDBOX_ALLOWED_ORIGINS, process.argv[4]);
    fs.writeFileSync(process.argv[3], configured);
  } catch (error) {
    console.error(`Cannot configure expression sandbox: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { configureProxy };
