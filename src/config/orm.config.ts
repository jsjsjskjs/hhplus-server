import { DataSource, DataSourceOptions } from "typeorm"
import * as path from "path"

export const ormConfig: DataSourceOptions = {
  type: "postgres",
  logging: !process.env.IS_LOCAL_ENV ? ["error", "log", "query"] : false,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  synchronize: false,
  entities: [path.join(__dirname, "..", "/**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "..", "/migrations/**/*{.ts,.js}")],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: true,
}

export default new DataSource(ormConfig)
