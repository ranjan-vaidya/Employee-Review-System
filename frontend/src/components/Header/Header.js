import React, {useState} from 'react'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {GiShoppingBag} from "react-icons/gi"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {CgProfile} from "react-icons/cg"
import {MdOutlineSpaceDashboard, MdLogout} from 'react-icons/md';
import {AiFillCaretDown} from 'react-icons/ai'
import {FaRegFilePdf} from 'react-icons/fa'


// import {useState} from 'react';
const Header = () => {

  const [ open, setOpen] = useState(false);



  return (
    <nav className="w-full top-0 bg-gray-300 shadow-md fixed text-gray-600">
      <div className="relative py-3 px-3 font-semibold sm:px-5 h-16 flex flex-row items-center justify-between  m-auto nav_container">

        {
          <div  className="hamburger w-7 ml-2 md:hidden cursor-pointer">
            <div className="w-full h-0.5 bg-gray-800 line rounded-md"></div>
            <div className="w-full h-0.5 bg-gray-800 my-1.5 rounded-md"></div>
            <div className="w-full h-0.5 bg-gray-800 rounded-md"></div>
          </div> 
        }

        <div  className="cursor-pointer">
          <p className='font-bold flex items-center text-xl'>Empolyee Review System </p>
        </div>
        <div>
          <div>
              
            </div>
            <div className="nav_horizontalLinks" >
              
                
              
            </div>
        </div>

        <div className="flex items-center gap-2">
                    {
                        // need to access from cookies when cookies applied over whole site
                        
                        <div className="flex relative items-center text-gray-600 gap-2">

                              <div  className='cursor-pointer hover:text-black'>
                                <div onClick={()=> {setOpen(!open)}} className="flex items-center relative">
                                  <CgProfile size={30}/>
                                  <AiFillCaretDown size={13}  /> 
                                </div> 
                              </div> 

                              {/* Dropdown Content */}
                              
                              { open &&
                                <div className="bg-white absolute right-4 shadow-lg top-8 w-[153px] rounded-lg py-1">
                                  <div onClick={() => { setOpen(!open)} } className="flex flex-row px-3 py-1 text-gray-600 hover:text-black hover:bg-gray-100 hover:cursor-pointer"><MdOutlineSpaceDashboard className="h-6 mr-2" /> Dashboard</div>
                                  <div onClick={()=>{setOpen(!open)} } className="flex flex-row px-3 py-1 text-gray-600 hover:text-black hover:bg-gray-100 hover:cursor-pointer"><MdLogout className="h-6 mr-2" /> Sign out</div>
                                </div>
                              }
                            

                            {/* <div onClick={()=>logout()} className="cursor-pointer hover:text-black">Sign out</div> */}
                        </div>
                        
                    }
                    
                    <div className="hamburger w-7 ml-2 md:hidden cursor-pointer">
                      <div className="w-full h-0.5 bg-gray-800 line rounded-md"></div>
                      <div className="w-full h-0.5 bg-gray-800 my-1.5 rounded-md"></div>
                      <div className="w-full h-0.5 bg-gray-800 rounded-md"></div>
                    </div> : <></>
                    
                </div>
      </div>
    </nav>
  )
}

export default Header