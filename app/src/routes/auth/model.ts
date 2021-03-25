import { pool } from "../../utils/connection";

export const login = async (username, password) => {
  const sql = `
  SELECT * FROM users 
  WHERE username=? 
  AND password=?`;
  const data = await pool.query(sql, [username, password]);
  return data[0];
};

export const register = async (username, password, email) => {
  const sqlInsert = `INSERT INTO users SET ?`;
  const record = await pool.query(sqlInsert, { username, password, email });
  if (!!record) {
    const sqlUser = `SELECT * FROM users WHERE id=?`;
    const data = await pool.query(sqlUser, [record.insertId]);
    return data[0];
  } else {
    return false;
  }
};
