/* eslint-disable react/prop-types */
import { useContext } from 'react'
import AssetsTable from './AssetsTable'
import { ButtonIcon } from './ButtonIcon'
import './WalletCard.css'
import WalletPieChart from './WalletPieChart'
import { CoinsDataContext } from '../context/CoinsDataProvider'
import { formatUS } from '../assets/functions'

export default function WalletCard({ disabled = false, source, editWallet, deleteWallet }) {

    const { coinPrice } = useContext(CoinsDataContext)

    const chartData = source.sourceAssets.map(coin => ({ name: coin.symbol.toUpperCase(), value: coinPrice(coin.symbol) * coin.amount }))
    const totalValue = chartData.map(coin => coin.value).reduce(
        (accumulator, currentValue) => accumulator + currentValue).toFixed(2)
    //const tableData = source.sourceAssets.map(coin => ({ ...coin, ratio: coinPrice(coin.symbol) * coin.amount / totalValue * 100 }))


    return (
        <div className='wallet-card-container'>

            <div className='wallet-card-name'>
                <div >
                    {source.name}
                    <div className='wallet-card-total'>
                        <div className='flex'>Net worth</div>
                        <p><span>$</span>{formatUS(totalValue)}</p>
                    </div>
                </div>
            </div>
            <div className='flex wallet-card-controls'>
                <ButtonIcon disabled={disabled} type={"edit"} onClick={() => editWallet(source.name)} />
                <ButtonIcon disabled={disabled} type={"clear"} onClick={() => deleteWallet(source.name)} />
            </div>

            <div className='wallet-card-list'>
                <AssetsTable myCoinsData={source.sourceAssets} editable={false} />
            </div>
            <WalletPieChart data={chartData} className="wallet-card-pie" totalValue={totalValue} />

        </div>
    )
}

