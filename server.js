// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { verifyGoogleToken } = require('./auth/googleAuth');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ===== Login endpoint =====
app.post('/auth/google/android', async (req, res) => {
    const { idToken, role } = req.body;
    if (!idToken || !role) {
        return res.status(400).json({ message: 'Missing idToken or role' });
    }

    try {
        const user = await verifyGoogleToken(idToken);
        const userID = user.googleUserId;

        // For now: fake token — replace with real JWT when ready
        const fakeJwt = 'FAKE_JWT_FOR_DEMO';

        return res.json({
            message: `Successfully logged in as ${role}`,
            token: fakeJwt,
            role,
            userID,
        });
    } catch (err) {
        console.error('Error verifying Google ID token:', err);
        return res.status(401).json({
            message: 'Authentication failed',
            error: err.toString(),
        });
    }
});

// ===== Profile fetch endpoint (placeholder) =====
app.get('/manager/getBasicProfile/:userId', (req, res) => {
    const { userId } = req.params;
    // TODO: replace with real DB lookup
    res.json({
        userId,
        accCreated: 0,
        // other profile fields if needed
    });
});

// ===== Bind server to correct host/port for Render =====
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Backend server listening on ${HOST}:${PORT}`);
});
