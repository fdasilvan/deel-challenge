const {
  getAllUnpaidJobs,
  pay,
  getJobById
} = require("../repositories/jobsRepository");

const { transferFunds } = require("../repositories/profilesRepository");

const getUnpaidJobs = async (profileId) => {
  try {
    const unpaidJobs = await getAllUnpaidJobs(profileId);
    return unpaidJobs;
  } catch (ex) {
    throw ex;
  }
};

const payJob = async (jobId) => {
  try {
    console.log(`### STARTING PAY JOB SERVICE (${jobId})`);

    const job = await getJobById(jobId);

    console.log(`### JOB IS SUCESSFULLY LOADED: ${JSON.stringify(job)}`);

    // If the job is already paid, we can't pay it again!
    if (job.paid) {
      throw new Error(
        "This job is already paid. You can't pay for the same job again."
      );
    }

    // Make the transfer
    const transferOccured = await transferFunds(
      job.Contract.ClientId,
      job.Contract.ContractorId,
      job.price
    );

    console.log("### TRANSFER OCCURED SUCCESSFULLY? " + transferOccured);

    if (!transferOccured) {
      throw new Error("It was not possible to transfer the funds.");
    }

    const paymentOccured = await pay(job.id);

    if (!paymentOccured) {
      console.log(`CRITICAL ERROR! ${jobId} couldn't be paid after transfer.`);
      throw new Error("It was not possible to update the job.");
    }

    console.log("### FINISHING PAY JOB SERVICE");
    return paymentOccured;
  } catch (ex) {
    throw ex;
  }
};

module.exports = { getUnpaidJobs, payJob };
