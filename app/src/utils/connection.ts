import { createPool, Pool, QueryFunction } from "mysql";
import { promisify } from "util";

export interface PromisifiedPool extends Omit<Pool, "query"> {
  query: QueryFunction | Function;
}

console.log('MYSQL_HOST', process.env.MYSQL_HOST)

export const pool: PromisifiedPool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

pool.query = promisify(pool.query);
