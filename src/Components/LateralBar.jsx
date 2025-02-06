import { Link, useLocation } from "react-router";
import './LateralBar.css'
export default function LateralBar() {

    const {pathname} = useLocation()
    console.log(pathname)
    
    return (
        <div className="lateral-bar-container">
            <Link to='/'> Portfolio </Link>
            <Link to='/assets'> Assets </Link>
            <Link to='/markets'> Markets </Link>
            <Link to='/watchlist'> Watchlist </Link>
        </div>
    )
}