import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
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
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login handleSetUser={handleSetUser} user={user}/>}/>
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
