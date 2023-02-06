const { getAllUnpaidJobs } = require("../repositories/jobsRepository");
const { depositFunds } = require("../repositories/profilesRepository");

const deposit = async (profileId, depositAmount) => {
  try {
    console.log(`### STARTING DEPOSIT: ${depositAmount} to ${profileId}`);
    const unpaidJobs = await getAllUnpaidJobs(profileId);

    let sumUnpaidJobs = 0;

    // Sums up all the job prices where the logged user is a client
    unpaidJobs.forEach((unpaidJob) => {
      if (unpaidJob.Contract.ClientId == profileId) {
        sumUnpaidJobs += unpaidJob.price;
      }
    });

    console.log(`### SUM OF ACTIVE JOBS AMOUNT: ${sumUnpaidJobs}`);

    // Clients can only deposit 25% of the sum of all the active jobs amount, so we need to validate it. A deposit can't be ZERO either
    if (depositAmount <= 0 || depositAmount > sumUnpaidJobs / 4) {
      throw new Error(
        "It was not possible to make a deposit. The amount exceeds the 25% limit over active jobs."
      );
    }

    // Make the deposit and returns the updated object
    const updatedClient = await depositFunds(profileId, depositAmount);

    console.log(`### DEPOSIT SUCCEEDED!`);
    return updatedClient;
  } catch (ex) {
    throw ex;
  }
};

module.exports = { deposit };
