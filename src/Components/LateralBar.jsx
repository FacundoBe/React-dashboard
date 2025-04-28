import { Link, useLocation } from "react-router";
import './LateralBar.css';

export default function LateralBar() {

    const {pathname} = useLocation()
    
    return (
        <div className="lateral-bar-container">
            <img className="logo-criptofolio" width="160px" src="logo-cryptofolio-text.svg" alt="" />
            <Link to='/' className={pathname==='/' ? "selected-page" : ""}> PORTFOLIO </Link>
            <Link to='/assets' className={pathname==='/assets'  ? "selected-page" : ""}> ASSETS </Link>
            <Link to='/markets'className={pathname==='/markets' ? "selected-page" : ""}> MARKETS </Link>
            <Link to='/watchlist'className={pathname==='/watchlist' ? "selected-page" : ""}> WATCHLIST </Link>
        </div>
    )
}