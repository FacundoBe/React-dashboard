/* eslint-disable react/prop-types */
import { useState } from 'react'
import './CoinList.css'


export default function CoinList({ coins, favList, toogleFavorite }) {
    

    function CoinRow({ coin, index, favList, toogleFavorite }) {

        const isFavorite = favList.includes(coin.symbol)

        return (
            <div className="coin-row-container">
                
                <img onClick={() => toogleFavorite(coin.symbol)} src={isFavorite?"fav-on.svg":"fav-off.svg"} alt="favorite toggle icon" />
                <div className=" coin-number justify-center">
                    {index + 1}
                </div>

                <div className="coin-name">
                    <img className="coin-image" src={coin.image} />
                    <div>{coin.name}</div> <span> {coin.symbol.toUpperCase()}</span>
                </div>
                <div >
                    ${coin.current_price.toFixed(2)}
                </div>
                <div className={`${coin.price_change_percentage_24h > 0 ? "up" : "down"}`} >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div className='coin-total-volume' >
                    ${coin.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div className='coin-market-cap' >
                    ${coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
            </div>
        )
    }


    return (
        <div>
            {coins.length > 0 &&
                <div className="coin-list-container">
                    
                    <div className="coin-list">
                        <div className="coin-row-container">
                            <div> Fav</div>
                            <div className="justify-center"> # </div>
                            <div className="header-coin-name justify-left"> Coin </div>
                            <div> Price </div>
                            <div >24h</div>
                            <div> 24h Volume</div>
                            <div> Market Cap</div>
                        </div>

                        {coins.map((coin, index) => {
                            return <CoinRow key={coin.id} coin={coin} index={index} favList={favList} toogleFavorite={toogleFavorite} />
                        })}
                    </div>
                </div>
            }
        </div>
    )
}