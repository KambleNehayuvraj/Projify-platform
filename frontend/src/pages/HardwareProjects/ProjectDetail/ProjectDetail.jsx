import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext'; // Adjust the path as needed
import styles from './ProjectDetail.module.css';

// Import images from assets folder
import arduinoWeatherImg from '../../../assets/Arduino Weather Station.webp';
import smartHomeImg from '../../../assets/smart home automation hub Ui.webp';
import digitalOscilloscopeImg from '../../../assets/digital oscilloscope display.jpg';
import roboticArmImg from '../../../assets/robotic arm controller.webp';
import ledMatrixImg from '../../../assets/LED matrix display.webp';
import droneControllerImg from '../../../assets/drone flight controller board.jpg';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Hardware projects data
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
      price: "₹24,999",
      numericPrice: 24999,
      features: [
        "Real-time weather monitoring",
        "Cloud data storage",
        "Mobile app integration",
        "Solar powered option",
        "Weatherproof enclosure",
        "Multiple sensor integration",
        "Data logging and analytics",
        "Remote monitoring capabilities"
      ],
      specifications: {
        "Microcontroller": "Arduino Uno R3",
        "Sensors": "DHT22, BMP280, Rain sensor",
        "Connectivity": "WiFi ESP8266",
        "Power": "Solar panel + Battery backup",
        "Display": "16x2 LCD with backlight",
        "Storage": "SD card module",
        "Enclosure": "IP65 weatherproof case"
      },
      longDescription: "This comprehensive weather station project combines multiple sensors to monitor temperature, humidity, atmospheric pressure, and rainfall. The system uploads data to cloud services for historical analysis and provides real-time alerts through a mobile application."
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
      price: "₹49,999",
      numericPrice: 49999,
      features: [
        "Voice control integration",
        "Mobile app control",
        "Scheduling and automation",
        "Energy monitoring",
        "Security system integration",
        "Multi-room control",
        "Scene management",
        "Remote access capabilities"
      ],
      specifications: {
        "Controller": "Raspberry Pi 4",
        "Relays": "8-channel relay board",
        "Communication": "WiFi, Bluetooth, Zigbee",
        "Interface": "7-inch touchscreen",
        "Power": "12V DC adapter",
        "PCB": "Custom designed 4-layer PCB",
        "Enclosure": "ABS plastic housing"
      },
      longDescription: "A complete home automation solution that allows you to control lights, fans, appliances, and security systems from anywhere. Features include voice control, scheduling, energy monitoring, and integration with popular smart home platforms."
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
      price: "₹89,999",
      numericPrice: 89999,
      features: [
        "High-speed signal acquisition",
        "FPGA-based processing",
        "Touchscreen interface",
        "Multiple trigger modes",
        "FFT analysis",
        "Waveform storage",
        "USB connectivity",
        "Professional accuracy"
      ],
      specifications: {
        "FPGA": "Xilinx Spartan-7",
        "ADC": "100 MHz, 12-bit",
        "Display": "7-inch capacitive touchscreen",
        "Channels": "2 analog + 8 digital",
        "Memory": "64MB DDR3 RAM",
        "Interface": "USB 3.0, Ethernet",
        "Power": "External 12V adapter"
      },
      longDescription: "A professional-grade digital oscilloscope built from scratch using FPGA technology. Offers high-speed signal acquisition, advanced triggering, and comprehensive analysis tools suitable for electronics development and debugging."
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
      price: "₹79,999",
      numericPrice: 79999,
      features: [
        "6 degrees of freedom",
        "Computer vision guidance",
        "Precise servo control",
        "Object recognition",
        "Path planning algorithms",
        "Safety mechanisms",
        "Remote operation",
        "Programming interface"
      ],
      specifications: {
        "Servos": "6x high-torque digital servos",
        "Controller": "Arduino Mega 2560",
        "Vision": "Raspberry Pi + Camera module",
        "Communication": "WiFi, Serial",
        "Power": "24V DC power supply",
        "Gripper": "Pneumatic gripper",
        "Reach": "60cm working radius"
      },
      longDescription: "An advanced robotic arm system capable of precise manipulation tasks. Integrates computer vision for object recognition and tracking, with sophisticated control algorithms for smooth and accurate movement."
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
      price: "₹15,999",
      numericPrice: 15999,
      features: [
        "32x32 RGB LED matrix",
        "Music visualization",
        "Custom animations",
        "WiFi connectivity",
        "Mobile app control",
        "Sound reactive modes",
        "Text scrolling",
        "Multiple display modes"
      ],
      specifications: {
        "LEDs": "32x32 RGB WS2812B matrix",
        "Controller": "ESP32 DevKit",
        "Audio": "MSGEQ7 spectrum analyzer",
        "Power": "5V 20A power supply",
        "Frame": "Aluminum extrusion frame",
        "Diffuser": "Acrylic diffusion panel",
        "Control": "WiFi + mobile app"
      },
      longDescription: "A vibrant LED matrix display system perfect for creating stunning visual effects. Features music-reactive modes, custom animations, and wireless control through a dedicated mobile application."
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
      price: "₹65,999",
      numericPrice: 65999,
      features: [
        "6-axis IMU sensor",
        "GPS navigation",
        "Wireless telemetry",
        "Auto-pilot modes",
        "Failsafe mechanisms",
        "Real-time data logging",
        "Camera gimbal control",
        "Ground station software"
      ],
      specifications: {
        "MCU": "STM32F4 32-bit processor",
        "IMU": "MPU-6000 6-axis gyro/accel",
        "GPS": "u-blox M8N module",
        "Telemetry": "915MHz radio link",
        "Power": "5V-25V input range",
        "I/O": "8 PWM outputs, UART, I2C",
        "Size": "50mm x 50mm PCB"
      },
      longDescription: "A professional-grade flight controller system designed for quadcopters and multi-rotor aircraft. Features advanced flight modes, GPS navigation, and comprehensive telemetry for safe and precise flight operations."
    }
  ];

  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className={styles.projectDetail}>
        <div className={styles.errorContainer}>
          <h2>Project Not Found</h2>
          <button onClick={() => navigate('/hardware-projects')} className={styles.backBtn}>
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4ade80';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#f97316';
      case 'Expert': return '#ef4444';
      default: return '#6b7280';
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
        type: 'hardware' // Add type to distinguish from software projects
      };

      // Add to cart
      addToCart(cartItem);
      
      // Optional: Show success message
      console.log('Added to cart:', cartItem);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart. Please try again.');
    } finally {
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
              <h3>Specifications</h3>
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
                <span className={styles.priceNote}>Complete Kit</span>
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
                Contact for Custom Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;