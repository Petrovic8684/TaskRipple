import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import LearnMore from './pages/LearnMore';
import Home from './pages/Home';
import { useTranslation } from 'react-i18next';

function App() {
  const [t, i18n] = useTranslation('global');

  useEffect(() => {
    const language = navigator.language || navigator.userLanguage;
    i18n.changeLanguage(language);
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/learnmore' element={<LearnMore />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  );
}

export default App;
