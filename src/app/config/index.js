import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const port = process.env.PORT;
export const database_url = process.env.DATABASE_URL;
export const database_url_local = process.env.localDB;
export const secrete = process.env.SECRETE;
