import mysql from 'mysql2';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 環境変数からMySQLの接続情報を取得
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const { name, email } = req.body;

    // データベースに保存
    connection.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email],
      (error, results) => {
        if (error) {
          console.error('エラー:', error);
          res.status(500).json({ message: 'データ保存失敗...' });
        } else {
          res.status(200).json({ message: 'データ保存完了！' });
        }
      }
    );
    connection.end();
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
