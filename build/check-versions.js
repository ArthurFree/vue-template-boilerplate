// Terminal string styling
// https://www.npmjs.com/package/chalk
var chalk = require('chalk')

// A JavaScript implementation of the http://semver.org/ specification
// https://www.npmjs.com/package/semver
var semver = require('semver')

var packageConfig = require('../package.json')

// ShellJS is a portable (Windows/Linux/OS X) implementation of Unix shell commands on top of the Node.js API.
// https://www.npmjs.com/package/shelljs
var shell = require('shelljs')

function versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node
    }
]

if (shell.which('npm')) {
    versionRequirements.push({
        nap: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = function () {
    var warnings = [];
    for (var i = 0;i < versionRequirements.length;i++) {
        var mod = versionRequirements[i];
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            )
        }
    }

    if (warnings.length) {
        console.log('');
        console.log(chlk.yellow('To use this template, you must update following to modules:'));
        console.log();
        for (var i = 0;i < warnings.length;i++) {
            var warning = warning[i]
            console.log('   ' + warning);
        }
        console.log()
        process.exit(1)
    }
}