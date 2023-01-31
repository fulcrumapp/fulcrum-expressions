#!/usr/bin/env bash

set -xeuo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
root_dir="$(cd "${script_dir}/../.." >/dev/null 2>&1 && pwd)"

yarn install --frozen-lockfile

yarn build:dist