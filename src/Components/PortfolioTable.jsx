/* eslint-disable react/prop-types */
import './PortfolioTable.css'

export default function PortfolioTable({ coinByWalletList }) {

    if (coinByWalletList.length === 0) return //early return for empty assets array

    return (

        <div className="portfolio-table-container flex-column w100">
            <div className="portfolio-table-header">
                <span className="portfolio-header-left flex">Wallet / Exchange</span>
                <span className="portfolio-header-right flex right ">Funds</span>
                <div className="grid-divider">  </div>
            </div>

            {coinByWalletList.map((wallet) => (
                <div key={wallet.wallet} className="portfolio-table-row">
                    <div className="portfolio-wallet-name ">
                        {wallet.wallet}
                    </div>
                    <div className="portfolio-table-funds flex right ">{wallet.amount}</div>
                    <div className="grid-divider">  </div>
                </div>))}
        </div>


    )
}