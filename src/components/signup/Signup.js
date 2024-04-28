import { useForm } from "react-hook-form";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Signup() {
    const { register, handleSubmit } = useForm();
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    async function onRegister(obj) {
        try {
            // Make HTTP POST request
            const res = await axios.post('https://fullstack-todo-list-yt-backend-2.onrender.com/user-api/register', obj);
            if (res.data.message === 'User created') {
                // Navigate to signin component
                navigate('/signin');
                setErr('');
            } else {
                setErr(res.data.message);
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
            setErr("An error occurred during registration.");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign Up</h2>
                {err.length !== 0 && <p style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>{err}</p>}
                <form onSubmit={handleSubmit(onRegister)}>
                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" {...register("username")} id="username" className="form-control" />
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" {...register("password")} id="password" className="form-control" />
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" {...register("email")} id="email" className="form-control" />
                    </div>
                    {/* Submit button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className="btn btn-primary btn-block"
                        style={{ backgroundColor: '#4caf50', border: 'none' }}
                    >
                        Register
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default Signup;