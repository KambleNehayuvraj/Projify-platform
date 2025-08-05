import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Aboutus.module.css';

const AboutUs = () => {
  const navigate = useNavigate();
  
    const handleRequestProject = () => {
      navigate('/request-project');
    };
  const values = [
    {
      icon: "🎯",
      title: "Innovation First",
      description: "We believe in pushing boundaries and creating solutions that don't just meet expectations—they exceed them."
    },
    {
      icon: "🤝",
      title: "Client Partnership",
      description: "Your success is our success. We work as an extension of your team, not just a service provider."
    },
    {
      icon: "⚡",
      title: "Agile Excellence",
      description: "Fast iterations, quick delivery, and continuous improvement drive everything we do."
    },
    {
      icon: "🔧",
      title: "Quality Craftsmanship",
      description: "Every line of code, every circuit design, and every solution is crafted with precision and care."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Beginning",
      description: "Two passionate developers with a shared vision to bridge the gap between innovative ideas and practical solutions."
    },
    {
      year: "2024",
      title: "First Projects",
      description: "Successfully delivered our first custom hardware and software solutions, building trust with early clients."
    },
    {
      year: "2024",
      title: "Growing Impact",
      description: "Expanded our expertise across multiple technologies and started building a reputation for reliable, innovative solutions."
    },
    {
      year: "2025",
      title: "Future Ready",
      description: "Continuously evolving our skills and technologies to stay ahead of industry trends and client needs."
    }
  ];

  const stats = [
    { number: "20+", label: "Projects Completed" },
    { number: "15+", label: "Happy Clients" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className={styles.aboutUs}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              About <span className={styles.highlight}>Us</span>
            </h1>
            <p className={styles.heroDescription}>
              We're a dynamic duo of developers passionate about turning innovative ideas into reality. 
              Our mission is to provide cutting-edge hardware and software solutions that drive your success.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <p className={styles.storyParagraph}>
                Born from a shared passion for technology and innovation, our journey began with a simple belief: 
                that every great idea deserves exceptional execution. We are two dedicated developers who 
                recognized the growing need for personalized, high-quality tech solutions in today's rapidly 
                evolving digital landscape.
              </p>
              <p className={styles.storyParagraph}>
                What started as late-night coding sessions and brainstorming over coffee has evolved into a 
                trusted partnership with clients who value innovation, reliability, and personalized service. 
                We've built our reputation on delivering solutions that not only meet technical requirements 
                but also drive real business value.
              </p>
              <p className={styles.storyParagraph}>
                Our lean structure allows us to be agile, responsive, and deeply involved in every project. 
                When you work with us, you're not just getting a service provider—you're gaining partners 
                who are genuinely invested in your success.
              </p>
            </div>
            <div className={styles.storyImage}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.placeholderContent}>
                  <span className={styles.placeholderIcon}>🚀</span>
                  <p>Innovation in Action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Values</h2>
            <p className={styles.sectionSubtitle}>
              The principles that guide everything we do
            </p>
          </div>
          
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Journey</h2>
            <p className={styles.sectionSubtitle}>
              Key milestones in our growth story
            </p>
          </div>
          
          <div className={styles.timeline}>
            {milestones.map((milestone, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineMarker}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineYear}>{milestone.year}</div>
                  <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                  <p className={styles.timelineDescription}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Meet the Team</h2>
            <p className={styles.sectionSubtitle}>
              The minds behind your next great project
            </p>
          </div>
          
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                <div className={styles.avatarPlaceholder}>
                  <span className={styles.avatarIcon}>👨‍💻</span>
                </div>
              </div>
              <h3 className={styles.teamName}>Co-Founder & Lead Developer</h3>
              <p className={styles.teamRole}>Full-Stack Development & Hardware Integration</p>
              <p className={styles.teamDescription}>
                Specializes in creating seamless connections between hardware and software, 
                with expertise in embedded systems and modern web technologies.
              </p>
              <div className={styles.teamSkills}>
                <span className={styles.skillTag}>React</span>
                <span className={styles.skillTag}>Node.js</span>
                <span className={styles.skillTag}>Arduino</span>
                <span className={styles.skillTag}>IoT</span>
              </div>
            </div>
            
            <div className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                <div className={styles.avatarPlaceholder}>
                  <span className={styles.avatarIcon}>👨‍💻</span>
                </div>
              </div>
              <h3 className={styles.teamName}>Co-Founder & Technical Architect</h3>
              <p className={styles.teamRole}>System Architecture & Backend Development</p>
              <p className={styles.teamDescription}>
                Focuses on building scalable, secure, and efficient systems that form the 
                backbone of our solutions, ensuring reliability and performance.
              </p>
              <div className={styles.teamSkills}>
                <span className={styles.skillTag}>Python</span>
                <span className={styles.skillTag}>Database Design</span>
                <span className={styles.skillTag}>Cloud Services</span>
                <span className={styles.skillTag}>Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.missionContent}>
            <div className={styles.missionText}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionDescription}>
                To democratize access to innovative technology solutions by providing personalized, 
                high-quality hardware and software development services that empower businesses and 
                individuals to achieve their goals.
              </p>
              <p className={styles.missionDescription}>
                We believe that great technology should be accessible, reliable, and tailored to 
                your unique needs. Our commitment is to bridge the gap between complex technical 
                possibilities and practical, user-friendly solutions.
              </p>
            </div>
            <div className={styles.missionVisual}>
              <div className={styles.missionIcons}>
                <div className={styles.missionIcon}>💡</div>
                <div className={styles.missionIcon}>🔧</div>
                <div className={styles.missionIcon}>🚀</div>
                <div className={styles.missionIcon}>🎯</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Work Together?</h2>
            <p className={styles.ctaDescription}>
              Let's discuss how we can bring your ideas to life with innovative technology solutions.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.btnPrimary} onClick={handleRequestProject}>Start Your Project</button>
              <button className={styles.btnSecondary}>Get In Touch</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;