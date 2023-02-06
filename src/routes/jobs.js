var express = require("express");
const router = express.Router({ mergeParams: true });

const { Job } = require("../model");

const { getAllUnpaidJobs, payJob } = require("../repositories/jobsRepository");

/**
 * @returns gets all unpaid jobs from user's active contracts - both as a client and contractor
 */
router.get("/unpaid", async (req, res) => {
  const result = await getAllUnpaidJobs(req.profile.id);
  res.json(result);
});

/**
 * @method pays for an unpaid job if the client's has enough funds
 */
router.post("/:job_id/pay", async (req, res) => {
  try {
    await payJob(req.params.job_id);
    res.status(200).json("Payment sucessful!");
  } catch (ex) {
    console.log(ex);
    return res.status(400).json(ex);
  }
});

module.exports = router;
