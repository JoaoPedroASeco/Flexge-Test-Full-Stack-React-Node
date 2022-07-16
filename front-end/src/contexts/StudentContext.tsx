import { createContext, ReactNode, useState } from "react"
import { IStudent } from "../store"

interface IStudentContext {
  editStudentData: IStudent | undefined
  setEditStudentData: (student: IStudent | undefined) => void
}

export const StudentContext = createContext({} as IStudentContext)

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [editStudentData, setEditStudentData] = useState<IStudent | undefined>()

  return (
    <StudentContext.Provider value={{
      editStudentData,
      setEditStudentData
    }}>
      {children}
    </StudentContext.Provider>
  )
}