const {
  getAllActiveContracts,
  getContractById
} = require("../repositories/contractsRepository");

const getActiveContracts = async (profileId) => {
  try {
    return getAllActiveContracts(profileId);
  } catch (ex) {
    throw ex;
  }
};

const getContract = async (contractId, profileId) => {
  try {
    return getContractById(contractId, profileId);
  } catch (ex) {
    throw ex;
  }
};

module.exports = { getActiveContracts, getContract };
