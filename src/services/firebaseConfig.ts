import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, APP_ID } from '@env'
const firebaseConfig: {
    apiKey: string,
    authDomain: string,
    projectId: string,
    appId: string
} = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    appId: APP_ID,
};

let app;

app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }