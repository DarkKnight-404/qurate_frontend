import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [qrModal, setQrModal] = useState(null);

  // Your site data
  const [sites, setSites] = useState([]);



  useEffect(()=>{
    let xml = new XMLHttpRequest();
    xml.open("GET", "http://localhost:9600/sitescollection?userId=rohit314159");
    xml.send();

    xml.onload = ()=>{
        setSites(JSON.parse(xml.response));
    }

  },[])



  const user = {
    name: "Rohit",
    avatar: "https://i.pravatar.cc/100",
    stats: [
      { label: "Total Sites", value: sites.length },
      { label: "Active", value: sites.filter((s) => s.status === "active").length },
      { label: "Visitors", value: sites.reduce((sum, s) => sum + (s.visits || 0), 0) },
      { label: "Errors", value: sites.filter((s) => s.status === "failed").length },
    ],
  };

  return (
    <div style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh", color: "#1c2230", fontFamily: "Inter, sans-serif" }}>
      <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 600 }}>Website Dashboard</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>👋 Hi, {user.name}</span>
            <img src={user.avatar} alt="User" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
          </div>
        </header>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px", marginBottom: "30px" }}>
          {user.stats.map((stat) => (
            <div key={stat.label} style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.05)", border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "5px" }}>{stat.label}</h3>
              <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Sites Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0,0,0,0.05)" }}>
          <thead style={{ background: "#f9fafb", color: "#6b7280", fontSize: "0.8rem", textTransform: "uppercase" }}>
            <tr>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Site Name</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Visits</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Last Deployed</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Public URL</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site._id} style={{ borderBottom: "1px solid #e5e7eb", cursor: "default" }}>
                <td style={{ padding: "12px 15px" }}>{site.description}</td>
                <td style={{ padding: "12px 15px" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      background:
                        site.status === "active" ? "#d1fae5" :
                        site.status === "failed" ? "#fee2e2" : "#fef3c7",
                      color:
                        site.status === "active" ? "#065f46" :
                        site.status === "failed" ? "#991b1b" : "#78350f"
                    }}
                  >
                    {site.status?.charAt(0).toUpperCase() + site.status?.slice(1)}
                  </span>
                </td>
                <td style={{ padding: "12px 15px" }}>{site.visits ?? "–"}</td>
                <td style={{ padding: "12px 15px" }}>{site.lastDeployed}</td>
                <td style={{ padding: "12px 15px" }}>
                  <a href={`http://localhost:9600/sitebypageid?pageId=${site.pageId}`} target="_blank" rel="noopener noreferrer" style={{ color: "#6c63ff", textDecoration: "none" }}>
                    {`http://localhost:9600/sitebypageid?pageId=${site.pageId}`}
                  </a>
                </td>
                <td style={{ padding: "12px 15px" }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://http://localhost:9600/sitebypageid?pageId=${site.pageId}`}
                    alt="QR"
                    style={{ width: "30px", height: "30px", cursor: "pointer", transition: "transform 0.2s" }}
                    onClick={() => setQrModal(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://${site.url}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* QR Modal */}
      {qrModal && (
        <div
          style={{
            display: "flex",
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setQrModal(null)}
        >
          <img
            src={qrModal}
            alt="QR Code"
            style={{
              width: "300px",
              height: "300px",
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              animation: "fadeIn 0.2s ease-in-out",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
