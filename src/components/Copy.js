import { useState } from 'react'
import copyClipboard from './utils/copyClipboard'
import axios from 'axios'

const Copy = ({ url, name1, name2 }) => {
  const [btnCopyLabel, setBtnCopyLabel] = useState('Copy sharable URL')
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = async e => {
    setBtnCopyLabel('Creating URL... ⏱')
    const ob = {
      title: `${name1} and ${name2} @ Twitter-Lovers`,
      url: 'https://twitter-lovers.presenta.cc',
      image: url,
      description: 'Twitter-Lovers allows to generate a personal card using public info of a Twitter couple',
      site: 'Twitter-Lovers'
    }

    const obstr = JSON.stringify(ob)
    const obstrb = btoa(obstr)
    const fullurl = process.env.REACT_APP_BASE_SERVICE_URL + obstrb

    const shrtnrUrl = process.env.REACT_APP_SHORTNER_SERVICE_URL
    const shortRes = await axios(shrtnrUrl, {
      method: 'POST',
      body: JSON.stringify({ url: fullurl })
    })
    const short = shortRes.data

    if (!short.url) {
      console.log('error', short)
      return
    }

    copyClipboard(shrtnrUrl + short.url)
    setBtnCopyLabel('👉 Copied! 👈')
    setCopied(shrtnrUrl + short.url)
  }

  const twUrl = 'https://twitter.com/intent/tweet?text=Check this Github-Since Card:&url=' + copied

  return (
    <div className='cta'>
      <p><a href={url} target='_blank' rel='noreferrer'>Download the image</a> or</p>
      <button onClick={handleCopyUrl}>{btnCopyLabel}</button>
      {copied && <p>Share on <a target='_blank' href={twUrl} rel='noreferrer'>Twitter</a></p>}
    </div>
  )
}

export default Copy
