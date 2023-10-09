import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BooksPage from './Pages/BooksPage';
import AppLayout from './AppLayout';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Cart from './Pages/Cart';
import CreateBook from './Pages/CreateBook';
import EditBook from './Pages/EditBook';
import InvalidPage from './InvalidPage';
import { useEffect, useState } from 'react';
import Loading from './Components/Loading';
import LoginLayout from './LoginLayout';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }, [location.pathname]); 

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<BooksPage />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/addBook" element={<CreateBook />} />
            <Route path="/editBook/:id" element={<EditBook />} />
          </Route>
          <Route path="/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
          </Route>
          <Route path="/signup" element={<LoginLayout />}>
          <Route index element={<Signup/>} />
          </Route>
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
