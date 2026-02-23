import React, { useState, useEffect } from 'react';
import ChapterSidebar from './ChapterSidebar';
import ContentItem from './ContentItem';
import ContentPlayer from './ContentPlayer';
import AssignmentModal from './AssignmentModal';
import Announcements from './Announcements';
import ProgressBar from './ProgressBar';
import './course-components.css';

const CourseDetails = ({ courseId, studentId, onBack, api }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId, studentId, api]);

  useEffect(() => {
    if (course && course.chapters && course.chapters.length > 0) {
      setActiveChapter(course.chapters[0].id);
    }
  }, [course]);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getCourseDetails(courseId, studentId);
      if (response.success) {
        setCourse(response.data);
      } else {
        setError('Failed to fetch course details');
      }
    } catch (err) {
      setError('Error loading course details');
      console.error('Error fetching course details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
    
    if (content.type === 'assignment' && !content.submitted) {
      setCurrentAssignment(content);
      setShowAssignmentModal(true);
    }
  };

  const handleAssignmentSubmit = async (submissionData) => {
    try {
      console.log('Submitting assignment:', submissionData);
      
      setCourse(prevCourse => {
        const updatedCourse = { ...prevCourse };
        updatedCourse.chapters = updatedCourse.chapters.map(chapter => ({
          ...chapter,
          content: chapter.content.map(c => 
            c.id === currentAssignment.id 
              ? { ...c, submitted: true, submissionDate: new Date() }
              : c
          )
        }));
        return updatedCourse;
      });

      setShowAssignmentModal(false);
      setCurrentAssignment(null);
    } catch (err) {
      console.error('Error submitting assignment:', err);
    }
  };

  const calculateOverallProgress = () => {
    if (!course || !course.chapters) return 0;
    
    let total = 0;
    let completed = 0;
    
    course.chapters.forEach(chapter => {
      chapter.content.forEach(content => {
        total++;
        if (content.completed || content.submitted || content.graded) {
          completed++;
        }
      });
    });
    
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="course-details-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-details-container">
        <div className="error-container">
          <div className="error-icon">😕</div>
          <div className="error-message">{error || 'Course not found'}</div>
          <button className="back-btn" onClick={onBack}>
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();

  return (
    <div className="course-details-container">
      {/* Sticky Header */}
      <div className="details-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <div className="course-breadcrumb">
            <span>Courses</span> / <span className="current">{course.code}</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="header-progress">
            <span className="progress-label">Overall Progress</span>
            <span className="progress-value">{overallProgress}%</span>
          </div>
          <ProgressBar progress={overallProgress} color="#667eea" height="6px" width="150px" />
        </div>
      </div>

      {/* Course Hero Section */}
      <div className="course-hero">
        <div className="hero-content">
          <h1 className="course-title">{course.name}</h1>
          <p className="course-description">{course.description}</p>
          
          <div className="instructor-profile">
            <img 
              src={course.faculty.avatar} 
              alt={course.faculty.name}
              className="instructor-avatar-large"
            />
            <div className="instructor-details">
              <span className="instructor-label">Instructor</span>
              <span className="instructor-name">{course.faculty.name}</span>
              <span className="instructor-title">{course.faculty.title}</span>
            </div>
          </div>

          <div className="course-quick-info">
            <div className="info-chip">
              <span className="chip-icon">📊</span>
              <span>{course.credits} Credits</span>
            </div>
            <div className="info-chip">
              <span className="chip-icon">📅</span>
              <span>{course.semester}</span>
            </div>
            <div className="info-chip">
              <span className="chip-icon">👥</span>
              <span>{course.stats.studentsEnrolled} Students</span>
            </div>
            <div className="info-chip">
              <span className="chip-icon">⏱️</span>
              <span>{course.stats.workload}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          📚 Course Content
        </button>
        <button 
          className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          📎 Resources
        </button>
        <button 
          className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('announcements')}
        >
          📢 Announcements
          {course.announcements?.length > 0 && (
            <span className="notification-badge">{course.announcements.length}</span>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'content' && (
        <div className="content-layout">
          <ChapterSidebar
            chapters={course.chapters}
            activeChapter={activeChapter}
            onChapterClick={setActiveChapter}
          />

          <div className="content-main">
            {activeChapter && (
              <>
                <div className="chapter-header">
                  <h2>{course.chapters.find(c => c.id === activeChapter)?.title}</h2>
                  <span className="chapter-duration">
                    {course.chapters.find(c => c.id === activeChapter)?.duration}
                  </span>
                </div>

                <div className="content-items-list">
                  {course.chapters
                    .find(c => c.id === activeChapter)
                    ?.content.map((item) => (
                      <ContentItem
                        key={item.id}
                        content={item}
                        isSelected={selectedContent?.id === item.id}
                        onClick={() => handleContentClick(item)}
                      />
                    ))}
                </div>

                {selectedContent && (
                  <ContentPlayer
                    content={selectedContent}
                    onClose={() => setSelectedContent(null)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === 'resources' && (
        <div className="resources-tab">
          <h3>Course Resources</h3>
          <div className="resources-grid">
            {course.resources?.map(resource => (
              <div key={resource.id} className="resource-card">
                <div className="resource-icon">
                  {resource.type === 'book' ? '📚' : '📎'}
                </div>
                <div className="resource-details">
                  <h4>{resource.title}</h4>
                  <p>{resource.author || `${resource.pages} pages`}</p>
                </div>
                <button className="download-btn">Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'announcements' && (
        <Announcements announcements={course.announcements} />
      )}

      {/* Assignment Modal */}
      {showAssignmentModal && currentAssignment && (
        <AssignmentModal
          assignment={currentAssignment}
          onClose={() => {
            setShowAssignmentModal(false);
            setCurrentAssignment(null);
          }}
          onSubmit={handleAssignmentSubmit}
        />
      )}
    </div>
  );
};

export default CourseDetails;