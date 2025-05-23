import { Outlet } from 'react-router'
import LateralBar from './LateralBar'
import './LayOut.css'
import { ButtonIcon } from './ButtonIcon'
import { useState } from 'react'

export default function LayOut() {

    const [latBarVisible, setLatBarVisible] = useState(false)

    function hideLatBar(){
        setLatBarVisible(false)
    }

    return (
        <div className='layout-container'>

            <svg 
            className='menu-icon' 
            onClick={() => {setLatBarVisible(prev => !prev)}}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <LateralBar className={latBarVisible ? "visible" : ""} hideLatBar={hideLatBar} />
            <Outlet />
        </div>
    )
}