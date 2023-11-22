// File: firebase-admin.js

import * as admin from 'firebase-admin';

const serviceAccount = require('./g-mooc4d-firebase-adminsdk-xakvb-0505405a52.json');

// Inisialisasi Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // ... konfigurasi tambahan Firebase Admin SDK jika diperlukan
    });
}

export default admin;
