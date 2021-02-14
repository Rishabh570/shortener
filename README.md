# URL Shortener

Simple url shortener

## Installation

- Clone the repo
- Install the dependencies: `npm i`
- Run the server: `node index.js`

## Checking for race condition

### Without locking mechanism

- Make sure you're on branch `main`
- Make sure the server is running
- Run the script: `node fire-parallel-requests.js`

Without locks, there would be two short URLs in the output for the same long URL.

### With locks in place

- Checkout to branch `lock`
- Run the server and then the script: `node fire-parallel-requests.js`\

There would be just one short URL and the other request would error out because it couldn't acquire the lock.