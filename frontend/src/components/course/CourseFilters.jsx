import React from 'react';
import './course-components.css';

const CourseFilters = ({ onSearch, onFilterChange, filters, semesters }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };

  const handleSemesterChange = (e) => {
    onFilterChange({ semester: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  return (
    <div className="filters-section">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search courses by name, code, or instructor..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="filter-group">
        <select 
          className="filter-select"
          value={filters.status}
          onChange={handleStatusChange}
        >
          <option value="all">All Status</option>
          <option value="active">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select 
          className="filter-select"
          value={filters.semester}
          onChange={handleSemesterChange}
        >
          <option value="all">All Semesters</option>
          {semesters.map(semester => (
            <option key={semester} value={semester}>{semester}</option>
          ))}
        </select>

        <select 
          className="filter-select"
          value={filters.sortBy}
          onChange={handleSortChange}
        >
          <option value="recent">Most Recent</option>
          <option value="progress-desc">Highest Progress</option>
          <option value="progress-asc">Lowest Progress</option>
          <option value="name">Course Name</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilters;