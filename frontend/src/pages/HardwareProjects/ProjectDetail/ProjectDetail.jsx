import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProjectDetail.module.css';

// Import images from assets folder
import smartIVFluidImg from '../../../assets/Smart IV Fluid Monitoring and Alert System.jpg';
import medicineReminderImg from '../../../assets/Medicine Reminder System.jpg';
import predictiveMaintenanceImg from '../../../assets/AI-Powered Predictive Maintenance.jpeg';
import fallDetectionImg from '../../../assets/Vision-Based Fall Detection.webp';
import smartDoorbellImg from '../../../assets/Smart Doorbell with Facial Recognition.avif';
import airPurifierImg from '../../../assets/Embedded Air Purifier Controller.webp';
import deliveryRobotImg from '../../../assets/Autonomous Delivery Robot.webp';
import windowCleanerImg from '../../../assets/Robotic Window Cleaner.jpg';
import smartParkingImg from '../../../assets/Smart Parking Space Detection.webp';
import smartBicycleLockImg from '../../../assets/Embedded System for Smart Bicycle Lock.jpg';
import fitnessTrackerImg from '../../../assets/Personalized Fitness Goal Tracker.png';
import stressHeadsetImg from '../../../assets/Stress-Reducing Headset.png';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectInterest: ''
  });

  // Contact information - Update these with your actual details
  const contactInfo = {
    whatsapp: '+91-9518731152', // Replace with your WhatsApp number
    email: 'progify68@gmail.com', // Replace with your email
    responseTime: 'Within 2-4 hours'
  };

  // Hardware projects data
  const projects = [
    {
      id: 1,
      title: "Smart IV Fluid Monitoring and Alert System",
      description: "System to monitor IV fluid levels, send alerts, and prevent backflow/air embolism through real-time IoT-enabled monitoring.",
      category: "iot",
      difficulty: "Intermediate",
      image: smartIVFluidImg,
      tags: ["IoT", "Healthcare", "Arduino", "Sensors", "Automation"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Real-time IV fluid level monitoring",
        "Automatic alert system for low levels",
        "Backflow and air embolism prevention",
        "Mobile app notifications",
        "Hospital-grade accuracy sensors",
        "Cloud data logging and analytics",
        "Multi-patient monitoring support",
        "Emergency alarm integration"
      ],
      specifications: {
        "Microcontroller": "ESP32 DevKit V1",
        "Sensors": "Ultrasonic level sensor, Flow rate sensor",
        "Display": "OLED 128x64 display",
        "Connectivity": "WiFi 802.11 b/g/n",
        "Power": "12V DC adapter with battery backup",
        "Alerts": "Buzzer, LED indicators, Mobile push",
        "Enclosure": "Medical-grade ABS plastic"
      },
      longDescription: "This advanced IV fluid monitoring system ensures patient safety by continuously tracking fluid levels and flow rates. The system prevents dangerous situations like air embolism and provides healthcare professionals with real-time alerts and comprehensive monitoring data."
    },
    {
      id: 2,
      title: "IoT-Based Medicine Reminder System for Chronic Patients",
      description: "IoT-enabled device to remind patients to take medicines on time, track adherence, and sync data with mobile apps.",
      category: "iot",
      difficulty: "Beginner",
      image: medicineReminderImg,
      tags: ["IoT", "NodeMCU", "RFID", "Blynk", "Cloud"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Automated medicine dispensing reminders",
        "RFID-based medicine identification",
        "Mobile app synchronization",
        "Missed dose tracking and alerts",
        "Multiple medication scheduling",
        "Caregiver notifications",
        "Adherence reporting and analytics",
        "Emergency contact integration"
      ],
      specifications: {
        "Microcontroller": "NodeMCU ESP8266",
        "RFID Module": "RC522 13.56MHz",
        "Display": "16x2 LCD with I2C",
        "Connectivity": "WiFi, Blynk IoT platform",
        "Storage": "EEPROM for schedule data",
        "Alerts": "Buzzer, LED, Mobile notifications",
        "Power": "5V USB power with backup"
      },
      longDescription: "A comprehensive medication management system designed for chronic patients who need to maintain strict medication schedules. The system uses RFID technology to identify medicines and provides multiple reminder mechanisms to ensure medication adherence."
    },
    {
      id: 3,
      title: "AI-Powered Predictive Maintenance for Industrial Equipment",
      description: "AI-driven predictive maintenance using sensor data and machine learning to reduce unplanned downtime.",
      category: "ai",
      difficulty: "Advanced",
      image: predictiveMaintenanceImg,
      tags: ["AI", "Machine Learning", "IoT", "Python", "TensorFlow", "Dashboard"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Machine learning-based failure prediction",
        "Multi-sensor data fusion and analysis",
        "Real-time equipment health monitoring",
        "Predictive analytics dashboard",
        "Maintenance scheduling optimization",
        "Cost reduction through early detection",
        "Historical data trend analysis",
        "Integration with existing SCADA systems"
      ],
      specifications: {
        "Controller": "Raspberry Pi 4B",
        "Sensors": "Vibration, Temperature, Pressure",
        "AI Framework": "TensorFlow Lite, Python",
        "Communication": "Modbus, Ethernet, WiFi",
        "Storage": "64GB SD card + Cloud backup",
        "Display": "Web-based dashboard",
        "Power": "Industrial 24V DC supply"
      },
      longDescription: "An intelligent predictive maintenance solution that uses machine learning algorithms to analyze sensor data from industrial equipment. The system predicts potential failures before they occur, enabling proactive maintenance and reducing costly unplanned downtime."
    },
    {
      id: 4,
      title: "Vision-Based Fall Detection for Elderly Home Safety",
      description: "Deep learning-based fall detection system using camera feeds, real-time alerts to caregivers, and cloud integration.",
      category: "ai",
      difficulty: "Advanced",
      image: fallDetectionImg,
      tags: ["AI", "Deep Learning", "YOLOv8", "OpenCV", "AWS IoT"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Real-time fall detection using computer vision",
        "YOLOv8-based human pose estimation",
        "Immediate caregiver alerts and notifications",
        "Privacy-preserving edge computing",
        "False alarm reduction algorithms",
        "Multiple camera zone monitoring",
        "Cloud data backup and analytics",
        "Emergency service integration"
      ],
      specifications: {
        "Processor": "Raspberry Pi 4B with AI accelerator",
        "Camera": "1080p USB camera with wide angle",
        "AI Model": "YOLOv8 optimized for edge",
        "Connectivity": "WiFi, 4G backup, AWS IoT",
        "Storage": "32GB SD + Cloud storage",
        "Alerts": "SMS, Email, Mobile app push",
        "Power": "12V adapter with UPS backup"
      },
      longDescription: "A sophisticated fall detection system that uses advanced computer vision and deep learning to monitor elderly individuals in their homes. The system provides immediate alerts to caregivers while maintaining privacy through edge processing and secure data handling."
    },
    {
      id: 5,
      title: "Smart Doorbell with Facial Recognition",
      description: "Raspberry Pi-based facial recognition doorbell that identifies visitors and alerts homeowners in real time.",
      category: "embedded",
      difficulty: "Intermediate",
      image: smartDoorbellImg,
      tags: ["Raspberry Pi", "OpenCV", "Facial Recognition", "IoT", "Firebase"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Real-time facial recognition and identification",
        "Visitor database with known/unknown classification",
        "Live video streaming to mobile app",
        "Motion detection and recording",
        "Two-way audio communication",
        "Night vision capability",
        "Cloud storage for visitor logs",
        "Integration with smart home systems"
      ],
      specifications: {
        "Controller": "Raspberry Pi 4B",
        "Camera": "Pi Camera v2 with IR LEDs",
        "Audio": "USB microphone and speaker",
        "Recognition": "OpenCV with dlib library",
        "Storage": "Firebase cloud database",
        "Connectivity": "WiFi 802.11ac",
        "Power": "12V DC with doorbell transformer"
      },
      longDescription: "An intelligent doorbell system that combines facial recognition technology with smart home integration. The system can identify known visitors, alert homeowners of strangers, and provide secure two-way communication, all while maintaining a comprehensive visitor log."
    },
    {
      id: 6,
      title: "Embedded Air Purifier Controller for Allergy Sufferers",
      description: "Embedded system to monitor indoor air quality and control purification using smart sensors and automation.",
      category: "embedded",
      difficulty: "Intermediate",
      image: airPurifierImg,
      tags: ["STM32", "PM2.5 Sensor", "IoT", "PID Control", "Wi-Fi"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Real-time air quality monitoring (PM2.5, PM10)",
        "Automatic purifier speed control",
        "Multi-zone air quality mapping",
        "Allergen-specific detection algorithms",
        "Smart scheduling and automation",
        "Mobile app control and monitoring",
        "Air quality history and trends",
        "Integration with HVAC systems"
      ],
      specifications: {
        "Microcontroller": "STM32F401 ARM Cortex-M4",
        "Sensors": "PM2.5/PM10, VOC, CO2, Humidity",
        "Control": "PWM motor control, Relay switches",
        "Display": "TFT LCD 3.5 inch touchscreen",
        "Connectivity": "ESP32 WiFi co-processor",
        "Power": "24V DC industrial supply",
        "Enclosure": "IP54 rated ABS housing"
      },
      longDescription: "A sophisticated air purification control system designed specifically for allergy sufferers. The system continuously monitors multiple air quality parameters and automatically adjusts purification settings to maintain optimal indoor air quality while providing detailed analytics and remote control capabilities."
    },
    {
      id: 7,
      title: "Autonomous Delivery Robot for Last-Mile Food Delivery",
      description: "Robot for short-range autonomous food delivery using GPS navigation, obstacle avoidance, and IoT connectivity.",
      category: "robotics",
      difficulty: "Advanced",
      image: deliveryRobotImg,
      tags: ["Robotics", "ROS", "GPS", "IoT", "Raspberry Pi"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Autonomous GPS-based navigation",
        "Real-time obstacle detection and avoidance",
        "Secure food compartment with locking mechanism",
        "Live tracking and delivery updates",
        "Weather-resistant design",
        "Anti-theft security features",
        "Route optimization algorithms",
        "Customer notification system"
      ],
      specifications: {
        "Controller": "Raspberry Pi 4B + Arduino Mega",
        "Navigation": "GPS module + IMU sensors",
        "Sensors": "LiDAR, Ultrasonic, Camera",
        "Motors": "4x DC geared motors with encoders",
        "Communication": "4G LTE + WiFi",
        "Power": "Li-ion battery pack 24V 20Ah",
        "Payload": "5kg capacity insulated compartment"
      },
      longDescription: "An autonomous delivery robot designed for last-mile food delivery services. The robot uses advanced navigation and obstacle avoidance systems to safely deliver food orders while providing real-time tracking and secure delivery confirmation to customers and restaurants."
    },
    {
      id: 8,
      title: "Robotic Window Cleaner for High-Rise Buildings",
      description: "Autonomous robotic cleaner with suction and navigation sensors for safe and efficient high-rise window cleaning.",
      category: "robotics",
      difficulty: "Intermediate",
      image: windowCleanerImg,
      tags: ["Arduino", "Sensors", "Robotics", "Automation"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Powerful suction cup adhesion system",
        "Automated cleaning path planning",
        "Edge detection and safety mechanisms",
        "Remote monitoring and control",
        "Weather condition adaptation",
        "Multiple cleaning modes",
        "Battery level monitoring",
        "Emergency stop and retrieval system"
      ],
      specifications: {
        "Controller": "Arduino Mega 2560 R3",
        "Suction": "12V vacuum pump with pressure sensor",
        "Motors": "Stepper motors for precise movement",
        "Sensors": "Proximity, Edge detection, IMU",
        "Cleaning": "Microfiber pads with spray system",
        "Power": "Li-Po battery 14.8V 5000mAh",
        "Safety": "Tether cable with emergency brake"
      },
      longDescription: "A specialized robotic window cleaning system designed for high-rise buildings and difficult-to-reach windows. The robot uses advanced suction technology and intelligent navigation to provide thorough cleaning while maintaining safety through multiple redundant systems."
    },
    {
      id: 9,
      title: "Smart Parking Space Detection Using Deep Learning",
      description: "Vision-based system using CCTV and deep learning to detect available parking spots in real time.",
      category: "iot",
      difficulty: "Advanced",
      image: smartParkingImg,
      tags: ["YOLOv8", "Deep Learning", "OpenCV", "AWS", "IoT"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Real-time parking space occupancy detection",
        "Deep learning-based vehicle recognition",
        "Dynamic parking lot mapping",
        "Mobile app with available space finder",
        "Revenue optimization analytics",
        "Integration with payment systems",
        "Traffic flow analysis",
        "Violation detection and alerts"
      ],
      specifications: {
        "Processor": "NVIDIA Jetson Nano",
        "Cameras": "4x IP cameras 1080p",
        "AI Model": "YOLOv8 vehicle detection",
        "Storage": "128GB SSD + Cloud backup",
        "Connectivity": "Ethernet, WiFi, 4G",
        "Display": "LED display boards",
        "Power": "PoE+ switches for cameras"
      },
      longDescription: "An intelligent parking management system that uses computer vision and deep learning to monitor parking spaces in real-time. The system helps drivers find available spaces quickly while providing parking lot operators with valuable analytics and automated management capabilities."
    },
    {
      id: 10,
      title: "Embedded System for Smart Bicycle Lock",
      description: "IoT-enabled smart lock with GPS tracking, BLE connectivity, and theft-prevention alerts for bicycles.",
      category: "iot",
      difficulty: "Intermediate",
      image: smartBicycleLockImg,
      tags: ["ESP32", "GPS", "BLE", "MQTT", "IoT"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Bluetooth Low Energy smartphone unlocking",
        "Real-time GPS tracking and location alerts",
        "Theft detection with motion sensors",
        "Weather-resistant construction",
        "Long-lasting battery with solar charging",
        "Geofencing and movement alerts",
        "Sharing and access control features",
        "Emergency unlock mechanisms"
      ],
      specifications: {
        "Controller": "ESP32-S3 with BLE/WiFi",
        "GPS": "u-blox NEO-8M module",
        "Sensors": "Accelerometer, Gyroscope",
        "Lock": "Electronic solenoid lock",
        "Power": "Li-ion 18650 + Solar panel",
        "Enclosure": "IP67 weatherproof aluminum",
        "Communication": "BLE 5.0, WiFi, MQTT"
      },
      longDescription: "A comprehensive smart bicycle lock solution that combines IoT connectivity with robust security features. The system provides keyless access through smartphone apps while offering theft protection through GPS tracking and intelligent motion detection."
    },
    {
      id: 11,
      title: "Personalized Fitness Goal Tracker Using Data Analytics",
      description: "Data-driven fitness tracker that integrates with wearables to provide personalized workout and nutrition plans.",
      category: "ai",
      difficulty: "Intermediate",
      image: fitnessTrackerImg,
      tags: ["Data Analytics", "R", "Power BI", "Wearables", "APIs"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Integration with multiple fitness wearables",
        "AI-powered personalized workout recommendations",
        "Nutrition planning based on fitness goals",
        "Progress tracking and goal adjustment",
        "Social features and challenge creation",
        "Health metric correlation analysis",
        "Predictive health insights",
        "Professional trainer consultation integration"
      ],
      specifications: {
        "Platform": "Raspberry Pi 4B + Cloud server",
        "Analytics": "R Studio, Python pandas",
        "Database": "PostgreSQL + InfluxDB",
        "APIs": "Fitbit, Garmin, Apple Health",
        "Visualization": "Power BI, Grafana",
        "Storage": "64GB SD + Cloud storage",
        "Connectivity": "WiFi, Bluetooth, REST APIs"
      },
      longDescription: "An intelligent fitness tracking system that goes beyond basic step counting to provide personalized health and fitness recommendations. The system analyzes data from multiple sources to create customized workout and nutrition plans tailored to individual goals and preferences."
    },
    {
      id: 12,
      title: "Stress-Reducing Headset Using Brainwave Entrainment",
      description: "Wearable headset that uses brainwave entrainment and sound therapy to reduce stress levels in real time.",
      category: "embedded",
      difficulty: "Advanced",
      image: stressHeadsetImg,
      tags: ["Wearable Tech", "Audio Processing", "IoT", "Microcontrollers"],
      github: "#",
      demo: "#",
      price: "₹8k+components",
      numericPrice: 8000,
      features: [
        "Real-time brainwave monitoring and analysis",
        "Personalized binaural beat generation",
        "Stress level detection and feedback",
        "Guided meditation and relaxation programs",
        "Heart rate variability integration",
        "Progress tracking and session history",
        "Noise cancellation technology",
        "Mobile app synchronization"
      ],
      specifications: {
        "Controller": "ESP32-S3 with DSP capabilities",
        "EEG Sensors": "Dry electrode EEG frontend",
        "Audio": "High-quality DAC with headphones",
        "Sensors": "Heart rate, GSR, Temperature",
        "Processing": "Real-time DSP algorithms",
        "Battery": "Li-Po 3.7V 2000mAh",
        "Connectivity": "Bluetooth 5.0, WiFi"
      },
      longDescription: "An innovative stress-reduction wearable that combines EEG monitoring with therapeutic audio technology. The headset provides personalized brainwave entrainment sessions designed to reduce stress, improve focus, and promote relaxation through scientifically-backed audio-neural feedback techniques."
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

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${project.title} project. Could you please provide more details about pricing and availability?`
    );
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Inquiry about ${project.title}`);
    const body = encodeURIComponent(
      `Hello,\n\nI'm interested in the ${project.title} project.\n\nCould you please provide more information about:\n- Pricing and packages\n- Customization options\n- Delivery timeline\n- Technical support\n\nThank you!`
    );
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message from form data
    const message = `*New Project Inquiry*
  
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Project Interest: ${formData.projectInterest}

Message:
${formData.message}

---
*Sent via Hardware Projects Website Contact Form*`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert('Redirecting to WhatsApp with your message!');
    
    // Close modal and reset form
    setShowContactModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      projectInterest: project.title
    });
  };

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

            <div className={styles.contactCard}>
              <div className={styles.priceSection}>
                <span className={styles.price}>{project.price}</span>
                <span className={styles.priceNote}>Complete Kit</span>
              </div>
              
              <div className={styles.contactSection}>
                <h4 className={styles.contactTitle}>Get in Touch</h4>
                
                <button 
                  className={styles.whatsappBtn}
                  onClick={handleWhatsAppClick}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                  </svg>
                  Message on WhatsApp
                </button>

                <button 
                  className={styles.emailBtn}
                  onClick={handleEmailClick}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email for Inquiry
                </button>

                <button 
                  className={styles.contactFormBtn}
                  onClick={() => setShowContactModal(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Contact Form
                </button>

                <div className={styles.contactInfo}>
                  <div className={styles.contactDetail}>
                    <span className={styles.contactLabel}>📱 WhatsApp:</span>
                    <span className={styles.contactValue}>{contactInfo.whatsapp}</span>
                  </div>
                  <div className={styles.contactDetail}>
                    <span className={styles.contactLabel}>📧 Email:</span>
                    <span className={styles.contactValue}>{contactInfo.email}</span>
                  </div>
                  <div className={styles.contactDetail}>
                    <span className={styles.contactLabel}>⏱️ Response Time:</span>
                    <span className={styles.contactValue}>{contactInfo.responseTime}</span>
                  </div>
                  <div className={styles.supportNote}>
                    💬 Free consultation & technical support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactModal && (
        <div className={styles.modalOverlay} onClick={() => setShowContactModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Contact Us</h3>
              <button 
                className={styles.modalClose}
                onClick={() => setShowContactModal(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="projectInterest">Project Interest</label>
                <input
                  type="text"
                  id="projectInterest"
                  name="projectInterest"
                  value={project.title}
                  readOnly
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Please describe your requirements, timeline, and any specific questions you have..."
                  required
                />
              </div>
              
              <div className={styles.formActions}>
                <button type="button" onClick={() => setShowContactModal(false)} className={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;