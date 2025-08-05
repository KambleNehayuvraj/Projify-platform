import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext'; // Adjust the path as needed
import styles from './SoftwareProjectDetail.module.css';

// Import images from assets folder
import ecommerceImg from '../../../assets/e-commerce platform UI mockup.webp';
import taskManagementImg from '../../../assets/task management app UI mockup.avif';
import aiChatbotImg from '../../../assets/AI chatbot interface design.png';
import weatherDashboardImg from '../../../assets/weather dashboard UI.png';
import socialMediaAnalyticsImg from '../../../assets/social media analytics dashboard.jpg';
import fitnessTrackerImg from '../../../assets/fitness tracker mobile UI.png';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Software projects data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB integration.',
      category: 'web',
      difficulty: 'Advanced',
      image: ecommerceImg,
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      github: '#',
      demo: '#',
      price: '₹6,000',
      numericPrice: 6000,
      features: [
        'Complete shopping cart functionality',
        'User authentication and authorization',
        'Payment gateway integration',
        'Admin dashboard with analytics',
        'Inventory management system',
        'Order tracking and management',
        'Email notifications',
        'Responsive design for all devices'
      ],
      specifications: {
        'Frontend': 'React.js, Redux, Material-UI',
        'Backend': 'Node.js, Express.js',
        'Database': 'MongoDB, Mongoose',
        'Authentication': 'JWT, bcrypt',
        'Payment': 'Stripe API',
        'Deployment': 'Heroku, Netlify',
        'Testing': 'Jest, Cypress'
      },
      longDescription: 'A comprehensive e-commerce platform built with modern web technologies. Features include user registration, product catalog, shopping cart, secure payment processing, order management, and an admin panel for managing products and orders. The platform is fully responsive and optimized for performance.'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team features.',
      category: 'web',
      difficulty: 'Intermediate',
      image: taskManagementImg,
      tags: ['Vue.js', 'Firebase', 'Real-time', 'PWA'],
      github: '#',
      demo: '#',
      price: '₹4,000',
      numericPrice: 4000,
      features: [
        'Real-time task synchronization',
        'Team collaboration tools',
        'Project management boards',
        'Due date reminders',
        'File attachments',
        'Progress tracking',
        'Offline functionality (PWA)',
        'Mobile responsive design'
      ],
      specifications: {
        'Frontend': 'Vue.js 3, Vuex, Vuetify',
        'Backend': 'Firebase Firestore',
        'Authentication': 'Firebase Auth',
        'Real-time': 'Firebase Realtime Database',
        'Storage': 'Firebase Storage',
        'PWA': 'Service Workers, Manifest',
        'Notifications': 'Firebase Cloud Messaging'
      },
      longDescription: 'A modern task management application designed for teams and individuals. Built with Vue.js and Firebase, it offers real-time synchronization, collaborative features, and works offline as a Progressive Web App. Perfect for managing projects, tracking progress, and team coordination.'
    },
    {
      id: 3,
      title: 'AI Chat Bot',
      description: 'Intelligent chatbot with natural language processing and machine learning capabilities.',
      category: 'ai',
      difficulty: 'Advanced',
      image: aiChatbotImg,
      tags: ['Python', 'TensorFlow', 'NLP', 'Flask', 'API'],
      github: '#',
      demo: '#',
      price: '₹7,000',
      numericPrice: 7000,
      features: [
        'Natural language understanding',
        'Context-aware conversations',
        'Multi-language support',
        'Integration with popular platforms',
        'Custom training capabilities',
        'Analytics and insights',
        'REST API for easy integration',
        'Scalable architecture'
      ],
      specifications: {
        'ML Framework': 'TensorFlow, scikit-learn',
        'NLP': 'NLTK, spaCy, Transformers',
        'Backend': 'Flask, FastAPI',
        'Database': 'PostgreSQL, Redis',
        'Deployment': 'Docker, AWS/GCP',
        'API': 'RESTful API, WebSocket',
        'Languages': 'Python 3.9+'
      },
      longDescription: 'An advanced AI chatbot system powered by machine learning and natural language processing. Capable of understanding context, maintaining conversations, and learning from interactions. Includes a web interface, REST API, and can be integrated with various messaging platforms.'
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard with location-based forecasts and data visualization.',
      category: 'web',
      difficulty: 'Beginner',
      image: weatherDashboardImg,
      tags: ['JavaScript', 'API Integration', 'Charts', 'CSS3'],
      github: '#',
      demo: '#',
      price: '₹2,500',
      numericPrice: 2500,
      features: [
        'Current weather conditions',
        '7-day weather forecast',
        'Interactive weather maps',
        'Location-based services',
        'Weather alerts and warnings',
        'Historical weather data',
        'Customizable dashboard',
        'Mobile-friendly interface'
      ],
      specifications: {
        'Frontend': 'Vanilla JavaScript, HTML5, CSS3',
        'Charts': 'Chart.js, D3.js',
        'APIs': 'OpenWeatherMap, Geolocation',
        'Maps': 'Leaflet.js, Mapbox',
        'Storage': 'LocalStorage, IndexedDB',
        'Build Tools': 'Webpack, Babel',
        'Styling': 'SCSS, CSS Grid/Flexbox'
      },
      longDescription: 'A beautiful and interactive weather dashboard that provides comprehensive weather information. Features current conditions, forecasts, interactive maps, and data visualizations. Built with vanilla JavaScript and modern web APIs for optimal performance.'
    },
    {
      id: 5,
      title: 'Social Media Analytics',
      description: 'Analytics platform for social media metrics with data visualization and reporting.',
      category: 'web',
      difficulty: 'Advanced',
      image: socialMediaAnalyticsImg,
      tags: ['Python', 'Django', 'Data Analysis', 'Charts', 'PostgreSQL'],
      github: '#',
      demo: '#',
      price: '₹8,000',
      numericPrice: 8000,
      features: [
        'Multi-platform social media integration',
        'Real-time analytics dashboard',
        'Automated report generation',
        'Engagement metrics tracking',
        'Competitor analysis',
        'Sentiment analysis',
        'Custom KPI monitoring',
        'Export capabilities'
      ],
      specifications: {
        'Backend': 'Django, Django REST Framework',
        'Database': 'PostgreSQL, Redis',
        'Analytics': 'Pandas, NumPy, Matplotlib',
        'APIs': 'Twitter API, Facebook Graph API',
        'Frontend': 'React, Chart.js',
        'Deployment': 'Docker, AWS',
        'Task Queue': 'Celery, RabbitMQ'
      },
      longDescription: 'A comprehensive social media analytics platform that helps businesses track their social media performance across multiple platforms. Provides detailed insights, automated reporting, and competitive analysis with beautiful data visualizations.'
    },
    {
      id: 6,
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform mobile app for fitness tracking with workout plans and progress monitoring.',
      category: 'mobile',
      difficulty: 'Intermediate',
      image: fitnessTrackerImg,
      tags: ['React Native', 'SQLite', 'Health API', 'Charts'],
      github: '#',
      demo: '#',
      price: '₹5,000',
      numericPrice: 5000,
      features: [
        'Workout tracking and logging',
        'Custom exercise routines',
        'Progress visualization',
        'Nutrition tracking',
        'Goal setting and achievements',
        'Social sharing features',
        'Offline data synchronization',
        'Wearable device integration'
      ],
      specifications: {
        'Framework': 'React Native, Expo',
        'Database': 'SQLite, Realm',
        'State Management': 'Redux, Context API',
        'Health APIs': 'HealthKit (iOS), Google Fit',
        'Charts': 'Victory Native, React Native Chart Kit',
        'Navigation': 'React Navigation',
        'Push Notifications': 'Firebase Cloud Messaging'
      },
      longDescription: 'A feature-rich fitness tracking mobile application built with React Native. Supports workout logging, progress tracking, nutrition management, and integrates with popular health platforms. Designed for both iOS and Android with offline capabilities.'
    }
  ];

  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className={styles.projectDetail}>
        <div className={styles.errorContainer}>
          <h2>Project Not Found</h2>
          <button onClick={() => navigate('/software-projects')} className={styles.backBtn}>
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      case 'Expert': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const handleAddToCart = async () => {
  try {
    setIsAdding(true);
    
    // Convert price to numeric value
    const numericPrice = project.numericPrice || 
      parseFloat(project.price.replace(/[₹,\s]/g, ''));
    
    // Create cart item object
    const cartItem = {
      id: project.id,
      name: project.title,
      description: project.description,
      price: numericPrice,
      image: project.image,
      category: project.category,
      difficulty: project.difficulty,
      tags: project.tags,
      quantity: 1,
      type: 'software' // Add type to distinguish from hardware projects
    };

    // Add to cart (synchronous call)
    addToCart(cartItem);
    
    // Optional: Show success message
    console.log('Added to cart:', cartItem);
    
    // Reset loading state immediately after adding to cart
    // The "Added to Cart" state will be handled by isProjectInCart
    setIsAdding(false);
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Error adding item to cart. Please try again.');
    setIsAdding(false);
  }
};
  const handleViewCart = () => {
    navigate('/cart');
  };

  const isProjectInCart = isInCart && isInCart(project.id);

  return (
    <div className={styles.projectDetail}>
      <div className={styles.projectHeader}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        
        <div className={styles.projectHero}>
          <div className={styles.projectHeroContent}>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <p className={styles.projectSubtitle}>{project.description}</p>
            
            <div className={styles.projectMeta}>
              <span 
                className={styles.difficultyBadge} 
                style={{ backgroundColor: getDifficultyColor(project.difficulty) }}
              >
                {project.difficulty}
              </span>
              <span className={styles.priceTag}>{project.price}</span>
            </div>

            <div className={styles.projectTags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            <div className={styles.projectActions}>
              <a href={project.demo} className={`${styles.btn} ${styles.btnPrimary}`}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
                Live Demo
              </a>
              <a href={project.github} className={`${styles.btn} ${styles.btnSecondary}`}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3M14 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                View Code
              </a>
            </div>
          </div>
          
          <div className={styles.projectImage}>
            <img src={project.image} alt={project.title} />
          </div>
        </div>
      </div>

      <div className={styles.projectContent}>
        <div className={styles.contentGrid}>
          <div className={styles.mainContent}>
            <section className={styles.projectOverview}>
              <h2>Project Overview</h2>
              <p>{project.longDescription}</p>
            </section>

            <section className={styles.projectFeatures}>
              <h2>Key Features</h2>
              <ul className={styles.featuresList}>
                {project.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.specificationsCard}>
              <h3>Technical Stack</h3>
              <div className={styles.specsList}>
                {Object.entries(project.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specItem}>
                    <span className={styles.specLabel}>{key}:</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.purchaseCard}>
              <div className={styles.priceSection}>
                <span className={styles.price}>{project.price}</span>
                <span className={styles.priceNote}>Source Code + Documentation</span>
              </div>
              
              {!isProjectInCart ? (
                <button 
                  className={styles.purchaseBtn}
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </button>
              ) : (
                <div className={styles.cartActions}>
                  <button className={`${styles.purchaseBtn} ${styles.inCartBtn}`} disabled>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    Added to Cart
                  </button>
                  <button 
                    className={styles.viewCartBtn}
                    onClick={handleViewCart}
                  >
                    View Cart
                  </button>
                </div>
              )}
              
              <button className={styles.contactBtn}>
                Contact for Custom Development
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;