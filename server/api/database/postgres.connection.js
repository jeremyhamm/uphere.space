const pgp = require("pg-promise")({
  capSQL: true
});
const connectionString = `
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
`;
const connection = pgp(connectionString);

module.exports = connection;