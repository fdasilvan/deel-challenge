var express = require("express");
const router = express.Router({ mergeParams: true });

const { getBestProfessions } = require("../services/adminService");

/**
 * @returns contract by id
 */
router.get("/best-profession", async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const bestProfessions = await getBestProfessions(start_date, end_date);

    res.status(200).json(bestProfessions);
  } catch (ex) {
    res.status(400).json(ex.message);
  }
});

module.exports = router;
