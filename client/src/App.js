
// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const showData = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             // Make a request to the backend (running on port 5000)
//             const response = await axios.get('http://localhost:5000/api/data');
//             setData(response.data); // Set fetched data
//         } catch (error) {
//             setError('Error fetching data.');
//             console.error('Axios error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const styles = {
//         container: {
//             maxWidth: '600px',
//             margin: '0 auto',
//             textAlign: 'center',
//         },
//         button: {
//             margin: '20px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             cursor: 'pointer',
//         },
//         loading: {
//             color: 'blue',
//             margin: '10px 0',
//         },
//         error: {
//             color: 'red',
//             margin: '10px 0',
//         },
//         jsonDisplay: {
//             textAlign: 'left',
//             backgroundColor: '#f4f4f4',
//             padding: '15px',
//             borderRadius: '5px',
//             overflow: 'auto',
//             maxHeight: '400px',
//         },
//     };

//     return (
//         <div style={styles.container}>
//             <h1>Show Data from Database</h1>

//             {/* Button to fetch data */}
//             <button
//                 onClick={showData}
//                 style={styles.button}
//                 disabled={loading}
//             >
//                 {loading ? 'Fetching Data...' : 'Show Data'}
//             </button>

//             {/* Loading and Error Messages */}
//             {loading && <p style={styles.loading}>Loading...</p>}
//             {error && <p style={styles.error}>{error}</p>}

//             {/* Data Display in JSON format */}
//             <div style={styles.jsonDisplay}>
//                 {data.length > 0 ? (
//                     <pre>{JSON.stringify(data, null, 2)}</pre> // Display data in JSON format
//                 ) : (
//                     <p>No data available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default App;
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [syncLoading, setSyncLoading] = useState(false);
    const [syncError, setSyncError] = useState(null);

    const showData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch data from the backend
            const response = await axios.get('http://localhost:5000/api/data');
            setData(response.data);
        } catch (error) {
            setError('Error fetching data.');
            console.error('Axios error:', error);
        } finally {
            setLoading(false);
        }
    };

    const syncFromSheets = async () => {
        setSyncLoading(true);
        setSyncError(null);
        try {
            // Sync data from Google Sheets
            const response = await axios.get('http://localhost:5000/sync-from-sheets');
            alert(response.data); // Show success message
        } catch (error) {
            setSyncError('Error syncing from Google Sheets.');
            console.error('Axios error:', error);
        } finally {
            setSyncLoading(false);
        }
    };

    const syncFromDB = async () => {
        setSyncLoading(true);
        setSyncError(null);
        try {
            // Sync data to Google Sheets from database
            const response = await axios.get('http://localhost:5000/sync-from-db');
            alert(response.data); // Show success message
        } catch (error) {
            setSyncError('Error syncing from database.');
            console.error('Axios error:', error);
        } finally {
            setSyncLoading(false);
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
        },
        button: {
            margin: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
        },
        loading: {
            color: 'blue',
            margin: '10px 0',
        },
        error: {
            color: 'red',
            margin: '10px 0',
        },
        jsonDisplay: {
            textAlign: 'left',
            backgroundColor: '#f4f4f4',
            padding: '15px',
            borderRadius: '5px',
            overflow: 'auto',
            maxHeight: '400px',
        },
    };

    return (
        <div style={styles.container}>
            <h1>Show Data from Database</h1>

            {/* Button to fetch data */}
            <button
                onClick={showData}
                style={styles.button}
                disabled={loading}
            >
                {loading ? 'Fetching Data...' : 'Show Data'}
            </button>

            {/* Button to sync from Google Sheets */}
            <button
                onClick={syncFromSheets}
                style={styles.button}
                disabled={syncLoading}
            >
                {syncLoading ? 'Syncing from Sheets...' : 'Sync from Google Sheets'}
            </button>

            {/* Button to sync from Database */}
            <button
                onClick={syncFromDB}
                style={styles.button}
                disabled={syncLoading}
            >
                {syncLoading ? 'Syncing from DB...' : 'Sync from Database'}
            </button>

            {/* Loading and Error Messages */}
            {loading && <p style={styles.loading}>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {syncError && <p style={styles.error}>{syncError}</p>}

            {/* Data Display in JSON format */}
            <div style={styles.jsonDisplay}>
                {data.length > 0 ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre> // Display data in JSON format
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default App;
