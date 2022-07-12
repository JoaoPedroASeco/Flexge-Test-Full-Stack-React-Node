// React Router Dom Import
import { Route, Routes } from 'react-router-dom'
// Pages
import Students from './pages/Students'
import { Login } from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/students" element={<Students />} />
      <Route path="*" element={<Students />} />
    </Routes>
  )
}

export default App
