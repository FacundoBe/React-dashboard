/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router";
import './LateralBar.css';
import { useRef } from "react";

export default function LateralBar({ className = "", hideLatBar }) {

    const { pathname } = useLocation()

    // Swipe listener for movil
    const touchStart = useRef(null);
    const touchEnd = useRef(null);


    const minSwipeDistance = 50;// required distance between touchStart and touchEnd to be detected as a swipe

    const onTouchStart = (e) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isRightSwipe){
            hideLatBar()    // hides menu on right swap in movil
        }
           
        // add your conditional logic here
    };


    return (
        <div
            className={`lateral-bar-container ${className}`}
            onTouchStart={onTouchStart}                         //event listeners for swipe
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <img className="logo-criptofolio" width="160px" src="logo-cryptofolio-text.svg" alt="" />
            <Link onClick={() => hideLatBar()} to='/' className={pathname === '/' ? "selected-page" : ""}> PORTFOLIO </Link>
            <Link onClick={() => hideLatBar()} to='/assets' className={pathname === '/assets' ? "selected-page" : ""}> WALLETS </Link>
            <Link onClick={() => hideLatBar()} to='/markets' className={pathname === '/markets' ? "selected-page" : ""}> MARKETS </Link>
            <Link onClick={() => hideLatBar()} to='/watchlist' className={pathname === '/watchlist' ? "selected-page" : ""}> WATCHLIST </Link>
            <img className="logo-criptofolio-wm" width="160px" src="logo-cryptofolio.svg" alt="" />
        </div>
    )
}