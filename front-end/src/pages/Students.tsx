import { useState } from "react"
import { withSessionHOC } from "../services/auth/session"

const Students = () => {
  // Using state
  const [studentName, setStudentName] = useState('')

  const handleSubmit = () => {
    // Search students 
  }

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            onChange={e => setStudentName(e.target.value)} 
            value={studentName} 
          />

          <button type="submit">
            Search
          </button>
        </form>
      </div>
    </main>
  )
}

export default Students