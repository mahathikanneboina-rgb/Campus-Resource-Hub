import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
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
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
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
