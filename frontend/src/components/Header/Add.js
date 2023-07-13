import React,{useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import EmployeeList from '../EmployeeList';

const Add = () => {

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [employees, setEmployees] = useState([])

  const navigate = useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault()
    if(!name || !email || !password){
      console.log("Enter all fields")
      return;
    }
    const {data} = await axios.post("/api/v1/employee",{
      name,
      email,
      password,
    },{
        headers:{
            "Content-Type":"application/json"
        }
    })

    console.log("The data", data)
    setShowModal(false)
    const data2 = await axios.get("/api/v1/allemployees")
    // console.log("The employees", data.employees)
    setEmployees(data2.data.employees)
    navigate("/add")
  }

  return (
    <>
       <div className='buttonfixed w-full'>
        {/* <button type="button" onClick={() => setShowModal(true)} class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">+ Add Employee</button> */}
           

      <button type="button" onClick={() => setShowModal(true)} class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">+ Add Employee</button>

      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">ADD EMPLOYEE</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>

                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Name
                    </label>
                    <input onChange={e=>setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    
                    <label className="block text-black text-sm font-bold mb-1">
                      Email
                    </label>
                    <input onChange={e=>setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Password
                    </label>
                    <input onChange={e=>setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button type="button" onClick={() => setShowModal(false)} class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">CLOSE</button>

                  <button type="submit" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">ADD</button>

                </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <EmployeeList employees={employees} setEmployees={setEmployees}/>
      </div>

    </>
  )
}

export default Add