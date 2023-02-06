var express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getActiveContracts,
  getContract
} = require("../services/contractsService");

/**
 * @returns contract by id
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await getContract(id, req.profile.id);
    if (!contract) return res.status(404).end();
    res.json(contract);
  } catch (ex) {
    res.status(400).json(ex.message);
  }
});

/**
 * @returns all active contracts by contractor ID
 */
router.get("/", async (req, res) => {
  try {
    const contracts = await getActiveContracts(req.profile.id);
    if (!contracts) return res.status(404).end();
    res.json(contracts);
  } catch (ex) {
    res.status(400).json(ex.message);
  }
});

module.exports = router;
