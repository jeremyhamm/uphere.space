const pgp = require("pg-promise")({
  capSQL: true
});
const connection = pgp(`
  postgres://
  ${process.env.POSTGRES_USER}
  : 
  ${process.env.POSTGRES_PASSWORD}
  @
  ${process.env.POSTGRES_HOST} 
  : 
  ${process.env.POSTGRES_PORT}
  /
  ${process.env.POSTGRES_DATABASE}
  ?ssl=true
`);

module.exports = connection;