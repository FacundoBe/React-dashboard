import { Link, useLocation } from "react-router";
import './LateralBar.css'
export default function LateralBar() {

    const {pathname} = useLocation()
    
    return (
        <div className="lateral-bar-container">
            <Link to='/' className={pathname==='/' ? "selected-page" : ""}> Portfolio </Link>
            <Link to='/assets' className={pathname==='/assets'  ? "selected-page" : ""}> Assets </Link>
            <Link to='/markets'className={pathname==='/markets' ? "selected-page" : ""}> Markets </Link>
            <Link to='/watchlist'className={pathname==='/watchlist' ? "selected-page" : ""}> Watchlist </Link>
        </div>
    )
}