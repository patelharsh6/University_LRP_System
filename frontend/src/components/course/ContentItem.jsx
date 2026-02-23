import React from 'react';
import './course-components.css';

const ContentItem = ({ content, isSelected, onClick }) => {
  const getContentIcon = (type) => {
    const icons = {
      video: '🎥',
      reading: '📄',
      assignment: '📝',
      lab: '🔬',
      quiz: '📊',
      discussion: '💬'
    };
    return icons[type] || '📁';
  };

  const getStatusIcon = () => {
    if (content.type === 'assignment') {
      if (content.graded) return '✅';
      if (content.submitted) return '⏳';
      return '📋';
    }
    if (content.type === 'quiz') {
      if (content.attemptsUsed > 0) return '✓';
      return '○';
    }
    return content.completed ? '✅' : '○';
  };

  const getStatusColor = () => {
    if (content.type === 'assignment') {
      if (content.graded) return '#10b981';
      if (content.submitted) return '#f59e0b';
      return '#64748b';
    }
    return content.completed ? '#10b981' : '#64748b';
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const daysLeft = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Overdue';
    if (daysLeft === 0) return 'Due today';
    if (daysLeft === 1) return 'Due tomorrow';
    return `Due in ${daysLeft} days`;
  };

  return (
    <div 
      className={`content-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="content-icon">{getContentIcon(content.type)}</span>
      
      <div className="content-details">
        <h4 className="content-title">{content.title}</h4>
        <div className="content-meta">
          <span className="content-type">{content.type}</span>
          
          {content.type === 'video' && (
            <span>⏱️ {content.duration}</span>
          )}
          
          {content.type === 'reading' && (
            <span>📖 {content.readTime}</span>
          )}
          
          {content.type === 'quiz' && (
            <span>❓ {content.questions} questions • {content.timeLimit}</span>
          )}
          
          {content.type === 'assignment' && content.dueDate && (
            <span className="due-date">⏰ {formatDueDate(content.dueDate)}</span>
          )}
        </div>
      </div>

      <div className="content-status">
        <span className="status-icon" style={{ color: getStatusColor() }}>
          {getStatusIcon()}
        </span>
        
        {content.type === 'assignment' && content.graded && (
          <span className="score-badge">{content.score}/{content.maxScore}</span>
        )}
        
        {content.type === 'quiz' && content.attemptsUsed > 0 && (
          <span className="score-badge">{content.attemptsUsed}/{content.attempts} attempts</span>
        )}
      </div>
    </div>
  );
};

export default ContentItem;