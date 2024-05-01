const express = require('express');
const admin = require('firebase-admin');
const path = require('path'); 
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const { BigQuery } = require('@google-cloud/bigquery');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Express app
const app = express();

// Initialize BigQuery client
const bigquery = new BigQuery();
// Initialize Firestore
// Access environment variables
const serviceAccount = {
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
    "universe_domain": process.env.UNIVERSE_DOMAIN
};
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Initialize Firestore
const db = admin.firestore();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// User login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query Firestore for user with provided email
        const userSnapshot = await admin.firestore().collection('users').where('email', '==', email).get();

        // Check if user exists and password matches
        if (!userSnapshot.empty) {
            const userDoc = userSnapshot.docs[0];
            const userData = userDoc.data();

            // Perform password validation (you may use a library like bcrypt)
            if (userData.password === password) {
                // Generate JWT token
                const token = jwt.sign({
                    userId: userDoc.id,
                    email: userData.email
                }, '6d0f84ab22c876f8694b6f45228967a4e8c27d19ee8c9077fc50d6e7e6d041b3', { expiresIn: '1h' }); 

                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//User register endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const userSnapshot = await admin.firestore().collection('users').where('email', '==', email).get();
        if (!userSnapshot.empty) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user document in Firestore
        await admin.firestore().collection('users').add({
            email,
            password 
        });

        // Registration successful
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//API Fetch endpoint /locations



// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//Start server
const port = process.env.PORT || 8080; // Use the provided port or default to 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


