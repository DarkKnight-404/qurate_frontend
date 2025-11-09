import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [view, setView] = useState('grid'); // 'grid' or 'detail'

    const categories = [
        { id: 'all', name: 'All Templates', count: 0 },
        { id: 'business', name: 'Business', count: 0 },
        { id: 'portfolio', name: 'Portfolio', count: 0 },
        { id: 'ecommerce', name: 'E-commerce', count: 0 },
        { id: 'blog', name: 'Blog', count: 0 },
        { id: 'landing', name: 'Landing Page', count: 0 },
        { id: 'personal', name: 'Personal', count: 0 }
    ];

    // Mock data - replace with actual API calls
    useEffect(() => {
        // const fetchTemplates = async () => {
        //   try {
        //     // Simulate API call
        //     setTimeout(() => {
        //       const mockTemplates = [
        //         {
        //           id: 1,
        //           name: 'Modern Business',
        //           category: 'business',
        //           description: 'Professional business website with clean design and modern layout. Perfect for corporate websites and startups.',
        //           preview: 'Business',
        //           image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        //           color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        //           pages: 8,
        //           responsive: true,
        //           price: 'Free',
        //           popularity: 95
        //         },
        //         {
        //           id: 2,
        //           name: 'Creative Portfolio',
        //           category: 'portfolio',
        //           description: 'Showcase your work with this stunning portfolio template. Great for designers, photographers, and artists.',
        //           preview: 'Portfolio',
        //           image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        //           color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        //           pages: 6,
        //           responsive: true,
        //           price: 'Free',
        //           popularity: 88
        //         },
        //         {
        //           id: 3,
        //           name: 'Online Store',
        //           category: 'ecommerce',
        //           description: 'Complete e-commerce solution with product listings, shopping cart, and checkout functionality.',
        //           preview: 'E-commerce',
        //           image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        //           color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        //           pages: 12,
        //           responsive: true,
        //           price: 'Premium',
        //           popularity: 92
        //         },
        //         {
        //           id: 4,
        //           name: 'Blog Platform',
        //           category: 'blog',
        //           description: 'Beautiful blog template with article layouts, categories, and social sharing features.',
        //           preview: 'Blog',
        //           image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        //           color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        //           pages: 7,
        //           responsive: true,
        //           price: 'Free',
        //           popularity: 85
        //         },
        //         {
        //           id: 5,
        //           name: 'Startup Landing',
        //           category: 'landing',
        //           description: 'High-converting landing page template for startups and product launches.',
        //           preview: 'Landing',
        //           image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        //           color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        //           pages: 1,
        //           responsive: true,
        //           price: 'Free',
        //           popularity: 90
        //         },
        //         {
        //           id: 6,
        //           name: 'Personal Resume',
        //           category: 'personal',
        //           description: 'Clean and professional resume template to showcase your skills and experience.',
        //           preview: 'Resume',
        //           image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        //           color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        //           pages: 4,
        //           responsive: true,
        //           price: 'Free',
        //           popularity: 82
        //         },
        //         {
        //           id: 7,
        //           name: 'Corporate Suite',
        //           category: 'business',
        //           description: 'Comprehensive corporate website with about us, services, team, and contact pages.',
        //           preview: 'Corporate',
        //           image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        //           color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        //           pages: 10,
        //           responsive: true,
        //           price: 'Premium',
        //           popularity: 89
        //         },
        //         {
        //           id: 8,
        //           name: 'Photography Showcase',
        //           category: 'portfolio',
        //           description: 'Gallery-focused template perfect for photographers and visual artists.',
        //           preview: 'Photography',
        //           image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        //           color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        //           pages: 5,
        //           responsive: true,
        //           price: 'Free',
        //           popularity: 87
        //         }
        //       ];

        //       setTemplates(mockTemplates);
        //       setFilteredTemplates(mockTemplates);

        //       // Update category counts
        //       categories.forEach(cat => {
        //         if (cat.id === 'all') {
        //           cat.count = mockTemplates.length;
        //         } else {
        //           cat.count = mockTemplates.filter(t => t.category === cat.id).length;
        //         }
        //       });

        //       setLoading(false);
        //     }, 1000);
        //   } catch (error) {
        //     console.error('Error fetching templates:', error);
        //     setLoading(false);
        //   }
        // };

        // fetchTemplates();
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
                        name: ele.id,
                        category: ele.id,
                        description: 'Gallery-focused template perfect for photographers and visual artists.',
                        preview: 'Photography',
                        image: ele.img,
                        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        pages: 1,
                        responsive: true,
                        price: 'Free',
                        popularity: ele.visitors
                    }
                })
            })
            setLoading(false);
        }
    }, []);

    // Filter templates based on category and search term
    useEffect(() => {
        let filtered = templates;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(template => template.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(template =>
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredTemplates(filtered);
    }, [selectedCategory, searchTerm, templates]);

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
        setView('detail');
    };

    const handleBackToList = () => {
        setView('grid');
        setSelectedTemplate(null);
    };

    const handleUseTemplate = (template) => {
        alert(`Starting new project with template: ${template.name}`);
        // Here you would typically navigate to the editor with the selected template
    };

    const handlePreviewTemplate = (template) => {
        window.open("https://qurate-backend.vercel.app/sitebypageid?pageId=" + template.id, "_blank");
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <Navbar />
                <div className="templates-main-content">
                    <div className="loading-spinner">Loading templates...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Navbar />

            <div className="templates-main-content">
                {view === 'grid' ? (
                    <TemplateGridView
                        templates={filteredTemplates}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        searchTerm={searchTerm}
                        onTemplateClick={handleTemplateClick}
                        onCategoryClick={handleCategoryClick}
                        onSearchChange={handleSearchChange}
                        onUseTemplate={handleUseTemplate}
                        onPreviewTemplate={handlePreviewTemplate}
                    />
                ) : (
                    <TemplateDetailView
                        template={selectedTemplate}
                        onBack={handleBackToList}
                        onUseTemplate={handleUseTemplate}
                        onPreviewTemplate={handlePreviewTemplate}
                    />
                )}
            </div>
        </div>
    );
};

