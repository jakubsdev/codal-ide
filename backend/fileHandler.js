const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codal/source");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const createFile = async (code) => {
  const jobId = uuid();
  const fileName = `${jobId}.cpp`;
  const filePath = path.join(dirCodes, fileName);
  await fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = { createFile };
