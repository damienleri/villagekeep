// also be sure 'path' module is installed.
const blacklist = require("metro-config/src/defaults/blacklist");

module.exports = {
  resolver: {
    blacklistRE: blacklist([/\/tasks\/.*/, /\/amplify\/.*/])
  }
};
