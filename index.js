#!usr/bin/env node 

const pkg = require('./package.json')
// console.log('why cli')
const program = require('commander')

const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// '-v, --version'为另一个指令，不配置的话【-V/--version】
// program.version(require('./package.json').version)
program.version(pkg.version)
// program.version(require('./package.json').version, '-v, --version')

// 帮助和可选信息
helpOptions()

// 创建其他指令
createCommands()

program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .parse(process.argv)

// console.log(program.dest)