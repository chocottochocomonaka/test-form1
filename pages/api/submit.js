// pages/api/submit.js

import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, email } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    await connection.end();

    res.status(200).send('データ保存完了！');
  } catch (error) {
    console.error(error);
    res.status(500).send('サーバーエラー');
  }
}
