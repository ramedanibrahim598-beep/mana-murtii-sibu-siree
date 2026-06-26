import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCNcB1eh0JYtHOQqFrwX07QNfhCdBQhTDk",
  authDomain: "mana-murtii-aanaa-sibuu-siree.firebaseapp.com",
  projectId: "mana-murtii-aanaa-sibuu-siree",
  storageBucket: "mana-murtii-aanaa-sibuu-siree.firebasestorage.app",
  messagingSenderId: "845614662032",
  appId: "1:845614662032:web:be8a02c230352d3651b315"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
