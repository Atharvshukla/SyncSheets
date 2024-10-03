const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Superjoin",
    password:"atharv",
    port: 5432,
});

// Test the database connection
const testConnection = async () => {
    try {
        const client = await pool.connect();
        await client.query('SELECT NOW()'); // Simple query to test the connection
        console.log('Successfully connected to the PostgreSQL database.');
        client.release(); // Release the client back to the pool
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Sync data from Google Sheets to PostgreSQL
const syncToDb = async (data) => {
    try {
        const client = await pool.connect();
        await client.query('BEGIN');

        // Clear table or apply upsert logic
        await client.query('DELETE FROM syncdata');

        // Insert new data (with correct column mapping)
        const insertQuery = `INSERT INTO syncdata (sheet_id, name, role, bonus, created_at) VALUES ($1, $2, $3, $4, $5)`;
        for (const row of data) {
            const sheet_id = row[0]; // First column is sheet_id
            const name = row[1];     // Second column is name
            const role = row[2];     // Third column is role
            const bonus = parseInt(row[3], 10); // Fourth column is bonus (ensure it's a number)
            const created_at = new Date(row[4]); // Fifth column is created_at (ensure it's a valid date)

            // If bonus is not a valid number, skip the row
            if (isNaN(bonus)) {
                console.error(`Invalid bonus value for row: ${row}`);
                continue;
            }

            await client.query(insertQuery, [sheet_id, name, role, bonus, created_at]);
        }

        await client.query('COMMIT');
        client.release();
    } catch (error) {
        console.error('Error syncing to PostgreSQL:', error);
        throw error;
    }
};

// Fetch data from PostgreSQL to sync with Google Sheets
const syncForDb = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM syncdata');
        client.release();

        // Return data in the correct format for Google Sheets
        return result.rows.map(row => [
            row.sheet_id,
            row.name,
            row.role,
            row.bonus.toString(),
            row.created_at.toISOString().split('T')[0],
        ]);
    } catch (error) {
        console.error('Error fetching data from PostgreSQL:', error);
        throw error;
    }
};
const getUpdatedRecords = async (lastSyncTime) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM syncdata WHERE updated_at > $1', [lastSyncTime]);
        client.release();
        return result.rows.map(row => [
            row.sheet_id,
            row.name,
            row.role,
            row.bonus.toString(),
            row.created_at.toISOString().split('T')[0]
        ]);
    } catch (error) {
        console.error('Error fetching updated records from PostgreSQL:', error);
        throw error;
    }
};



// Test the connection when the module is loaded
testConnection();

module.exports = {
    syncForDb,
    syncToDb,
    getUpdatedRecords,
};
