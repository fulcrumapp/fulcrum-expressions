"use strict";

const variables = require("./variables.json");

function createRuntimeAdapter(scope, runtime) {
  function reset(configure) {
    scope.RESETCONFIG();
    scope.CONFIGURE(variables);
    runtime.form = variables.form;
    runtime.values = variables.values.form_values;
    runtime.prepare();
    runtime.setupValues();
    scope.CONFIGURE(configure || {});
    runtime.resetResults();
    runtime.isCalculation = false;
  }

  reset();
  return {
    invoke(name, args, configure) {
      reset(configure);
      if (typeof scope[name] !== "function") {
        throw new Error(`Unknown expression function: ${name}`);
      }
      try {
        const value = scope[name].apply(null, args);
        return { value, results: runtime.results };
      } catch (error) {
        return { error, results: runtime.results };
      }
    },
    lifecycle() {
      return {
        runtimeGlobals: ["$$runtime", "$$prepare", "$$evaluate", "$$trigger", "$$finishAsync"]
          .every((name) => Object.prototype.hasOwnProperty.call(scope, name)),
        functionGlobals: ["ARRAY", "CONFIGURE", "RESETCONFIG", "SETVALUE", "GEOMETRYPOINT"]
          .every((name) => typeof scope[name] === "function"),
      };
    },
  };
}

module.exports = createRuntimeAdapter;
