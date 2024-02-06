import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import SignIn from './pages/Login';
import SignUp from './pages/Signup';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import SinglePost from './pages/SinglePost';
import Search from './pages/Search';

import Header from './components/Header';
import FooterCom from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route element={<AdminPrivateRoute/>}>
          <Route path='/create' element={<CreatePost/>}/>
          <Route path='/edit/:postId' element={<EditPost/>}/>
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route path='/post/:postSlug' element={<SinglePost/>}/>
      </Routes>
      <FooterCom/>
    </BrowserRouter >
  )
}


