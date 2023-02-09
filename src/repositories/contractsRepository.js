const { Contract } = require("../model");

const Op = require("sequelize").Op;

const getContractById = async (contractId, profileId) => {
  return Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }]
    }
  });
};

const getAllActiveContracts = async (profileId) => {
  return Contract.findAll({
    where: {
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      status: { [Op.ne]: "terminated" }
    }
  });
};

module.exports = { getContractById, getAllActiveContracts };
