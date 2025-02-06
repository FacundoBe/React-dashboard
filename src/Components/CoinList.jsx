/* eslint-disable react/prop-types */
import './CoinList.css'

export default function CoinList({coins}) {
   
   
    function CoinRow({ coin, index }) {
        return (
            <div className="coin-row-container">
                <div className="justify-center">
                    {index + 1}
                </div>
                <img className="coin-image" src={coin.image} />
                <div className="coin-name">
                    <div>{coin.name}</div> <span> {coin.symbol.toUpperCase()}</span>
                </div>
                <div >
                    ${coin.current_price.toFixed(2)}
                </div>
                <div className={`${coin.price_change_percentage_24h > 0 ? "up" : "down"}`} >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                </div>
                <div >
                    ${coin.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
                <div >
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
                            <div className="justify-center"> # </div>
                            <div className="header-coin-name justify-left"> Coin </div>
                            <div> Price </div>
                            <div >24h</div>
                            <div> 24h Volume</div>
                            <div> Market Cap</div>
                        </div>

                        {coins.map((coin, index) => {
                            return <CoinRow key={coin.id} coin={coin} index={index} />
                        })}
                    </div>
                </div>
            }
        </div>
    )
}