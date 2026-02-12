import logo from './logo.svg';
import './App.css';
import Navbar from './components/Layout/Layout';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Timetable from './pages/Timetable';

function App() {
  return (
    <div className="App">
      <Layout >
        <Timetable />
      </Layout>
      
      
    </div>
  );
}

export default App;
