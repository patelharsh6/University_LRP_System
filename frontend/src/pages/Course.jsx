import React, { useState, useEffect } from 'react';
import './Course.css';

// API service mock (replace with actual API calls)
const api = {
  getEnrolledCourses: async (studentId) => {
    // Mock API call - replace with actual backend integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockEnrolledCourses
        });
      }, 500);
    });
  },
  
  getCourseDetails: async (courseId, studentId) => {
    // Mock API call - replace with actual backend integration
    return new Promise((resolve) => {
      setTimeout(() => {
        const course = mockCourseDetails.find(c => c.id === courseId);
        resolve({
          success: true,
          data: course
        });
      }, 500);
    });
  },
  
  markContentAsViewed: async (studentId, contentId) => {
    // Mock API call - replace with actual backend integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { viewed: true }
        });
      }, 500);
    });
  },
  
  submitAssignment: async (studentId, assignmentId, submissionData) => {
    // Mock API call - replace with actual backend integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { submitted: true, submissionDate: new Date() }
        });
      }, 500);
    });
  }
};

// Mock data structures (replace with actual backend data)
const mockEnrolledCourses = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    faculty: 'Dr. Alan Turing',
    credits: 4,
    semester: 'Fall 2024',
    department: 'Computer Science',
    progress: 45,
    status: 'active',
    totalContents: 24,
    completedContents: 11,
    thumbnail: 'https://via.placeholder.com/300x200'
  },
  {
    id: 2,
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    faculty: 'Dr. Ada Lovelace',
    credits: 4,
    semester: 'Fall 2024',
    department: 'Computer Science',
    progress: 78,
    status: 'active',
    totalContents: 32,
    completedContents: 25,
    thumbnail: 'https://via.placeholder.com/300x200'
  },
  {
    id: 3,
    code: 'CS301',
    name: 'Database Management Systems',
    faculty: 'Dr. Grace Hopper',
    credits: 3,
    semester: 'Fall 2024',
    department: 'Computer Science',
    progress: 100,
    status: 'completed',
    totalContents: 28,
    completedContents: 28,
    thumbnail: 'https://via.placeholder.com/300x200'
  }
];

const mockCourseDetails = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    faculty: 'Dr. Alan Turing',
    credits: 4,
    semester: 'Fall 2024',
    department: 'Computer Science',
    description: 'An introductory course covering fundamental concepts of computer science including programming, algorithms, and computational thinking.',
    objectives: [
      'Understand basic programming concepts',
      'Learn problem-solving techniques',
      'Gain familiarity with algorithms',
      'Develop computational thinking'
    ],
    prerequisites: ['None'],
    chapters: [
      {
        id: 101,
        title: 'Chapter 1: Introduction to Computing',
        order: 1,
        content: [
          {
            id: 1001,
            title: 'What is Computer Science?',
            type: 'video',
            duration: '15:30',
            url: 'https://example.com/video1',
            viewed: true,
            completed: true
          },
          {
            id: 1002,
            title: 'History of Computing',
            type: 'pdf',
            pages: 25,
            url: 'https://example.com/pdf1',
            viewed: true,
            completed: true
          },
          {
            id: 1003,
            title: 'Assignment 1: Computer Basics',
            type: 'assignment',
            dueDate: '2024-03-15',
            maxScore: 100,
            submitted: true,
            graded: true,
            score: 85,
            feedback: 'Good work! Clear understanding of concepts.'
          }
        ]
      },
      {
        id: 102,
        title: 'Chapter 2: Programming Fundamentals',
        order: 2,
        content: [
          {
            id: 1004,
            title: 'Variables and Data Types',
            type: 'video',
            duration: '20:45',
            url: 'https://example.com/video2',
            viewed: true,
            completed: true
          },
          {
            id: 1005,
            title: 'Control Structures',
            type: 'video',
            duration: '25:15',
            url: 'https://example.com/video3',
            viewed: false,
            completed: false
          },
          {
            id: 1006,
            title: 'Programming Exercises',
            type: 'lab',
            url: 'https://example.com/lab1',
            viewed: false,
            completed: false
          }
        ]
      },
      {
        id: 103,
        title: 'Chapter 3: Algorithms',
        order: 3,
        content: [
          {
            id: 1007,
            title: 'Introduction to Algorithms',
            type: 'video',
            duration: '18:20',
            url: 'https://example.com/video4',
            viewed: false,
            completed: false
          },
          {
            id: 1008,
            title: 'Algorithm Analysis',
            type: 'pdf',
            pages: 35,
            url: 'https://example.com/pdf2',
            viewed: false,
            completed: false
          },
          {
            id: 1009,
            title: 'Assignment 2: Algorithm Implementation',
            type: 'assignment',
            dueDate: '2024-04-01',
            maxScore: 100,
            submitted: false,
            graded: false
          }
        ]
      }
    ],
    announcements: [
      {
        id: 1001,
        title: 'Mid-term Exam Schedule',
        content: 'Mid-term exam will be held on March 20th in Room 301.',
        date: '2024-03-01',
        postedBy: 'Dr. Alan Turing'
      },
      {
        id: 1002,
        title: 'Project Guidelines Released',
        content: 'Final project guidelines are now available in the resources section.',
        date: '2024-02-28',
        postedBy: 'Dr. Alan Turing'
      }
    ]
  }
];

