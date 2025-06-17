/* eslint-disable react/prop-types */
import { useContext } from 'react'
import AssetsTable from './AssetsTable'
import { ButtonIcon } from './ButtonIcon'
import './WalletCard.css'
import WalletPieChart from './WalletPieChart'
import { CoinsDataContext } from '../context/CoinsDataProvider'

export default function WalletCard({ disabled = false, source, editWallet, deleteWallet }) {

    const { coinPrice } = useContext(CoinsDataContext)
    const currecyFormater = new Intl.NumberFormat("en-US", {   //currency formater setted fo US locale
        style: "currency",
        currency: "USD",
    })

    let totalValue = "0" // initialize totalValue
    let chartData = []

    if (source.sourceAssets.length > 0) { // values are calculated only if there are assets loaded in the wallet/exchange
        chartData = source.sourceAssets.map(coin => ({ name: coin.symbol.toUpperCase(), value: coinPrice(coin.symbol) * coin.amount }))
        totalValue = chartData.map(coin => coin.value).reduce(
            (accumulator, currentValue) => accumulator + currentValue).toFixed(2)
        //const tableData = source.sourceAssets.map(coin => ({ ...coin, ratio: coinPrice(coin.symbol) * coin.amount / totalValue * 100 }))
    }

    return (
        <div className='wallet-card-container'>
            <div className='wallet-card-name'>
                {source.name}
                <div className='wallet-card-total'>
                    <div className='flex'>Net worth</div>
                    <p>{currecyFormater.format(totalValue)}</p>
                </div>
            </div>
            <div className='flex wallet-card-controls'>
                <ButtonIcon disabled={disabled} type={"edit"} onClick={() => editWallet(source.name)} />
                <ButtonIcon disabled={disabled} type={"clear"} onClick={() => deleteWallet(source.name)} />
            </div>
            <div className='wallet-card-list-and-pie-container'>
                <div className='wallet-card-list'>
                    <AssetsTable myCoinsData={source.sourceAssets} editable={false} />
                </div>
                <WalletPieChart data={chartData} className="wallet-card-pie" totalValue={totalValue} />
            </div>
        </div>
    )
}

