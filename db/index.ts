import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

const connection =  mysql.createConnection({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT!),
    // ssl: {
    //     ca: fs.readFileSync(
    //         path.join(process.cwd(), "certs", "production_ssl_database_CA.pem")
    //     ),
    // },

});
export const db = drizzle(connection);