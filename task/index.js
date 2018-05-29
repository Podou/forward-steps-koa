#!/usr/bin/env node

'use strict';

const shell = require('shelljs');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const chokidar = require('chokidar');
const os = require('os');

const cwd = process.cwd();
const pwd = __dirname;
const TEMP_DIR = path.resolve(cwd, './tmp');

const optionator = require('optionator')({
    options: [{
        option: 'test',
        type: '[path::String]',
        description: 'Run unittests on specified files/directories.'
    }, {
            option: 'cover',
            type: 'Boolean',
            description: 'Run all unittests with coverage report.'
    }]
});

const options = optionator.parse(process.argv);

// run unittests
if (options.test) {
    const mocha = fs.existsSync(path.resolve(cwd, './node_modules/mocha/bin/mocha')) ? 
        path.resolve(cwd, './node_modules/mocha/bin/mocha') : 
        path.resolve(pwd, './node_modules/mocha/bin/mocha');

    const subprocess = spawn(
        mocha +
        ' --reporter spec --require babel-register ' +
        options.test.join(' '), { stdio: 'inherit', shell: true, cwd });

    subprocess.on('exit', code => {
        process.exit(code);
    });
}

// run unittest coverage
// if (options.cover) {
//     const istanbul = fs.existsSync(path.resolve(cwd, './node_modules/.bin/istanbul')) ?
//         path.resolve(cwd, './node_modules/.bin/istanbul') :
//         path.resolve(pwd, './node_modules/.bin/istanbul');
//     const mocha = fs.existsSync(path.resolve(cwd, './node_modules/.bin/_mocha')) ?
//         path.resolve(cwd, './node_modules/mocha/bin/_mocha') :
//         path.resolve(pwd, './node_modules/mocha/bin/_mocha');

//     const subprocess = spawn(
//         istanbul +
//         ' cover ' +
//         createIstanbulParameter(options.exclude, 'x') +
//         createIstanbulParameter(options.include, 'i') +
//         mocha +
//         ' -- -R spec test/unit/**/*.js', { stdio: 'inherit', shell: true, cwd });

//     subprocess.on('exit', code => {
//         process.exit(code);
//     });
// }