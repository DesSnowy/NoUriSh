const { Pool } = require("pg");
require("dotenv").config();

const isLocal = process.env.LOCAL == 1;

const pool = isLocal
  ? new Pool()
  : new Pool({
      connectionString:
        "postgres://default:4zJguaXROvw9@ep-lucky-cell-a1u7vx88-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
    });


module.exports = {
  query: (text, params) => pool.query(text, params),
};
