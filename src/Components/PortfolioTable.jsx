/* eslint-disable react/prop-types */
import './PortfolioTable.css'

export default function PortfolioTable({ coinByWalletList, price }) {

    if (coinByWalletList.length === 0) return //early return for empty assets array

    return (

        <div className="portfolio-table-container flex-column">
            <div className="portfolio-table-header">
                <span className="portfolio-header-left flex left">Wallet / Exchange</span>
                <span className="portfolio-header-right flex right ">Funds</span>
                <span className="portfolio-header-right flex right ">Value</span>
                <div className="grid-divider">  </div>
            </div>

            {coinByWalletList.map((wallet) => (
                <div key={wallet.wallet} className="portfolio-table-row">
                    <div className="portfolio-wallet-name ">
                        {wallet.wallet}
                    </div>
                    <div className="portfolio-table-funds flex right ">{wallet.amount}</div>
                    <div className="portfolio-table-value flex right "> <p>{(wallet.amount * price).toFixed(2)} <span>USD</span></p></div>
                    <div className="grid-divider">  </div>
                </div>))}
        </div>


    )
}