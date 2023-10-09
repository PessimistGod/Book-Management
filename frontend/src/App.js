import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react'; // Import lazy and Suspense
import Loading from './Components/Loading';
import LoginLayout from './LoginLayout';

// Lazy load these components
const AppLayout = lazy(() => import('./AppLayout'));
const BooksPage = lazy(() => import('./Pages/BooksPage'));
const Login = lazy(() => import('./Authentication/Login'));
const Signup = lazy(() => import('./Authentication/Signup'));
const Cart = lazy(() => import('./Pages/Cart'));
const CreateBook = lazy(() => import('./Pages/CreateBook'));
const EditBook = lazy(() => import('./Pages/EditBook'));
const InvalidPage = lazy(() => import('./InvalidPage'));

function App() {
  return (
    <Router>
      {/* Wrap the content in Suspense */}
      <Suspense fallback={<Loading />}>
        <AppContent />
      </Suspense>
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
            <Route index element={<Signup />} />
          </Route>
          <Route path="*" element={<InvalidPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
