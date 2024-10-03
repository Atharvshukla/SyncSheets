require('./sync'); 
const { getUpdatedRecords } = require('./db');

const { updateSheet } = require('./googlesheet');

let lastSyncTime = new Date().toISOString(); // Initialize with the current time

const syncChanges = async () => {
    try {
        const updatedRecords = await getUpdatedRecords(lastSyncTime);
        
        if (updatedRecords.length > 0) {
            await updateSheet(updatedRecords);
        } else {
            console.log('No new changes to sync.');
        }

        // Update last sync time
        lastSyncTime = new Date().toISOString();
    } catch (error) {
        console.error('Error during sync:', error);
    }
};

// Sync every 5 seconds
setInterval(syncChanges, 5000);
