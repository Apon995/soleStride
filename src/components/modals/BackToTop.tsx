"use client"

import { ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function BackToTop() {
    const [isShow , setIsShow] = useState(false)

    useEffect(()=>{
        const handleScroll = ():void =>{
            if(window.scrollY > 200 ){
                setIsShow(true)
            }
            else setIsShow(false);
        }
        window.addEventListener("scroll" , handleScroll)
        return ()=> window.removeEventListener("scroll", handleScroll)
    },[]);


    const handleBackTop = ():void =>{
        window.scrollTo({top : 0 , behavior : 'smooth'})
    }



  return (
    <button onClick={handleBackTop} className={`fixed md:bottom-5 bottom-2 md:right-6 right-2 md:p-3 p-2 rounded-full shadow-lg transition-all duration-300 
        bg-gradient-to-r from-[#47B083] to-[#3A9E75] dark:bg-none dark:bg-gray-900 text-white hover:opacity-90 hover:cursor-pointer 
        ${ isShow ? "opacity-100 translate-y-0 visible " : "opacity-0 invisible translate-y-10 pointer-events-none"}`}

    >
      <ChevronUp />
    </button>
  )
}
