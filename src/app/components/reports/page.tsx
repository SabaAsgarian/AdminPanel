import React from 'react'
import Image from 'next/image'
import Men from '../img/404.png'
import ResponsiveDrawer from '../ResponsiveDrawer'

const Reports: React.FC = () => {
  return (
    <ResponsiveDrawer>
      <Image 
        src={Men} 
        alt="me" 
        width={1000} 
        height={585} 
      />
    </ResponsiveDrawer>
  )
}

export default Reports
