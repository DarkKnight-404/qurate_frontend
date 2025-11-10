import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Sites = () => {
    const [sites, setSites] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('table');
    const [qrPopup, setQrPopup] = useState({ show: false, url: '', siteName: '' });

    useEffect(() => {
        // const fetchSites = async () => {
        //   try {
        //     setTimeout(() => {
        //       const mockSites = [
        //         {
        //           id: 1,
        //           name: 'My Portfolio',
        //           url: 'https://myportfolio.com',
        //           status: 'Published',
        //           created: '2024-01-15',
        //           visitors: 1250,
        //           users: 89,
        //           pages: 5,
        //           lastUpdated: '2024-03-20'
        //         },
        //         {
        //           id: 2,
        //           name: 'Business Landing Page',
        //           url: 'https://business-landing.com',
        //           status: 'Draft',
        //           created: '2024-02-10',
        //           visitors: 450,
        //           users: 34,
        //           pages: 3,
        //           lastUpdated: '2024-03-25'
        //         },
        //         {
        //           id: 3,
        //           name: 'E-commerce Store',
        //           url: 'https://mystore.com',
        //           status: 'Published',
        //           created: '2024-01-05',
        //           visitors: 3200,
        //           users: 156,
        //           pages: 12,
        //           lastUpdated: '2024-03-22'
        //         },
        //         {
        //           id: 4,
        //           name: 'Blog Site',
        //           url: 'https://myblog.com',
        //           status: 'Published',
        //           created: '2024-03-01',
        //           visitors: 890,
        //           users: 67,
        //           pages: 8,
        //           lastUpdated: '2024-03-28'
        //         }
        //       ];
        //       setSites(mockSites);
        //       setLoading(false);
        //     }, 1000);
        //   } catch (error) {
        //     console.error('Error fetching sites:', error);
        //     setLoading(false);
        //   }
        // };

        // fetchSites();
        let xml = new XMLHttpRequest();
        xml.open("GET", "https://qurate-backend.vercel.app/sitescollection?userId=" + JSON.parse(localStorage.qurate_user).email);
        xml.withCredentials = true;
        xml.send();
        xml.onload = () => {
            let sites = JSON.parse(xml.response);
            setSites((prev) => {
                return sites.map(site => {
                    return {
                        id: site.pageId,
                        name: site.pageId,
                        created: new Date(site.createdOn).toString(),
                        url: "https://localhost:9600/sitebypageid?pageId=" + site.pageId,
                        status: "Published",
                        visitors: site.visitors,
                        pages: 1,
                        lastUpdated: '2024-03-28'
                    }
                })
            })
            setLoading(false);
        }

    }, []);

    const handleSiteClick = (site) => {
        setSelectedSite(site);
        setView('detail');
    };

    const handleBackToList = () => {
        setView('table');
        setSelectedSite(null);
    };

    const handleNewSite = () => {
        alert('Opening new site creation wizard...');
    };

    const handleEditSite = (site, e) => {
        e.stopPropagation();
        alert(`Editing site: ${site.name}`);
    };

    const handleDeleteSite = (site, e) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${site.name}"?`)) {
            setSites(sites.filter(s => s.id !== site.id));
        }
    };

    const handleQrClick = (site, e) => {
        e.stopPropagation();
        setQrPopup({
            show: true,
            url: (`https://qurate-backend.vercel.app/sitebypageid?pageId=`+site),
            siteName: site.name
        });
    };




    const closeQrPopup = () => {
        setQrPopup({ show: false, url: '', siteName: '' });
    };

    // Generate QR code URL using a free QR code service
    const generateQrCodeUrl = (url) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    };

    // Chart data functions (same as before)
    const getTrafficData = () => ({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Visitors',
                data: [selectedSite?.visitors * 0.3, selectedSite?.visitors * 0.5, selectedSite?.visitors * 0.8, selectedSite?.visitors, selectedSite?.visitors * 1.2, selectedSite?.visitors * 1.5],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    });

    const getUserGrowthData = () => ({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'New Users',
                data: [selectedSite?.users * 0.2, selectedSite?.users * 0.4, selectedSite?.users * 0.7, selectedSite?.users],
                backgroundColor: 'rgba(16, 185, 129, 0.8)',
            }
        ]
    });

    const getTrafficSourcesData = () => ({
        labels: ['Direct', 'Social', 'Search', 'Referral'],
        datasets: [
            {
                data: [40, 25, 20, 15],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }
        ]
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <Navbar onNewSite={handleNewSite} />
                <div className="dashboard-main-content">
                    <div className="loading-spinner">Loading your sites...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Navbar onNewSite={handleNewSite} />

            <div className="dashboard-main-content">
                {view === 'table' ? (
                    <SiteTableView
                        sites={sites}
                        onSiteClick={handleSiteClick}
                        onEditSite={handleEditSite}
                        onDeleteSite={handleDeleteSite}
                        onNewSite={handleNewSite}
                        onQrClick={handleQrClick}
                        generateQrCodeUrl={generateQrCodeUrl}
                    />
                ) : (
                    <SiteDetailView
                        site={selectedSite}
                        onBack={handleBackToList}
                        trafficData={getTrafficData()}
                        userGrowthData={getUserGrowthData()}
                        trafficSourcesData={getTrafficSourcesData()}
                        chartOptions={chartOptions}
                    />
                )}
            </div>

            {/* QR Code Popup */}
            {qrPopup.show && (
                <QrPopup
                    url={qrPopup.url}
                    siteName={qrPopup.siteName}
                    onClose={closeQrPopup}
                    generateQrCodeUrl={generateQrCodeUrl}
                />
            )}
        </div>
    );
};

