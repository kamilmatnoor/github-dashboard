import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeMerge, faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const NavigationComponent = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "Trending", link: "/trending" },
  ];
  let [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <div className='font-bold text-lg md:text-2xl cursor-pointer flex items-center text-gray-800'>
          <span className='text-lg md:text-2xl text-amber-500 mr-4 pt-2'>
            <FontAwesomeIcon icon={faCodeMerge} />
          </span>
          Github Dashboard
        </div>

        <div onClick={() => setOpen(!open)} className='text-lg md:text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </div>

        <ul className={`divide-y divide-dashed md:divide-none md:flex md:items-center md:pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
          {
            Links.map((link, index) => (
              <li key={link.name} className='md:ml-8 text-lg md:text-xl md:my-0 my-4'>
                <Link to={link.link} onClick={(e) => {
                  handleClick(index);
                }}>
                  <span className={activeIndex === index ? 'active hover:text-gray-400 duration-500 font-bold' : 'inactive hover:text-gray-400 duration-500 font-bold'}>{link.name}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default NavigationComponent
