import './App.css'
import { useState } from 'react'

import MainHead from './components/MainHead'
import Showcase from './components/Showcase'
import Footer from './components/Footer'
import Form from './components/Form'
import Card from './components/Card'
import Copy from './components/Copy'
import Error from './components/Error'

function App () {
  const [showError, setShowError] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showName1, setShowName1] = useState(false)
  const [showName2, setShowName2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleBegin = () => {
    setShowError(false)
    setShowCard(false)
    setIsLoading(true)
  }

  const handleAction = (url, n1, n2) => {
    setShowCard(url)
    setShowName1(n1)
    setShowName2(n2)
    setIsLoading(false)
  }

  const handleError = (msg) => {
    setShowError(msg)
    setIsLoading(false)
  }

  return (
    <div className='App'>

      <MainHead />
      <Showcase />
      <Form
        onHandleAction={handleAction}
        onHandleError={handleError}
        onBeginAction={handleBegin}
      />

      {showError && <Error message={showError} />}

      <Card url={showCard} loading={isLoading} />
      {showCard && <Copy url={showCard} name1={showName1} name2={showName2} />}

      <Footer />

    </div>
  )
}

export default App
