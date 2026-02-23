import React from 'react';
import ProgressBar from './ProgressBar';
import './course-components.css';

const CourseCard = ({ course, onClick }) => {
  const getStatusColor = (status) => {
    return status === 'active' ? '#10b981' : '#8b5cf6';
  };

  const getStatusText = (status) => {
    return status === 'active' ? 'In Progress' : 'Completed';
  };

  const getDeadlineStatus = (deadline) => {
    if (!deadline) return null;
    
    const today = new Date();
    const dueDate = new Date(deadline);
    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'overdue';
    if (daysLeft <= 3) return 'urgent';
    if (daysLeft <= 7) return 'upcoming';
    return 'normal';
  };

  const deadlineStatus = getDeadlineStatus(course.nextDeadline);

  return (
    <div className="course-card" onClick={onClick}>
      <div className="card-image">
        <img src={course.thumbnail} alt={course.name} />
        <div className="image-overlay">
          <span className="course-code">{course.code}</span>
          {course.grade && (
            <span className="course-grade">Grade: {course.grade}</span>
          )}
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="course-title">{course.name}</h3>
          <div 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(course.status) + '20', color: getStatusColor(course.status) }}
          >
            {getStatusText(course.status)}
          </div>
        </div>

        <div className="instructor-info">
          <img 
            src={course.facultyAvatar || 'https://i.pravatar.cc/150?img=default'} 
            alt={course.faculty}
            className="instructor-avatar"
          />
          <span className="instructor-name">{course.faculty}</span>
        </div>

        <div className="course-meta">
          <div className="meta-item">
            <span className="meta-icon">📚</span>
            <span>{course.credits} Credits</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <span>{course.semester}</span>
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-header">
            <span className="progress-label">Course Progress</span>
            <span className="progress-value">{course.progress}%</span>
          </div>
          <ProgressBar 
            progress={course.progress} 
            color="#667eea"
            height="8px"
          />
        </div>

        <div className="course-stats">
          <div className="stat">
            <span className="stat-number">{course.completedContents}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">{course.totalContents}</span>
            <span className="stat-label">Total Items</span>
          </div>
        </div>

        {course.nextDeadline && (
          <div className={`deadline-badge ${deadlineStatus}`}>
            <span className="deadline-icon">⏰</span>
            <div className="deadline-info">
              <span className="deadline-label">Next Deadline</span>
              <span className="deadline-date">
                {new Date(course.nextDeadline).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;