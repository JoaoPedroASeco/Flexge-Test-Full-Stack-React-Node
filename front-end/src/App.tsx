// React Router Dom Import
import { Route, Routes } from 'react-router-dom'
// Pages
import Students from './pages/Students'
import { Login } from './pages/Login'
import { FourOhFour } from './pages/404'
import { LoginProvider } from './contexts/LoginContext'
import { Student } from './pages/Student'

function App() {
  return (
    <Routes>
      <Route path='/login' element={
        <LoginProvider>
          <Login />
        </LoginProvider>
      } />
      <Route path="/students" element={<Students />} />
      <Route path="/student" element={<Student />} />
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  )
}

export default App
