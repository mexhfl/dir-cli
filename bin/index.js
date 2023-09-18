#!/usr/bin/env node
require('../utils/base/loadenv')
require('../core/cli')(process.argv.slice(2))