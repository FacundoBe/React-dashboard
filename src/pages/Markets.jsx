import Coinlist from '../Components/CoinList'
import './Markets.css'

export default function Markets(){

    return(
        <main className='markets-container'>
            <h2>Cryptocurrency Prices </h2>
            <div >
                <input className='markets-search-input' 
                type="text"
                placeholder='Search Coins'
                />
            </div>
            <Coinlist/>
        </main>
    )
}