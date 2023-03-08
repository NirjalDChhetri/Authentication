import { Sequelize } from "sequelize";
import "dotenv/config";


export default new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,

    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
      max: 20,
      idle: 30000,
      min: 5,
    },
    define: {
      underscored: true,
    },
  }
);

// export default new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,

//     dialect: process.env.DB_DIALECT,
//     port: process.env.DB_PORT,
//     pool: {
//       max: 20,
//       idle: 30000,
//       min: 5,
//     },
//     define: {
//       underscored: true,
//     },
//   }
// );

