// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyGoogleToken } = require('./auth/googleAuth');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Example login endpoint — same as your Flutter client expects
app.post('/auth/google/android', async (req, res) => {
    const { idToken, role } = req.body;
    if (!idToken || !role) {
        return res.status(400).json({ message: 'Missing idToken or role' });
    }

    try {
        const user = await verifyGoogleToken(idToken);
        const userID = user.googleUserId;
        // TODO: Actually create/find user in your DB, assign a real token
        const fakeJwt = 'FAKE_JWT_FOR_DEMO';  // Replace with real JWT in production

        return res.json({
            message: `Successfully logged in as ${role}`,
            token: fakeJwt,
            role,
            userID,
        });
    } catch (err) {
        console.error('Error verifying Google ID token', err);
        return res.status(401).json({
            message: 'Authentication failed',
            error: err.toString(),
        });
    }
});

// Example profile fetch route — optional (just placeholder)
app.get('/manager/getBasicProfile/:userId', (req, res) => {
    const { userId } = req.params;
    // TODO: fetch real profile from DB — here we return dummy
    res.json({
        userId,
        accCreated: 0,
        // other profile fields if needed
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
});
