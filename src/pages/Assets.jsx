import { useState } from 'react'
import AssetsCard from '../Components/AssetsCard'
import CoinSourceForm from '../Components/CoinSourceForm'

export default function Assets() {

    const [assetsList, setAssetsList] = useState([])
    const [editAssetSourceId, setEditAssetSourceId] = useState("")

    console.log(editAssetSourceId)

    function saveAssetsList(newSource) {
        if (editAssetSourceId === "") {  // adding a nuew coin source
            setAssetsList(prevAssetsList => [...prevAssetsList, newSource])
        } else { // updating an edited existent coinsource
            setAssetsList(prevAssetsList => [...prevAssetsList.filter(source => source.name !== editAssetSourceId), newSource])
        }
    }

    function cleanEditAssetSourceId() {
        setEditAssetSourceId("")
    }

    function editSource(name) {
        setEditAssetSourceId(name)
    }


    return (
        <div className='flex'>
            <CoinSourceForm assetsList={assetsList}
                saveAssetsList={saveAssetsList}
                editAssetSourceId={editAssetSourceId}
                cleanEditAssetSourceId={cleanEditAssetSourceId}
            />
            <div>
                {assetsList.length > 0 &&
                    assetsList.map(source => <AssetsCard key={source.name} source={source} editSource={editSource} />)
                }
            </div>
        </div>
    )
}