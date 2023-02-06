const { getJobsByDate } = require("../repositories/jobsRepository");
const {
  getClientsAmountByDate
} = require("../repositories/profilesRepository");

const getBestProfessions = async (startDate, endDate) => {
  try {
    const result = await getJobsByDate(startDate, endDate);

    return result;
  } catch (ex) {
    throw ex;
  }
};

const getBestClients = async (startDate, endDate, limit) => {
  try {
    if (!limit) {
      limit = 2;
    }

    const result = await getClientsAmountByDate(startDate, endDate, limit);

    return result;
  } catch (ex) {
    throw ex;
  }
};

module.exports = { getBestProfessions, getBestClients };
