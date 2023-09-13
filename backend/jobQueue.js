const Queue = require("bull");

const jobQueue = new Queue("code-compilation", "redis://redis:6379");
const MAX_WORKERS = 1;
const Job = require("./models/Job");
const { executeCode } = require("./executeCode");

jobQueue.process(MAX_WORKERS, async ({ data }) => {
  console.log(data);
  const { id: jobId } = data;
  const job = await Job.findById(jobId);
  if (job === undefined) {
    throw Error("Job was not found");
  }
  console.log("Fetched:", job);
  try {
    job["startedAt"] = new Date();

    const output = await executeCode(job.filePath);

    job["completedAt"] = new Date();
    job["status"] = "Compilation successful";
    job["output"] = output;

    await job.save();
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "Compilation failed";
    const colorRegex = /\x1B\[[0-9;]*[mG]/g;
    const message = err.message.replace(colorRegex, "");

    const delimiter = "Using library: codal-microbit-nrf5sdk";
    const fixedErrorMessage = message.substring(
      message.indexOf(delimiter) + delimiter.length
    );

    job["output"] = fixedErrorMessage;
    await job.save();
  }

  return true;
});

jobQueue.on("failed", (error) => {
  console.log(error.data.id, "failed", error.failedReason);
});

const addJobToQueue = async (jobId) => {
  await jobQueue.add({ id: jobId });
};

module.exports = {
  addJobToQueue,
};
