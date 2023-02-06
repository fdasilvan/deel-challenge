const { getJobsByDate } = require("../repositories/jobsRepository");

const getBestProfessions = async (startDate, endDate) => {
  try {
    const result = await getJobsByDate(startDate, endDate);

    return result;
  } catch (ex) {
    throw ex;
  }
};

module.exports = { getBestProfessions };
