import { useState } from 'react'
import './App.css'
import Login from './components/login'
import Home from './components/Home'
import Signup from './components/signup'
import Employee from './components/Employee'
import Visitor from './components/Visitor'
import Reception from './components/Reception'
import Admin from './components/Admin'
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  let [user, setUser] = useState(null);
  let handleSetUser = (user)=>{
    setUser(user);
    console.log("user state is set to ",user);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login handleSetUser={handleSetUser} user={user}/>}/>
       </Routes>
        <Routes>
          <Route path="/" element={<Home/>}/>
       </Routes>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
       </Routes>
        <Routes>
          <Route path="/employee" element={<Employee />}/>
       </Routes>
        <Routes>
          <Route path="/visitor" element={<Visitor user={user}/>}/>
       </Routes>
        <Routes>
          <Route path="/reception" element={<Reception />}/>
       </Routes>
        <Routes>
          <Route path="/admin" element={<Admin/>}/>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
