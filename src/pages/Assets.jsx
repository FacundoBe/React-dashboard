/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'
import './Assets.css'
import WalletCard from '../Components/WalletCard'
import CoinSourceForm from '../Components/CoinSourceForm'

export default function Assets({ assetsList, callSetAssetsList }) {

    const [editAssetSourceId, setEditAssetSourceId] = useState("")
    const [isFormVisible, setIsFormVisible] = useState(false)
    const importDataInputRef = useRef()

    function saveAssetsList(newSource) {
        if (editAssetSourceId === "") {  // adding a new coin source
            callSetAssetsList(prevAssetsList => [...prevAssetsList, newSource])
        } else { // updating an edited existent coinsource
            callSetAssetsList(prevAssetsList => [newSource, ...prevAssetsList.filter(source => source.name !== editAssetSourceId)])
        }
    }

    function cleanEditAssetSourceId() {
        setEditAssetSourceId("")
    }

    function hideCoinSourceForm() {
        setIsFormVisible(false)
    }

    function editWallet(name) {
        setEditAssetSourceId(name)
        setIsFormVisible(true)
    }

    function deleteWallet(name) {
        callSetAssetsList(prevAssetsList => prevAssetsList.filter(wallet => wallet.name !== name))
    }


    function handleExportFile() {
        const backupAssetsList = "assetsBackup" + JSON.stringify(assetsList) //add a string to validate file as assets backup
        const blob = new Blob([backupAssetsList], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = "PortfolioBackup.bak"
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    function handleImportFile(e) {
        const file = e.target.files[0]
        if (file.name.split('.').pop() === "bak") {//verifies thet the extension is .bak
            const reader = new FileReader()
            reader.readAsText(file);
            reader.onloadend = () => {
                if (reader.result.slice(0, 12) === "assetsBackup") { //veryfies that the file has the initial string "assetsBackup"
                    const cleanAssetsList = reader.result.slice(12) //removes th initial string added only for verification porpouses
                    localStorage.setItem("anonymousAssetList", cleanAssetsList)  // Saves the imported assets list to local Storage
                    callSetAssetsList(JSON.parse(cleanAssetsList)) // reseto la assetslist with the data imported from e backup file
                }
                else {
                    alert("This file is no a valid cryptofolio Backup file")
                }
            }


        }
        else alert("This file is no a valid cryptofolio Backup file")
        e.target.value = "" //clean the input after loading the file
    }


    return (
        <div className={`flex w100`}>

            <CoinSourceForm assetsList={assetsList}
                saveAssetsList={saveAssetsList}
                editAssetSourceId={editAssetSourceId}
                cleanEditAssetSourceId={cleanEditAssetSourceId}
                isFormVisible={isFormVisible}
                hideCoinSourceForm={hideCoinSourceForm}
            />
            <div className={`wallet-cards-container ${editAssetSourceId !== "" ? "disabled" : ""}`}>
                <div className={`wallets-container-disabled ${editAssetSourceId !== "" ? "active" : ""}`}>
                </div>
                <button
                    type='button'
                    className='new-wallet-button'
                    onClick={() => setIsFormVisible(prev => !prev)}

                >Add Wallet
                </button>
                {assetsList.length > 0 &&
                    assetsList.map(source =>
                        <WalletCard
                            key={source.name}
                            disabled={editAssetSourceId !== ""}
                            source={source}
                            editWallet={editWallet}
                            deleteWallet={deleteWallet}
                        />)
                }
                <div className='save-data-container'>


                    <button
                        type='button'
                        className='export-data-button'
                        onClick={() => handleExportFile()}
                    >
                        <svg  className='save-data-svg' width="32" height="29" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line opacity="1" y1="27.5" x2="32" y2="27.5" stroke="white" stroke-width="3" />
                            <path opacity="1" d="M17.0607 0.93934C16.4749 0.353553 15.5251 0.353553 14.9393 0.93934L5.3934 10.4853C4.80761 11.0711 4.80761 12.0208 5.3934 12.6066C5.97919 13.1924 6.92893 13.1924 7.51472 12.6066L16 4.12132L24.4853 12.6066C25.0711 13.1924 26.0208 13.1924 26.6066 12.6066C27.1924 12.0208 27.1924 11.0711 26.6066 10.4853L17.0607 0.93934ZM16 24L17.5 24L17.5 2L16 2L14.5 2L14.5 24L16 24Z" fill="white" />
                        </svg>
                        {/* <img className='data-icon' src="export-data-icon.svg" alt="" /> */}
                        <span>Export Data</span>
                    </button>

                    <button
                        type='button'
                        className='import-data-button'
                        onClick={() => { importDataInputRef.current.click() }}
                    >
                        <svg className='save-data-svg' width="32" height="29" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line opacity="1" y1="27.5" x2="32" y2="27.5" stroke="white" stroke-width="3" />
                            <path opacity="1" d="M14.9493 23.0607C15.5351 23.6464 16.4849 23.6464 17.0707 23.0607L26.6166 13.5147C27.2024 12.9289 27.2024 11.9792 26.6166 11.3934C26.0308 10.8076 25.0811 10.8076 24.4953 11.3934L16.01 19.8787L7.52473 11.3934C6.93894 10.8076 5.98919 10.8076 5.40341 11.3934C4.81762 11.9792 4.81762 12.9289 5.40341 13.5147L14.9493 23.0607ZM16.01 0L14.51 -6.55671e-08L14.51 22L16.01 22L17.51 22L17.51 6.55671e-08L16.01 0Z" fill="white" />
                        </svg>
                        {/* <img className='data-icon' src="import-data-icon.svg" alt="" /> */}
                        <span>Import Data</span>
                    </button>
                    <input
                        className='import-data-input-hiden'
                        type="file" accept='.bak'
                        ref={importDataInputRef}
                        onChange={(e) => handleImportFile(e)}
                    />

                </div>

            </div>
        </div>
    )
}