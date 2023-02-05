var express = require("express");
const router = express.Router({ mergeParams: true });

const { Job } = require("../model");

/**
 * @returns all unpaid jobs
 */
router.get("/unpaid", async (req, res) => {
  const contracts = await Job.findAll({
    where: {
      ContractorId: req.profile.id,
      status: { [Op.ne]: "terminated" }
    }
  });
  if (!contracts) return res.status(404).end();
  res.json(contracts);
});

module.exports = router;
