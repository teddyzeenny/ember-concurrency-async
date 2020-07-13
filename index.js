'use strict';

const { addPlugin } = require('ember-cli-babel-plugin-helpers');
const Plugin = require.resolve('./lib/babel-plugin-transform-ember-concurrency-async-tasks');

module.exports = {
  name: require('./package').name,

  included(parent) {
    this._super.included.apply(this, arguments);

    if (!hasPlugin(parent, Plugin)) {
      addPlugin(parent, Plugin, {
        before: [
          '@babel/plugin-proposal-decorators',
          '@babel/plugin-transform-typescript'
        ]
      });
    }
  }
};

function hasPlugin(target, pluginToFind) {
  let plugins = getPluginsArray(target);
  return plugins.find(plugin => {
    return plugin === pluginToFind;
  });
}

function getPluginsArray(target) {
  if (Array.isArray(target)) {
    return target;
  }

  let options = target.options || (target.options = {});
  let babel = options.babel || (options.babel = {});
  return babel.plugins || (babel.plugins = []);
}
