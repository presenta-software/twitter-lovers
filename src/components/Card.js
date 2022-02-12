import Loader from './Loader.js'

const Card = ({ url, loading }) => {
  return (
    <div className='wrapper'>
      <div className='card'>
        <div className='inner'>
          {url && <img alt='Twitter-Lovers Card' src={url + '?w=700'} />}
          {(!loading && !url) && <p>Empty</p>}
          {loading && <Loader />}
        </div>
      </div>
    </div>
  )
}

export default Card
