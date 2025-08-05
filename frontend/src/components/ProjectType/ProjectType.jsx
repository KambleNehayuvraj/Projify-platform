import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectType.css';

const ProjectType = () => {
  const navigate = useNavigate();

  const handleExploreClick = (projectType) => {
    if (projectType === 'hardware') {
      navigate('/hardware-projects');
    } else if (projectType === 'software') {
      navigate('/software-projects');
    }
  };

  return (
    <section id="project-type-section" className="project-type-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Choose Your Project Type</h2>
          <p className="section-subtitle">
            Browse through our diverse collection of tech projects
          </p>
          <p className="section-description">
            All categories include source code, documentation, and demo support.
          </p>
        </div>

        <div className="project-cards">
          <div className="project-card">
            <div className="card-image">
              <div className="image-placeholder hardware-bg">
                <div className="tech-icon">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="card-title">Hardware Projects</h3>
              <p className="card-description">
                Circuit designs, embedded systems, IoT solutions, and electronic prototypes
              </p>
              <button 
                className="explore-btn" 
                onClick={() => handleExploreClick('hardware')}
              >
                Explore
              </button>
            </div>
          </div>

          <div className="project-card">
            <div className="card-image">
              <div className="image-placeholder software-bg">
                <div className="tech-icon">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="card-title">Software Projects</h3>
              <p className="card-description">
                Web applications, mobile apps, desktop software, and system utilities
              </p>
              <button 
                className="explore-btn" 
                onClick={() => handleExploreClick('software')}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectType;