# Comments

## General Comments

1. I had to update SQLite3 version from 4.0.1 to 5.1.4, since I was facing errors when installing the dependencies. I could probably
   change my Node version but I think that, in general, having an up-to-date package is a good thing.
2. I created simple repository and service layers to be able to reuse code, but if it was a bigger product I'd probably create a fanciest one, inclusind Controllers, Interfaces, Dependency Injetcion, etc..
3. In the sixth requirement I was not sure if I should consider a job to be "Done" based on the "paymentDate" column or not. To be more accurate I'd prefer to add 2 new columns to Job table "start_date" and "end_date", to keep track of the period it took to be completed, and only then consider jobs within this interval to the sum of the amount. For simplicity, I will just use "paymentDate" on my solution.
4. For this test I implemented unit tests considering the seed database as a reference. In a production project I'd create all the

## Tech Debts

[x] Implement better error handling
[x] Implement better logging
[x] Implement Service Layer, where the business logic should be
[ ] Implement transactions on transfer endpoint (I had some difficulties making it work in Sequelize/SQLite)

## Unit tests

### Authentication Middleware

    [x] Valid profile should return 200 - OK
    [x] Non existent profile should return 401 - Unauthorized
    [x] An invalid profile should return 401 - Unauthorized

### Contracts

    [x] Get contract by ID
        [x] Only owner can access his contracts
        [x] Contractor can't access contracts from other contractors
        [x] Not found contractors/clients should return 404
        [x] Not found contracts should return 404
    [x] Get contracts
        [x] Should only bring his own contracts (either as client or contractor)
        [x] Contractor can't access contracts from other contractors
        [x] Found contracts couldn't be "terminated"

### Jobs

    [ ] Get unpaid jobs for active contracts
        [ ] Shouldn't bring paid jobs
        [ ] Should only bring contracts in which the logged user is either a client or a contractor
        [ ] Should only bring active contracts
    [ ] Pay job
        [ ] Can't pay for a job that is already paid
        [ ] Only the client can pay for a job
        [ ] Can't pay if the client is invalid
        [ ] Can't pay if the contractor is invalid
        [ ] Can't pay if the client doesn't have enough balance
        [ ] If met all the conditions, the job should have paid = 1 and a paymentDate

### Profile

    [ ] Make a deposit
        [ ] Can't deposit for an invalid user
        [ ] Can't deposit negative amount
        [ ] Can't despoit if the amount exceeds 25% of open jobs
        [ ] If the deposit succeeds, the balance should match previous value + deposit amount
