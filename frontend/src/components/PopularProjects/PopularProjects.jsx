import React from 'react';
import './PopularProjects.css';

// Import images from assets folder
import smartIrrigationImg from '../../assets/Smart-Irrigation-Systems.jpeg';
import aiAttendanceImg from '../../assets/AI Attendance System.png';
import lineFollowingRobotImg from '../../assets/Line Following Robot.jpg';

const PopularProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Smart Irrigation System",
      description: "Automate agricultural watering based on soil moisture data and weather conditions.",
      image: smartIrrigationImg,
      difficulty: "Popular",
      difficultyColor: "green",
      price: "₹1,999",
      priceNote: "+ component cost",
      tags: ["Arduino", "IoT", "Sensors"],
      features: [
        { icon: "📄", text: "Abstract" },
        { icon: "📊", text: "PPT" },
        { icon: "📋", text: "Report" },
        { icon: "🎥", text: "Video" }
      ]
    },
    {
      id: 2,
      title: "AI Attendance System",
      description: "Face recognition-based attendance tracking system for educational institutions.",
      image: aiAttendanceImg,
      difficulty: "Advanced",
      difficultyColor: "purple",
      price: "₹2,999",
      priceNote: "All inclusive",
      tags: ["Python", "OpenCV", "ML"],
      features: [
        { icon: "📄", text: "Abstract" },
        { icon: "📊", text: "PPT" },
        { icon: "📋", text: "Report" },
        { icon: "🎥", text: "Video" }
      ]
    },
    {
      id: 3,
      title: "Line Following Robot",
      description: "Build a robot that automatically follows a path using infrared sensors.",
      image: lineFollowingRobotImg,
      difficulty: "Beginner",
      difficultyColor: "blue",
      price: "₹1,499",
      priceNote: "+ sensors",
      tags: ["Arduino", "Robotics", "Electronics"],
      features: [
        { icon: "📄", text: "Abstract" },
        { icon: "📊", text: "PPT" },
        { icon: "📋", text: "Report" },
        { icon: "🎥", text: "Video" }
      ]
    }
  ];

  return (
    <section className="popular-projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Projects</h2>
          <p className="section-subtitle">
            Take inspiration from our most popular projects. All packages include complete documentation and expert guidance.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className={`difficulty-badge ${project.difficultyColor}`}>
                  {project.difficulty}
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                
                <div className="project-price">
                  <div className="price-info">
                    <span className="price">{project.price}</span>
                    <span className="price-note">{project.priceNote}</span>
                  </div>
                </div>
                
                <div className="project-features">
                  {project.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="feature-icon">{feature.icon}</span>
                      <span className="feature-text">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="section-footer">
          <button className="view-all-btn">View All Projects</button>
        </div>
      </div>
    </section>
  );
};

export default PopularProjects;