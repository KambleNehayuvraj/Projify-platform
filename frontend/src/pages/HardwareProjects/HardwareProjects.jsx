import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HardwareProjects.css';

// Import images from assets folder
import smartIVFluidImg from '../../assets/smart_iv_fluid.jpg';
import medicineReminderImg from '../../assets/Medicine Reminder System.jpg';
import predictiveMaintenanceImg from '../../assets/AI-Powered Predictive Maintenance.jpeg';
import fallDetectionImg from '../../assets/Vision-Based Fall Detection.webp';
import smartDoorbellImg from '../../assets/Smart Doorbell with Facial Recognition.avif';
import airPurifierImg from '../../assets/Embedded Air Purifier Controller.webp';
import deliveryRobotImg from '../../assets/Autonomous Delivery Robot.webp';
import windowCleanerImg from '../../assets/Robotic Window Cleaner.jpg';
import smartParkingImg from '../../assets/Smart Parking Space Detection.webp';
import smartBicycleLockImg from '../../assets/Embedded System for Smart Bicycle Lock.jpg';

// Personal Wellness
import fitnessTrackerImg from '../../assets/Personalized Fitness Goal Tracker.png';
import stressHeadsetImg from '../../assets/Stress-Reducing Headset.png';

const HardwareProjects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: "Smart IV Fluid Monitoring and Alert System",
      description: "System to monitor IV fluid levels, send alerts, and prevent backflow/air embolism through real-time IoT-enabled monitoring.",
      category: "iot",
      difficulty: "Intermediate",
      image: smartIVFluidImg,
      tags: ["IoT", "Healthcare", "Arduino", "Sensors", "Automation"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 2,
      title: "IoT-Based Medicine Reminder System for Chronic Patients",
      description: "IoT-enabled device to remind patients to take medicines on time, track adherence, and sync data with mobile apps.",
      category: "iot",
      difficulty: "Beginner",
      image: medicineReminderImg,
      tags: ["IoT", "NodeMCU", "RFID", "Blynk", "Cloud"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 3,
      title: "AI-Powered Predictive Maintenance for Industrial Equipment",
      description: "AI-driven predictive maintenance using sensor data and machine learning to reduce unplanned downtime.",
      category: "ai",
      difficulty: "Advanced",
      image: predictiveMaintenanceImg,
      tags: ["AI", "Machine Learning", "IoT", "Python", "TensorFlow", "Dashboard"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 4,
      title: "Vision-Based Fall Detection for Elderly Home Safety",
      description: "Deep learning-based fall detection system using camera feeds, real-time alerts to caregivers, and cloud integration.",
      category: "ai",
      difficulty: "Advanced",
      image: fallDetectionImg,
      tags: ["AI", "Deep Learning", "YOLOv8", "OpenCV", "AWS IoT"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 5,
      title: "Smart Doorbell with Facial Recognition",
      description: "Raspberry Pi-based facial recognition doorbell that identifies visitors and alerts homeowners in real time.",
      category: "embedded",
      difficulty: "Intermediate",
      image: smartDoorbellImg,
      tags: ["Raspberry Pi", "OpenCV", "Facial Recognition", "IoT", "Firebase"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 6,
      title: "Embedded Air Purifier Controller for Allergy Sufferers",
      description: "Embedded system to monitor indoor air quality and control purification using smart sensors and automation.",
      category: "embedded",
      difficulty: "Intermediate",
      image: airPurifierImg,
      tags: ["STM32", "PM2.5 Sensor", "IoT", "PID Control", "Wi-Fi"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 7,
      title: "Autonomous Delivery Robot for Last-Mile Food Delivery",
      description: "Robot for short-range autonomous food delivery using GPS navigation, obstacle avoidance, and IoT connectivity.",
      category: "robotics",
      difficulty: "Advanced",
      image: deliveryRobotImg,
      tags: ["Robotics", "ROS", "GPS", "IoT", "Raspberry Pi"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 8,
      title: "Robotic Window Cleaner for High-Rise Buildings",
      description: "Autonomous robotic cleaner with suction and navigation sensors for safe and efficient high-rise window cleaning.",
      category: "robotics",
      difficulty: "Intermediate",
      image: windowCleanerImg,
      tags: ["Arduino", "Sensors", "Robotics", "Automation"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 9,
      title: "Smart Parking Space Detection Using Deep Learning",
      description: "Vision-based system using CCTV and deep learning to detect available parking spots in real time.",
      category: "iot",
      difficulty: "Advanced",
      image: smartParkingImg,
      tags: ["YOLOv8", "Deep Learning", "OpenCV", "AWS", "IoT"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 10,
      title: "Embedded System for Smart Bicycle Lock",
      description: "IoT-enabled smart lock with GPS tracking, BLE connectivity, and theft-prevention alerts for bicycles.",
      category: "iot",
      difficulty: "Intermediate",
      image: smartBicycleLockImg,
      tags: ["ESP32", "GPS", "BLE", "MQTT", "IoT"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 11,
      title: "Personalized Fitness Goal Tracker Using Data Analytics",
      description: "Data-driven fitness tracker that integrates with wearables to provide personalized workout and nutrition plans.",
      category: "ai",
      difficulty: "Intermediate",
      image: fitnessTrackerImg,
      tags: ["Data Analytics", "R", "Power BI", "Wearables", "APIs"],
      price: "₹8K + Components",
      demo: "#"
    },
    {
      id: 12,
      title: "Stress-Reducing Headset Using Brainwave Entrainment",
      description: "Wearable headset that uses brainwave entrainment and sound therapy to reduce stress levels in real time.",
      category: "embedded",
      difficulty: "Advanced",
      image: stressHeadsetImg,
      tags: ["Wearable Tech", "Audio Processing", "IoT", "Microcontrollers"],
      price: "₹8K + Components",
      demo: "#"
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
    { key: 'robotics', label: 'Robotics' },
    { key: 'ai', label: 'AI & Data Analytics' }
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
              <span className="stat-number">5</span>
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