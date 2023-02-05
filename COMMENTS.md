# Comments

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

    [ ] Get unpaid jobs

## General Comments

1. I had to update SQLite3 version from 4.0.1 to 5.1.4, since I was facing errors when installing the dependencies. I could probably
   change my Node version but I think that, in general, having an up-to-date package is a good thing.
2.
