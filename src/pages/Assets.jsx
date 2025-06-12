/* eslint-disable react/prop-types */
import { useState } from 'react'
import './Assets.css'
import WalletCard from '../Components/WalletCard'
import CoinSourceForm from '../Components/CoinSourceForm'

export default function Assets({ assetsList, callSetAssetsList }) {

    const [editAssetSourceId, setEditAssetSourceId] = useState("")
    const [isFormVisible, setIsFormVisible] = useState(false)

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
                    >Export Data
                    </button>
                    <button
                        type='button'
                        className='import-data-button'
                        onClick={() => { }}
                    >Import Data
                    </button>
                    <input type="file" accept='.bak' onChange={(e) => handleImportFile(e)} />
                </div>

            </div>
        </div>
    )
}