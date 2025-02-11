import { formatUS } from '../assets/functions'
import './PortfolioCard.css'

export default function PortfolioCard() {


    return (
        <div className='portfolio-card-container'>
            <div className='portfolio-card-left-panel'>
                <div className='portfolio-card-coin'>
                    <img src="https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661" alt="" />
                    <div className='potfolio-coin-name-wrapper'>
                        Etherum
                        <span>ETC</span>
                    </div>
                </div>
                <div >
                    <div className='portfolio-coin-total-container'>
                        <p>Total: {formatUS("1523")}<span>USD</span></p>
                        <p className='portfolio-coin-total'>2.000135 <span>ETH</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}