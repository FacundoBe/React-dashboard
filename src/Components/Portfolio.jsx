import './Portfolio.css'
import { formatUS } from '../assets/functions'
import PortfolioCard from './PortfolioCard'

export default function Portfolio() {


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
                <PortfolioCard/>
                </div>
            </div>
            <div className='portfolio-chart-panel'>
                Coins Graph
            </div>
        </div>
    )
}