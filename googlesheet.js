const { google } = require('googleapis');

// Load credentials from the credentials.json file
const credentials = require('./SuperJoinCredentials.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

// Google Sheet ID and range
const SPREADSHEET_ID = '1srjxFOL4pHOFwMyQkprvw3zYvWmrmgJnVGWl22B0XcU';
const RANGE = 'Sheet1!A1:E'; // Update to match the structure of your sheet (sheet_id, name, role, bonus, created_at)

// Function to fetch data from Google Sheets
async function fetchDataFromSheet() {
    try {
        const sheets = google.sheets({ version: 'v4', auth });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });
        
        return response.data.values; // Return the fetched data
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw error;
    }
}

// Function to update data in Google Sheets
const updateSheet = async (data) => {
    const sheetsApi = google.sheets({ version: 'v4', auth });

    const request = {
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A1', // Specify the starting cell for the update
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: data,
        },
    };

    try {
        const response = await sheetsApi.spreadsheets.values.update(request);
        console.log('Sheet updated successfully:', response);
    } catch (error) {
        console.error('Error updating Google Sheet:', error);
    }
};
module.exports = { fetchDataFromSheet, updateSheet };
