"use strict";

module.exports = function trustedOrigins(policy) {
  if (!Array.isArray(policy) || !policy.length) return [];
  for (var i = 0; i < policy.length; i++) {
    var origin = policy[i];
    if (typeof origin !== "string" || origin.indexOf("*") !== -1) return [];
    try {
      var parsed = new URL(origin);
      if (["https:", "http:"].indexOf(parsed.protocol) === -1 || parsed.origin !== origin ||
          parsed.username || parsed.password) return [];
      if (parsed.protocol === "http:" &&
          ["localhost", "127.0.0.1", "[::1]"].indexOf(parsed.hostname) === -1) return [];
    } catch (error) {
      return [];
    }
  }
  return policy.slice();
};
