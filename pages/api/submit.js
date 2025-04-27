import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: 'ユーザー名とメールアドレスは必須です' });
    }

    const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
    connection.query(query, [username, email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'データベースエラー: ' + err.message });
      }
      return res.status(200).json({ message: 'データが正常に送信されました' });
    });
  } else {
    return res.status(405).json({ error: '許可されていないHTTPメソッドです' });
  }
}
