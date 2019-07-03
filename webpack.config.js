module.exports = function(env) {
  if(env){
    return require(`./webpack/${env}.conf.js`)
  }
  return require(`./webpack/dev.conf.js`)
};
