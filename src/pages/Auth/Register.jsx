import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router';
import api from '../../services/api';

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY; // Make sure to set this in your .env file

const Register = () => {
    const { register, loading } = useAuth();
    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    // Password validation
    const validatePassword = (pwd) => {
        if (pwd.length < 6) return 'Password must be at least 6 characters.';
        if (!/[A-Z]/.test(pwd)) return 'Password must contain a capital letter.';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return 'Password must contain a special character.';
        return '';
    };

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setError('');
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setPhotoURL(data.data.url);
            } else {
                setError('Photo upload failed. Try again.');
            }
        } catch (err) {
            setError('Photo upload failed. Try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const pwdError = validatePassword(password);
        if (pwdError) {
            setError(pwdError);
            return;
        }
        if (!name || !email) {
            setError('Please fill all required fields.');
            return;
        }
        try {
            await register(name, email, photoURL, password);

            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center to-base-200">
            <div className="w-full max-w-md bg-base-100 p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border px-3 py-2 rounded"
                            onChange={handlePhotoUpload}
                            disabled={uploading}
                        />
                        {uploading && <div className="text-accent text-sm mt-1">Uploading...</div>}
                        {photoURL && (
                            <img src={photoURL} alt="Profile" className="h-16 w-16 rounded-full mt-2 object-cover" />
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border px-3 py-2 rounded"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full border px-3 py-2 rounded"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent text-white py-2 rounded hover:bg-accent-700 transition"
                        disabled={loading || uploading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;