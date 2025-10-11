import { useState } from "react";

const DeployPopup = ({
    htmlString,
    isDeployPopupVisible,
    updateDeployPopupVisibility,
}) => {
    const [activeTab, setActiveTab] = useState("instructions");
    const [isDeploying, setIsDeploying] = useState(false);
    
    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");

    const handleTabClick = (tab) => setActiveTab(tab);

    const handleDeploy = (e) => {
        e.preventDefault();
        setIsDeploying(true);
        setTimeout(() => {
            setIsDeploying(false);
            alert("✅ Deployment Successful!");
            updateDeployPopupVisibility(false);
        }, 2000);
    };

    if (!isDeployPopupVisible) return null;



    function deploySite() {
        let xml = new XMLHttpRequest();
        xml.open("POST", "http://localhost:9600/createnewpage");
        xml.send(JSON.stringify({
            htmlCode: htmlString,
            userId: "rohit314159",
            title: title,
            description: description
        }));
        xml.onload = ()=>{
            alert(xml.response);
            window.location.url = "http://localhost:3000/dashboard";
        }
    }

    return (
        <div
            className="modal active"
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                backdropFilter: "blur(6px)",
            }}
            onClick={(e) => e.target === e.currentTarget && updateDeployPopupVisibility(false)}
        >
            <div
                className="modal-content"
                style={{
                    background: "#fff",
                    width: "85%",
                    maxWidth: "1000px",
                    height: "80vh",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
            >
                {/* Header */}
                <div
                    className="popup-header"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "20px",
                        background: "linear-gradient(135deg, #6366f1, #00c6a7)",
                        color: "white",
                        position: "relative",
                    }}
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
                        alt="Logo"
                        style={{ width: "42px", height: "42px", borderRadius: "50%" }}
                    />
                    <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 600 }}>
                        Qurate Site Deployment Wizard
                    </h2>
                    <span
                        className="close-btn"
                        onClick={() => updateDeployPopupVisibility(false)}
                        style={{
                            position: "absolute",
                            top: "18px",
                            right: "22px",
                            fontSize: "1.6rem",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        &times;
                    </span>
                </div>

                {/* Tabs */}
                <div className="tab-nav" style={{ display: "flex", background: "#f4f6f9", borderBottom: "1px solid #e5e7eb" }}>
                    {["instructions", "html", "preview", "deploy"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            style={{
                                flex: 1,
                                padding: "14px",
                                background: "none",
                                border: "none",
                                fontWeight: 600,
                                cursor: "pointer",
                                fontSize: "0.95rem",
                                color: activeTab === tab ? "#6366f1" : "#6b7280",
                                borderBottom: activeTab === tab ? "3px solid #6366f1" : "none",
                            }}
                        >
                            {tab === "instructions" && "📘 Instructions"}
                            {tab === "html" && "💻 HTML Code"}
                            {tab === "preview" && "🌐 Preview"}
                            {tab === "deploy" && "🚀 Deploy"}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="tab-container" style={{ flex: 1, overflowY: "auto", padding: "24px", background: "#fff" }}>
                    {/* Instructions */}
                    {activeTab === "instructions" && (
                        <div className="instructions" style={{ textAlign: "center" }}>
                            <div
                                className="intro-card"
                                style={{
                                    background: "linear-gradient(135deg, #6366f1, #00c6a7)",
                                    color: "white",
                                    borderRadius: "14px",
                                    padding: "30px 20px",
                                    marginBottom: "25px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/8662/8662464.png"
                                    alt="Qurate Logo"
                                    style={{ width: "70px", marginBottom: "10px" }}
                                />
                                <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 700 }}>Welcome to Qurate</h3>
                                <p style={{ marginTop: "10px", opacity: 0.95 }}>
                                    We provide powerful solutions for <strong>fast and effortless site creation.</strong><br />
                                    Build with our editor, make it live instantly — or export your HTML & CSS for further use.
                                </p>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0, maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
                                <li style={{ background: "#f9fafb", borderLeft: "4px solid #6366f1", padding: "14px 18px", borderRadius: "8px", marginBottom: "12px" }}>
                                    <strong>1️⃣ Build Your Site</strong>
                                    <span style={{ display: "block", color: "#6b7280", fontSize: "0.95rem" }}>Design your website easily using our drag-and-drop Qurate Editor.</span>
                                </li>
                                <li style={{ background: "#f9fafb", borderLeft: "4px solid #6366f1", padding: "14px 18px", borderRadius: "8px", marginBottom: "12px" }}>
                                    <strong>2️⃣ Review HTML Code</strong>
                                    <span style={{ display: "block", color: "#6b7280", fontSize: "0.95rem" }}>Check or modify your site’s HTML and CSS before going live.</span>
                                </li>
                                <li style={{ background: "#f9fafb", borderLeft: "4px solid #6366f1", padding: "14px 18px", borderRadius: "8px", marginBottom: "12px" }}>
                                    <strong>3️⃣ Preview Instantly</strong>
                                    <span style={{ display: "block", color: "#6b7280", fontSize: "0.95rem" }}>View your live site directly inside the popup before deployment.</span>
                                </li>
                                <li style={{ background: "#f9fafb", borderLeft: "4px solid #6366f1", padding: "14px 18px", borderRadius: "8px", marginBottom: "12px" }}>
                                    <strong>4️⃣ Deploy in One Click</strong>
                                    <span style={{ display: "block", color: "#6b7280", fontSize: "0.95rem" }}>Fill in project details and deploy your live site instantly 🚀</span>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* HTML */}
                    {activeTab === "html" && (
                        <div>
                            <h3>Your HTML Code</h3>
                            <pre style={{ background: "#111827", color: "#e5e7eb", padding: "16px", borderRadius: "10px", overflowX: "auto", fontSize: "0.9rem" }}>
                                {htmlString}
                            </pre>
                        </div>
                    )}

                    {/* Preview */}
                    {activeTab === "preview" && (
                        <div>
                            <h3>Live Preview</h3>
                            <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden", background: "#fff", height: "100%", minHeight: "50vh", boxShadow: "0 3px 8px rgba(0,0,0,0.08)" }}>
                                <iframe title="editor_iframe" style={{ width: "100%", height: "100%", minHeight: "50vh" }} srcDoc={htmlString}></iframe>
                            </div>
                        </div>
                    )}

                    {/* Deploy */}
                    {activeTab === "deploy" && (
                        <div>
                            <h3>Deploy Your Project</h3>
                            <form onSubmit={handleDeploy} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "420px" }}>
                                <label>Project Name</label>
                                <input onChange={(e)=>{updateTitle(e.target.value)}} type="text" placeholder="Enter project name" required />
                                <label>Description</label>
                                <textarea onChange={(e)=>{updateDescription(e.target.value)}} rows="3" placeholder="Short project description"></textarea>
                                <label>Source / Repo URL</label>
                                <input type="url" placeholder="https://github.com/username/repo" />
                                <button onClick={()=>{deploySite()}} style={{ padding: "12px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                                    🚀 Deploy Site
                                </button>
                                {isDeploying && <div style={{ border: "4px solid #e5e7eb", borderTop: "4px solid #6366f1", borderRadius: "50%", width: "32px", height: "32px", animation: "spin 1s linear infinite", margin: "10px auto" }} />}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeployPopup;
