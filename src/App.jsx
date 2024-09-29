import React from 'react'
import Home from './Component/Home'
import About from './Component/About'
import {ManageContext} from './ContextAPI/index'

const App = () => {
  return (
    <>
      <ManageContext>
        <About/>
        <Home />
      </ManageContext>
    </>
  )
}

export default App
