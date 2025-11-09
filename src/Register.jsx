import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [isLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };





    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let xml = new XMLHttpRequest();
        xml.open("POST", "https://qurate-backend.vercel.app/register");
        xml.withCredentials = true;
        xml.send(JSON.stringify(formData))
        xml.onload = () => {
            alert(JSON.stringify(xml.response));
            localStorage.setItem("logged_status", "otp_verify");
            if (JSON.parse(xml.response).status === "success") {
                navigate("/otpverific",
                    {
                        state: {
                            userEmail: formData.email.trim(),
                        }
                    }
                )
            }
        }

    };

    const handleSocialRegister = (provider) => {
        alert(`Registering with ${provider}`);
        // Here you would implement social registration logic
    };

    return (
        <div id="register_container">
            <div className="register-container">
                <div className="register-card">
                    <div className="register-header">
                        <h1>Create Account</h1>
                        <p>Join us today and get started</p>
                    </div>

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="name-fields">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your first name"
                                    disabled={isLoading}
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your last name"
                                    disabled={isLoading}
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                            </div>
                        </div>

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
                                    className={errors.email ? 'error' : ''}
                                />
                                <span className="input-icon">✉️</span>
                            </div>
                            {errors.email && <span className="error-message">{errors.email}</span>}
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
                                    placeholder="Create a password"
                                    disabled={isLoading}
                                    className={errors.password ? 'error' : ''}
                                />
                                <span className="input-icon">🔒</span>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    disabled={isLoading}
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                                <span className="input-icon">🔒</span>
                            </div>
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>

                        <div className="form-group terms-group">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <span className="checkmark"></span>
                                I agree to the <div >Terms and Conditions</div> and <div href="#">Privacy Policy</div>
                            </label>
                            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="divider">
                            <span>Or sign up with</span>
                        </div>

                        <div className="social-register">
                            <button
                                type="button"
                                className="social-btn google"
                                onClick={() => handleSocialRegister('Google')}
                                disabled={isLoading}
                            >
                                <span className="social-icon">🔍</span>
                                Google
                            </button>
                            <button
                                type="button"
                                className="social-btn facebook"
                                onClick={() => handleSocialRegister('Facebook')}
                                disabled={isLoading}
                            >
                                <span className="social-icon">👤</span>
                                Facebook
                            </button>
                        </div>

                        <div className="login-link">
                            Already have an account? <a href="/login">Sign in</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;