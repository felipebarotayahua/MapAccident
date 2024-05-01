document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    // Check for TOKEN
    const token = localStorage.getItem('token');

    if (token) {
        // If token exists hide loginButton  show logoutButton
        loginButton.style.display = 'none';
        
    } else {
        logoutButton.style.display = 'none';
    }

    // Clear token/ LOG OUT FEATURE
    logoutButton.addEventListener('click', function () {
        // Remove token 
        localStorage.removeItem('token');
        // Redirect 
        window.location.href = '/login.html'; 
    });
});

// Loading into BigQuery
const bq = new google.cloud.bigquery.BigQuery();
const projId = 'cit412-final-project';
const datasetId = 'us_accidents';
const tableId = 'source-data';
const locations = [];
let curr_lat = 0;
let dest_lat = 0;
let curr_long = 0;
let dest_long = 0;

async function getLoc() {
    // Helper function to get the location data from BigQuery
    async function scanLoc() {
        const query = `SELECT Start_Lat, Start_Lng FROM ${projId}.${datasetId}.${tableId}`;
        const options = {
            query: query
        };

        await queryFS();

        const [rows] = await bq.query(options);
        rows.forEach(row => {
            // Check if the start or end points of the entry fall within the range
            if ((row.Start_Lat >= curr_lat && row.Start_Lat <= dest_lat)) {
                if ((row.Start_Lng >= curr_long && row.Start_Lng <= dest_long)) {
                    locations.push(row);
                }
            }
        });

        // console.log(locations);
    }

    async function queryFS() {
        return new Promise((resolve, reject) => {
            // Simulate Firestore connection and query
            setTimeout(() => {
                const querySnapshot = [
                    { data: () => ({ currLat: 10, destLat: 20, currLong: 30, destLong: 40 }) }
                ];
                querySnapshot.forEach((doc) => {
                    curr_lat = doc.data().currLat;
                    dest_lat = doc.data().destLat;
                    curr_long = doc.data().currLong;
                    dest_long = doc.data().destLong;
                });
                resolve();
            }, 1000); // Simulate delay
        });
    }

    await scanLoc();
}

// Call getLoc when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    getLoc().then(() => {
        // Once data is fetched, initialize map
        initMap();
    });
});

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    });

    // Place markers for each location
    locations.forEach((location) => {
        new google.maps.Marker({
            position: location,
            map: map,
        });
    });
}
