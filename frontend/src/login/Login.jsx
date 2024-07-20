import React, { useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';
import axios from '../service/axios';
import { useUserStore } from '../store/userStore';

function Login() {
    const [l, setL] = useState(false);
    const [l1, setL1] = useState(false);
    const { fetchUserInfo } = useUserStore();

    // Login validation function
    const validateLoginForm = (email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            return 'Email and password are required';
        }

        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }

        return null;
    };

    // Register validation function
    const validateRegisterForm = (username, email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username || !email || !password) {
            return 'Username, email, and password are required';
        }

        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }

        return null;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setL(true);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        const validationError = validateLoginForm(email, password);

        if (validationError) {
            toast.error(validationError);
            setL(false);
            return;
        }

        try {
            const user = await axios.post('/login', { email, password });
            localStorage.setItem('token', user.data.token);
            window.location.reload()
            fetchUserInfo();
            toast.success('Log In successful');
        } catch (e) {
            toast.error(e.response?.data?.msg || e.message);
        } finally {
            setL(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setL1(true);
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        const validationError = validateRegisterForm(username, email, password);

        if (validationError) {
            toast.error(validationError);
            setL1(false);
            return;
        }

        try {
            const response = await axios.post('/create/user', { username, email, password });
            toast.success(response.data.msg);
        } catch (e) {
            toast.error(e.response?.data?.msg || e.message);
        } finally {
            setL1(false);
        }
    };

    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <button disabled={l}>{l ? 'Logging In' : 'Log In'}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create Account</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder='Username' name='username' />
                    <input type="text" placeholder='Email' name='email' />
                    <input type="password" placeholder='Password' name='password' />
                    <button disabled={l1}>{l1 ? 'Creating Account...' : 'Register'}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
