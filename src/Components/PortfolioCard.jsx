/* eslint-disable react/prop-types */
import { formatUS } from '../assets/functions'
import PortfolioTable from './PortfolioTable'
import './PortfolioCard.css'
import { useContext } from 'react'
import { CoinsDataContext } from '../context/CoinsDataProvider'

export default function PortfolioCard({ portfolioCoin }) {
    const { coinByWalletList } = portfolioCoin

    const { coinPrice } = useContext(CoinsDataContext)

    let totalCoin = 0
    let totalValue = 0
    if (coinByWalletList.length > 0) {
        totalCoin = coinByWalletList.map(coin => coin.amount).reduce(
            (accumulator, currentValue) => accumulator + currentValue).toFixed(2)
        totalValue = (coinPrice(portfolioCoin.symbol) * totalCoin).toFixed(2)
    }

    return (
        <>{
            coinByWalletList.length > 0 &&
            <div className='portfolio-card-container'>
                <div className='portfolio-card-left-panel'>
                    <div className='portfolio-card-coin'>
                        <img src={portfolioCoin.image} alt="" />
                        <div className='potfolio-coin-name-wrapper'>
                            {portfolioCoin.name}
                            <span>{portfolioCoin.symbol.toUpperCase()}</span>
                        </div>
                    </div>
                    <div >
                        <div className='portfolio-coin-total-container'>
                            <p className='portfolio-coin-total'>{totalCoin} <span>{portfolioCoin.symbol.toUpperCase()}</span></p>
                            <p>Total: {formatUS(totalValue)}<span> USD</span></p>
                        </div>
                    </div>
                </div>
                <PortfolioTable coinByWalletList={coinByWalletList} price={coinPrice(portfolioCoin.symbol)} />
            </div>
        }</>
    )
}