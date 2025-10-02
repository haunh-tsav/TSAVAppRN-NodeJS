// src/config/database.config.ts

import { Sequelize } from 'sequelize-typescript'
import appConfig from './app.config'

console.log('--- DEBUG: DATABASE CONFIG ---')
console.log('HOST:', appConfig.database.db_host)
console.log('USER:', appConfig.database.username)
console.log('PASS:', appConfig.database.password)
console.log('DB_NAME:', appConfig.database.db_name)
console.log('----------------------------')

const sequelize = new Sequelize(
  appConfig.database.db_name,
  appConfig.database.username,
  // Mã hóa password vẫn là một bước quan trọng và nên giữ lại
  appConfig.database.password || '',
  {
    host: appConfig.database.db_host,
    port: parseInt(appConfig.database.db_port || '1433'),
    dialect: 'mssql',

    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    },

    // ✅ SỬA LỖI 2: Tự động tìm và nạp tất cả các model
    // Sequelize sẽ tìm tất cả các file có đuôi .model.ts trong thư mục models.
    models: [__dirname + '/../api/schemas/**/*.schema.ts'],

    logging: false,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    define: {
      comment: ''
    }
  }
)

// ✅ SỬA LỖI 1: Xóa bỏ hoàn toàn hàm syncModels() và lệnh gọi nó ở đây.

export default sequelize
