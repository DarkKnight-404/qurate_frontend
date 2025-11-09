import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OtpVerific = ({ onVerificationSuccess }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const [resendTimer, setResendTimer] = useState(60); // 60 seconds for resend
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' or 'error'
    const [isVerified] = useState(false);
    const inputRefs = useRef([]);
    const location = useLocation()
    const userEmail = location.state?.userEmail || "user@example.com";


    // Initialize input refs
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
    }, []);

    // Main timer effect
    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // Resend timer effect
    useEffect(() => {
        if (resendTimer <= 0) return;

        const interval = setInterval(() => {
            setResendTimer(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (index, value) => {
        // Only allow numbers
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Check if OTP is complete
        if (newOtp.every(digit => digit !== '')) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6);

        if (/^\d+$/.test(pasteData)) {
            const newOtp = [...otp];
            pasteData.split('').forEach((char, i) => {
                if (i < 6) {
                    newOtp[i] = char;
                }
            });
            setOtp(newOtp);

            // Focus the next empty input or the last one
            const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
            if (nextEmptyIndex !== -1) {
                inputRefs.current[nextEmptyIndex]?.focus();
            } else {
                inputRefs.current[5]?.focus();
            }

            // Auto-verify if complete
            if (newOtp.every(digit => digit !== '')) {
                handleVerify(newOtp.join(''));
            }
        }
    };

    const navigate = useNavigate();

    const handleVerify = async (verificationOtp = otp.join('')) => {


        setIsLoading(true);
        setMessage({ text: '', type: '' });

        try {
            let xml = new XMLHttpRequest();
            xml.open("POST", "http://localhost:9600/otpverific");
            xml.withCredentials = true;
            xml.send(JSON.stringify({
                email: userEmail,
                otp: verificationOtp
            }))
            xml.onload = () => {
                alert(JSON.stringify(xml.response));
                if(JSON.parse(xml.response).status === "success"){
                    localStorage.setItem("logged_status", "success");
                    localStorage.setItem("qurate_user",JSON.stringify(JSON.parse(xml.response).user));
                    navigate("/home")
                }
            }

        } catch (error) {
            setMessage({ text: '❌ Verification failed. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (resendTimer > 0) return;

        setIsResending(true);
        setMessage({ text: '', type: '' });

        try {
            // Simulate API call to resend code
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset timers and OTP
            setTimer(300);
            setResendTimer(60);
            setOtp(['', '', '', '', '', '']);

            setMessage({ text: '✅ New verification code sent to your email!', type: 'success' });

            // Focus first input
            inputRefs.current[0]?.focus();

            // Clear success message after 3 seconds
            setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000);
        } catch (error) {
            setMessage({ text: '❌ Failed to resend code. Please try again.', type: 'error' });
        } finally {
            setIsResending(false);
        }
    };

    const isOtpComplete = otp.every(digit => digit !== '');
    const isTimerExpired = timer <= 0;
    const canResend = resendTimer <= 0 && !isResending;

    return (
        <div className="verification-container" style={{margin: "auto"}}>
            <div className="verification-header">
                <span className="verification-icon">🔐</span>
                <h1 className="verification-title">Verify Your Account</h1>
                <p className="verification-subtitle">
                    We've sent a 6-digit verification code to your email address
                </p>
                <div className="email-address">{userEmail}</div>
                <p className="verification-subtitle">
                    Enter the code below to complete your registration
                </p>
            </div>

            {message.text && (
                <div className={`message ${message.type}-message`}>
                    {message.text}
                </div>
            )}

            <form
                className="verification-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleVerify();
                }}
            >
                <div className="otp-container">
                    <div className="otp-inputs">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                className={`otp-input ${digit ? 'filled' : ''} ${isTimerExpired ? 'expired' : ''}`}
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                inputMode="numeric"
                                pattern="[0-9]"
                                disabled={isTimerExpired || isLoading || isVerified}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <div className={`timer ${timer <= 30 ? 'highlight' : ''}`}>
                        Code expires in: <span id="time">{formatTime(timer)}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="verify-btn"
                    disabled={!isOtpComplete || isLoading || isTimerExpired || isVerified}
                >
                    {isLoading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Verifying...
                        </>
                    ) : (
                        'Verify Account'
                    )}
                </button>
            </form>

            <div className="resend-section">
                <p className="resend-text">Didn't receive the code?</p>
                <button
                    className="resend-btn"
                    onClick={handleResendCode}
                    disabled={!canResend}
                >
                    {isResending ? (
                        <>
                            <span className="loading-spinner"></span>
                            Sending...
                        </>
                    ) : canResend ? (
                        'Resend Code'
                    ) : (
                        `Resend Code (${resendTimer}s)`
                    )}
                </button>
            </div>

            <div className="help-section">
                <p className="help-text">Having trouble receiving the code?</p>
                <div href="#" className="contact-support">Contact Support</div>
            </div>
        </div>
    );
};

export default OtpVerific;