import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import SignIn from './pages/Login'
import SignUp from './pages/Signup'
import Header from './components/Header';
import FooterCom from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<SignIn/>}/>
      </Routes>
      <FooterCom/>
    </BrowserRouter >
  )
}


