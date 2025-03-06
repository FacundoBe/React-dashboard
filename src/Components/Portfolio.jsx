/* eslint-disable react/prop-types */
import './Portfolio.css'
import { formatUS } from '../assets/functions'
import PortfolioCard from './PortfolioCard'
import { useContext } from 'react'
import { CoinsDataContext } from '../context/CoinsDataProvider'
import PortfolioPieChart from './PortfolioPieChart'

export default function Portfolio({ assetsList }) {

    let portfolioCoinList = [];

    const { coinPrice } = useContext(CoinsDataContext)

    if (assetsList.length > 0) {
        assetsList.forEach(wallet => {
            wallet?.sourceAssets.forEach(coin => {
                if (portfolioCoinList.some(coinObj => coinObj.name === coin.name)) {  //already existing coin in portolioCoinList  
                    const extPortfolioCoinList = portfolioCoinList.map(coinObj => {
                        if (coinObj.name === coin.name) {
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

    
    let totalCoin = 0
    let totalValue = 0
    if (portfolioCoinList.length > 0) {
        totalValue = portfolioCoinList.map(coin => {
            totalCoin = coin.coinByWalletList.map(wallet => wallet.amount).reduce(
                (accumulator, currentValue) => accumulator + currentValue).toFixed(2)
                return (coinPrice(coin.symbol) * totalCoin)  //returns the total USD value of a given coin across all wallets
        }
        ).reduce((accumulator, currentValue) => accumulator + currentValue) //acumulates the different coins value in USD
    }
    const totalValueBtc= totalValue > 0 ? totalValue/coinPrice("btc") : 0


    return (
        <div className="flex w100">
            <div className='portfolio-coin-panel'>

                <div className='portfolio-total-panel'>
                    <div className='label'>TOTAL WORTH</div>
                    <p><span>$</span>{formatUS(totalValue.toFixed(2))}</p>
                    <div className='crypto'> {totalValueBtc} BTC </div>
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
                <PortfolioPieChart portfolioCoinList={portfolioCoinList}/>
            </div>
        </div>
    )
}