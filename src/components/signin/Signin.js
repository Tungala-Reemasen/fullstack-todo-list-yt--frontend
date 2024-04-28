import React, { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { loginContext } from '../../context/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { currentUserDetails, loginUser } = useContext(loginContext);

    async function onLogin(credObj) {
        loginUser(credObj);
    }

    useEffect(() => {
        if (currentUserDetails.userLoginStatus) {
            // Navigate to the 'Form' component when the user logs in
            navigate('/form');
        }
    }, [currentUserDetails.userLoginStatus, navigate]); // Include navigate in the dependency array

    return (
        <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign In</h2>
                {currentUserDetails.err.length !== 0 &&
                    <p style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>{currentUserDetails.err}</p>
                }
                <form onSubmit={handleSubmit(onLogin)}>
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
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Signin;