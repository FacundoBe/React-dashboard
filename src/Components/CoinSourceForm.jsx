/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import axios from "axios"
import SelectSearch from "./SelectSearch"
import './CoinSourceForm.css'
import { ButtonIcon } from "./ButtonIcon";
import coinList from '../json'
import AssetsTable from "./AssetsTable";


export default function CoinSourceForm({ assetsList, saveAssetsList, cleanEditAssetSourceId, editAssetSourceId, isFormVisible, hideCoinSourceForm }) {
    const [isSourceNameSet, setIsSourceNameSet] = useState(false)
    const [formData, setFormData] = useState({ sourceName: "", sourceAdress: "", selectedOption: "", amount: "" })
    const [myCoinsData, setMyCoinsData] = useState([])

    const coinToEditRef = useRef(undefined)
    const coinListRef = useRef(undefined)
    const amountInputRef = useRef(null)
    const animatedRowSymbolRef = useRef(undefined)
    const selectSearchHandle = document.getElementById("coin-select") //** 



    useEffect(() => {
        //console.log("fetching data from coingecko") / ** esto hay que subirlo mas arriba en la cadena de componentes y pasarlo por props
        //axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        //    .then(res => coinListRef.current = res.data)
        //    .catch(err => alert(err))
    }, [])

    if (animatedRowSymbolRef.current?.render === 1) animatedRowSymbolRef.current = undefined // cleaning the ref to avoid animetions after the first render   
    if (animatedRowSymbolRef.current?.render === 0) animatedRowSymbolRef.current.render = 1 // this is the first render afer modifyng or adding a coin




    const options = coinList.map(coin => ({ label: coin.name, value: { name: coin.name, image: coin.image, symbol: coin.symbol } }))

    // Sets the form according to new source o editing existing source case
    useEffect(() => {
        if (editAssetSourceId === "") {  // new source input
            setFormData(prev => ({ ...prev, selectedOption: options[0] }))
            setMyCoinsData([])
        }
        else { // editing existing source
            const sourceToEdit = assetsList.find(source => source.name === editAssetSourceId)
            setFormData({ sourceName: sourceToEdit.name, sourceAdress: sourceToEdit.adress, selectedOption: "", amount: "" })
            setMyCoinsData(sourceToEdit.sourceAssets)
            setIsSourceNameSet(true)
        }
    }
        , [assetsList, editAssetSourceId])


    function handleSelectedOption(option) {
        setFormData(prev => ({ ...prev, selectedOption: option }))
        amountInputRef.current.focus();
    }

    function handleChange(e) {
        const id = e.target.id
        const value = e.target.value
        setFormData(prevFormData => ({ ...prevFormData, [id]: value }))
    }

    function handleClear() { // Clears all the form
        setFormData(prev => ({ ...prev, sourceName: "", sourceAdress: "" }))
        setMyCoinsData([])
        setIsSourceNameSet(false)
        cleanEditAssetSourceId()
        hideCoinSourceForm()
    }

    function handleSubmitName(e) {
        e.preventDefault()
        if (editAssetSourceId === "") {  //new coin source
            if (assetsList.find(source => source.name === formData.sourceName)) { //Early return if the name is already used 
                alert("Wallet / Exchange name already used, please pick a different name")
                return
            }
        }
        if (formData.sourceName !== "") setIsSourceNameSet(true)
    }

    function handleCancelEditCoin() { // clear the coin - amount part of the form and the coinToEditRef reference
        coinToEditRef.current = undefined
        setFormData(prevFormData => ({ ...prevFormData, amount: "", selectedOption: options[0] })) //resets form data SelectSearch and Amount states
    }

    function handleSubmitCoin(e) {
        e.preventDefault()

        if (formData.selectedOption === "") return alert("Select a Coin")
        if (formData.amount === "") return alert("Coin amount required") //** should also add validation for positive float numbers

        const coinName = formData.selectedOption.label
        const coinImage = formData.selectedOption.value.image
        const coinSymbol = formData.selectedOption.value.symbol
        const coinAmount = Number.parseFloat(formData.amount)


        if (coinToEditRef.current !== undefined) {// editing existing coin
            const updatedCoinList = myCoinsData.map(coin => {
                if (coin.name !== coinToEditRef.current) return coin
                else return { ...coin, amount: coinAmount }
            })
            setMyCoinsData(updatedCoinList)
            setFormData(prevFormData => ({ ...prevFormData, amount: "", selectedOption: options[0] })) //resets form data SelectSearch and Amount states
            coinToEditRef.current = undefined
            animatedRowSymbolRef.current = { render: 0, symbol: coinSymbol } // set the ref to animate the coin row 
        }
        else if (!isNaN(formData.amount) && Number(formData.amount) > 0) { // Checks that the input is a positive number

            if (myCoinsData.find(coin => coin.name === coinName) === undefined) {  // add the coin if it is not already in the coin list

                setMyCoinsData(prev => [{ name: coinName, symbol: coinSymbol, image: coinImage, amount: coinAmount }, ...prev])
            }
            else { // if the coin already exists the amounts of this new input is added to the previous amount value.
                setMyCoinsData(prev => prev.map(coin => {
                    if (coin.name !== coinName) return coin
                    else return { ...coin, amount: coin.amount + coinAmount }
                }))
            }
            setFormData(prevFormData => ({ ...prevFormData, amount: "", selectedOption: options[0] }))
            animatedRowSymbolRef.current = { render: 0, symbol: coinSymbol } // set the ref to animate the coin row 
            selectSearchHandle.focus()
        }
    }

    function handleDeleteCoin(name) {
        setMyCoinsData(prev => prev.filter((coin => coin.name !== name)))
    }

    function handleEditCoin(name, amount) {
        coinToEditRef.current = name
        const index = options.findIndex(option => option.label === name)
        setFormData(prev => ({ ...prev, selectedOption: options[index], amount: amount }))
        amountInputRef.current.focus()
    }

    function handleFinishEntry(e) {
        e.preventDefault()
        const sourceData = { name: formData.sourceName, adress: formData.sourceAdress, sourceAssets: myCoinsData }
        saveAssetsList(sourceData)
        handleClear()
        if (editAssetSourceId !== "") cleanEditAssetSourceId()
    }

    return (
        <div className={`coin-source-container ${isFormVisible ? "visible" : ""}`}>
            <div className="form-header">
                {!editAssetSourceId ?
                    "Here you can Add your Wallet/Exchange and Cryptocurrency information. Then you can follow them in your Portfolio"
                    : "Edit your Wallet/Exchange Assets"}
            </div>
            <div className="form-divider-hor">  </div>
            <img  className="arrow-down" src="arrow-down.svg" alt="arrow pointing to the inputs" />
            <form className="w100" onSubmit={handleSubmitName}>
                {!isSourceNameSet &&
                    <div className="coin-source-form">
                        <label htmlFor="sourceName">Type the Wallet/Exchange name</label>
                        <input type="text"
                            id="sourceName"
                            className="input"
                            value={formData.sourceName}
                            onChange={(e) => handleChange(e)}
                            placeholder="Binanace, Metamask..." 
                            maxLength="15"
                        />
                        <label htmlFor="sourceAdress">Type the Wallet/Exchange adress (optional)</label>
                        <input type="text" id="sourceAdress"
                            className="input"
                            value={formData.sourceAdress}
                            onChange={(e) => handleChange(e)}
                            placeholder="www.Binanace.com/sdefd8575..." />
                        <div className="form-controls">
                            <button type="button" className="cancel-btn" onClick={handleClear}>Cancel</button>
                            <button type="submit" className="ok-btn">Next</button>
                        </div>
                    </div>
                }
            </form>
            {isSourceNameSet &&

                <div className="coin-assets-form">
                    <form className="w100" onSubmit={handleSubmitCoin}>
                        <div className="flex-col left">
                            <label htmlFor="coin-select">Coin</label>
                            <SelectSearch
                                style={{ alignSelf: "stretch" }}
                                disabled={coinToEditRef.current}
                                id="coin-select"
                                options={options}
                                selectedOption={formData.selectedOption}
                                onChange={handleSelectedOption} />
                        </div>
                        <div className="flex-col left">
                            <label htmlFor="amount"> Amount </label>
                            <input id="amount"
                                className="input"
                                ref={amountInputRef}
                                value={formData.amount}
                                onChange={(e) => handleChange(e)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="submit-coin-container">
                            {coinToEditRef.current && <ButtonIcon type="clear" onClick={handleCancelEditCoin} />}
                            <ButtonIcon type="check" onClick={handleSubmitCoin} />
                        </div>
                    </form>

                    <div className="wallet-name flex">{formData.sourceName}</div>

                    {
                        <div className="assets-table-container w100" >
                            <AssetsTable
                                myCoinsData={myCoinsData}
                                editable
                                handleEditCoin={handleEditCoin}
                                handleDeleteCoin={handleDeleteCoin}
                                animatedRowSymbol={animatedRowSymbolRef.current}
                            />
                        </div>
                    }

                    <form className="form-controls" onSubmit={(e) => handleFinishEntry(e)}>
                        {editAssetSourceId === "" ?
                            <button type="button" className="cancel-btn" onClick={() => setIsSourceNameSet(false)}>
                                Back
                            </button>
                            : <button type="button" className="cancel-btn" onClick={handleClear}>Cancel</button>
                        }
                        <button type="submit" className="ok-btn" >
                            Finish
                        </button>
                    </form>
                </div>
            }
        </div>

    )
}
