# Comments

## General Comments

1. I had to update SQLite3 version from 4.0.1 to 5.1.4, since I was facing errors when installing the dependencies. I could probably
   change my Node version but I think that, in general, having an up-to-date package is a good thing.
2. I created simple repository and service layers to be able to reuse code, but if it was a bigger product I'd probably create a fanciest one, inclusind Interfaces, Dependency Injetcion, etc..

## Tech Debts

[ ] Implement better error handling
[ ] Implement better logging
[ ] Implement Service Layer, where the business logic should be
[ ] Implement transactions on transfer endpoint (I had some difficulties making it work in Sequelize/SQLite)

## Unit tests

### Authentication Middleware

    [ ] An invalid profile should return 401 - Unauthorized

### Contracts

    [ ] Get contract by ID
        [ ] Only owner can access his contracts
        [ ] Contractor can't access contracts from other contractors
        [ ] Not found contractors should return 404
        [ ] Not found contracts should return 404
    [ ] Get contracts
        [ ] Only owner can access his contracts
        [ ] Contractor can't access contracts from other contractors
        [ ] No contracts should return 200 with an empty array
        [ ] Found contracts couldn't be "terminated"

### Jobs

    [ ] Get unpaid jobs for active contracts
        [ ] Shouldn't bring paid jobs
        [ ] Should only bring contracts in which the logged user is either a client or a contractor
        [ ] Should only bring active contracts
    [ ] Pay job
        [ ] Can't pay for a job that is already paid
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
