import React, { useState, useEffect } from 'react';
import CourseList from '../components/course/CourseList';
import CourseDetails from '../components/course/CourseDetails';
import './course.css';

// API service (move to separate file in real implementation)
const api = {
  getEnrolledCourses: async (studentId) => {
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
    return new Promise((resolve) => {
      setTimeout(() => {
        const course = mockCourseDetails.find(c => c.id === courseId);
        resolve({
          success: true,
          data: course
        });
      }, 500);
    });
  }
};

// Mock data (move to separate file in real implementation)
const mockEnrolledCourses = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    faculty: 'Dr. Alan Turing',
    facultyAvatar: 'https://i.pravatar.cc/150?img=1',
    credits: 4,
    semester: 'Fall 2024',
    department: 'Computer Science',
    progress: 45,
    status: 'active',
    totalContents: 24,
    completedContents: 11,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    nextDeadline: '2024-03-15',
    grade: 'A-'
  },
  {
    id: 2,
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    faculty: 'Dr. Ada Lovelace',
    facultyAvatar: 'https://i.pravatar.cc/150?img=2',
    credits: 4,
    semester: 'Fall 2024',
    department: 'Computer Science',
    progress: 78,
    status: 'active',
    totalContents: 32,
    completedContents: 25,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    nextDeadline: '2024-03-20',
    grade: 'B+'
  },
  {
    id: 3,
    code: 'CS301',
    name: 'Database Management Systems',
    faculty: 'Dr. Grace Hopper',
    facultyAvatar: 'https://i.pravatar.cc/150?img=3',
    credits: 3,
    semester: 'Fall 2024',
    department: 'Computer Science',
    progress: 100,
    status: 'completed',
    totalContents: 28,
    completedContents: 28,
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    finalGrade: 'A'
  }
];

const mockCourseDetails = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    faculty: {
      name: 'Dr. Alan Turing',
      avatar: 'https://i.pravatar.cc/150?img=1',
      title: 'Professor of Computer Science',
      email: 'a.turing@university.edu'
    },
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
    stats: {
      studentsEnrolled: 156,
      averageGrade: 'B+',
      passRate: '92%',
      workload: '10-12 hrs/week'
    },
    chapters: [
      {
        id: 101,
        title: 'Introduction to Computing',
        order: 1,
        duration: '2 weeks',
        content: [
          {
            id: 1001,
            title: 'What is Computer Science?',
            type: 'video',
            duration: '15:30',
            url: 'https://example.com/video1',
            thumbnail: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
            viewed: true,
            completed: true,
            transcript: 'Full transcript here...'
          },
          {
            id: 1002,
            title: 'History of Computing',
            type: 'reading',
            pages: 25,
            url: 'https://example.com/pdf1',
            readTime: '45 min',
            viewed: true,
            completed: true
          },
          {
            id: 1003,
            title: 'Computer Basics Assignment',
            type: 'assignment',
            dueDate: '2024-03-15',
            maxScore: 100,
            submitted: true,
            graded: true,
            score: 85,
            feedback: 'Good work! Clear understanding of concepts.',
            submissions: [
              { date: '2024-03-14', file: 'assignment1.pdf' }
            ]
          },
          {
            id: 1004,
            title: 'Discussion: Ethics in Computing',
            type: 'discussion',
            participants: 45,
            lastActive: '2 hours ago',
            viewed: false,
            completed: false
          }
        ]
      },
      {
        id: 102,
        title: 'Programming Fundamentals',
        order: 2,
        duration: '3 weeks',
        content: [
          {
            id: 1005,
            title: 'Variables and Data Types',
            type: 'video',
            duration: '20:45',
            url: 'https://example.com/video2',
            thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
            viewed: true,
            completed: true
          },
          {
            id: 1006,
            title: 'Control Structures',
            type: 'video',
            duration: '25:15',
            url: 'https://example.com/video3',
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
            viewed: false,
            completed: false
          },
          {
            id: 1007,
            title: 'Programming Exercises',
            type: 'lab',
            url: 'https://example.com/lab1',
            environment: 'Python 3.9',
            timeEstimate: '2 hours',
            viewed: false,
            completed: false
          },
          {
            id: 1008,
            title: 'Week 2 Quiz',
            type: 'quiz',
            questions: 10,
            timeLimit: '30 min',
            attempts: 3,
            attemptsUsed: 0,
            viewed: false,
            completed: false
          }
        ]
      },
      {
        id: 103,
        title: 'Algorithms',
        order: 3,
        duration: '3 weeks',
        content: [
          {
            id: 1009,
            title: 'Introduction to Algorithms',
            type: 'video',
            duration: '18:20',
            url: 'https://example.com/video4',
            thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
            viewed: false,
            completed: false
          },
          {
            id: 1010,
            title: 'Algorithm Analysis',
            type: 'reading',
            pages: 35,
            url: 'https://example.com/pdf2',
            readTime: '1.5 hours',
            viewed: false,
            completed: false
          },
          {
            id: 1011,
            title: 'Algorithm Implementation Project',
            type: 'assignment',
            dueDate: '2024-04-01',
            maxScore: 100,
            submitted: false,
            graded: false,
            attachments: ['project_description.pdf', 'starter_code.zip']
          }
        ]
      }
    ],
    announcements: [
      {
        id: 1001,
        title: '📢 Mid-term Exam Schedule',
        content: 'Mid-term exam will be held on March 20th in Room 301. Please bring your student ID.',
        date: '2024-03-01',
        postedBy: 'Dr. Alan Turing',
        important: true,
        attachments: ['exam_syllabus.pdf']
      },
      {
        id: 1002,
        title: '💡 Project Guidelines Released',
        content: 'Final project guidelines are now available in the resources section. Start forming teams of 3-4 members.',
        date: '2024-02-28',
        postedBy: 'Teaching Assistant',
        important: false
      }
    ],
    resources: [
      {
        id: 2001,
        title: 'Textbook: Computer Science Illuminated',
        type: 'book',
        author: 'Nell Dale',
        url: '#'
      },
      {
        id: 2002,
        title: 'Lecture Slides - Week 1',
        type: 'slides',
        pages: 45,
        url: '#'
      }
    ]
  }
];

const Course = () => {
  const [view, setView] = useState('list');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [studentId] = useState(1); // Get from auth context in real app

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
        <CourseList 
          studentId={studentId}
          onSelectCourse={handleSelectCourse}
          api={api}
        />
      ) : (
        <CourseDetails
          courseId={selectedCourseId}
          studentId={studentId}
          onBack={handleBackToList}
          api={api}
        />
      )}
    </div>
  );
};

export default Course;