// Navbar Component (same as before)
const Navbar = ({ onNewSite }) => {

    const handleNewProject = () => {
        let xml = new XMLHttpRequest();
        xml.open("GET", "https://qurate-backend.vercel.app/logout");
        xml.withCredentials = true;
        xml.send();
        xml.onload = () => {
            localStorage.clear();
            window.location = "/";
        }
    };

    const navigate = useNavigate()
    return (
        <nav className="dashboard-navbar">
            <div className="dashboard-nav-container">
                <div className="dashboard-logo">
                    {/* <div className="dashboard-logo-icon">🛠️</div> */}
                    <div className="dashboard-logo-text">QURATE</div>
                </div>

                <div className="dashboard-nav-links">
                    <div href="#" onClick={(e) => { e.preventDefault(); navigate("/home"); }} className="dashboard-nav-link">Dashboard</div>
                    <div href="#" onClick={(e) => { e.preventDefault(); navigate("/sites"); }} className="dashboard-nav-link dashboard-nav-link--active">My Sites</div>
                    <div href="#" onClick={(e) => { e.preventDefault(); navigate("/templates"); }} className="dashboard-nav-link">Templates</div>
                    <div href="#" onClick={(e) => { e.preventDefault(); window.location = "https://qurate-backend.vercel.app/editor"; }} className="dashboard-nav-link">Add Template</div>
                </div>

                <div className="dashboard-user-actions">
                    <button className="dashboard-btn dashboard-btn--outline">Help</button>
                    <button className="dashboard-btn dashboard-btn--primary" onClick={handleNewProject}>
                        logout
                    </button>
                    <div className="dashboard-user-avatar">👤</div>
                </div>
            </div>
        </nav>
    )
};

