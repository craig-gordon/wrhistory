const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack-utils/config.common.js');

module.exports = (env) => {
  let envConfig = require(`./webpack-utils/config.${env.mode}.js`);
  
  return webpackMerge(
    { mode: env.mode },
    commonConfig,
    envConfig
  );
};