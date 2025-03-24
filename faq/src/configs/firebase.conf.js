// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA6Y5_RJUC4k-ZUgFG_dwjN-dLK6VPrLzA',
	authDomain: 'react-faq-6acfa.firebaseapp.com',
	projectId: 'react-faq-6acfa',
	storageBucket: 'react-faq-6acfa.firebasestorage.app',
	messagingSenderId: '158562922010',
	appId: '1:158562922010:web:0ab0b299fa7d2605652ba3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firestore
export const db = getFirestore(app);
