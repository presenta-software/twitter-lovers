import { useState, useRef } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import scaleValue from './utils/scaleValue'
dayjs.extend(relativeTime)

const Form = ({ onBeginAction, onHandleAction, onHandleError }) => {
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [btnLabel, setBtnLabel] = useState('Create!')
  const tfUsername1 = useRef()
  const tfUsername2 = useRef()

  const handleGenerate = async e => {
    setBtnLabel('Generating...')
    onBeginAction()
    setBtnDisabled(true)

    tfUsername1.current.blur()
    tfUsername2.current.blur()

    try {
      const res = await axios(`${process.env.REACT_APP_PRESENTA_SERVICE_URL}?screen_name=${tfUsername1.current.value},${tfUsername2.current.value}`)
      const img = res.data
      onHandleAction(img.url)
    } catch (e) {
      onHandleError('Fix or try with other Usernames.')
    }

    setBtnLabel('Create!')
    setBtnDisabled(false)
  }

  const handleTyping = e => {
    const v1 = tfUsername1.current.value
    const v2 = tfUsername2.current.value
    if (v1.length > 0 && v2.length > 0) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }

  return (
    <div className='wrapper'>
      <div className='form'>

        <div class='r'>
          <span>@</span><input placeholder='First Twitter Username' ref={tfUsername1} type='text' onChange={handleTyping} />
        </div>

        <div class='r'>
          <span>@</span><input placeholder='Second Twitter Username' ref={tfUsername2} type='text' onChange={handleTyping} />
        </div>

        <button disabled={btnDisabled} onClick={handleGenerate}>{btnLabel}</button>

      </div>
    </div>
  )
}

export default Form
