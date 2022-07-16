import { tokenService } from "../services/token/tokenService"
import { FormEvent, useContext, useEffect, useState } from "react"
import { api } from "../services/api"
import { Link, useNavigate } from "react-router-dom"
import { ArrowDown, ArrowUp, MagnifyingGlass, PencilLine, Plus, Trash, Warning } from "phosphor-react"
import { deleteStudentRequest, IStudent, readStudentRequest, useAppDispatch, useAppSelector } from "../store"
import { studentState } from "../store/reducers/students"
import { StudentContext } from "../contexts/StudentContext"

const Students = () => {
  // Use context
  const { setEditStudentData } = useContext(StudentContext)

  // using react navigate to redirect
  const router = useNavigate()

  // Redux State
  const dispatch = useAppDispatch()
  const { payload, loading, success, error } = useAppSelector<studentState>(state => state.student)
  console.log(payload)

  // List Students
  useEffect(() => {
    dispatch(readStudentRequest({ page: 1 }))
  }, [])

  // Set students on a mutable state
  useEffect(() => {
    setStudents(payload.students)
  }, [success])

  // Use State
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState<IStudent[] | undefined>([])
  const [deletePopUp, setDeletePopUp] = useState<{ isOpen: boolean, _id: string | undefined }>({ isOpen: false, _id: undefined })

  // Authenticate user
  useEffect(() => {
    const authUser = async () => {
      const token = await tokenService.get();

      try {
        await api.get('/session',
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        )
      } catch (error) {
        router('/login')
      }
    }

    authUser()
  }, [])

  // search for students name
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    // Search students 
    const arrayOfStudentSearched = payload.students?.filter(student => student?.name?.toLowerCase().includes(studentName.toLowerCase()))

    setStudents(arrayOfStudentSearched)
  }

  // Change page and fetch more students
  const handleSetPage = async (page: number) => {
    try {
      dispatch(readStudentRequest({ page: page }))
    } catch (error) {
      console.log('AutoListStudents error: ', error)
    }
  }

  // Delete student
  const handleDelete = async () => {
    try {
      const payload = students?.filter(student => student._id !== deletePopUp._id)
      dispatch(deleteStudentRequest({ _id: deletePopUp._id || '', payload: payload || [] }))
      setDeletePopUp({ isOpen: false, _id: undefined })
    } catch (error) {
      console.log('AutoListStudents error: ', error)
    }
  }

  return (
    <>
      {/* Container */}
      <div className="flex flex-col w-screen h-screen bg-zinc-200 text-zinc-800 px-10 py-8">
        {/* Search & Create Student container */}
        <div className="mb-12">
          <h3 className="text-4xl mb-6">Students</h3>

          <div className="flex w-full justify-between items-center px-5">
            {/* Search Student container */}
            <form
              className="flex w-[60%]"
              onSubmit={handleSearch}
            >
              <input
                className="flex w-[80%] border-[3px] border-zinc-800 text-sm pl-3 rounded"
                type="text"
                onChange={e => setStudentName(e.target.value)}
                value={studentName}
                placeholder="find by name..."
              />

              <button
                className="flex items-center justify-center border-[3px] border-zinc-800 bg-white px-3 ml-[3%] font-medium rounded"
                type="submit"
              >
                <MagnifyingGlass className="text-xl" weight="bold" />
                <span className="">Search</span>
              </button>
            </form>

            {/* Create Student */}
            <div className="flex w-auto">

              <Link to={'/student'}>
                <button
                  onClick={() => setEditStudentData(undefined)}
                  className="flex items-center justify-center border-[3px] border-zinc-800 bg-white px-3 font-medium rounded"
                  type="button"
                >
                  <Plus className="mr-1" weight="bold" />

                  New Student
                </button>
              </Link>

            </div>
          </div>
        </div>

        <div className="flex m-5">
          <button
            className="flex items-center text-lg bg-zinc-300 p-2 rounded"
            onClick={() => dispatch(readStudentRequest({ page: payload.page ? payload.page : 1, order: payload.order === 1 ? -1 : 1 }))}
          >
            <span className="text-sm font-bold">
              Order
            </span>

            {payload.order === 1 ? (
              <ArrowDown weight="bold" />
            ) : (
              <ArrowUp weight="bold" />
            )}
          </button>
        </div>

        <div className="flex flex-col border-[3px] border-zinc-800 mx-5 h-[70%] max-h-[70%] overflow-auto w-full rounded">
          {/* List titles */}
          <ul className="flex w-full justify-start bg-zinc-400 text-zinc-900">
            <li className="w-[20%] border-r-[3px] border-zinc-800">Name</li>
            <li className="w-[20%] border-r-[3px] border-zinc-800">Age</li>
            <li className="w-[20%] border-r-[3px] border-zinc-800">Course</li>
            <li className="w-[20%] border-r-[3px] border-zinc-800">School</li>
            <li className="w-[20%]">Actions</li>
          </ul>

          {/* List students */}
          <ul className="flex flex-col">
            {loading ? (
              <>Loading...</>
            ) : (
              <>
                {students?.map((student, index) => (
                  <li
                    className={`flex h-12 ${(index + 1) % 2 ? 'bg-zinc-300' : ''}`}
                    key={student._id}
                  >
                    <span className="pl-2 flex items-center w-[20%] border-r-[3px] border-zinc-800">
                      {student.name}
                    </span>

                    <span className="flex items-center w-[20%] border-r-[3px] border-zinc-800">
                      {student.age}
                    </span>

                    <span className="flex items-center w-[20%] border-r-[3px] border-zinc-800">
                      {student.course}
                    </span>

                    <span className="flex items-center w-[20%] border-r-[3px] border-zinc-800">
                      {student.school}
                    </span>

                    <span className="flex items-center justify-center w-[20%] gap-3">
                      <Link
                        to={'/student'}
                      >
                        <button
                          onClick={() => setEditStudentData(student)}
                          type="button"
                        >
                          <PencilLine
                            size={34}
                          />
                        </button>
                      </Link>

                      <button
                        onClick={() => setDeletePopUp({ isOpen: true, _id: student._id })}
                        type="button"
                      >
                        <Trash
                          size={34}
                        />
                      </button>
                    </span>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6">
          {[...Array(payload.totalPages).keys()].map((item, index) => {
            console.log(payload.totalPages , item)
            return (
              <button
                onClick={() => handleSetPage(index + 1)}
                key={index + 1}
                className={`flex items-center justify-center border-[3px] border-zinc-800 bg-white px-3 ml-[1%] font-medium rounded ${payload.page === index + 1 ? 'brightness-50' : ''}`}
              >
                Page {index + 1}
              </button>
            )
          })}
        </div>
      </div>

      {deletePopUp.isOpen && (
        <div className="absolute flex w-screen h-screen justify-center items-center top-0 left-0 text-zinc-800">
          <div className="flex flex-col justify-center items-center bg-white w-[25%] h-[30%] rounded p-10">
            <h1 className="flex flex-col text-3xl font-bold items-center">
              <span className="flex items-center">
                <Warning weight="bold" /> Delete id:
              </span>
              <span className="text-red-400">
                {deletePopUp._id}?
              </span>
            </h1>

            <div className="flex gap-6 mt-[20%]">
              <button
                type="button"
                className="text-white uppercase bg-red-600 py-[6px] px-[16px] rounded hover:brightness-75 transition-all"
                onClick={() => handleDelete()}
              >
                Yes, delete!
              </button>
              <button
                type="button"
                className="text-white uppercase bg-zinc-400 py-[6px] px-[16px] rounded hover:brightness-75 transition-all"
                onClick={() => setDeletePopUp({ isOpen: false, _id: undefined })}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Students