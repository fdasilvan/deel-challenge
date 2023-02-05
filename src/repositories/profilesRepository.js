const { Profile } = require("../model");
const { sequelize } = require("sequelize");

const transferFunds = async (fromUserId, toUserId, amount) => {
  //const transaction = await sequelize.transaction();
  try {
    // Fetch client and verifies the balance
    const client = await Profile.findOne({
      where: {
        id: fromUserId
      }
    });

    // P.S.: I would not return a specific error mentioning the balance in a production env, since someone
    // could try to figure out the balance from an user account by creating fake jobs and calling this endpoint out.
    if (!client || client.balance < amount) {
      throw new Error("It wasn't possible to make the transfer");
    }

    // First I'll remove the balance from client's account
    const clientNewBalance = { balance: (client.balance -= amount) };
    await client.update(clientNewBalance);

    // And then I'll fetch data from the contractor (I'm getting the full object so we can add more validations in the future if necessary)
    const contractor = await Profile.findOne({
      where: {
        id: toUserId
      }
    });

    // Updates contractor's balance
    const contractorNewBalance = { balance: (client.balance += amount) };
    await contractor.update(contractorNewBalance);

    // Commits the transaction and confirms it happened;
    //await transaction.commit();
    return true;
  } catch (ex) {
    //await transaction.rollback();
    throw ex;
  }
};

module.exports = { transferFunds };
