import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import CourseFilters from './CourseFilters';
import ProgressBar from './ProgressBar';
import './course-components.css';

const CourseList = ({ studentId, onSelectCourse, api }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    semester: 'all',
    sortBy: 'recent'
  });
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    completedCourses: 0,
    averageProgress: 0
  });

  useEffect(() => {
    fetchEnrolledCourses();
  }, [studentId]);

  useEffect(() => {
    applyFilters();
  }, [courses, filters]);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const response = await api.getEnrolledCourses(studentId);
      if (response.success) {
        setCourses(response.data);
        calculateStats(response.data);
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

  const calculateStats = (courseData) => {
    const total = courseData.length;
    const active = courseData.filter(c => c.status === 'active').length;
    const completed = courseData.filter(c => c.status === 'completed').length;
    const avgProgress = courseData.reduce((acc, c) => acc + c.progress, 0) / total || 0;

    setStats({
      totalCourses: total,
      activeCourses: active,
      completedCourses: completed,
      averageProgress: Math.round(avgProgress)
    });
  };

  const applyFilters = () => {
    let filtered = [...courses];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(course => 
        course.name.toLowerCase().includes(searchLower) ||
        course.code.toLowerCase().includes(searchLower) ||
        course.faculty.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(course => course.status === filters.status);
    }

    // Semester filter
    if (filters.semester !== 'all') {
      filtered = filtered.filter(course => course.semester === filters.semester);
    }

    // Sorting
    switch (filters.sortBy) {
      case 'recent':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'progress-asc':
        filtered.sort((a, b) => a.progress - b.progress);
        break;
      case 'progress-desc':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSearch = (searchTerm) => {
    handleFilterChange({ search: searchTerm });
  };

  const getUniqueSemesters = () => {
    return [...new Set(courses.map(c => c.semester))];
  };

  if (loading) {
    return (
      <div className="course-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-list-container">
        <div className="error-container">
          <div className="error-icon">😕</div>
          <div className="error-message">{error}</div>
          <button className="retry-btn" onClick={fetchEnrolledCourses}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-list-container">
      {/* Header with Welcome Message */}
      <div className="list-header">
        <div className="welcome-section">
          <h1 className="welcome-title">My Learning</h1>
          <p className="welcome-subtitle">
            Continue your journey in computer science
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <span className="stat-value">{stats.totalCourses}</span>
            <span className="stat-label">Total Courses</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.activeCourses}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.completedCourses}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.averageProgress}%</span>
            <span className="stat-label">Avg Progress</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <CourseFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
        semesters={getUniqueSemesters()}
      />

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="no-results">
          <img 
            src="https://illustrations.popsy.co/white/searching.svg" 
            alt="No results"
            className="no-results-image"
          />
          <h3>No courses found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <>
          <div className="results-info">
            <span>{filteredCourses.length} courses</span>
            <button className="view-toggle">
              <span className="icon">📊</span> Grid
            </button>
          </div>
          
          <div className="course-grid">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => onSelectCourse(course.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseList;