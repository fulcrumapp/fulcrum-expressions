"use strict";

var LOCAL_DEVELOPMENT_HOSTS = ["localhost", "127.0.0.1", "[::1]"];

function isTrustedOrigin(origin) {
  if (typeof origin !== "string" || origin.indexOf("*") !== -1) return false;

  try {
    var url = new URL(origin);
    if (url.origin !== origin) return false;
    if (url.protocol === "https:") return true;

    var isLocalHost = LOCAL_DEVELOPMENT_HOSTS.indexOf(url.hostname) !== -1;
    return url.protocol === "http:" && isLocalHost;
  } catch (error) {
    return false;
  }
}

function trustedOrigins(policy) {
  if (!Array.isArray(policy) || policy.length === 0) return [];

  for (var index = 0; index < policy.length; index += 1) {
    if (!isTrustedOrigin(policy[index])) return [];
  }

  return policy.slice();
}

module.exports = trustedOrigins;
