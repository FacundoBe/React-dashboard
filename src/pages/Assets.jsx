/* eslint-disable react/prop-types */
import { useState } from 'react'
import './Assets.css'
import WalletCard from '../Components/WalletCard'
import CoinSourceForm from '../Components/CoinSourceForm'

export default function Assets({assetsList, callSetAssetsList}) {

    const [editAssetSourceId, setEditAssetSourceId] = useState("")

    function saveAssetsList(newSource) {
        if (editAssetSourceId === "") {  // adding a nuew coin source
          callSetAssetsList(prevAssetsList => [...prevAssetsList, newSource])
        } else { // updating an edited existent coinsource
          callSetAssetsList(prevAssetsList => [newSource, ...prevAssetsList.filter(source => source.name !== editAssetSourceId)])
        }
      }

    function cleanEditAssetSourceId() {
        setEditAssetSourceId("")
    }

    function editWallet(name) {
        setEditAssetSourceId(name)
    }

    function deleteWallet(name) {
        callSetAssetsList(prevAssetsList => prevAssetsList.filter(wallet => wallet.name !== name))
    }

    return (
        <div className={`flex w100`}>
            <CoinSourceForm assetsList={assetsList}
                saveAssetsList={saveAssetsList}
                editAssetSourceId={editAssetSourceId}
                cleanEditAssetSourceId={cleanEditAssetSourceId}
            />
            <div className={`wallet-cards-container ${editAssetSourceId !== "" && "disabled" }`}>
                <div className={ `wallets-container-disabled ${editAssetSourceId !== "" && "active" }`  }>
                </div>
                {assetsList.length > 0 &&
                    assetsList.map(source =>
                        <WalletCard
                            key={source.name}
                            disabled={editAssetSourceId !== ""}
                            source={source}
                            editWallet={editWallet}
                            deleteWallet={deleteWallet} />)
                }

            </div>
        </div>
    )
}