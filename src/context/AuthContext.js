import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState({})
    async function signUp(email, password) {
        await createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            SavedShows: []
        })
    }
    async function signIn(email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
    }
    async function logOut() {
        return await signOut(auth)
    }
    useEffect(() => {
        const unsubsribe = onAuthStateChanged(auth, (user) => {
            setCurrUser(user)
        })
        return () => { unsubsribe(); }
    }, [])
    return (
        <AuthContext.Provider value={{ currUser, signUp, signIn, logOut }}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return (
        useContext(AuthContext)
    )
}