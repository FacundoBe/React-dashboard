import {Outlet} from 'react-router' 
import LateralBar from './LateralBar'
import './LayOut.css'

export default function LayOut() {

    return(
        <div className='layout-container'>
           <LateralBar />
           <Outlet/>
        </div>
    )
}