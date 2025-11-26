// auth/googleAuth.js
const { OAuth2Client } = require('google-auth-library');


const WEB_CLIENT_ID = '367310603826-hhgtj0ggr35toal812i7dqv262lfd95j.apps.googleusercontent.com';

const client = new OAuth2Client(WEB_CLIENT_ID);


async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: WEB_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
        googleUserId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
    };
}

module.exports = { verifyGoogleToken };
