import React from 'react'

const ButtonWidget = (props) => {
  return (
    <button className='bg-amber-500 text-white py-2 px-6 rounded hover:bg-gray-400 
    duration-500'>
      {props.children}
    </button>
  )
}

export default ButtonWidget
