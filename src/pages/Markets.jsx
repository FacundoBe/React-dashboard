import { useContext, useEffect, useRef } from "react"
import { CoinsDataContext } from '../context/CoinsDataProvider'
import Coinlist from '../Components/CoinList'
import './Markets.css'
import { useState } from "react"


export default function Markets() {

    const { coinsData } = useContext(CoinsDataContext)

    const [search, setSearch] = useState("")



    const filteredCoins = search ? coinsData.filter((coin) => {
        return (coin.name.toLowerCase().includes(search.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(search.toLowerCase())  )
    }) : coinsData
    console.log(search)

    function deleteInput() {
        setSearch("")

    }

    return (
        <main className='markets-container'>
            <h2>Cryptocurrency Prices</h2>
            <div >
                <input className='markets-search-input'
                    type="text"
                    placeholder='Search Coins'
                    onChange={(e) => { setSearch(e.target.value) }}
                    value={search}
                />
                <button
                    className="input-delete-btn"
                    onClick={() => deleteInput()}
                >⨉</button>
            </div>
            <Coinlist coins={filteredCoins} />
        </main>
    )
}