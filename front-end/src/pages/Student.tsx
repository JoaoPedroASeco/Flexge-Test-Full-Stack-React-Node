import { ArrowLeft } from "phosphor-react"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { StudentContext } from "../contexts/StudentContext"
import { createStudentRequest, updateStudentRequest, useAppDispatch, useAppSelector } from "../store"
import { studentState } from "../store/reducers/students"

export const Student = () => {
  // User Redux dispatch 
  const dispatch = useAppDispatch()
  const { loading, error, payload, success } = useAppSelector<studentState>(state => state.student)

  // Use context
  const { editStudentData } = useContext(StudentContext)

  // Use state
  const [name, setName] = useState<string | undefined>(editStudentData === undefined ? '' : editStudentData.name)
  const [age, setAge] = useState<number | undefined>(editStudentData === undefined ? 0 : editStudentData.age)
  const [course, setCourse] = useState<string | undefined>(editStudentData === undefined ? '' : editStudentData.course)
  const [school, setSchool] = useState<string | undefined>(editStudentData === undefined ? '' : editStudentData.school)
  const [dispatchSuccess, setDispatchSuccess] = useState<boolean>(false)

  // handleSubmitForm
  const handleSubmit = () => {
    if (name && name?.length <= 0 || (age && age <= 0 || age === 0)  || course === 'default' || course === '' || school === 'default' || school === '' ) return console.log('preencha todos os campos')

    if (editStudentData === undefined) {
      dispatch(createStudentRequest({
        name,
        age,
        course,
        school
      }))

      setDispatchSuccess(true)

      setTimeout(() => {
        setDispatchSuccess(true)
      }, 2000);
    } else {
      dispatch(updateStudentRequest({
        _id: editStudentData._id,
        name,
        age,
        course,
        school
      }))

      setDispatchSuccess(true)

      setTimeout(() => {
        setDispatchSuccess(true)
      }, 2000);
    }
  }

  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center text-zinc-800 px-10 py-8 bg-bgLogin bg-flexge-green-800">
        <div className="relative flex justify-center items-center flex-col bg-white h-[60%] w-[30%] p-10 rounded text-zinc-500">
          <div className="flex w-full justify-between items-center mb-12">
            <button className="w-[20%]">
              <Link to='/students'>
                <ArrowLeft size={24} />
              </Link>
            </button>

            <h1 className="w-[60%] text-4xl font-bold self-center text-black">{editStudentData === undefined ? 'Create Student' : 'Edit Student'}</h1>

            <span className="w-[20%]">
            </span>
          </div>

          <form className="flex flex-col self-center w-[90%]">
            {/* Name */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="name"
              >
                Name:
              </label>

              <input
                className={`outline-none border-b border-zinc-300 transition-all`}
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                id='name'
              />
            </div>

            {/* Age */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="age"
              >
                Age:
              </label>

              <input
                id="age"
                className={`outline-none border-b border-zinc-300 transition-all`}
                type="number"
                onChange={(e) => setAge(parseInt(e.target.value))}
                value={age}
              />
            </div>

            {/* Course */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="courses"
              >
                Course:
              </label>

              <select id="courses"
                className={`outline-none border-b border-zinc-300 transition-all`}
                onChange={(e) => setCourse(e.target.value)}
                value={course}
              >
                <option defaultValue="default">Select an course</option>
                <option value="PRE A1">PRE A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>

            {/* School */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor=""
              >
                School:
              </label>

              <select id="schools"
                className={`outline-none border-b border-zinc-300 transition-all`}
                onChange={(e) => setSchool(e.target.value)}
                value={school}
              >
                <option defaultValue="default">Select an school</option>
                <option value="School 1">School 1</option>
                <option value="School 2">School 2</option>
                <option value="School 3">School 3</option>
                <option value="School 4">School 4</option>
                <option value="School 5">School 5</option>
              </select>
            </div>

            {/* Create & Edit button */}
            <button
              className="flex items-center justify-center self-center text-white uppercase bg-flexge-green-600 py-[6px] px-[16px] rounded hover:brightness-75 transition-all max-w-[60%] w-full"
              onClick={() => handleSubmit()}
              type="button"
            >
              {editStudentData === undefined ? 'Create ' : 'Edit'}
            </button>
          </form>

          {dispatchSuccess && <div className="absolute bottom-[-15px] origin-top-left-1/3-3/4 flex justify-center items-center min-h-[2.563rem] min-w-[18.75rem] bg-flexge-green-600 rounded font-bold text-white">User {editStudentData === undefined ? 'Created ' : 'Edited'}</div>}
        </div>
      </div>
    </>
  )
}