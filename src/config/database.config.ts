import { SequelizeOptions } from 'sequelize-typescript'

const databaseConfig: SequelizeOptions = {
  username: 'haunh',
  password: 'sg6H625#51!',
  database: 'IT_TEST',
  host: '10.122.22.3',
  port: 1433,
  dialect: 'mysql',
  pool: {
    max: 5, //Số lượng kết nối tối đa trong pool.
    min: 0, //Số lượng kết nối tối thiểu trong pool.
    acquire: 30000, //Thời gian tối đa để một kết nối được thực hiện, tính bằng mili giây.
    idle: 10000 //Thời gian tối đa một kết nối có thể ở trong pool mà không được sử dụng, tính bằng mili giây.
  }
}

export default databaseConfig
