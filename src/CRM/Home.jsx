import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [templates, setTemplates] = useState([]);
    const [recentProjects, updateRecentProjects] = useState([
        {
            id: 1,
            name: 'My Portfolio Site',
            date: 'Last edited: 2 days ago'
        },
        {
            id: 2,
            name: 'Business Landing Page',
            date: 'Last edited: 1 week ago'
        },
        {
            id: 3,
            name: 'E-commerce Store',
            date: 'Last edited: 3 weeks ago'
        }
    ]);

    useEffect(() => {
        let xml = new XMLHttpRequest();
        xml.open("GET", "https://qurate-backend.vercel.app/getComponentTemplates/?category=sites")
        xml.withCredentials = true;
        xml.send();
        xml.onload = () => {
            // updateHeroSection(JSON.parse(xml.response));
            // updateElementsData((prev) => {
            //     let newElementsData = { ...prev };
            //     newElementsData[data.id] = JSON.parse(xml.response);
            //     return newElementsData;
            // })
            let arr = JSON.parse(xml.response)

            setTemplates((prev) => {
                return arr.map(ele => {
                    return {
                        id: ele.id,
                        name: ele.name,
                        category: ele.name,
                        preview: 'Business',
                        img: ele.img,
                        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }
                })
            })
        }
    }, [])

    useEffect(() => {

        let xml = new XMLHttpRequest();
        xml.open("GET", "https://qurate-backend.vercel.app/sitescollection?userId=" + JSON.parse(localStorage.qurate_user).email);
        xml.withCredentials = true;
        xml.send();
        xml.onload = () => {
            let sites = JSON.parse(xml.response);
            updateRecentProjects((prev) => {
                return sites.map(site => {
                    return {
                        id: site.pageId,
                        name: site.pageId,
                        date: site.createdOn
                    }
                })
            })
        }

    }, [])


    const navigate = useNavigate();

    const [features] = useState([
        {
            id: 1,
            title: 'Website Editor',
            description: 'Drag and drop interface to create beautiful websites without coding. Customize every element with ease.',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            route: () => {
                navigate("/editor")
            }
        },
        {
            id: 2,
            title: 'Monitor My Sites',
            description: 'Track your website performance, analytics, and visitor data in real-time dashboard.',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            route: () => {
                navigate("/sites")
            }
        },
        {
            id: 3,
            title: 'AI Website Builder',
            description: 'Let AI generate complete websites based on your description. Fast and professional results.',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            route: () => {
                navigate("/editor", {
                    state: "ai"
                })
            }
        },
        {
            id: 4,
            title: 'Custom Components',
            description: 'Create and save your own components. Reuse them across multiple projects.',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            route: () => {
                window.location = "https://qurate-backend.vercel.app/editor"
            }
        },
        // {
        //     id: 5,
        //     title: 'Load HTML to Site',
        //     description: 'Import existing HTML code and convert it into editable components within our builder.',
        //     gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        //     route: () => {
        //         navigate("/loadhtml")
        //     }
        // },
        {
            id: 6,
            title: 'Professional Templates',
            description: 'Choose from hundreds of professionally designed templates for any industry.',
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            route: () => {
                navigate("/templates")
            }
        }
    ]);







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

    const handleEditProject = (project) => {
        alert(`Editing project: ${project.name}`);
    };

    const handleViewProject = (project) => {
        alert(`Viewing project: ${project.name}`);
    };








    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <nav className="dashboard-navbar">
                <div className="dashboard-nav-container">
                    <div className="dashboard-logo">
                        {/* <div className="dashboard-logo-icon">🛠️</div> */}
                        <div className="dashboard-logo-text">QURATE</div>
                    </div>

                    <div className="dashboard-nav-links">
                        <div href="#" onClick={(e) => { e.preventDefault(); navigate("/home"); }} className="dashboard-nav-link dashboard-nav-link--active">Dashboard</div>
                        <div href="#" onClick={(e) => { e.preventDefault(); navigate("/sites"); }} className="dashboard-nav-link">My Sites</div>
                        <div href="#" onClick={(e) => { e.preventDefault(); navigate("/templates"); }} className="dashboard-nav-link">Templates</div>
                        <div href="#" onClick={(e) => { e.preventDefault(); window.location = "https://qurate-backend.vercel.app/editor"; }} className="dashboard-nav-link">Add Template</div>
                    </div>

                    <div className="dashboard-user-actions">
                        <button className="dashboard-btn dashboard-btn--outline">Help</button>
                        <button className="dashboard-btn dashboard-btn--primary" onClick={handleNewProject}>
                            Logout
                        </button>
                        <div className="dashboard-user-avatar">👤</div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="dashboard-main-container">
                {/* Sidebar with Templates */}
                <aside className="dashboard-sidebar">
                    <div className="dashboard-sidebar-header">
                        <h2 className="dashboard-sidebar-title">Website Templates</h2>
                        <p className="dashboard-sidebar-subtitle">Choose from pre-designed templates</p>
                    </div>

                    <div className="dashboard-template-scroll-container">
                        <div className="dashboard-template-grid">
                            {templates.map((template, index) => (
                                <div
                                    key={template.id}
                                    className="dashboard-template-card"
                                    onClick={() => {navigate("/editor",{
                                        state: ("getById:"+template.id)
                                    })}}
                                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                                >
                                    <div
                                        className="dashboard-template-preview"
                                        style={{ background: `url("${template.img}")` }}
                                    >
                                        {template.preview}
                                    </div>
                                    <div className="dashboard-template-name">{template.name}</div>
                                    <div className="dashboard-template-category">{template.category}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="dashboard-main-content">
                    {/* Welcome Section */}
                    <section className="dashboard-welcome-section">
                        <h1 className="dashboard-welcome-title">Build Your Dream Website</h1>
                        <p className="dashboard-welcome-subtitle">
                            Create stunning websites with our powerful drag-and-drop builder, AI assistance, and custom components.
                            Everything you need to bring your vision to life.
                        </p>
                    </section>

                    {/* Features Grid */}
                    <section className="dashboard-features-section">
                        <div className="dashboard-features-grid">
                            {features.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="dashboard-feature-card"
                                    onClick={feature.route}
                                >
                                    <div
                                        className="dashboard-feature-header"
                                        style={{ background: feature.gradient }}
                                    >
                                        <h3 className="dashboard-feature-title">{feature.title}</h3>
                                    </div>
                                    <div className="dashboard-feature-content">
                                        <p className="dashboard-feature-description">{feature.description}</p>
                                        <div className="dashboard-feature-cta">Get Started →</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Projects */}
                    <section className="dashboard-recent-projects">
                        <h2 className="dashboard-section-title">Recent Projects</h2>
                        <div className="dashboard-projects-grid">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="dashboard-project-card">
                                    <div className="dashboard-project-name">{project.name}</div>
                                    <div className="dashboard-project-date">{project.date}</div>
                                    <div className="dashboard-project-actions">
                                        <button
                                            className="dashboard-btn dashboard-btn--primary dashboard-btn--small"
                                            onClick={() => handleEditProject(project)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="dashboard-btn dashboard-btn--outline dashboard-btn--small"
                                            onClick={() => handleViewProject(project)}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Home;