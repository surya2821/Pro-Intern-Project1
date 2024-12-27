import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './pages/Home';
import LandingPage from './components/Landingpage';
import Profile from './components/Profile';
import Fund from './components/Funddetails';
import Projects from './components/Projects'
import ProjectFundingPage from './components/ProjectFunding';
import DashboardPage from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path ="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/fund" element={<Fund/>}/>
          <Route path="/projects"element={<Projects/>}/>
          <Route path="/projects/:projectId" element={<ProjectFundingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/Home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;