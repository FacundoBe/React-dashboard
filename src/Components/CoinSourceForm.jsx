import { useState } from "react";
import SelectSearch from "./SelectSearch"
import './CoinSourceForm.css'

const options = [
    { value: 1, label: "Bitcoin" },
    { value: 2, label: "Ether" },
    { value: 3, label: "Tron" },
    { value: 4, label: "Xrp" },
]

export default function CoinSourceForm() {

    const [selectedOption, setSelectedOption] = useState(options[0])


    return (
        <div className="coin-source-container">
            <form className="coin-source-form">
                <div className="flex-col left">
                    <label htmlFor="source-input">Wallet/Exchange</label>
                    <input type="text" id="source-input" />
                </div>
                <div className="coin-info">
                    <div className="flex-col left">
                        <label htmlFor="coin-select">Coin</label>
                        <SelectSearch id="coin-select" options={options} selectedOption={selectedOption} onChange={val => setSelectedOption(val)} />
                    </div>
                    <div className="flex-col left">
                        <label htmlFor="coin-amount-input"> Amount </label>
                        <input id="coin-amount-input" type="number" />
                    </div>
                    <svg fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <svg className="clear-coin-btn" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
       

                </div>
            </form>
        </div>
    )
}
