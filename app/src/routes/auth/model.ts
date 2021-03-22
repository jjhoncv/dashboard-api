import { pool } from "../../utils/connection";

export const login = async (username, password) => {
  const sql = `
  SELECT * FROM users 
  WHERE username=? 
  AND password=?`;
  const data = await pool.query(sql, [username, password]);
  return data[0];
};
