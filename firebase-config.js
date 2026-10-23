// Fill these in from Firebase console > Project settings > Your apps > Web app.
// These values are public identifiers (safe to commit); access is controlled by Firebase Auth.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBddKcp5swV04cHV6f9pamPAk0JkTmzb0o",
  authDomain: "pynd-ai-ethics.firebaseapp.com",
  projectId: "pynd-ai-ethics",
  appId: "1:974252628536:web:d7f8d9e02cd5bd70a064cd"
};

// Who may use the tool. Leave both empty to allow any verified email.
window.ALLOWED_ACCESS = {
  domains: ["mcu.ac.th", "gmail.com"],   // gmail.com = ANY Gmail user; remove it and list people in emails[] to restrict
  emails: []                // extra individual addresses, e.g. "someone@gmail.com"
};
