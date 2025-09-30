import routes from '@/routes/index'
import cors, { CorsOptions } from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import errorHandler from './api/middleware/errorHandler'
import { responseEnhancer } from './api/middleware/express-formatter'
// SUGGESTION: Xóa import này, không nên sync ở đây
// import sequelize from './api/models'
import appConfig from './config/app.config' // Giả sử bạn có file config

const app: Application = express()

// === Cấu hình Middleware ===

// 1. Cấu hình CORS từ biến môi trường
const allowedOrigins = appConfig.cors.allowed_origins.split(',') // Ví dụ: "http://localhost:3000,https://my-app.com"
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Cho phép request không có origin (như Postman) hoặc origin nằm trong danh sách
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true // Cho phép gửi cookie
}
app.use(cors(corsOptions))

// 2. Body Parsers
app.use(express.json({ limit: '10kb' })) // Giới hạn kích thước payload
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// 3. Bảo mật cơ bản với Helmet
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

// 4. Logger (Morgan) tùy theo môi trường
if (appConfig.env === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// 5. Middleware tùy chỉnh
app.use(responseEnhancer())

// === Routes ===
app.use('/api', routes)

// === Error Handling ===
// Middleware errorHandler phải được đặt ở cuối cùng
app.use(errorHandler)

// DANGER: Xóa bỏ dòng này. Hãy dùng sequelize-cli để quản lý migrations.
// sequelize.sync()

export default app
