/**
 * 检查版本工程项目依赖版本
 */

// Terminal string styling
// https://www.npmjs.com/package/chalk
const chalk = require('chalk');

// A JavaScript implementation of the http://semver.org/ specification
// https://www.npmjs.com/package/semver
const semver = require('semver');

const packageConfig = require('../package.json');

// ShellJS is a portable (Windows/Linux/OS X) implementation of Unix shell commands
// on top of the Node.js API.
// https://www.npmjs.com/package/shelljs
const shell = require('shelljs');

const childProcess = require('child_process');

// 执行cmd命令
function exec(cmd) {
    return childProcess.execSync(cmd).toString().trim();
}

/**
 * 需要验证版本的模块
 */
const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node,
    },
];

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm,
    });
}

module.exports = function () {
    const warnings = [];
    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i];
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(
                `${mod.name}: 
                ${chalk.red(mod.currentVersion)} 应该是 
                ${chalk.green(mod.versionRequirement)}`,
            );
        }
    }

    if (warnings.length) {
        console.log('');
        // console.log(chalk.yellow('To use this template, you must update following to modules:'));
        console.log(chalk('为了能正常使用，您必须更新以下模块：'));
        console.log();
        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i];
            console.log(`   ${warning}`);
        }
        console.log();
        process.exit(1);
    } else {
        console.log(chalk.green('版本正常可使用.'));
    }
};
