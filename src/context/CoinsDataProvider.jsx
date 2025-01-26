/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import coinList from '../json'


export const CoinsDataContext = createContext()

export function CoinsDataProvider({ children }) {

    const [coinsData, setCoinsData] = useState([])
    
    useEffect(() => {
            // console.log("fetching data from coingecko") 
           // axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
           //     .then(res => setCoinsData(res.data))
           //     .catch(err => alert(err))

                setCoinsData(coinList)  // Mokup para evitar estar pidiendo a la Api durante el desarrollo **

        }, []) 


        function coinPrice(coinSymbol){
            if( coinsData.length > 0){
                return coinsData.find( coin => coin.symbol === coinSymbol).current_price
            }
            else return "Error fetching coin price"
        }

    return (
        <CoinsDataContext.Provider value={{ coinsData, coinPrice}}>
            {children}
        </CoinsDataContext.Provider>
    )
}