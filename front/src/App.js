import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import AddPostPage from './pages/AddPostPage';
import Header from './components/navbar';
import LoginPage from './pages/Login';
import { AlertProvider } from './context/alert';
import RegisterPage from './pages/Register';
import { AccessDenied } from './pages/AccessDenied';

function App() {
  return (
    <>
      <AlertProvider>
        <Header />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/add' element={<AddPostPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='*' element={<AccessDenied/>}/>
        </Routes>
      </AlertProvider>
    </>
  );
}
export default App;