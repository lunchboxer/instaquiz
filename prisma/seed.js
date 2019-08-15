const { prisma } = require('../src/generated/prisma-client')

async function main () {
  await prisma.createUser({
    name: 'James Smith',
    username: 'james',
    password: '$2a$10$4FY3kI.nVFwSINEA3S2Tx.wgr3LCqAACWX261whAvGSE76uv0cOtu', // "secret"
    role: 'Teacher'
  })
}

main()
