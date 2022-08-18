import "reflect-metadata";
import "dotenv/config";

import { DataSource, DataSourceOptions } from "typeorm";

const port = Number(process.env.POSTGRES_PORT) || 5432;

let config: DataSourceOptions = {
  type: "postgres",
  port,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.ts",
    "./src/shared/infra/typeorm/migrations",
  ],
};

if (process.env.NODE_ENV === "production") {
  config = {
    type: "postgres",
    port: Number(process.env.POSTGRES_PORT),
    entities: ["./dist/modules/**/infra/typeorm/entities/*.js"],
    migrations: [
      "./dist/shared/infra/typeorm/migrations/*.js",
      "./dist/shared/infra/typeorm/migrations",
    ],
  };
}

if (process.env.NODE_ENV === "test") {
  Object.assign(config, {
    host: "localhost",
    port: 54321,
    // host: "postgres_nameapp_tests", // Somente descomentar essa propriedade qdo quisermos rodar os testes dentro do container
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "nameapp_tests",
  } as DataSourceOptions);
} else if (process.env.NODE_ENV === "development") {
  Object.assign(config, {
    host: "localhost",
    // host: "postgres_nameapp",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "nameapp",
  } as DataSourceOptions);
} else if (process.env.NODE_ENV === "production") {
  Object.assign(config, {
    host: "localhost",
    // host: "postgres_nameapp",
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: "nameapp",
  } as DataSourceOptions);
}

export default new DataSource(config);
