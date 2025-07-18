import './App.css'
import {Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='*' element={<h1>Page not found</h1>}/>
    </Routes>
  )
}

export default App