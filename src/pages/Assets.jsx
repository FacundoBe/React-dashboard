import { useEffect, useState } from 'react'
import AssetsCard from '../Components/AssetsCard'
import CoinSourceForm from '../Components/CoinSourceForm'

export default function Assets() {

    const [assetsList, setAssetsList] = useState([])
    const [editAssetSourceId, setEditAssetSourceId] = useState("")

    useEffect(() => { // Read assetsList from local storage 
        const saved = localStorage.getItem("anonymousAssetList")
        if (saved) {
            const savedList = JSON.parse(saved)
            setAssetsList(savedList)
        }
    }, [])


    function saveAssetsList(newSource) {
        if (editAssetSourceId === "") {  // adding a nuew coin source
            setAssetsList(prevAssetsList => [...prevAssetsList, newSource])
        } else { // updating an edited existent coinsource
            setAssetsList(prevAssetsList => [...prevAssetsList.filter(source => source.name !== editAssetSourceId), newSource])
        }
    }

    useEffect(()=>{
        localStorage.setItem("anonymousAssetList", JSON.stringify(assetsList))  // Saves the assets list to local Storage
    },[assetsList])

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