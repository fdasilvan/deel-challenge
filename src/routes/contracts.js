var express = require("express");
const router = express.Router({ mergeParams: true });
const Op = require("sequelize").Op;

const { Contract } = require("../model");

/**
 * @returns contract by id
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const contract = await Contract.findOne({
    where: { id, ContractorId: req.profile.id }
  });
  if (!contract) return res.status(404).end();
  res.json(contract);
});

/**
 * @returns all active contracts by contractor ID
 */
router.get("/", async (req, res) => {
  const contracts = await Contract.findAll({
    where: {
      ContractorId: req.profile.id,
      status: { [Op.ne]: "terminated" }
    }
  });
  if (!contracts) return res.status(404).end();
  res.json(contracts);
});

module.exports = router;
