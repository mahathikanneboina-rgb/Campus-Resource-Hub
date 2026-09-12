import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// These are Firebase Web App settings, not server credentials. Environment
// variables can override them for forks or separate deployments.
const defaultFirebaseConfig = {
  apiKey: "AIzaSyA8R_5cNZ291fifAZaSKgPdTSc1d4svsI8",
  authDomain: "r-campus-resource-hub.firebaseapp.com",
  projectId: "r-campus-resource-hub",
  storageBucket: "r-campus-resource-hub.firebasestorage.app",
  messagingSenderId: "728080870325",
  appId: "1:728080870325:web:51cf77e60b6b047ffdc7fc",
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    defaultFirebaseConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
};

const isPlaceholderValue = (value: string | undefined): boolean => {
  if (!value) return true;

  const normalized = value.trim().toLowerCase();
  return (
    normalized === "" ||
    normalized.includes("your_") ||
    normalized.includes("your-") ||
    normalized.includes("placeholder") ||
    normalized.includes("replace_me") ||
    normalized.includes("changeme") ||
    normalized.endsWith("_firebase_api_key") ||
    normalized.endsWith("_firebase_project_id")
  );
};

export const isFirebaseConfigured = (): boolean => {
  const apiKey = firebaseConfig.apiKey;
  const projectId = firebaseConfig.projectId;
  return Boolean(
    !isPlaceholderValue(apiKey) && !isPlaceholderValue(projectId)
  );
};

const app = isFirebaseConfigured()
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;

export { auth, db };
