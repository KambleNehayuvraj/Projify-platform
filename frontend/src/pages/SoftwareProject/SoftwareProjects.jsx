import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SoftwareProjects.css';

// Import images from assets folder
import ecommerceImg from '../../assets/e-commerce platform UI mockup.webp';
import taskManagementImg from '../../assets/task management app UI mockup.avif';
import aiChatbotImg from '../../assets/AI chatbot interface design.png';
import weatherDashboardImg from '../../assets/weather dashboard UI.png';
import socialMediaAnalyticsImg from '../../assets/social media analytics dashboard.jpg';
import fitnessTrackerImg from '../../assets/fitness tracker mobile UI.png';

const SoftwareProject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const navigate = useNavigate();

  const filters = [
    'All Projects',
    'Web Development', 
    'Mobile Apps',
    'Desktop Applications',
    'APIs & Backend',
    'Machine Learning'
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      difficulty: 'ADVANCED',
      price: '₹12k',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB integration.',
      image: ecommerceImg,
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux']
    },
    {
      id: 2,
      title: 'Task Management App',
      difficulty: 'INTERMEDIATE',
      price: '₹7000',
      description: 'Collaborative task management application with real-time updates and team features.',
      image: taskManagementImg,
      tags: ['Vue.js', 'Firebase', 'Real-time', 'PWA']
    },
    {
      id: 3,
      title: 'AI Chat Bot',
      difficulty: 'ADVANCED',
      price: '₹15k',
      description: 'Intelligent chatbot with natural language processing and machine learning capabilities.',
      image: aiChatbotImg,
      tags: ['Python', 'TensorFlow', 'NLP', 'Flask', 'API']
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      difficulty: 'BEGINNER',
      price: '₹3,500',
      description: 'Interactive weather dashboard with location-based forecasts and data visualization.',
      image: weatherDashboardImg,
      tags: ['JavaScript', 'API Integration', 'Charts', 'CSS3']
    },
    {
      id: 5,
      title: 'Social Media Analytics',
      difficulty: 'ADVANCED',
      price: '₹10k',
      description: 'Analytics platform for social media metrics with data visualization and reporting.',
      image: socialMediaAnalyticsImg,
      tags: ['Python', 'Django', 'Data Analysis', 'Charts', 'PostgreSQL']
    },
    {
      id: 6,
      title: 'Mobile Fitness Tracker',
      difficulty: 'INTERMEDIATE',
      price: '₹8000',
      description: 'Cross-platform mobile app for fitness tracking with workout plans and progress monitoring.',
      image: fitnessTrackerImg,
      tags: ['React Native', 'SQLite', 'Health API', 'Charts']
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeFilter === 'All Projects') return matchesSearch;
    
    const filterMap = {
      'Web Development': ['React', 'Vue.js', 'JavaScript', 'Django', 'Node.js'],
      'Mobile Apps': ['React Native', 'Mobile'],
      'Desktop Applications': ['Electron', 'Desktop'],
      'APIs & Backend': ['Node.js', 'Flask', 'Django', 'API'],
      'Machine Learning': ['TensorFlow', 'Python', 'ML', 'AI']
    };
    
    const filterTags = filterMap[activeFilter] || [];
    const matchesFilter = project.tags.some(tag => 
      filterTags.some(filterTag => tag.toLowerCase().includes(filterTag.toLowerCase()))
    );
    
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (projectId) => {
    console.log('Navigating to project:', projectId); // Debug log
    try {
      navigate(`/SoftwareProjectDetail/${projectId}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'BEGINNER': return '#10B981';
      case 'INTERMEDIATE': return '#F59E0B';
      case 'ADVANCED': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div className="software-projects">
      <div className="software-projects__header">
        <h1 className="software-projects__title">Software Projects</h1>
        <p className="software-projects__subtitle">
          Explore innovative software solutions from web apps to AI systems
        </p>
        
        <div className="software-projects__stats">
          <div className="stat">
            <span className="stat__value">Premium</span>
            <span className="stat__label">QUALITY</span>
          </div>
          <div className="stat">
            <span className="stat__value">6</span>
            <span className="stat__label">CATEGORIES</span>
          </div>
          <div className="stat">
            <span className="stat__value">24/7</span>
            <span className="stat__label">SUPPORT</span>
          </div>
        </div>
      </div>

      <div className="software-projects__search">
        <input
          type="text"
          placeholder="Search projects, technologies, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="software-projects__filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="software-projects__grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-card__image">
              <img src={project.image} alt={project.title} />
              <span 
                className="project-card__difficulty"
                style={{ backgroundColor: getDifficultyColor(project.difficulty) }}
              >
                {project.difficulty}
              </span>
            </div>
            
            <div className="project-card__content">
              <div className="project-card__header">
                <h3 className="project-card__title">{project.title}</h3>
                <span className="project-card__price">{project.price}</span>
              </div>
              
              <p className="project-card__description">{project.description}</p>
              
              <div className="project-card__tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              
              <button 
                className="project-card__btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Button clicked for project:', project.id);
                  handleViewDetails(project.id);
                }}
                type="button"
              >
                <span>👁</span> VIEW DETAILS →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <p>No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default SoftwareProject;