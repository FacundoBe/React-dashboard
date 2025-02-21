/* eslint-disable react/prop-types */
import './Portfolio.css'
import { formatUS } from '../assets/functions'
import PortfolioCard from './PortfolioCard'

export default function Portfolio({ assetsList }) {

    let portfolioCoinList = [];

    if (assetsList.length > 0) {
        assetsList.forEach(wallet => {
            wallet?.sourceAssets.forEach(coin => {
                if (portfolioCoinList.some(coinObj => coinObj.name === coin.name)) {  //already existing coin in portolioCoinList  
                    const extPortfolioCoinList = portfolioCoinList.map(coinObj => {
                        if (coinObj.name === coin.name) {
                            console.log("agregar")
                            return { ...coinObj, coinByWalletList: [...coinObj.coinByWalletList, { wallet: wallet.name, amount: coin.amount }] }
                        }
                        else return coinObj
                    })
                    portfolioCoinList = extPortfolioCoinList

                } else { //new coin 
                    portfolioCoinList.push({ name: coin.name, symbol: coin.symbol, image: coin.image, coinByWalletList: [{ wallet: wallet.name, amount: coin.amount }] })
                }
            })
        })
    }



    return (
        <div className="flex w100">
            <div className='portfolio-coin-panel'>

                <div className='portfolio-total-panel'>
                    <div className='label'>TOTAL WORTH</div>
                    <p><span>$</span>{formatUS("100000.5")}</p>
                    <div className='crypto'> 23.50 BTC</div>
                </div>

                <div className="divider-hor">  </div>

                <div className='portfolio-cards-container'>
                    {portfolioCoinList.map(portfolioCoin => <PortfolioCard
                        key={portfolioCoin.name}
                        portfolioCoin={portfolioCoin} />)

                    }
                </div>
            </div>
            <div className='portfolio-chart-panel'>
                Coins Graph
            </div>
        </div>
    )
}