import React, { useState, useEffect, useContext } from 'react';
import GlobalVariables from './GlobalVariables';
import { HeroSection } from './Elements';

const AiPopup = () => {
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    let { isAiVisible, setIsAiVisible, setProp, canvas } = useContext(GlobalVariables)

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    //   ai function
    async function getAi(promptParam) {
        try {
            const res = await fetch(
                "https://qurate-backend.vercel.app//genaipage",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: promptParam
                    }),
                    credentials: "include"
                }
            );
            
            const htmlElementMap = await res.json();

            const heroSection = new HeroSection(
                {
                    tag: "div",
                    id: "main_container",
                    uid: htmlElementMap.id,
                    classNames: `production_container ${htmlElementMap.id}`,
                    children: [...htmlElementMap.htmlMap],
                }
            );

            let style = htmlElementMap.style;

            // ✅ Rename class function
            function renameClass(cssString, oldClass, newClass) {
                const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const regex = new RegExp(`\\.${escapedOldClass}(?=[\\s\\.{:#>\\[,]|\\{|$)`, "g");
                return cssString.replace(regex, `.${newClass}`);
            }

            function renameId(cssString, oldId, newId) {
                const escapedOldId = oldId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const regex = new RegExp(`#${escapedOldId}(?=[\\s\\.{:#>\\[,]|\\{|$)`, "g");
                return cssString.replace(regex, `#${newId}`);
            }

            // ✅ Recursive class renamer
            function unifyIds() {
                console.log("class names for root");
                console.log(htmlElementMap.htmlMap[0].classNames)
                let finalStyle = style;

                let rootClassNames = htmlElementMap.htmlMap[0].classNames.split(" ");
                for (let i = 0; i < rootClassNames.length; i++) {
                    if (rootClassNames[i] !== "production_container") {
                        finalStyle = renameClass(finalStyle, rootClassNames[i], rootClassNames[i] + htmlElementMap.id);
                    }
                }

                function updateIds(element) {
                    if (!element || !element.children?.length) return;

                    element.children.forEach((child) => {
                        finalStyle = renameId(
                            finalStyle,
                            child.id,
                            child.id + htmlElementMap.id
                        );

                        child.classNames.split(" ").forEach((className) => {
                            if (className !== "production_container") {
                                finalStyle = renameClass(
                                    finalStyle,
                                    className,
                                    className + htmlElementMap.id
                                );
                            }
                        });
                        updateIds(child);
                    });
                }

                updateIds(htmlElementMap.htmlMap[0]);
                return finalStyle;
            }

            // ✅ Wait for recursion (even though it's sync)
            let styleUid = unifyIds();
            styleUid = styleUid.trim();
            if (styleUid.startsWith("{")) styleUid = styleUid.slice(1);
            if (styleUid.endsWith("}")) styleUid = styleUid.slice(0, -1);

            console.log("final style is", styleUid);

            // ✅ Add to canvas after style is ready
            canvas.addElement(heroSection);
            canvas.addElementStyle(styleUid);
            heroSection.assignClass("maincontainer");

        } catch (err) {
            console.error("Error loading component:", err);
            throw err; // Re-throw to handle in catch block
        }
    }

    // Handle submit
    const handleSubmit = async () => {
        const trimmedValue = inputValue.trim();

        if (trimmedValue === '') {
            alert('Please enter some text before submitting.');
            return;
        }

        // Set the prop immediately before making the request
        if (setProp) {
            setProp(trimmedValue);
        }

        // Start loading
        setIsLoading(true);

        try {
            // console.log("Current prop value:", trimmedValue);
            
            // Use the current inputValue directly instead of relying on prop
            await getAi(trimmedValue);
            
            setIsAiVisible(false);
            setIsLoading(false);
            setInputValue(''); // Reset input
        } catch (err) {
            console.log("Error:", err);
            setIsLoading(false);
            // Optionally show error message to user
            alert('Failed to process your request. Please try again.');
        }
    };

    // Close popup when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsAiVisible(false);
            setIsLoading(false);
            setInputValue(''); // Reset input
        }
    };

    // Handle escape key press
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && isAiVisible) {
                setIsAiVisible(false);
                setIsLoading(false);
                setInputValue(''); // Reset input
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isAiVisible, setIsAiVisible]);

    if (!isAiVisible) return null;

    return (
        <div
            className="popup-container"
            onClick={handleOverlayClick}
            style={{
                position: 'fixed',
                top: 0,
                maxWidth: "none",
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                animation: 'fadeIn 0.3s ease'
            }}
        >
            <div
                className="popup"
                style={{
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                    width: '90%',
                    maxWidth: '500px',
                    height: '70vh',
                    maxHeight: '600px',
                    padding: '30px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    animation: 'slideUp 0.4s ease forwards',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Input Content */}
                <div
                    className="popup-content"
                    style={{
                        display: isLoading ? 'none' : 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'all 0.5s ease'
                    }}
                >
                    <h2 style={{
                        color: '#333',
                        marginBottom: '25px',
                        fontWeight: '600',
                        fontSize: '28px'
                    }}>
                        Enter Your Information
                    </h2>

                    <div className="input-group" style={{
                        marginBottom: '25px',
                        textAlign: 'left',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <label htmlFor="userInput" style={{
                            display: 'block',
                            marginBottom: '10px',
                            color: '#555',
                            fontWeight: '500',
                            fontSize: '16px'
                        }}>
                            Your Text (Multi-line)
                        </label>

                        <textarea
                            id="userInput"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type your text here...&#10;You can add multiple lines&#10;Each line will be preserved"
                            style={{
                                flexGrow: 1,
                                padding: '15px 18px',
                                border: '2px solid #e1e1e1',
                                borderRadius: '10px',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                                resize: 'none',
                                fontFamily: 'inherit',
                                lineHeight: '1.5'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#6e8efb';
                                e.target.style.outline = 'none';
                                e.target.style.boxShadow = '0 0 0 3px rgba(110, 142, 251, 0.2)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e1e1e1';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        style={{
                            background: 'linear-gradient(to right, #6e8efb, #a777e3)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '15px 30px',
                            fontSize: '18px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            marginTop: '10px',
                            boxShadow: '0 4px 15px rgba(110, 142, 251, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(110, 142, 251, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(110, 142, 251, 0.3)';
                        }}
                    >
                        Submit
                    </button>
                </div>

                {/* Loading Animation */}
                <div
                    className="loading-container"
                    style={{
                        display: isLoading ? 'flex' : 'none',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '94%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        background: 'white',
                        borderRadius: '16px',
                        padding: '30px'
                    }}
                >
                    <div className="base" style={{
                        height: '30vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className={`circ circ-${i + 1}`}
                                style={{
                                    width: '10rem',
                                    height: '10rem',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    transformStyle: 'preserve-3d',
                                    backdropFilter: 'blur(0.5px)',
                                    border: '1.9px solid',
                                    borderTopColor: 'rgba(220, 128, 109, 0.5)',
                                    borderBottomColor: 'rgba(151, 93, 193, 0.5)',
                                    borderLeftColor: 'rgba(151, 93, 193, 0.5)',
                                    borderRightColor: 'rgba(220, 128, 109, 0.5)',
                                    opacity: 0,
                                    ...(i < 7 ? {
                                        transform: `rotate3d(0, 1, 0, ${(360 / 15) * (i + 1)}deg)`,
                                        animation: 'rotate 2s linear infinite',
                                        animationDelay: `${(1 / 7.5) * (i + 1)}s`
                                    } : {
                                        transform: `rotate3d(1, 0, 0, ${(360 / 15) * (i + 1)}deg)`,
                                        animation: 'rotate-2 3s linear infinite',
                                        animationDelay: `${(1 / 7.5) * (i + 1)}s`
                                    })
                                }}
                            />
                        ))}
                    </div>

                    <p className="loading-text" style={{
                        marginTop: '25px',
                        color: '#666',
                        fontWeight: '500',
                        fontSize: '18px'
                    }}>
                        Processing your request...
                    </p>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes rotate {
          from {
            opacity: 1;
            transform: rotate3d(0, 1, 1, 360deg);
          }
          to {
            transform: rotate3d(0, 1, 1, 0deg);
            opacity: 1;
          }
        }
        
        @keyframes rotate-2 {
          from {
            opacity: 1;
            transform: rotate3d(1, 0, 1, 0deg);
          }
          to {
            opacity: 1;
            transform: rotate3d(1, 0, 1, 360deg);
          }
        }
      `}</style>
        </div>
    );
};

export default AiPopup;