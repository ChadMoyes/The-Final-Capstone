import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../config/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Initializing the Auth
const auth = getAuth(app)

//Additional providers (Google authentication) (Unnecessary) (Only If I decide to change back)
const provider = new GoogleAuthProvider();
export { app, auth, provider }
