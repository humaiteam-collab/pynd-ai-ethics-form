// Fill these in from Firebase console > Project settings > Your apps > Web app.
// These values are public identifiers (safe to commit); access is controlled by Firebase Auth.
window.FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  appId: "PASTE_APP_ID"
};

// Who may use the tool. Leave both empty to allow any verified email.
window.ALLOWED_ACCESS = {
  domains: ["mcu.ac.th"],   // e.g. anyone@mcu.ac.th
  emails: []                // extra individual addresses, e.g. "someone@gmail.com"
};
