import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate, useLocation } from 'react-router-dom';
import Footer from './scenes/Footer/footer';
import MealDetail from './scenes/Meals/MealDetail';
import Meals from './scenes/Meals/meals';
import Navbar from './scenes/Navbar/navbar';
import WorkoutDetail from './scenes/Workouts/WorkoutDetail';
import Workouts from './scenes/Workouts/workouts';
import FlashMessage from './shared/FlashMessage';
import Main from './shared/Main';
import { PageSections } from './shared/PageSections';
import SignupForm from './scenes/Auth/SignUp'; // Assume you have this component
import SigninForm from './scenes/Auth/SignIn';


function App() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const [flashMessage, setFlashMessage] = useState({ message: '', type: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const exceptions = ['/signup', '/signin']
  const loginCheck = { isLoggedIn, setIsLoggedIn };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage('home');
      } else {
        setIsTopOfPage(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleLogout = () => {
    setFlashMessage({ message: 'Logged out successfully!', type: 'success' });
    if (location.pathname === '/') {
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } else {
      setTimeout(() => {
        navigate('/');
      }, 800);
    }
  };

  return (
    <div className="app bg-gray-20">
      {!exceptions.includes(location.pathname) && (
        <Navbar
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}

      {flashMessage.message && (<FlashMessage
        message={flashMessage.message}
        type={flashMessage.type}
        onClose={() => setFlashMessage({ message: '', type: '' })}
      />)}

      <Routes>
        <Route path="/" element={<Main setSelectedPage={setSelectedPage} />} />
        <Route path="/workouts" element={<Workouts setSelectedPage={setSelectedPage} />} />
        <Route path="/workouts/:id" element={<WorkoutDetail setSelectedPage={setSelectedPage} />} />
        <Route path="/meals" element={<Meals setSelectedPage={setSelectedPage} />} />
        <Route path="/meals/:id" element={<MealDetail setSelectedPage={setSelectedPage} />} />
        <Route path="/signin" element={<SigninForm loginCheck={loginCheck} />} />
        <Route path="/signup" element={<SignupForm loginCheck={loginCheck} />} />
      </Routes>

      {/* Conditionally render Footer based on the current route */}
      {!exceptions.includes(location.pathname) && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;