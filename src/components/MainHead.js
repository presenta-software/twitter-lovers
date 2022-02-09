
const MainHead = () => {
  return (
    <div className='mainHead'>
      <div className='left'>
        <h1>
          <span className='alt'>Twitter </span>
          <span className='alt'>Lovers</span>
          <span className='main'> Card </span>
          <span className='main'>Generator</span>
        </h1>
      </div>

      <div className='right'>
        <img alt='example' src={window.MOCK_URL + '?w=600'} />
      </div>
    </div>
  )
}

export default MainHead
