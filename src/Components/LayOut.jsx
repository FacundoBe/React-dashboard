import {Outlet} from 'react-router' 
import LateralBar from './LateralBar'

export default function LayOut() {

    return(
        <div className='flex'>
           <LateralBar/>
           <Outlet/>
        </div>
    )
}