# HISAB RADAR — Firebase account setup

This project is pre-configured with the Firebase Web App values supplied for project `kangaal-xd` in the local `.env` file. The `.env` file is intentionally excluded from version control/ZIP sharing practices where possible; it contains client-side Firebase configuration, not an admin credential. Never add service-account JSON or SMTP passwords to the frontend.

## Enable phone login
1. Open Firebase Console → Authentication → Get started.
2. In Sign-in method, enable **Phone**.
3. In Authentication settings, add `localhost` and the production website domain to Authorized domains if they are not already listed.
4. Open Firestore Database → Create database.
5. From the project folder run `firebase deploy --only firestore:rules` after installing/logging into Firebase CLI (`npm i -g firebase-tools`, then `firebase login`).
6. For testing, Authentication → Phone numbers for testing can use Firebase test numbers and fixed codes. Real SMS depends on Firebase quotas, supported regions, and project billing/limits.

## Run the app
```powershell
npm install
npm run dev
```

## Email financial history
The frontend email form requests an email verification link. The report button works only after the email is verified and the Cloud Function is deployed.

1. Configure Firebase Functions for this project and install function dependencies: `cd functions; npm install; cd ..`.
2. Set SMTP secrets using Firebase CLI (never put these in `.env`):
   - `firebase functions:secrets:set SMTP_HOST`
   - `firebase functions:secrets:set SMTP_PORT`
   - `firebase functions:secrets:set SMTP_USER`
   - `firebase functions:secrets:set SMTP_PASS`
   - `firebase functions:secrets:set REPORT_FROM`
3. Deploy: `firebase deploy --only functions:sendFinancialReport`.
4. Copy the deployed function HTTPS URL into `VITE_REPORT_FUNCTION_URL` in `.env`, then restart Vite.

## Data and safety
- Existing browser-local mode remains available when Firebase is unavailable.
- After successful phone authentication, the app syncs the signed-in user's finance document to `users/{uid}`. Firestore rules restrict access to that UID.
- Email reports are generated server-side from the authenticated user's saved Firestore document; client-supplied financial data is not trusted.
- Firebase Web API keys identify the project and are expected in client apps. Do not share service-account keys, SMTP credentials, or private keys.