// Navbar Component (same as dashboard)
const Navbar = () => {


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
                    <div href="#" onClick={(e) => { e.preventDefault(); navigate("/sites"); }} className="dashboard-nav-link">My Sites</div>
                    <div href="#" onClick={(e) => { e.preventDefault(); navigate("/templates"); }} className="dashboard-nav-link dashboard-nav-link--active">Templates</div>
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
    )
};

// Template Grid View Component
const TemplateGridView = ({
    templates,
    categories,
    selectedCategory,
    searchTerm,
    onTemplateClick,
    onCategoryClick,
    onSearchChange,
    onUseTemplate,
    onPreviewTemplate
}) => (
    <div className="templates-container">
        <div className="templates-header">
            <div className="templates-header-content">
                <h1 className="templates-title">Website Templates</h1>
                <p className="templates-subtitle">
                    Choose from professionally designed templates to kickstart your website
                </p>
            </div>

            <div className="templates-search">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="search-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>
            </div>
        </div>

        <div className="templates-content">
            {/* Categories Sidebar */}
            {/* <aside className="templates-sidebar">
                <div className="categories-section">
                    <h3 className="categories-title">Categories</h3>
                    <div className="categories-list">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${selectedCategory === category.id ? 'category-btn--active' : ''}`}
                                onClick={() => onCategoryClick(category.id)}
                            >
                                <span className="category-name">{category.name}</span>
                                <span className="category-count">{category.count}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filters-section">
                    <h3 className="filters-title">Filters</h3>
                    <div className="filter-options">
                        <label className="filter-checkbox">
                            <input type="checkbox" defaultChecked />
                            <span className="checkmark"></span>
                            Responsive Design
                        </label>
                        <label className="filter-checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Free Templates
                        </label>
                        <label className="filter-checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Premium Templates
                        </label>
                    </div>
                </div>
            </aside> */}

            {/* Templates Grid */}
            <main className="templates-main" style={{ overflow: "auto", width: "80vw" }}>
                <div className="templates-grid-header">
                    <div className="results-count">
                        Showing {templates.length} templates
                        {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                    </div>
                    <div className="view-options">
                        <button className="view-option view-option--active">Grid</button>
                        <button className="view-option">List</button>
                    </div>
                </div>

                <div className="templates-grid">
                    {templates.map(template => (
                        <div key={template.id} className="template-card">
                            <div
                                className="template-preview"
                                onClick={() => onTemplateClick(template)}
                            >
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="template-image"
                                />
                                <div className="template-overlay">
                                    <button
                                        className="preview-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onPreviewTemplate(template);
                                        }}
                                    >
                                        👁️ Preview
                                    </button>
                                </div>
                                {template.price === 'Premium' && (
                                    <div className="premium-badge">Premium</div>
                                )}
                            </div>

                            <div className="template-info">
                                <div className="template-header">
                                    <h3 className="template-name">{template.name}</h3>
                                    <span className="template-price">{template.price}</span>
                                </div>
                                <p className="template-description">{template.description}</p>

                                <div className="template-meta">
                                    <span className="template-meta-item">📄 {template.pages} pages</span>
                                    <span className="template-meta-item">📱 Responsive</span>
                                    <span className="template-meta-item">⭐ {template.popularity}%</span>
                                </div>

                                <div className="template-actions">
                                    <button
                                        className="template-btn template-btn--primary"
                                        onClick={() => onUseTemplate(template)}
                                    >
                                        Use Template
                                    </button>
                                    <button
                                        className="template-btn template-btn--secondary"
                                        onClick={() => onTemplateClick(template)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {templates.length === 0 && (
                    <div className="empty-templates">
                        <div className="empty-icon">🔍</div>
                        <h3>No templates found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </main>
        </div>
    </div>
);

// Template Detail View Component
const TemplateDetailView = ({ template, onBack, onUseTemplate, onPreviewTemplate }) => (
    <div className="template-detail-container">
        <div className="template-detail-header">
            <button className="back-button" onClick={onBack}>
                ← Back to Templates
            </button>
            <div className="template-detail-title">
                <h1>{template.name}</h1>
                <span className={`price-badge price-${template.price.toLowerCase()}`}>
                    {template.price}
                </span>
            </div>
            <p className="template-detail-description">{template.description}</p>
        </div>

        <div className="template-detail-content">
            <div className="template-detail-preview">
                <div className="preview-container">
                    <img
                        src={template.image}
                        alt={template.name}
                        className="detail-template-image"
                    />
                    <div className="preview-actions">
                        <button
                            className="preview-action-btn preview-action-btn--primary"
                            onClick={() => onUseTemplate(template)}
                        >
                            🚀 Use This Template
                        </button>
                        <button
                            className="preview-action-btn preview-action-btn--secondary"
                            onClick={() => onPreviewTemplate(template)}
                        >
                            👁️ Live Preview
                        </button>
                    </div>
                </div>
            </div>

            <div className="template-detail-sidebar">
                <div className="detail-info-card">
                    <h3>Template Details</h3>
                    <div className="detail-info-list">
                        <div className="detail-info-item">
                            <span className="detail-info-label">Category:</span>
                            <span className="detail-info-value">{template.category}</span>
                        </div>
                        <div className="detail-info-item">
                            <span className="detail-info-label">Pages:</span>
                            <span className="detail-info-value">{template.pages}</span>
                        </div>
                        <div className="detail-info-item">
                            <span className="detail-info-label">Responsive:</span>
                            <span className="detail-info-value">Yes</span>
                        </div>
                        <div className="detail-info-item">
                            <span className="detail-info-label">Popularity:</span>
                            <span className="detail-info-value">{template.popularity}%</span>
                        </div>
                        <div className="detail-info-item">
                            <span className="detail-info-label">Price:</span>
                            <span className="detail-info-value">{template.price}</span>
                        </div>
                    </div>
                </div>

                <div className="features-card">
                    <h3>Features</h3>
                    <ul className="features-list">
                        <li>✅ Fully Responsive Design</li>
                        <li>✅ Modern & Clean Layout</li>
                        <li>✅ Easy to Customize</li>
                        <li>✅ SEO Optimized</li>
                        <li>✅ Fast Loading</li>
                        <li>✅ Cross-browser Compatible</li>
                    </ul>
                </div>

                <div className="cta-card">
                    <button
                        className="cta-btn cta-btn--primary"
                        onClick={() => onUseTemplate(template)}
                    >
                        Get Started with {template.name}
                    </button>
                    <p className="cta-note">
                        {template.price === 'Free' ? 'Free forever' : '7-day free trial available'}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default Templates;