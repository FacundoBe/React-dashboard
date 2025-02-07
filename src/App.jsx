import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import './Components/common.css'
import LayOut from './Components/LayOut'
import Portfolio from './Components/Portfolio'
import Assets from './pages/Assets'
import Markets from './pages/Markets'
import Watchlist from './pages/WatchList'


function App() {
  const [assetsList, setAssetsList] = useState([])

  useEffect(() => { // Read assetsList from local storage 
    const saved = localStorage.getItem("anonymousAssetList")
    if (saved) {
      const savedList = JSON.parse(saved)
      setAssetsList(savedList)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("anonymousAssetList", JSON.stringify(assetsList))  // Saves the assets list to local Storage
  }, [assetsList])

  function callSetAssetsList(assetList){
    setAssetsList(assetList)
  }  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut />}>
            <Route index element={<Portfolio assetsList={assetsList}  />} />
            <Route path='/assets' element={<Assets assetsList={assetsList} callSetAssetsList={callSetAssetsList} />} />
            <Route path='/markets' element={<Markets />} />
            <Route path='/watchlist' element={<Watchlist />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
