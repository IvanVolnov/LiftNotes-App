import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});
//# sourceMappingURL=db.js.map