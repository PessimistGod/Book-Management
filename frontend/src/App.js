import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BooksPage from './Pages/BooksPage';
import AppLayout from './AppLayout';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Cart from './Pages/Cart';
import CreateBook from './Pages/CreateBook';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<BooksPage />}></Route>
          <Route path='/Cart' element={<Cart />}></Route>
          <Route path='/addBook' element={<CreateBook />}></Route>


          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>

          
   </Routes>
   </BrowserRouter>
  );
}

export default App;
