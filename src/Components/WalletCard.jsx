/* eslint-disable react/prop-types */
import { useContext } from 'react'
import AssetsTable from './AssetsTable'
import { ButtonIcon } from './ButtonIcon'
import './WalletCard.css'
import WalletPieChart from './WalletPieChart'
import { CoinsDataContext } from '../context/CoinsDataProvider'

export default function WalletCard({ source, editWallet, deleteWallet }) {

const {coinPrice} = useContext(CoinsDataContext)

 
    const chartData = source.sourceAssets.map(coin => ({ name:coin.symbol.toUpperCase() , value:coinPrice(coin.symbol)*coin.amount })) 
    const totalValue = chartData.map(coin => coin.value).reduce(
        (accumulator, currentValue) => accumulator + currentValue).toFixed(2)
    const tableData = source.sourceAssets.map(coin => ({...coin, ratio: coinPrice(coin.symbol)*coin.amount/totalValue*100 })) 

        console.log(tableData)

    return (
        <div className='wallet-card-container'>
            <div className='wallet-card-name'>
                {source.name}
                <br/>
                USD {totalValue}
                <div className='flex'>
                    <ButtonIcon type={"edit"} onClick={() => editWallet(source.name)} />
                    <ButtonIcon type={"clear"} onClick={()=> deleteWallet(source.name)} />
                </div>
            </div>
            <div className='wallet-card-list'>
                <AssetsTable myCoinsData={source.sourceAssets} editable={false} />
            </div>
            <WalletPieChart data={chartData}/>
        </div>
    )
}