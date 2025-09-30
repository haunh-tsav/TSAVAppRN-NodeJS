import sequelize from './api/models'
import logging from './api/utils/logging'
import app from './app'
import appConfig from './config/app.config'

const NAMESPACE = 'Server'

const startServer = () => {
  // ✅ SỬA LỖI: Gắn .on('error') trực tiếp vào app.listen()
  const server = app
    .listen(appConfig.server.server_port, () => {
      logging.info(NAMESPACE, `Server is running on port ${appConfig.server.server_port}`)
    })
    .on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        logging.error(NAMESPACE, `Port ${appConfig.server.server_port} is already in use.`)
      } else {
        logging.error(NAMESPACE, `An error occurred during server startup: ${err.message}`, err)
      }
      process.exit(1)
    })

  // Logic graceful shutdown vẫn giữ nguyên và rất tốt
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

  process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
}

startServer()
