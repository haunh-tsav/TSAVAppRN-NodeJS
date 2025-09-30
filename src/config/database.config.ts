import { Sequelize } from 'sequelize-typescript'
// src/config/database.config.ts

import HangMucSchema from '@/api/models/hang_muc.model'
import appConfig from './app.config' // ✅ Import từ appConfig

const sequelize = new Sequelize(
  appConfig.database.db_name,
  appConfig.database.username,
  encodeURIComponent(appConfig.database.password || ''),
  {
    // ✅ Lấy thông tin kết nối từ appConfig, không đọc process.env nữa
    host: appConfig.database.db_host,
    port: parseInt(appConfig.database.db_port || '1433'), // ✅ Sửa port mặc định
    dialect: 'mssql',
    dialectOptions: {
      // Tăng thời gian chờ cho việc thiết lập kết nối ban đầu lên 60 giây
      connectTimeout: 10000, // 60000ms = 60 giây
      // Options specific to the mssql dialect (tedious)
      options: {
        // Nếu server của bạn không dùng SSL, encrypt=false.
        // Đối với Azure SQL hoặc các server yêu cầu SSL, đặt là true.
        encrypt: false,
        trustServerCertificate: true // Change to false if you have a valid SSL certificate
      }
    },
    models: [HangMucSchema],

    logging: false, // Tắt logging ở đây để tránh nhiễu, server.ts đã log rồi

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

// ✅ Xóa bỏ khối sequelize.authenticate() ở đây
async function syncModels() {
  await sequelize.sync({ alter: true }) // 'alter: true' modifies existing tables
  console.log('Models synchronized with the database.')
}

// Call syncModels after authentication, or as part of your application setup
syncModels()

export default sequelize
