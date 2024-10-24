import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyA_Os3zj8UJqvsStHuUcuwt50ookhAcHxA",
        authDomain: "hogan-mall.firebaseapp.com",
        projectId: "hogan-mall",
        storageBucket: "hogan-mall.appspot.com",
        messagingSenderId: "938761785206",
        appId: "1:938761785206:web:e2b91b2b271f984cd2f457"
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const storage = getStorage(app)
    const database = getFirestore(app)

    return {
        provide: {
            firebaseAuth: auth,
            firebaseStorage: storage,
            firebaseDataBase: database
        }
    }
})