// Updated Site Table View with QR Section
const SiteTableView = ({ sites, onSiteClick, onEditSite, onDeleteSite, onNewSite, onQrClick, generateQrCodeUrl }) => (
    <div className="sites-container">
        <div className="sites-header">
            <h1 className="sites-title">My Websites</h1>
            <p className="sites-subtitle">Manage and monitor all your created websites</p>
        </div>

        <div className="sites-actions">
            <button className="dashboard-btn dashboard-btn--primary" onClick={onNewSite}>
                + Create New Site
            </button>
        </div>

        <div className="sites-table-container">
            <table className="sites-table">
                <thead>
                    <tr>
                        <th>Site Name</th>
                        <th>URL</th>
                        <th>Visitors</th>
                        <th>Pages</th>
                        <th>Created On</th>
                        <th>QR Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map((site) => (
                        <tr key={site.id} className="site-row" onClick={() => onSiteClick(site)}>
                            <td className="site-name">
                                <div className="site-name-content">
                                    <div className="site-avatar">
                                        {site.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="site-name-text">{site.name}</div>
                                        <div className="site-status">
                                            <span className={`status-badge status-${site.status.toLowerCase()}`}>
                                                {site.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="site-url">
                                <a href={site.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                    {site.url}
                                </a>
                            </td>
                            <td className="site-metric">{site.visitors.toLocaleString()}</td>
                            <td className="site-metric">{site.pages}</td>
                            <td className="site-date">{new Date(site.created).toLocaleDateString()}</td>
                            <td className="qr-section">
                                <button
                                    className="qr-button"
                                    onClick={(e) => onQrClick(site, e)}
                                    title="Show QR Code"
                                >
                                    <img
                                        src={generateQrCodeUrl(site.url)}
                                        alt="QR Code"
                                        className="qr-thumbnail"
                                    />
                                    <span className="qr-hover-text">Click to enlarge</span>
                                </button>
                            </td>
                            <td>
                                <div className="site-actions" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={(e) => onEditSite(site, e)}
                                        title="Edit Site"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={(e) => onDeleteSite(site, e)}
                                        title="Delete Site"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {sites.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">🌐</div>
                    <h3>No websites yet</h3>
                    <p>Create your first website to get started</p>
                    <button className="dashboard-btn dashboard-btn--primary" onClick={onNewSite}>
                        Create Your First Site
                    </button>
                </div>
            )}
        </div>
    </div>
);

// QR Popup Component
const QrPopup = ({ url, siteName, onClose, generateQrCodeUrl }) => (
    <div className="qr-popup-overlay" onClick={onClose}>
        <div className="qr-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="qr-popup-header">
                <h3>QR Code for {siteName}</h3>
                <button className="qr-popup-close" onClick={onClose}>×</button>
            </div>
            <div className="qr-popup-body">
                <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100`}
                    alt={`QR Code for ${siteName}`}
                    className="qr-popup-image"
                />
                <p className="qr-popup-url">{url}</p>
                <p className="qr-popup-instruction">Scan this QR code to visit the website</p>
            </div>
            <div className="qr-popup-footer">
                <button className="dashboard-btn dashboard-btn--primary" onClick={onClose}>
                    Close
                </button>
                <button
                    className="dashboard-btn dashboard-btn--outline"
                    onClick={() => window.open(generateQrCodeUrl(url), '_blank')}
                >
                    Download QR
                </button>
            </div>
        </div>
    </div>
);

// Site Detail View Component (same as before)
const SiteDetailView = ({ site, onBack, trafficData, userGrowthData, trafficSourcesData, chartOptions }) => (
    <div className="site-detail-container">
        <div className="site-detail-header">
            <button className="back-button" onClick={onBack}>
                ← Back to Sites
            </button>
            <div className="site-detail-title">
                <h1>{site.name}</h1>
                <span className={`status-badge status-${site.status.toLowerCase()}`}>
                    {site.status}
                </span>
            </div>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="site-url-link">
                {site.url} ↗
            </a>
        </div>

        <div className="site-stats-grid">
            <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                    <div className="stat-value">{site.visitors.toLocaleString()}</div>
                    <div className="stat-label">Total Visitors</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">👤</div>
                <div className="stat-content">
                    <div className="stat-value">{site.users.toLocaleString()}</div>
                    <div className="stat-label">Registered Users</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">📄</div>
                <div className="stat-content">
                    <div className="stat-value">{site.pages}</div>
                    <div className="stat-label">Total Pages</div>
                </div>
            </div>
            <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                    <div className="stat-value">{new Date(site.created).toLocaleDateString()}</div>
                    <div className="stat-label">Created Date</div>
                </div>
            </div>
        </div>

        <div className="charts-grid">
            <div className="chart-card">
                <h3>Traffic Overview</h3>
                <div className="chart-container">
                    <Line data={trafficData} options={chartOptions} />
                </div>
            </div>
            <div className="chart-card">
                <h3>User Growth</h3>
                <div className="chart-container">
                    <Bar data={userGrowthData} options={chartOptions} />
                </div>
            </div>
            <div className="chart-card">
                <h3>Traffic Sources</h3>
                <div className="chart-container">
                    <Doughnut data={trafficSourcesData} options={chartOptions} />
                </div>
            </div>
        </div>
    </div>
);

export default Sites;