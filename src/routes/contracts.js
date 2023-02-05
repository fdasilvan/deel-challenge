var express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllActiveContracts,
  getContractById
} = require("../repositories/contractsReposity");

/**
 * @returns contract by id
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const contract = await getContractById(id, req.profile.id);
  if (!contract) return res.status(404).end();
  res.json(contract);
});

/**
 * @returns all active contracts by contractor ID
 */
router.get("/", async (req, res) => {
  const contracts = await getAllActiveContracts(req.profile.id);
  if (!contracts) return res.status(404).end();
  res.json(contracts);
});

module.exports = router;
