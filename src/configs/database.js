import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Client } = pg

const connectionData = {
    user : process.env.DB_USER,
    host : 'localhost', //se va a ejecutar el docker local
    database : 'course-db',
    password : process.env.DB_PASSWORD,
    port : 5432,
}
export const client = new Client(connectionData)

