// api/submit.js
const mysql = require('mysql2');

// MySQLの接続設定
const connection = mysql.createConnection({
  host: 'test1-db.cn6u2cikg5j2.ap-northeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'himitu0625',
  database: 'mysql_test1',
});

// リクエスト処理
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    return new Promise((resolve, reject) => {
      // データベースに保存
      connection.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email],
        (error, results) => {
          if (error) {
            console.error('エラー:', error);
            res.status(500).send('データ保存失敗...');
            reject(error);
          } else {
            res.status(200).send('データ保存完了！');
            resolve(results);
          }
        }
      );
    });
  } else {
    res.status(405).send('メソッドがサポートされていません');
  }
};
