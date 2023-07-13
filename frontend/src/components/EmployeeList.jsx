import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TiTick} from "react-icons/ti"
import {ImCross} from "react-icons/im"

const EmployeeList = ({employees, setEmployees}) => {

    // const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>async()=>{
        setLoading(true)
        const {data} = await axios.get("/api/v1/allemployees")
        // console.log("The employees", data.employees)
        setLoading(false)
        setEmployees(data.employees)

    },[])

    console.log("The employees", employees)
  return (
    <div>
        <div className="overflow-auto text-black w-full rounded-lg text-center shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Sr no.
                </th>
                <th className="p-3 w-24 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  E-mail
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Review
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>

            {employees && employees.length>0 && employees.map((employee,i) => (
              <tbody key={employee._id} className="divide-y divide-gray-100 ">
                <tr className="bg-white justify-center">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="p-3 text-md font-semibold text-gray-700 whitespace-nowrap">
                    {employee.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {employee.email}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {employee.performanceReview || ""}
                  </td>
                  <td className="p-3 text-sm flex mt-9 items-center justify-center text-gray-700 whitespace-nowrap">
                        <button disabled={loading} className="hover:cursor-pointer">
                            <TiTick className="h-4 mt-1 text-2xl text-green-700"/>
                        </button>
                        <button disabled={loading} className="hover:cursor-pointer mx-6">
                            <ImCross className="h-4 mt-1 text-red-700" />
                        </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {employees && employees.length===0?<div className="text-center my-4">No purchase requests yet..</div>:<></>}
        </div>

    </div>
  )
}

export default EmployeeList