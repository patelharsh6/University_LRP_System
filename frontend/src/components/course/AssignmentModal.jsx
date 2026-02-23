import React, { useState } from 'react';
import './course-components.css';

const AssignmentModal = ({ assignment, onClose, onSubmit }) => {
  const [submission, setSubmission] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    if (!submission.trim() && files.length === 0) {
      alert('Please add a submission or upload files');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        text: submission,
        files: files
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Submit Assignment</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="assignment-info">
            <h3>{assignment.title}</h3>
            
            <div className="info-row">
              <span className="info-icon">📅</span>
              <span>Due: {formatDate(assignment.dueDate)}</span>
            </div>
            
            <div className="info-row">
              <span className="info-icon">⭐</span>
              <span>Maximum Score: {assignment.maxScore} points</span>
            </div>

            {assignment.attachments && assignment.attachments.length > 0 && (
              <div className="attachments-section">
                <h4>Assignment Attachments</h4>
                <div className="attachments-list">
                  {assignment.attachments.map((file, index) => (
                    <a key={index} href="#" className="attachment-item">
                      <span>📎</span>
                      {file}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="submission-area">
            <h4>Your Submission</h4>
            
            <textarea
              className="submission-textarea"
              placeholder="Enter your submission text here..."
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              rows={6}
            />

            <div className="file-upload">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="upload-label">
                <span className="upload-icon">📎</span>
                <span>Click to upload files or drag and drop</span>
                <span className="file-hint">Supported: PDF, DOC, ZIP (Max 50MB)</span>
              </label>
            </div>

            {files.length > 0 && (
              <div className="selected-files">
                <h5>Selected files:</h5>
                {files.map((file, index) => (
                  <div key={index} className="selected-file">
                    <span>📄 {file.name}</span>
                    <span className="file-size">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;