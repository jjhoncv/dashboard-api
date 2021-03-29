import { pool } from "../../utils/connection";

export const read = async (id = null) => {
  if (id) {
    const sql = `
    SELECT * FROM products 
    WHERE id=? 
    `;
    const data = await pool.query(sql, [id]);
    return data[0];
  } else {
    const sql = `
    SELECT * FROM products
    `;
    const data = await pool.query(sql);
    return data;
  }
};

export const create = async (product) => {
  const sqlInsert = `INSERT INTO products SET ?`;
  const record = await pool.query(sqlInsert, product);
  if (!!record) {
    const sqlUser = `SELECT * FROM products WHERE id=?`;
    const data = await pool.query(sqlUser, [record.insertId]);
    return data[0];
  } else {
    return false;
  }
};

export const remove = async (id) => {
  const sql = `DELETE FROM products WHERE id=?`;
  const data = await pool.query(sql, [id]);
  return data[0];
};
