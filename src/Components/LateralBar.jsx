import { Link, useLocation } from "react-router";
import './LateralBar.css';

export default function LateralBar({className="", hideLatBar}) {

    const {pathname} = useLocation()
    
    return (
        <div className={`lateral-bar-container ${className}`}>
            <img className="logo-criptofolio" width="160px" src="logo-cryptofolio-text.svg" alt="" />
            <Link onClick={() => hideLatBar() } to='/' className={pathname==='/' ? "selected-page" : ""}> PORTFOLIO </Link>
            <Link onClick={() => hideLatBar() } to='/assets' className={pathname==='/assets'  ? "selected-page" : ""}> WALLETS </Link>
            <Link onClick={() => hideLatBar() } to='/markets'className={pathname==='/markets' ? "selected-page" : ""}> MARKETS </Link>
            <Link onClick={() => hideLatBar() } to='/watchlist'className={pathname==='/watchlist' ? "selected-page" : ""}> WATCHLIST </Link>
            <img className="logo-criptofolio-wm" width="160px" src="logo-cryptofolio.svg" alt="" />
        </div>
    )
}