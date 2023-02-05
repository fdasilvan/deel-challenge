var express = require("express");
const router = express.Router({ mergeParams: true });

const { Job } = require("../model");

const { getAllUnpaidJobs } = require("../repositories/jobsRepository");

/**
 * @returns gets all unpaid jobs from user's active contracts - both as a client and contractor
 */
router.get("/unpaid", async (req, res) => {
  const result = await getAllUnpaidJobs(req.profile.id);
  res.json(result);
});

module.exports = router;
