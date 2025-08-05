import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HardwareProjects.css';

// Import images from assets folder
import arduinoWeatherImg from '../../assets/Arduino Weather Station.webp';
import smartHomeImg from '../../assets/smart home automation hub Ui.webp';
import digitalOscilloscopeImg from '../../assets/digital oscilloscope display.jpg';
import roboticArmImg from '../../assets/robotic arm controller.webp';
import ledMatrixImg from '../../assets/LED matrix display.webp';
import droneControllerImg from '../../assets/drone flight controller board.jpg';

const HardwareProjects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: "Arduino Weather Station",
      description: "IoT-enabled weather monitoring system with real-time data visualization and cloud connectivity.",
      category: "iot",
      difficulty: "Intermediate",
      image: arduinoWeatherImg,
      tags: ["Arduino", "IoT", "Sensors", "Cloud"],
      github: "#",
      demo: "#",
      price: "₹6000"
    },
    {
      id: 2,
      title: "Smart Home Automation Hub",
      description: "Centralized control system for home appliances using Raspberry Pi and custom PCB design.",
      category: "embedded",
      difficulty: "Advanced",
      image: smartHomeImg,
      tags: ["Raspberry Pi", "PCB", "Home Automation", "WiFi"],
      github: "#",
      demo: "#",
      price: "₹5000"
    },
    {
      id: 3,
      title: "Digital Oscilloscope",
      description: "Custom-built oscilloscope with FPGA-based signal processing and touchscreen interface.",
      category: "circuits",
      difficulty: "Expert",
      image: digitalOscilloscopeImg,
      tags: ["FPGA", "Signal Processing", "Electronics", "Display"],
      github: "#",
      demo: "#",
      price: "₹5000"
    },
    {
      id: 4,
      title: "Robotic Arm Controller",
      description: "6-DOF robotic arm with precise servo control and computer vision integration.",
      category: "robotics",
      difficulty: "Advanced",
      image: roboticArmImg,
      tags: ["Robotics", "Computer Vision", "Servo Motors", "AI"],
      github: "#",
      demo: "#",
      price: "₹5000"
    },
    {
      id: 5,
      title: "LED Matrix Display",
      description: "Programmable RGB LED matrix with music visualization and custom animations.",
      category: "circuits",
      difficulty: "Beginner",
      image: ledMatrixImg,
      tags: ["LED", "Arduino", "Animations", "Music"],
      github: "#",
      demo: "#",
      price: "₹5000"
    },
    {
      id: 6,
      title: "Drone Flight Controller",
      description: "Custom flight controller board with IMU sensors and wireless telemetry system.",
      category: "embedded",
      difficulty: "Expert",
      image: droneControllerImg,
      tags: ["Drone", "IMU", "Flight Control", "Telemetry"],
      github: "#",
      demo: "#",
      price: "₹5000"
    }
  ];

  const handleViewDetails = (projectId) => {
    navigate(`/hardware-project/${projectId}`);
  };

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'iot', label: 'IoT Solutions' },
    { key: 'embedded', label: 'Embedded Systems' },
    { key: 'circuits', label: 'Circuit Design' },
    { key: 'robotics', label: 'Robotics' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4ade80';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#f97316';
      case 'Expert': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="hardware-projects">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Hardware Projects</h1>
          <p className="hero-subtitle">
            Explore cutting-edge hardware solutions from circuit designs to IoT systems
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">Premium</span>
              <span className="stat-label">Quality</span>
            </div>
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="circuit-pattern"></div>
        </div>
      </div>

      <div className="projects-container">
        <div className="controls-section">
          <div className="search-bar">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search projects, technologies, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            {categories.map(category => (
              <button
                key={category.key}
                className={`filter-tab ${activeFilter === category.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-actions">
                    <a href={project.demo} className="action-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21"></polygon>
                      </svg>
                      Demo
                    </a>
                    <button 
                      className="action-btn primary"
                      onClick={() => handleViewDetails(project.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span 
                      className="difficulty-badge" 
                      style={{ backgroundColor: getDifficultyColor(project.difficulty) }}
                    >
                      {project.difficulty}
                    </span>
                    <span className="price-badge">{project.price}</span>
                  </div>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="project-footer">
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(project.id)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    View Details
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7,7 17,7 17,17"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No projects found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareProjects;