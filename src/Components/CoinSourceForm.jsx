import { useState, useRef, useEffect } from "react";
import axios from "axios"
import SelectSearch from "./SelectSearch"
import './CoinSourceForm.css'
import { ButtonIcon } from "./ButtonIcon";
import coinList from '../json'


export default function CoinSourceForm() {

    const [formData, setFormData] = useState({ sourceName: "", selectedOption: "", amount: 0 })
    const [coinsData, setCoinsData] = useState([{ coin: "Eth", amount: 55 }, { coin: "Btc", amount: 0.001 }])

    const coinListRef = useRef(undefined)

    useEffect(() => {
        //console.log("fetching data from coingecko")
        //axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        //    .then(res => coinListRef.current = res.data)
        //    .catch(err => alert(err))
    }, [])

    const options = coinList.map(coin => ({label: coin.name, value:{name:coin.name, image:coin.image, symbol:coin.symbol }}))

    useEffect(()=> {
        setFormData(prev => ({...prev, selectedOption:options[0]})
    )}
    , [])


    function handleSelectedOption(option) {
        setFormData(prev => ({ ...prev, selectedOption: option }))
    }

    function handleChange(e) {
        const id = e.target.id
        const value = e.target.value
        setFormData(prevFormData => ({ ...prevFormData, [id]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    console.log(coinsData)

    return (
        <div className="coin-source-container">
            <form className="coin-source-form" onSubmit={handleSubmit}>
                <div className="flex left">
                    <label htmlFor="sourceName">Wallet/Exchange</label>
                    <input type="text" id="sourceName" value={formData.sourceName} onChange={(e) => handleChange(e)} placeholder="Binanace, Metamask..." />

                </div>
                <div className="coin-info">
                    <div className="flex-col left">
                        <label htmlFor="coin-select">Coin</label>
                        <SelectSearch id="coin-select" options={options} selectedOption={formData.selectedOption} onChange={handleSelectedOption} />
                    </div>
                    <div className="flex-col left">
                        <label htmlFor="amount"> Amount </label>
                        <input id="amount" type="number" value={formData.amount} onChange={(e) => handleChange(e)} />
                    </div>
                    <ButtonIcon type="check" />
                    <ButtonIcon type="clear" />
                </div>
                <div className="form-controls">
                    <button type="submit"> Save </button>
                    <button type="button"> Cancel </button>
                </div>
            </form>
            {coinsData.length > 0 &&
                <div>
                    {coinsData.map(coin => (<div key={coin.coin} className="flex" style={{ gap: "10px", padding: "10px" }}>
                        <div> {coin.coin} </div>
                        <div>{coin.amount}</div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>))}
                </div>}
        </div>
    )
}
