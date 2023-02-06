var express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getBestProfessions,
  getBestClients
} = require("../services/adminService");

/**
 * @returns get the best professions by total amount, considering the payment date to filter the period
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

/**
 * @returns get the top X best clients by total amount in a specific period, where X is the "limit" parameter (default = 2)
 */
router.get("/best-client", async (req, res) => {
  try {
    const { start_date, end_date, limit } = req.query;
    const bestClients = await getBestClients(start_date, end_date, limit);
    res.status(200).json(bestClients);
  } catch (ex) {
    res.status(400).json(ex.message);
  }
});

module.exports = router;
