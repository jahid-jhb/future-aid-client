import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase.config';
import api from '../services/api';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [location, setLocation] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModerator, setIsModerator] = useState(false);

    // Register
    const register = async (name, email, photoURL, password) => {
        setLoading(true);
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, {
            displayName: name,
            photoURL: photoURL,
        });
        return result;
    };

    // Login
    const login = async (email, password) => {
        setLoading(true);
        return await signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Logout
    const logout = async () => {
        await signOut(auth);
    };

    // Observe user state & fetch role (token stored in cookie)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    const res = await api.get(`/users/role/${currentUser.email}`);

                    // const res = await register(name, email, photoURL, password);

                    // update userinfo in the database
                    const userInfo = {
                        email: currentUser.email,
                        role: 'user', // default role
                        created_at: new Date().toISOString(),
                        last_log_in: new Date().toISOString()
                    }

                    const userRes = await api.post('/users', userInfo);
                    console.log(userRes.data);

                    console.log(res);
                    const role = res.data.role;
                    setIsAdmin(role === 'admin');
                    setIsModerator(role === 'moderator');
                } catch (err) {
                    console.error('Role fetch failed:', err);
                    setIsAdmin(false);
                    setIsModerator(false);
                }
            } else {
                setIsAdmin(false);
                setIsModerator(false);
            }

            setLoading(false);

            if (currentUser?.email) {
                const userData = { email: currentUser.email };
                axios.post('https://future-aid-server.vercel.app/jwt', userData)
                    .then(response => {
                        // console.log('User data sent successfully:', response.data);
                        localStorage.setItem('access-token', response.data.token);
                    })
                    .catch(error => {
                        // console.error('Error sending user data:', error);
                    });
            }
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        register,
        login,
        googleSignIn,
        logout,
        location,
        setLocation,
        isAdmin,
        isModerator
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
