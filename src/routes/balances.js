var express = require("express");
const router = express.Router({ mergeParams: true });

const { deposit } = require("../services/balancesService");

/**
 * @method adds funds to an user balance based on required business rules
 */
router.post("/deposit/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { depositAmount } = req.body;

    if (!userId || !depositAmount) {
      throw new Error("Invalid parameters!");
    }

    // Makes a deposit
    const updatedObject = await deposit(userId, depositAmount);

    console.log("### DEPOSIT SUCCESSFUL: " + JSON.stringify(updatedObject));

    res
      .status(200)
      .json(`Deposit sucessful! $${depositAmount} to user '${userId}'.`);
  } catch (ex) {
    console.log("[ERROR] It was not possible to make a deposit: " + ex);
    return res.status(400).json(ex.message);
  }
});

module.exports = router;
