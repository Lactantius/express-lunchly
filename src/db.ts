/** Database for lunchly */

import { Client } from "pg";

const db = new Client("postgresql:///lunchly");

db.connect();

export default db;
