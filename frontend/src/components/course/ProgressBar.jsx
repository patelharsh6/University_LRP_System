import React from 'react';
import './course-components.css';

const ProgressBar = ({ progress, color = '#667eea', height = '8px', width = '100%' }) => {
  return (
    <div 
      className="progress-bar-container" 
      style={{ height, width }}
    >
      <div 
        className="progress-bar-fill"
        style={{ 
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${color}, ${color}dd)`
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;