import React from 'react';
import ProgressBar from './ProgressBar';
import './course-components.css';

const ChapterSidebar = ({ chapters, activeChapter, onChapterClick }) => {
  const calculateChapterProgress = (chapter) => {
    if (!chapter.content || chapter.content.length === 0) return 0;
    const completed = chapter.content.filter(c => c.completed || c.submitted || c.graded).length;
    return (completed / chapter.content.length) * 100;
  };

  return (
    <div className="chapters-sidebar">
      <div className="sidebar-header">
        <h3>Course Content</h3>
        <span className="chapter-count">{chapters.length} chapters</span>
      </div>
      
      <div className="chapters-list">
        {chapters.map((chapter) => {
          const progress = calculateChapterProgress(chapter);
          return (
            <div
              key={chapter.id}
              className={`chapter-item ${activeChapter === chapter.id ? 'active' : ''}`}
              onClick={() => onChapterClick(chapter.id)}
            >
              <div className="chapter-header">
                <span className="chapter-title">{chapter.title}</span>
                <span className="chapter-duration">{chapter.duration}</span>
              </div>
              <ProgressBar progress={progress} height="4px" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterSidebar;