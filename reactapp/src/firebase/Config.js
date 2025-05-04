// Configuração do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCAcH0iiBnuIR0N4oGohL7wc7Vn_1INAlk",
  authDomain: "reactapp-c14ab.firebaseapp.com",
  projectId: "reactapp-c14ab",
  storageBucket: "reactapp-c14ab.firebasestorage.app",
  messagingSenderId: "69641352458",
  appId: "1:69641352458:web:4bb5f98d4dc56bd56df6f3",
  measurementId: "G-N4TXV5FNS0"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços do Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;