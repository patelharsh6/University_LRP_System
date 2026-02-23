import React from 'react';
import './course-components.css';

const ContentPlayer = ({ content, onClose }) => {
  const renderPlayer = () => {
    switch (content.type) {
      case 'video':
        return (
          <div className="video-player">
            <div className="video-placeholder">
              <span className="play-icon">▶️</span>
              <p>Video Player - {content.duration}</p>
              <p className="video-url">{content.url}</p>
            </div>
            {content.transcript && (
              <div className="transcript-section">
                <h4>Transcript</h4>
                <p>{content.transcript}</p>
              </div>
            )}
          </div>
        );

      case 'reading':
        return (
          <div className="reading-viewer">
            <div className="pdf-placeholder">
              <span className="pdf-icon">📄</span>
              <p>Reading Material - {content.pages} pages</p>
              <p className="read-time">Estimated reading time: {content.readTime}</p>
            </div>
          </div>
        );

      case 'lab':
        return (
          <div className="lab-environment">
            <div className="lab-header">
              <h4>Lab Environment</h4>
              <span className="environment-badge">{content.environment}</span>
            </div>
            <div className="lab-editor">
              <div className="editor-placeholder">
                <p>Interactive code editor would appear here</p>
                <p className="time-estimate">⏱️ {content.timeEstimate}</p>
              </div>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="quiz-interface">
            <div className="quiz-header">
              <h4>Quiz: {content.title}</h4>
              <div className="quiz-info">
                <span>❓ {content.questions} questions</span>
                <span>⏱️ {content.timeLimit}</span>
                <span>🔄 {content.attempts} attempts allowed</span>
              </div>
            </div>
            <div className="quiz-placeholder">
              <p>Quiz interface would appear here</p>
              <button className="start-quiz-btn">Start Quiz</button>
            </div>
          </div>
        );

      default:
        return (
          <div className="content-placeholder">
            <p>Content type: {content.type}</p>
            <p>URL: {content.url}</p>
          </div>
        );
    }
  };

  return (
    <div className="content-player">
      <div className="player-header">
        <h3>{content.title}</h3>
        <button className="close-player" onClick={onClose}>✕</button>
      </div>
      {renderPlayer()}
    </div>
  );
};

export default ContentPlayer;