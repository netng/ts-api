import dotenv from "dotenv";

const { Pool } = require('pg');

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});