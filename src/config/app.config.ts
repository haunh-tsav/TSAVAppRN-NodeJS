import dotenv from 'dotenv'

// Lệnh này sẽ đọc file .env và nạp các biến vào process.env
dotenv.config()

const appConfig = {
  // Môi trường hoạt động của app
  // 'development' | 'production'
  env: process.env.NODE_ENV || 'development',

  // Cấu hình server
  server: {
    server_port: process.env.PORT || 3000 // Nếu không có trong .env thì mặc định là 3000
  },

  // Cấu hình CORS
  cors: {
    allowed_origins: process.env.ALLOWED_ORIGINS || 'http://localhost:3000'
  },

  database: {
    db_host: process.env.DB_HOST ?? '',
    db_port: process.env.DB_PORT ?? '',
    username: process.env.DB_USERNAME ?? '',
    password: 'sg6H625#51',
    db_name: process.env.DB_NAME ?? ''
  }
}

export default appConfig
