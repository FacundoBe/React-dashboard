import { useContext, useEffect, useRef } from "react"
import { CoinsDataContext } from '../context/CoinsDataProvider'
import Coinlist from '../Components/CoinList'
import './Markets.css'
import { useState } from "react"


export default function Markets({ favList, toogleFavorite }) {

    const { coinsData } = useContext(CoinsDataContext)
    const [search, setSearch] = useState("")
    const [favoriteFilter, setFavoriteFilter] = useState(false)


    function toggleFavoriteFilter() {
        setFavoriteFilter(prevState => !prevState)
        console.log(favoriteFilter)
    }


    const filteredCoins = search ? coinsData.filter((coin) => {
        return (coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase()))
    }) : coinsData

    function deleteInput() {
        setSearch("")
    }

    let favFilteredCoins = []
    if (favoriteFilter) {
        favFilteredCoins = filteredCoins.filter(coin => favList.includes(coin.symbol))
    }

    return (
        <main className='markets-container'>
            <h2>Cryptocurrency Prices</h2>

            <div className="markets-search">
                <img className="search-icon" src="search-icon.svg" alt="" />
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

            <div className="fav-btn-container">
                <button className="fav-btn" onClick={toggleFavoriteFilter}>
                    <div className={favoriteFilter ? "fav-btn-switch switch-btn-active" : "fav-btn-switch"}></div>
                </button>
                <p>{favoriteFilter ? "Hide favorites" : "Show favorites"}</p>
            </div>





            <Coinlist coins={favoriteFilter ? favFilteredCoins : filteredCoins} favList={favList} toogleFavorite={toogleFavorite} />
        </main>
    )
}