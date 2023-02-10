const moment = require("moment");
const { QueryTypes } = require("sequelize");
const { Profile } = require("../model");

const sequelize = Profile.sequelize;

const transferFunds = async (fromUserId, toUserId, amount) => {
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
      console.log(`CLIENT'S BALANCE: ${client.balance} -> AMOUNT: ${amount}`);
      throw new Error("It wasn't possible to make the transfer.");
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
    const contractorNewBalance = { balance: (contractor.balance += amount) };
    await contractor.update(contractorNewBalance);
    return true;
  } catch (ex) {
    throw ex;
  }
};

const depositFunds = async (profileId, depositAmount) => {
  try {
    // Fetch client and verifies the balance
    const client = await Profile.findOne({
      where: {
        id: profileId
      }
    });

    const updateObj = {
      balance: (client.balance += depositAmount)
    };

    // Adds the deposit amount to the balance
    const updatedClient = await client.update(updateObj);
    return updatedClient;
  } catch (ex) {
    throw ex;
  }
};

const getClientsAmountByDate = async (startDate, endDate, limit) => {
  try {
    const clients = await sequelize.query(
      `select p.firstName || ' ' || p.lastName as fullName, 
            sum(j.price) as totalAmount 
       from jobs j 
      inner join contracts c on c.id = j.ContractId 
      inner join profiles p on p.id = c.clientId
      where paymentDate between :start_date and :end_date
        and paymentDate is not null
      group by fullName
      order by totalAmount desc
      limit :limit;`,
      {
        replacements: {
          start_date: moment(startDate).utc().toDate(),
          end_date: moment(endDate)
            .add(1, "day")
            .subtract(1, "millisecond")
            .utc()
            .toDate(),
          limit
        },
        type: QueryTypes.SELECT
      }
    );

    return clients;
  } catch (ex) {
    throw ex;
  }
};

module.exports = { transferFunds, depositFunds, getClientsAmountByDate };
