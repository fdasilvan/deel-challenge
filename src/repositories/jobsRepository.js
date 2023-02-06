const { Job, Contract } = require("../model");

const { transferFunds } = require("./profilesRepository");

const Op = require("sequelize").Op;

const getAllUnpaidJobs = async (profileId) => {
  const unpaidJobs = await Job.findAll({
    include: [
      {
        model: Contract,
        where: {
          status: { [Op.ne]: "terminated" },
          [Op.or]: [
            {
              ContractorId: {
                [Op.eq]: profileId
              }
            },
            {
              ClientId: {
                [Op.eq]: profileId
              }
            }
          ]
        }
      }
    ]
  });
  return unpaidJobs;
};

const payJob = async (jobId) => {
  console.log("### STARTED JOB PAYMENT: " + jobId);

  try {
    const paymentOccured = false;

    // Search for the job and make sure it exists
    const job = await Job.findOne({
      where: {
        id: jobId,
        paid: {
          [Op.eq]: null
        }
      },
      include: ["Contract"]
    });

    if (!job) {
      throw new Error("It was not possible to pay for the job!");
    }

    // Transfer the funds from client's to contractor's account
    const transferOccurred = await transferFunds(
      job.Contract.ClientId,
      job.Contract.ContractorId,
      job.price
    );

    // If everything happened as expected, then update job after
    if (transferOccurred) {
      await job.update({ paid: 1, paymentDate: new Date() });
    }

    // Return TRUE if the process was sucessful and FALSE if not
    return paymentOccured;
  } catch (ex) {
    throw ex;
  }
};

module.exports = { getAllUnpaidJobs, payJob };
