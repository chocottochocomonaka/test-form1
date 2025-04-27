require('dotenv').config(); // dotenv を使って環境変数を読み込む

const mysql = require('mysql2');

// 環境変数から接続情報を取得
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 接続確認
connection.connect((err) => {
  if (err) {
    console.error('データベース接続エラー:', err);
  } else {
    console.log('データベースに接続しました');
  }
});
