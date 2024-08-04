"use client";

import { useState } from 'react';
import { login } from '../middleware/CaasBackend';

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await login({ email, password });
            //console.log(response);
        } catch (err) {
            console.error('An error occurred:', err);
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default LoginComponent;
