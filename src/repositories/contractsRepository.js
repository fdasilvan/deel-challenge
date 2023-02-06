const { Contract } = require("../model");

const Op = require("sequelize").Op;

const getContractById = async (contractId, profileId) => {
  return Contract.findOne({
    where: { id: contractId, ContractorId: profileId }
  });
};

const getAllActiveContracts = async (profileId) => {
  return Contract.findAll({
    where: {
      ContractorId: profileId,
      status: { [Op.ne]: "terminated" }
    }
  });
};

module.exports = { getContractById, getAllActiveContracts };
