import React, { useState } from 'react';
import './RequestProject.css';

const RequestProject = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    projectTitle: '',
    description: '',
    features: '',
    preferredTech: '',
    deadline: '',
    budget: '',
    file: null,
    additionalServices: {
      documentation: false,
      presentation: false,
      codeExplanation: false,
      videDemo: false,
      onlineSupport: false
    }
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (service) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: {
        ...prev.additionalServices,
        [service]: !prev.additionalServices[service]
      }
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          projectType: '',
          projectTitle: '',
          description: '',
          features: '',
          preferredTech: '',
          deadline: '',
          budget: '',
          file: null,
          additionalServices: {
            documentation: false,
            presentation: false,
            codeExplanation: false,
            videDemo: false,
            onlineSupport: false
          }
        });
      }, 3000);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="request-project-page">
        <div className="success-message">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2>Request Submitted Successfully!</h2>
          <p>Thanks! We'll get back to you shortly with a detailed proposal.</p>
          <div className="success-animation"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="request-project-page">
      <div className="request-container">
        {/* Header Section */}
        <div className="request-header">
          <h1 className="request-title">
            Request a <span className="highlight">Custom Project</span>
          </h1>
          <p className="request-subtitle">
            Tell us your idea or requirement and our team will build a tailored software or hardware project 
            with complete documentation and support.
          </p>
        </div>

        {/* Form Section */}
        <form className="request-form" onSubmit={handleSubmit}>
          {/* Basic Contact Information */}
          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="form-section">
            <h3 className="section-title">Project Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="projectType">Project Type *</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select project type</option>
                  <option value="software">Software</option>
                  <option value="hardware">Hardware</option>
                  <option value="both">Both (Software + Hardware)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="projectTitle">Project Title / Topic *</label>
                <input
                  type="text"
                  id="projectTitle"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief title for your project"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Brief Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Describe your project requirements, goals, and expected functionality..."
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="features">Features Needed</label>
              <textarea
                id="features"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                rows="3"
                placeholder="List specific features or functionalities you need (optional)"
              ></textarea>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="preferredTech">Preferred Programming Language / Tools</label>
                <input
                  type="text"
                  id="preferredTech"
                  name="preferredTech"
                  value={formData.preferredTech}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, JavaScript, Arduino, etc."
                />
              </div>
              <div className="form-group">
                <label htmlFor="deadline">Expected Deadline</label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget Range</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="">Select budget range</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="5000-plus">$5,000+</option>
                  <option value="discuss">Let's Discuss</option>
                </select>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="form-section">
            <h3 className="section-title">Reference Documents</h3>
            <div className="file-upload-area">
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                className="file-input"
              />
              <label htmlFor="file" className="file-upload-label">
                <div className="upload-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>
                <span>Upload Reference Files</span>
                <small>PDF, DOC, Images (Max 10MB)</small>
              </label>
              {formData.file && (
                <div className="file-selected">
                  <span>Selected: {formData.file.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Services */}
          <div className="form-section">
            <h3 className="section-title">Additional Services</h3>
            <div className="checkbox-grid">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.documentation}
                  onChange={() => handleCheckboxChange('documentation')}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <strong>Full Report & Documentation</strong>
                  <small>Comprehensive project documentation with technical details</small>
                </div>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.presentation}
                  onChange={() => handleCheckboxChange('presentation')}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <strong>PPT Presentation</strong>
                  <small>Professional presentation explaining the project</small>
                </div>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.codeExplanation}
                  onChange={() => handleCheckboxChange('codeExplanation')}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <strong>Code Explanation</strong>
                  <small>Detailed explanation of code structure and logic</small>
                </div>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.videDemo}
                  onChange={() => handleCheckboxChange('videDemo')}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <strong>Video Demonstration</strong>
                  <small>Video walkthrough of the project functionality</small>
                </div>
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.additionalServices.onlineSupport}
                  onChange={() => handleCheckboxChange('onlineSupport')}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <strong>Online Support</strong>
                  <small>Post-delivery support and maintenance assistance</small>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-section">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting Request...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestProject;