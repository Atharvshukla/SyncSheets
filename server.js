const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { fetchDataFromSheet, updateSheet } = require('./googlesheet');
const { syncForDb, syncToDb } = require('./db'); 

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.post('/sync-from-sheets', async (req, res) => {
    try {
        const data = await fetchDataFromSheet(); // Fetch data from Google Sheets
        await syncToDb(data); // Sync data to PostgreSQL
        res.send('Data synced from Google Sheets to PostgreSQL.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error syncing data from Google Sheets.');
    }
});

// Route to sync from PostgreSQL to Google Sheets
app.post('/sync-from-db', async (req, res) => {
    try {
        // Fetch data from PostgreSQL using syncForDb()
        const data = await syncForDb();

        // Format the data: Add headers (column names) at the top
        const formattedData = [['sheet_id', 'name', 'role', 'bonus', 'created_at'], ...data];

        // Debugging: Log the formatted data to inspect the structure before sending
        console.log('Formatted Data for Google Sheets:', JSON.stringify(formattedData, null, 2));

        // Update the Google Sheets with the formatted data
        await updateSheet(formattedData);

        // Respond to the client after successful sync
        res.send('Data successfully synced from PostgreSQL to Google Sheets.');
    } catch (error) {
        console.error('Error syncing data to Google Sheets:', error);
        res.status(500).send('Error syncing data to Google Sheets.');
    }
});


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Superjoin",
    password:"atharv",
    port:  5432,
});



app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM syncdata'); // Assuming your table is named 'sheet_data'
        res.json(result.rows); // Send all rows as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
