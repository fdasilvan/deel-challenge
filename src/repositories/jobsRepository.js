const { Job, Contract } = require("../model");
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

module.exports = { getAllUnpaidJobs };
