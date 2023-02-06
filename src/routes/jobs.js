var express = require("express");
const router = express.Router({ mergeParams: true });

const { getUnpaidJobs, payJob } = require("../services/jobsService");

/**
 * @returns gets all unpaid jobs from user's active contracts - both as a client and contractor
 */
router.get("/unpaid", async (req, res) => {
  try {
    const result = await getUnpaidJobs(req.profile.id);
    res.status(200).json(result);
  } catch (ex) {
    res.status(400).json(ex.message);
  }
});

/**
 * @returns pays for an unpaid job if the client's has enough funds
 */
router.post("/:job_id/pay", async (req, res) => {
  try {
    await payJob(req.params.job_id);
    return res.status(200).json("Payment sucessful!");
  } catch (ex) {
    console.log(ex);
    return res.status(400).json(ex.message);
  }
});

module.exports = router;
