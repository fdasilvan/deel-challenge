const { Job, Contract } = require("../model");

const Op = require("sequelize").Op;

const getAllUnpaidJobs = async (profileId) => {
  console.log(`### GETTING UNPAID JOBS FOR USER ${profileId}`);

  const unpaidJobs = await Job.findAll({
    where: {
      paid: {
        [Op.eq]: null
      }
    },
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

const getJobById = async (jobId) => {
  try {
    // Search for the job and make sure it exists
    const job = await Job.findOne({
      where: {
        id: jobId
      },
      include: ["Contract"]
    });

    return job;
  } catch (ex) {
    throw ex;
  }
};

const pay = async (jobId) => {
  console.log("### STARTED JOB PAYMENT: " + jobId);

  try {
    const paymentOccured = false;

    const job = await getJobById(jobId);

    // If everything happened as expected, then update job after
    await job.update({ paid: 1, paymentDate: new Date() });

    // Return TRUE if the process was sucessful;
    return true;
  } catch (ex) {
    throw ex;
  }
};

module.exports = { getAllUnpaidJobs, getJobById, pay };
