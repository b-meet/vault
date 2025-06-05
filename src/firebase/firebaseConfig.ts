import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyA0lhvxR0ram2HsGZwWKr8zIeHDzSjHUm0',
    authDomain: 'vault-f7da9.firebaseapp.com',
    projectId: 'vault-f7da9',
    storageBucket: 'vault-f7da9.firebasestorage.app',
    messagingSenderId: '631285408172',
    appId: '1:631285408172:web:8f6e80c96adbacaad05a09',
    measurementId: 'G-NTXRMVJGH2',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);