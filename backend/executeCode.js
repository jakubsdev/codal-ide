const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "codal");

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath, { recursive: true });
}

const executeCode = (filePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  error = stdout = stderr = null; // Resetting the variables

  return new Promise((resolve, reject) => {
    exec(`./compile.sh ${jobId}`, (error, stdout, stderr) => {
      // Ignoring stderr because MicroBit seems to be outputting info data to it??

      if (error && error.code !== null) {
        console.log("STDERR:" + stderr);
        reject(error);
      }

      resolve(stdout);
    });
  });
};

module.exports = { executeCode };
