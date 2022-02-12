
const MainHead = () => {
  return (
    <div className='mainHead'>
      <div className='left'>
        <h1>
          <span className='alt'>Twitter </span>
          <span className='alt'>Lovers</span>
        </h1>
        <p>
          <span className='main'>Graphic Card Generator for Twitter couples</span>
        </p>
      </div>

      <div className='right'>
        <img alt='example' src={window.MOCK_URL + '?w=600'} />
      </div>
    </div>
  )
}

export default MainHead
