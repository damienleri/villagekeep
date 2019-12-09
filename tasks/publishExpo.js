const shell = require("shelljs");
const jsonfile = require("jsonfile");
const file = "./build.json";

const data = jsonfile.readFileSync(file);
data.jsBuildNumber = data.jsBuildNumber + 1;
console.log(`New build number is ${data.jsBuildNumber}`);
jsonfile.writeFileSync(file, data, { spaces: 2, EOL: "\r\n" });
shell.exec("expo publish");
