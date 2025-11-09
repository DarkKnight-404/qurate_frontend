import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();


    const [signinStatus, setSigninStatus] = useState("Please sign in to your account");

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate login process
        setIsLoading(true);


        let xml = new XMLHttpRequest();
        xml.open("POST", "http://localhost:9600/login");
        xml.withCredentials = true;
        xml.send(JSON.stringify({
            email: email,
            password: password
        }))
        xml.onload = () => {
            // alert(JSON.stringify(xml.response));
            let resp = JSON.parse(xml.response);
            if (resp.status === "success") {
                localStorage.setItem("logged_status", "success");
                localStorage.setItem("qurate_user", JSON.stringify(resp.user));
                setSigninStatus(resp.message)
                navigate("/home")
            }
            else {
                setIsLoading(false);
                setSigninStatus(resp.message)
                // alert(resp.message)
            }
        }


    };

    const handleSocialLogin = (provider) => {
        alert(`Logging in with ${provider}`);
        // Here you would implement social login logic
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p style={{ color: signinStatus !== "Please sign in to your account" ? "red" : "" }}>{signinStatus}</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                disabled={isLoading}
                                style={{ width: "85%" }}
                            />
                            <span className="input-icon">✉️</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                disabled={isLoading}
                                style={{ width: "85%" }}
                            />
                            <span className="input-icon">🔒</span>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                style={{ width: "85%" }}
                            />
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <div className="forgot-password">Forgot Password?</div>
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-login">
                        <button
                            type="button"
                            className="social-btn google"
                            onClick={() => handleSocialLogin('Google')}
                            disabled={isLoading}
                        >
                            <span className="social-icon">🔍</span>
                            Google
                        </button>
                        <button
                            type="button"
                            className="social-btn facebook"
                            onClick={() => handleSocialLogin('Facebook')}
                            disabled={isLoading}
                        >
                            <span className="social-icon">👤</span>
                            Facebook
                        </button>
                    </div>

                    <div className="signup-link">
                        Don't have an account? <div onClick={(e) => {
                            e.preventDefault();
                            navigate("/register")
                        }}>Sign up</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;