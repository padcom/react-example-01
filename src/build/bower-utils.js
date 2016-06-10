var argv = require('yargs').argv;
var _ = require('lodash');
var fs = require('fs');

function unloadModule(module) {
  var name = require.resolve(module);
  delete require.cache[name];
}

function loadBowerManifest(module) {
  const pathToModuleManifest = __dirname + '/' + '../../bower_components/' + module + '/';
  if (fs.existsSync(pathToModuleManifest + 'bower.json')) {
    unloadModule(pathToModuleManifest + 'bower.json');
    return require(pathToModuleManifest + 'bower.json');
  } else if (fs.existsSync(pathToModuleManifest + '.bower.json')) {
    unloadModule(pathToModuleManifest + '.bower.json');
    return require(pathToModuleManifest + '.bower.json');
  } else {
    throw "Module " + module + " has no bower manifest";
  }
}

function getBowerPackageIds() {
  var bowerManifest = {};
  try {
    unloadModule('../../bower.json');
    manifest = require('../../bower.json');
  } catch (e) {
    // does not have a bower.json manifest
  }
  return _.keys(manifest.dependencies) || [];
}

function getBowerMains(module) {
  function makeMinFileName(file) {
    const min = './bower_components/' + module + '/' + file.substr(0, file.indexOf('.js')) + '.min.js';
    const reg = './bower_components/' + module + '/' + file;
    const env = process.env.NODE_ENV || 'development';
    if ((env === 'production' || !argv.debug) && fs.existsSync(__dirname + '/../../' + min)) {
      return min;
    } else {
      return reg;
    }
  }

  var manifest = loadBowerManifest(module);
  if (typeof manifest.main === 'string')
    return [ makeMinFileName(manifest.main) ]
  else
    return _.map(manifest.main, makeMinFileName);
}

function getBowerModule(module) {
  function extractFileWithoutExt(file) {
    var parts = file.split('/');
    file = parts[parts.length - 1];
    return file.substr(0, file.indexOf('.'));
  }

  var manifest = loadBowerManifest(module);
  if (typeof manifest.main === 'string')
    return [ extractFileWithoutExt(manifest.main) ];
  else
    return _.map(manifest.main, extractFileWithoutExt);
}

module.exports = {
  getBowerPackageIds,
  getBowerMains,
  getBowerModule
}
