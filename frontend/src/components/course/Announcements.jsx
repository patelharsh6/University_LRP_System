import React from 'react';
import './course-components.css';

const Announcements = ({ announcements }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="announcements-tab">
      <h3>Course Announcements</h3>
      
      {announcements.length === 0 ? (
        <div className="no-announcements">
          <p>No announcements yet</p>
        </div>
      ) : (
        <div className="announcements-list">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`announcement-card ${announcement.important ? 'important' : ''}`}
            >
              <div className="announcement-header">
                <h4>{announcement.title}</h4>
                {announcement.important && (
                  <span className="important-badge">Important</span>
                )}
                <span className="announcement-date">
                  {formatDate(announcement.date)}
                </span>
              </div>
              
              <p className="announcement-content">{announcement.content}</p>
              
              <div className="announcement-footer">
                <span className="posted-by">
                  Posted by: {announcement.postedBy}
                </span>
                
                {announcement.attachments && announcement.attachments.length > 0 && (
                  <a href="#" className="attachment-link">
                    <span>📎</span>
                    {announcement.attachments.length} attachment(s)
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;