const CourseList = ({ studentId = 1, onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEnrolledCourses();
  }, [studentId]);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const response = await api.getEnrolledCourses(studentId);
      if (response.success) {
        setCourses(response.data);
      } else {
        setError('Failed to fetch courses');
      }
    } catch (err) {
      setError('Error loading courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    // Apply status filter
    if (filter !== 'all' && course.status !== filter) return false;
    
    // Apply search filter
    if (searchTerm && !course.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !course.code.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  const getStatusBadgeClass = (status) => {
    return status === 'active' ? 'status-active' : 'status-completed';
  };

  if (loading) {
    return (
      <div className="course-list-container">
        <div className="loading-spinner">Loading your courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-list-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h1>My Courses</h1>
        <div className="course-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="no-courses">
          <p>No courses found matching your criteria.</p>
        </div>
      ) : (
        <div className="course-grid">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => onSelectCourse(course.id)}
            >
              <div className="course-card-image">
                <img src={course.thumbnail} alt={course.name} />
                <div className="course-code">{course.code}</div>
              </div>
              <div className="course-card-content">
                <h3>{course.name}</h3>
                <div className="course-meta">
                  <span className="faculty">{course.faculty}</span>
                  <span className="credits">{course.credits} credits</span>
                  <span className="semester">{course.semester}</span>
                </div>
                <div className="progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Progress</span>
                    <span className="progress-percentage">{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="course-footer">
                  <span className={`status-badge ${getStatusBadgeClass(course.status)}`}>
                    {course.status === 'active' ? 'In Progress' : 'Completed'}
                  </span>
                  <span className="content-count">
                    {course.completedContents}/{course.totalContents} items
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CourseDetails = ({ courseId, studentId = 1, onBack }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [assignmentSubmission, setAssignmentSubmission] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId, studentId]);

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

  const handleContentClick = async (content) => {
    setSelectedContent(content);
    
    // Mark as viewed if it's a video or PDF and not already viewed
    if ((content.type === 'video' || content.type === 'pdf') && !content.viewed) {
      try {
        await api.markContentAsViewed(studentId, content.id);
        // Update local state
        setCourse(prevCourse => {
          const updatedCourse = { ...prevCourse };
          updatedCourse.chapters = updatedCourse.chapters.map(chapter => ({
            ...chapter,
            content: chapter.content.map(c => 
              c.id === content.id ? { ...c, viewed: true, completed: true } : c
            )
          }));
          return updatedCourse;
        });
      } catch (err) {
        console.error('Error marking content as viewed:', err);
      }
    }

    // Handle assignment click
    if (content.type === 'assignment') {
      setCurrentAssignment(content);
      setShowAssignmentModal(true);
    }
  };

  const handleAssignmentSubmit = async () => {
    if (!assignmentSubmission.trim()) {
      alert('Please enter your submission');
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.submitAssignment(studentId, currentAssignment.id, {
        submission: assignmentSubmission
      });

      if (response.success) {
        // Update local state
        setCourse(prevCourse => {
          const updatedCourse = { ...prevCourse };
          updatedCourse.chapters = updatedCourse.chapters.map(chapter => ({
            ...chapter,
            content: chapter.content.map(c => 
              c.id === currentAssignment.id ? { ...c, submitted: true } : c
            )
          }));
          return updatedCourse;
        });

        setShowAssignmentModal(false);
        setAssignmentSubmission('');
        setCurrentAssignment(null);
        alert('Assignment submitted successfully!');
      }
    } catch (err) {
      console.error('Error submitting assignment:', err);
      alert('Failed to submit assignment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateOverallProgress = () => {
    if (!course || !course.chapters) return 0;
    
    let totalContent = 0;
    let completedContent = 0;
    
    course.chapters.forEach(chapter => {
      chapter.content.forEach(content => {
        totalContent++;
        if (content.completed || content.submitted) {
          completedContent++;
        }
      });
    });
    
    return totalContent > 0 ? Math.round((completedContent / totalContent) * 100) : 0;
  };

  const getContentIcon = (type) => {
    switch (type) {
      case 'video': return '🎥';
      case 'pdf': return '📄';
      case 'assignment': return '📝';
      case 'lab': return '🔬';
      default: return '📁';
    }
  };

  const getContentStatusIcon = (content) => {
    if (content.type === 'assignment') {
      if (content.graded) return '✅';
      if (content.submitted) return '⏳';
      return '📋';
    }
    return content.completed ? '✅' : '⭕';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="course-details-container">
        <div className="loading-spinner">Loading course details...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-details-container">
        <div className="error-message">{error || 'Course not found'}</div>
        <button className="back-btn" onClick={onBack}>Back to Courses</button>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();

  return (
    <div className="course-details-container">
      {/* Header */}
      <div className="course-details-header">
        <button className="back-btn" onClick={onBack}>← Back to Courses</button>
        <div className="course-title-section">
          <h1>{course.name}</h1>
          <div className="course-meta-info">
            <span className="course-code">{course.code}</span>
            <span className="course-faculty">{course.faculty}</span>
            <span className="course-credits">{course.credits} Credits</span>
            <span className="course-semester">{course.semester}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="course-progress-section">
          <div className="progress-header">
            <span className="progress-label">Overall Course Progress</span>
            <span className="progress-percentage">{overallProgress}%</span>
          </div>
          <div className="progress-bar large">
            <div
              className="progress-fill"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="course-main-content">
        {/* Sidebar - Chapters */}
        <div className="chapters-sidebar">
          <h3>Course Content</h3>
          <div className="chapters-list">
            {course.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`chapter-item ${activeChapter === chapter.id ? 'active' : ''}`}
                onClick={() => setActiveChapter(chapter.id)}
              >
                <div className="chapter-header">
                  <span className="chapter-title">{chapter.title}</span>
                  <span className="chapter-items-count">
                    {chapter.content.filter(c => c.completed || c.submitted).length}/{chapter.content.length}
                  </span>
                </div>
                <div className="chapter-progress">
                  <div
                    className="chapter-progress-fill"
                    style={{
                      width: `${(chapter.content.filter(c => c.completed || c.submitted).length / chapter.content.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Panel - Content */}
        <div className="content-main-panel">
          {activeChapter && (
            <div className="chapter-content">
              <h2>{course.chapters.find(c => c.id === activeChapter)?.title}</h2>
              
              <div className="content-items">
                {course.chapters
                  .find(c => c.id === activeChapter)
                  ?.content.map((item) => (
                    <div
                      key={item.id}
                      className={`content-item ${selectedContent?.id === item.id ? 'selected' : ''}`}
                      onClick={() => handleContentClick(item)}
                    >
                      <div className="content-item-icon">
                        {getContentIcon(item.type)}
                      </div>
                      <div className="content-item-details">
                        <h4>{item.title}</h4>
                        <div className="content-meta">
                          <span className="content-type">{item.type}</span>
                          {item.type === 'video' && (
                            <span className="content-duration">{item.duration}</span>
                          )}
                          {item.type === 'pdf' && (
                            <span className="content-pages">{item.pages} pages</span>
                          )}
                          {item.type === 'assignment' && item.dueDate && (
                            <span className="due-date">Due: {formatDate(item.dueDate)}</span>
                          )}
                        </div>
                      </div>
                      <div className="content-status">
                        <span className="status-icon">
                          {getContentStatusIcon(item)}
                        </span>
                        {item.type === 'assignment' && item.graded && (
                          <span className="assignment-score">{item.score}/{item.maxScore}</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Selected Content Display */}
              {selectedContent && (
                <div className="content-display-area">
                  <h3>{selectedContent.title}</h3>
                  
                  {selectedContent.type === 'video' && (
                    <div className="video-player">
                      <div className="video-placeholder">
                        Video Player - {selectedContent.duration}
                      </div>
                    </div>
                  )}
                  
                  {selectedContent.type === 'pdf' && (
                    <div className="pdf-viewer">
                      <div className="pdf-placeholder">
                        PDF Viewer - {selectedContent.pages} pages
                      </div>
                    </div>
                  )}
                  
                  {selectedContent.type === 'assignment' && (
                    <div className="assignment-details">
                      <div className="assignment-header">
                        <h4>Assignment Details</h4>
                        <span className="due-date">Due: {formatDate(selectedContent.dueDate)}</span>
                      </div>
                      <div className="assignment-body">
                        <p>Maximum Score: {selectedContent.maxScore}</p>
                        {selectedContent.submitted ? (
                          <div className="submission-status">
                            {selectedContent.graded ? (
                              <div className="grade-info">
                                <p>Score: {selectedContent.score}/{selectedContent.maxScore}</p>
                                <p>Feedback: {selectedContent.feedback}</p>
                              </div>
                            ) : (
                              <p>Assignment submitted. Awaiting grading.</p>
                            )}
                          </div>
                        ) : (
                          <button
                            className="submit-assignment-btn"
                            onClick={() => {
                              setCurrentAssignment(selectedContent);
                              setShowAssignmentModal(true);
                            }}
                          >
                            Submit Assignment
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Announcements Section */}
          {course.announcements && course.announcements.length > 0 && (
            <div className="announcements-section">
              <h3>Announcements</h3>
              <div className="announcements-list">
                {course.announcements.map((announcement) => (
                  <div key={announcement.id} className="announcement-item">
                    <div className="announcement-header">
                      <h4>{announcement.title}</h4>
                      <span className="announcement-date">{formatDate(announcement.date)}</span>
                    </div>
                    <p>{announcement.content}</p>
                    <span className="posted-by">Posted by: {announcement.postedBy}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assignment Submission Modal */}
      {showAssignmentModal && currentAssignment && (
        <div className="modal-overlay" onClick={() => setShowAssignmentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Assignment</h2>
              <button className="close-btn" onClick={() => setShowAssignmentModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <h3>{currentAssignment.title}</h3>
              <p>Due Date: {formatDate(currentAssignment.dueDate)}</p>
              <textarea
                placeholder="Enter your submission here..."
                value={assignmentSubmission}
                onChange={(e) => setAssignmentSubmission(e.target.value)}
                rows={10}
              />
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowAssignmentModal(false)}
              >
                Cancel
              </button>
              <button
                className="submit-btn"
                onClick={handleAssignmentSubmit}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Course Component
const Course = () => {
  const [view, setView] = useState('list'); // 'list' or 'details'
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setView('details');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedCourseId(null);
  };

  return (
    <div className="course-module">
      {view === 'list' ? (
        <CourseList onSelectCourse={handleSelectCourse} />
      ) : (
        <CourseDetails
          courseId={selectedCourseId}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default Course;