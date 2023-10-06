import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BooksPage from './Pages/BooksPage';
import AppLayout from './AppLayout';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<BooksPage />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>

          
   </Routes>
   </BrowserRouter>
  );
}

export default App;
