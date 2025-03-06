/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { CoinsDataContext } from '../context/CoinsDataProvider'
import './PortfolioPieChart.css'


export default function PortfolioPieChart({portfolioCoinList}){

    const { coinPrice } = useContext(CoinsDataContext)

    
    const coinData = portfolioCoinList.map(coin => {
          const totalCoin = coin.coinByWalletList.map(wallet => wallet.amount).reduce(
            (accumulator, currentValue) => accumulator + currentValue)
            return {name:coin.name, symbol:coin.symbol, amount:totalCoin, value:coinPrice(coin.symbol)*totalCoin}
    })
    
    console.log(coinData)
    
    return(
        <h1>PieChart</h1>
    )

}