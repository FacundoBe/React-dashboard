import { Outlet } from 'react-router'
import LateralBar from './LateralBar'
import './LayOut.css'
import { ButtonIcon } from './ButtonIcon'
import { useState } from 'react'

export default function LayOut() {

    const [latBarVisible, setLatBarVisible] = useState(false)

    function hideLatBar() {
        setLatBarVisible(false)
    }

    return (
        <div className='layout-container'>
            <nav className='top-nav-bar'>
                <div className='top-nav-logo-title-container'>
                    <img className="logo-criptofolio-top-nav-bar" src="logo-cryptofolio.svg" alt="" />
                    <p>Portfolio</p>
                </div>
                <svg
                    className='menu-icon'
                    onClick={() => { setLatBarVisible(prev => !prev) }}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </nav>
            <LateralBar className={latBarVisible ? "visible" : ""} hideLatBar={hideLatBar} />
            <Outlet />
        </div>
    )
}