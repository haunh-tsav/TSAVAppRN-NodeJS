// src/server.ts

// Nạp biến môi trường MỘT LẦN DUY NHẤT ở đây
import dotenv from 'dotenv'
dotenv.config()

import logging from './api/utils/logging' // Sửa lại đường dẫn nếu cần
import app from './app'
import appConfig from './config/app.config'
import sequelize from './config/database.config'

const NAMESPACE = 'Server'

const startServer = async () => {
  try {
    // ✅ Đơn giản hóa: await sẽ xử lý promise. Nếu lỗi, catch sẽ bắt.
    await sequelize.authenticate()
    logging.info(NAMESPACE, 'Database connection has been established successfully. 🥳🎉')

    const server = app
      .listen(appConfig.server.server_port, () => {
        logging.info(NAMESPACE, `Server is running on port ${appConfig.server.server_port}`)
      })
      .on('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
          logging.error(NAMESPACE, `Port ${appConfig.server.server_port} is already in use.`)
        } else {
          logging.error(NAMESPACE, `Server startup error: ${err.message}`, err)
        }
        process.exit(1)
      })

    // ✅ Tối ưu hóa graceful shutdown với async/await
    const gracefulShutdown = async (signal: string) => {
      logging.info(NAMESPACE, `${signal} signal received. Closing server gracefully.`)

      server.close(async () => {
        logging.info(NAMESPACE, 'HTTP server closed.')
        try {
          await sequelize.close()
          logging.info(NAMESPACE, 'Database connection has been closed.')
        } catch (error) {
          logging.error(NAMESPACE, 'Error closing the database connection:', error)
        }
        process.exit(0)
      })
    }

    // Lắng nghe các tín hiệu để tắt server
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  } catch (error: any) {
    logging.error(NAMESPACE, 'Unable to connect to the database:', error.message)
    process.exit(1)
  }
}

startServer()
