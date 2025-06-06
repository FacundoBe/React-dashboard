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

    console.log(isFormVisible)

    return (
        <div className={`flex w100`}>
            <button
                type='button'
                className='new-wallet-button'
                onClick={() => setIsFormVisible(prev => !prev)}
            >Add New Wallet</button>
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

            </div>
        </div>
    )
}