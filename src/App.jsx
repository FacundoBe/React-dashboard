import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import './Components/common.css'
import LayOut from './Components/LayOut'
import Portfolio from './Components/Portfolio'
import Assets from './pages/assets'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut/>}>
            <Route index element={<Portfolio/>}/>
            <Route path='/assets' element={<Assets/>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
