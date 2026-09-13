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

export const ADMIN_EMAIL = "mahathikanneboina@gmail.com";

export const isAdminEmail = (email: string | null | undefined): boolean =>
  email?.trim().toLowerCase() === ADMIN_EMAIL;

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

const configuredValue = (value: string | undefined, fallback: string): string =>
  isPlaceholderValue(value) ? fallback : value ?? fallback;

const firebaseConfig = {
  apiKey: configuredValue(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    defaultFirebaseConfig.apiKey
  ),
  authDomain: configuredValue(
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    defaultFirebaseConfig.authDomain
  ),
  projectId: configuredValue(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    defaultFirebaseConfig.projectId
  ),
  storageBucket: configuredValue(
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    defaultFirebaseConfig.storageBucket
  ),
  messagingSenderId:
    configuredValue(
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      defaultFirebaseConfig.messagingSenderId
    ),
  appId: configuredValue(
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    defaultFirebaseConfig.appId
  ),
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    !isPlaceholderValue(firebaseConfig.apiKey) &&
      !isPlaceholderValue(firebaseConfig.projectId)
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
