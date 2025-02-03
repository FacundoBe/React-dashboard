import { Link } from "react-router";

export default function LateralBar() {

    return (
        <div className="flex-col">
            LateralBar Goes here
            <Link to='/'> Portfolio </Link>
            <Link to='/assets'> Assets </Link>
        </div>
    )
}