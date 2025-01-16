import { useState, useRef, useEffect } from "react";
import axios from "axios"
import SelectSearch from "./SelectSearch"
import './CoinSourceForm.css'
import { ButtonIcon } from "./ButtonIcon";
import coinList from '../json'


export default function CoinSourceForm() {
    const [isSourceNameSet, setIsSourceNameSet] = useState(false)
    const [formData, setFormData] = useState({ sourceName: "", selectedOption: "", amount: "" })
    const [coinsData, setCoinsData] = useState([])

    const coinToEditRef = useRef(undefined)
    const coinListRef = useRef(undefined)
    const amountInputRef = useRef(null)
    const selectSearchHandle = document.getElementById("coin-select")

    useEffect(() => {
        //console.log("fetching data from coingecko")
        //axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        //    .then(res => coinListRef.current = res.data)
        //    .catch(err => alert(err))
    }, [])

    const options = coinList.map(coin => ({ label: coin.name, value: { name: coin.name, image: coin.image, symbol: coin.symbol } }))

    useEffect(() => {
        setFormData(prev => ({ ...prev, selectedOption: options[0] })
        )
    }
        , [])


    function handleSelectedOption(option) {

        setFormData(prev => ({ ...prev, selectedOption: option }))
        amountInputRef.current.focus();
    }

    function handleChange(e) {
        const id = e.target.id
        const value = e.target.value
        setFormData(prevFormData => ({ ...prevFormData, [id]: value }))
    }


    function handleClear() {
        setFormData({ sourceName: "", selectedOption: "", amount: "" })
    }

    function handleSubmitName(e) {
        e.preventDefault()
        if (formData.sourceName !== "") setIsSourceNameSet(true)
    }

    function handleSubmitCoin(e) {
        e.preventDefault()
        console.log(coinToEditRef.current)
        if (coinToEditRef.current !== undefined ) {// editing existing coin
            const updatedCoinList = coinsData.map(coin => {
                if (coin.name !== coinToEditRef.current) return coin
                else return {...coin, amount: formData.amount}
            })
            setCoinsData(updatedCoinList)
            setFormData(prevFormData => ({ ...prevFormData, amount: "", selectedOption: options[0] }))
            coinToEditRef.current = undefined
        }
        else if (!isNaN(formData.amount) && Number(formData.amount) > 0) { // Checks that th input is a positive number
            setCoinsData(prev => [...prev, { name: formData.selectedOption.label, image: formData.selectedOption.value.image, amount: formData.amount }])
            setFormData(prevFormData => ({ ...prevFormData, amount: "" }))
            selectSearchHandle.focus()
        }
    }

    function handleDeleteCoin(name) {
        setCoinsData(prev => prev.filter((coin => coin.name !== name)))
    }

    function handleEditCoin(name, amount) {
        coinToEditRef.current = name
        const index = options.findIndex(option => option.label === name)
        setFormData(prev => ({ ...prev, selectedOption: options[index], amount: amount }))
    }

    return (
        <div className="coin-source-container">

            <form className="coin-source-form" onSubmit={handleSubmitName}>
                {!isSourceNameSet &&
                    <div>
                        <div className="flex" >
                            <label htmlFor="sourceName">Wallet/Exchange</label>
                            <input type="text" id="sourceName" value={formData.sourceName} onChange={(e) => handleChange(e)} placeholder="Binanace, Metamask..." />
                        </div>
                        <button type="button" onClick={handleClear}>Clear</button>
                        <button type="submit">Continue</button>
                    </div>
                }
            </form>
            {isSourceNameSet &&
                <div>
                    <div>{formData.sourceName}</div>
                    <form onSubmit={handleSubmitCoin}>
                        <div className="coin-info">
                            <div className="flex-col left">
                                <label htmlFor="coin-select">Coin</label>
                                <SelectSearch id="coin-select" options={options} selectedOption={formData.selectedOption} onChange={handleSelectedOption} />
                            </div>
                            <div className="flex-col left">
                                <label htmlFor="amount"> Amount </label>
                                <input id="amount"
                                    ref={amountInputRef}
                                    value={formData.amount}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <ButtonIcon type="check" onClick={handleSubmitCoin} />
                        </div>
                    </form>

                    {coinsData.length > 0 &&
                        <div>
                            {coinsData.map(coin => (
                                <div key={coin.name} className="flex" style={{ gap: "10px", padding: "10px" }}>
                                    <img src={coin.image} className="coin-img" />
                                    <div> {coin.name} </div>
                                    <div>{coin.amount}</div>
                                    <button onClick={() => handleEditCoin(coin.name, coin.amount)}>Edit </button>
                                    <button onClick={() => handleDeleteCoin(coin.name)}>Delete</button>
                                </div>))}
                        </div>}

                    <div className="form-controls">
                        <button type="button" onClick={() => setIsSourceNameSet(false)}> Back </button>
                        <button type="submit"> Finish </button>
                    </div>
                </div>
            }
        </div>

    )
}
