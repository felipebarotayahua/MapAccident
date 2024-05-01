const express = require('express');
const admin = require('firebase-admin');
const path = require('path'); 
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();


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
// const serviceAccount = {
//     "type": "service_account",
//     "project_id": "sp24-41200-fbarotay-scratch",
//     "private_key_id": "285d6abde68c1526344290910eae334d9e04d743",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDB7LHsTeH2LfhL\nLDtOia2ysb0TSxrN9slPsUCOtgvbsaKNdvAfUAGVCqoZe9CayzAWE3UpoCkMjW+l\nF7vq56qlOQ63sFFmSMFH/B+Ko+ouY7ihYqpYoVozUZJU07GLepISay9ZwRmIdT9r\nV1guSIPCKYr8bPKlQUHxD2LiiFdyvoG89WsA6A6ewqoJx/BMOIH8prf/GpiswygE\nxSiA+Xkk97oSPE86Vi9e6pYetJjXlT4VyzWJxqtTEoham580KoSNCVoBVlARGCwE\nw8rDUnZoNGFLpBHt2HLB1wejt/yJhRJ6v2xo6ZEOW9JCqhkzKzNQX5UKQvtLYras\nszWPWXp3AgMBAAECggEAA6hlwUX7ORORN1N1Qd3S15qABMJay/jofB6XoKpUY6rS\n+xmxsbB0D5uR8Nltz2U6RcIC1GvNHBkicHGKUer5sAb5Hsc704IGcFUa159M08N9\n3p6umXRtCt2ap3dE2k/4Vr33+/2t2+BgmSyDlwZtIStuD9sL6NYrRoJfhh3RMHKV\nnCai0YrgcMiujyRvYAzL/jCkDwucMLvlQNVut00xb9w3cUtnOO6JsgA92P7ANXHF\nhTZ/958XN4R96ZbxMW7ew0afQpEVnJqWR1rp5w/1AlZjuhPvzVj6iDy9Ux9E4Bj4\nYUe8wSIttsKZiDxQBOJbRaCyqnebqxxt8XsgRSbtMQKBgQD/AbW3mApshHS49k+9\nBADuLdYD6vymRMiYceGo7m1w/tK9J4DGb1CMv0yiPnyez4EN9bZkyuikNQWiQj5E\nxo153Rgpz2M7EC5htmyeMTDqeOz+0MqwyuHQPb6ifdDuB/N4H+1VE4HZ1zy2Mlqt\noZuoTp8DJXsGj/DwzC0YL1e+SQKBgQDCrhMgqdYVUSBJ0FQzWyWYT+kDOz0uGQEB\nUvZAdAOcjCvpdAuo2xgZpSJnX72QaspGHPW2z96gyRJYxnkYH8x1T2D2T8PZgGXf\n1XpkWWqiwIYkdlG0JNcHabSZ+X6NJkXIwdd1Hn7l7A5cmheVQzk1DjSzBvA2hrER\nHTLh0PZyvwKBgQCSVn/amPS6a5S0JB2EQczq4gDkBLDyFZzr5sZx9El3w7RZ+lZr\nCaw26PzoSmWnmTrdMPl3g/3XZdoS0GL9gtfjbB6Wt72hQlrrlg1lBqOkmrqeTGFU\n7UiDATvp8bu5LXTppaDD5srooRzlDaZ957T09BFKc/LSxD2nYfQq4dg/iQKBgAnf\nwmCZvJ4AK18TDfI84T9EblEXpBa+deqXRp4mRDigc2m31Q+PbT1/vqr3lCnLAM9l\nkKDhEi2dhSyzhFjQ5BHfIM/dY9WYSZJ8xWRplJsEoMkgpyw34iAiIGLe4KhQFKIG\nEuOB1HXc7y2LMz8C1df3DH04EN7zHe/8RyRk8NsJAoGAE7XkWai4XML+w5jscIKh\nTdDYGCuXQviGt/2YpDtdlpR84Au8Gs0VlLtNA3LCPAyMes3VdzXkH1dMRDZSCizJ\ngM8elfw3b6fnsDbyxQkHES7P2xIVWlKWENJC6EZfVa/7SrPwiK3kX/atYlURpgsS\n3VHQos3hpadxIabTv47jNsc=\n-----END PRIVATE KEY-----\n",
//     "client_email": "mapaccident@sp24-41200-fbarotay-scratch.iam.gserviceaccount.com",
//     "client_id": "104417845907998168543",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mapaccident%40sp24-41200-fbarotay-scratch.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   };
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




// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//Start server
const port = process.env.PORT || 8080; // Use the provided port or default to 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


