const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const mongoose = require('mongoose');

// 识别.env中${}内容
dotenvExpand.expand(
  dotenv.config({
    path: ['.env', 'config.env'],
  }),
);

const port = process.env.PORT || 1000;

const app = require('./app');

app.listen(port, async (_) => {
  try {
    // 连接数据库
    const mongo = await mongoose.connect(process.env.DATABASE_ADDRESS, {
      // 连接数据库设置从默认admin数据库中认证
      authSource: 'admin',
    });

    if (mongo) console.log('mongoDB 连接成功 ✌️');

    console.log(`app is running on: http://localhost:${port}`);
  } catch (e) {
    console.log(e.message);
  }
});
