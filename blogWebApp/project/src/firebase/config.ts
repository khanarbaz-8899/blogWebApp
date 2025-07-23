import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAC3YolwcmnOd-2WCmWF0BURzdKvfjesFA",
  authDomain: "blogwebapp-f00a5.firebaseapp.com",
  projectId: "blogwebapp-f00a5",
  storageBucket: "blogwebapp-f00a5.firebasestorage.app",
  messagingSenderId: "344334928943",
  appId: "1:344334928943:web:391a9c239af4c991ed4ada"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
