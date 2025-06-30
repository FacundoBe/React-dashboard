import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import './Components/common.css'
import LayOut from './Components/LayOut'
import Portfolio from './Components/Portfolio'
import Assets from './pages/Assets'
import Markets from './pages/Markets'
import Watchlist from './pages/WatchList'
import TradingViewWidget from './Components/TradingViewWidget'


function App() {
  const [assetsList, setAssetsList] = useState([])
  const [favList, setFavList] = useState([])

  useEffect(() => { // Read assetsList from local storage 
    const saved = localStorage.getItem("anonymousAssetList")
    if (saved) {
      const savedList = JSON.parse(saved)
      setAssetsList(savedList)
    }
  }, [])
  
  useEffect(() => { // Read assetsList from local storage 
    const savedFav = localStorage.getItem("anonymousFavList")
    if (savedFav) {
      const savedList = JSON.parse(savedFav)
      setFavList(savedList)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("anonymousAssetList", JSON.stringify(assetsList))  // Saves the assets list to local Storage
  }, [assetsList])

  useEffect(() => {
    localStorage.setItem("anonymousFavList", JSON.stringify(favList))  // Saves the Favorites list to local Storage
  }, [favList])

  function callSetAssetsList(assetList) {
    setAssetsList(assetList)
  }

  function toogleFavorite(symbol) {
    if (!favList.includes(symbol)) {
      setFavList(prevState => [...prevState, symbol])
    }
    else {
      setFavList(prevState => prevState.filter(element => element !== symbol))
    }
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut />}>
            <Route index element={<Portfolio assetsList={assetsList} />} />
            <Route path='/assets' element={<Assets assetsList={assetsList} callSetAssetsList={callSetAssetsList} />} />
            <Route path='/markets' element={<Markets favList={favList} toogleFavorite={toogleFavorite} />} />
            <Route path='/coins/:symbol' element={<TradingViewWidget/>} />
            <Route path='/watchlist' element={<Watchlist />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
