// src/pages/Course.jsx
import React, { useState, useEffect } from 'react';
import './Course.css';
import { 
  FaFilePdf, FaVideo, FaTasks, FaCheckCircle, 
  FaRegCircle, FaChevronDown, FaChevronUp, 
  FaLock, FaDownload, FaChalkboardTeacher
} from 'react-icons/fa';

const Course = () => {
  // 1. STATE MANAGEMENT
  const [courseData, setCourseData] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState([]);

  // 2. MOCK DATA FETCHING (Simulating an API Call)
  useEffect(() => {
    // This represents the strict hierarchical JSON response from your backend
    const mockApiResponse = {
      id: "CS101",
      title: "Data Structures & Algorithms",
      faculty: "Prof. Arvind Sharma",
      credits: 4,
      semester: "Semester 6",
      status: "Active",
      chapters: [
        {
          id: 1,
          title: "Introduction to Complexity",
          items: [
            { id: 101, type: "video", title: "Time & Space Complexity", duration: "45 mins", isCompleted: true, isLocked: false },
            { id: 102, type: "pdf", title: "Big O Notation Slides", size: "2.4 MB", isCompleted: true, isLocked: false },
            { id: 103, type: "assignment", title: "Assignment 1: Asymptotic Analysis", due: "10 Feb 2026", isCompleted: true, isLocked: false, grade: "9.5/10" }
          ]
        },
        {
          id: 2,
          title: "Linear Data Structures",
          items: [
            { id: 201, type: "video", title: "Arrays & Linked Lists Deep Dive", duration: "55 mins", isCompleted: true, isLocked: false },
            { id: 202, type: "pdf", title: "Linked List Implementations", size: "1.8 MB", isCompleted: false, isLocked: false },
            { id: 203, type: "assignment", title: "Lab: Linked List Reversal", due: "20 Feb 2026", isCompleted: false, isLocked: false, grade: null }
          ]
        },
        {
          id: 3,
          title: "Trees & Graphs",
          items: [
            { id: 301, type: "video", title: "Binary Search Trees", duration: "1 hr 10 mins", isCompleted: false, isLocked: true },
            { id: 302, type: "pdf", title: "Graph Traversal Algorithms", size: "3.1 MB", isCompleted: false, isLocked: true }
          ]
        }
      ]
    };

    setCourseData(mockApiResponse);
    // Expand the first chapter by default for better UX
    setExpandedChapters([mockApiResponse.chapters[0].id]);
  }, []);

  // Show loading state while data is being fetched
  if (!courseData) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Course Data...</div>;

  // 3. DYNAMIC PROGRESS CALCULATION
  let totalItemsCount = 0;
  let completedItemsCount = 0;
  let totalAssignments = 0;
  let completedAssignments = 0;

  courseData.chapters.forEach(chapter => {
    chapter.items.forEach(item => {
      totalItemsCount++;
      if (item.isCompleted) completedItemsCount++;
      
      if (item.type === 'assignment') {
        totalAssignments++;
        if (item.isCompleted) completedAssignments++;
      }
    });
  });

  // Prevent NaN if course is completely empty
  const progressPercentage = totalItemsCount === 0 ? 0 : Math.round((completedItemsCount / totalItemsCount) * 100);

  // 4. EVENT HANDLERS
  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId) 
        : [...prev, chapterId]
    );
  };

  // Simulating marking an item as complete
  const handleItemClick = (chapterId, itemId, isLocked, isCompleted) => {
    if (isLocked) {
      alert("This item is locked. Please complete previous modules first.");
      return;
    }
    
    if (isCompleted) return; // Do nothing if already finished

    // Update state to simulate backend success
    const updatedChapters = courseData.chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return {
          ...chapter,
          items: chapter.items.map(item => 
            item.id === itemId ? { ...item, isCompleted: true } : item
          )
        };
      }
      return chapter;
    });

    setCourseData({ ...courseData, chapters: updatedChapters });
  };

  // Helper for dynamic icons
  const getResourceIcon = (type) => {
    switch(type) {
      case 'pdf': return <FaFilePdf className="resource-icon icon-pdf" />;
      case 'video': return <FaVideo className="resource-icon icon-video" />;
      case 'assignment': return <FaTasks className="resource-icon icon-assignment" />;
      default: return <FaFilePdf className="resource-icon" />;
    }
  };

  return (
    <div className="course-container">
      
      {/* 🟦 1. COURSE HEADER */}
      <div className="course-header">
        <div className="course-title-section">
          <h1>{courseData.title}</h1>
          <div className="course-meta">
            <span className="meta-item"><strong>Code:</strong> {courseData.id}</span>
            <span className="meta-item">|</span>
            <span className="meta-item"><FaChalkboardTeacher /> {courseData.faculty}</span>
            <span className="meta-item">|</span>
            <span className="meta-item">{courseData.credits} Credits</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <span className="course-status">{courseData.status}</span>
          <button className="btn-download-syllabus">
            <FaDownload /> Syllabus PDF
          </button>
        </div>
      </div>

      {/* 🟩 2. PROGRESS OVERVIEW CARD */}
      <div className="progress-card">
        <div className="progress-stats">
          <div className="progress-percentage">{progressPercentage}%</div>
          <div className="progress-label">Course Completed</div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-track-large">
            <div className="progress-fill-large" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="progress-details">
            <span>📚 {completedItemsCount} / {totalItemsCount} Materials Viewed</span>
            <span>📝 {completedAssignments} / {totalAssignments} Assignments Submitted</span>
          </div>
        </div>
      </div>

      {/* 🟨 3. CHAPTER HIERARCHY */}
      <div className="chapter-list">
        {courseData.chapters.map((chapter, index) => {
          const isExpanded = expandedChapters.includes(chapter.id);
          const chapCompletedCount = chapter.items.filter(i => i.isCompleted).length;
          const chapTotalCount = chapter.items.length;

          return (
            <div key={chapter.id} className="chapter-card">
              
              {/* Accordion Header */}
              <div className="chapter-header" onClick={() => toggleChapter(chapter.id)}>
                <div className="chapter-title-wrapper">
                  <div className="chapter-number">{index + 1}</div>
                  <div>
                    <div className="chapter-title">{chapter.title}</div>
                    <div className="chapter-meta">{chapCompletedCount} / {chapTotalCount} items completed</div>
                  </div>
                </div>
                <div>
                  {isExpanded ? <FaChevronUp color="#94A3B8" /> : <FaChevronDown color="#94A3B8" />}
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="chapter-content">
                  {chapter.items.map((item) => (
                    <div 
                      key={item.id} 
                      className="resource-item"
                      onClick={() => handleItemClick(chapter.id, item.id, item.isLocked, item.isCompleted)}
                    >
                      
                      <div className="resource-left">
                        {getResourceIcon(item.type)}
                        <div>
                          <div className="resource-title" style={{ color: item.isLocked ? '#94A3B8' : '#334155' }}>
                            {item.title}
                          </div>
                          <div className="resource-meta">
                            {item.type === 'video' && item.duration}
                            {item.type === 'pdf' && item.size}
                            {item.type === 'assignment' && `Due: ${item.due}`}
                          </div>
                        </div>
                      </div>

                      <div className="status-indicator">
                        {/* Assignment Specific Badges */}
                        {item.type === 'assignment' && item.grade && (
                          <span className="badge-graded">Score: {item.grade}</span>
                        )}
                        {item.type === 'assignment' && !item.isCompleted && !item.isLocked && (
                          <span className="badge-due">Pending</span>
                        )}

                        {/* Completion / Lock Status */}
                        <button className="complete-btn" title={item.isCompleted ? "Completed" : "Mark as complete"}>
                          {item.isLocked ? (
                            <FaLock color="#CBD5E1" />
                          ) : item.isCompleted ? (
                            <FaCheckCircle color="#10B981" size={20} />
                          ) : (
                            <FaRegCircle color="#CBD5E1" size={20} />
                          )}
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Course;