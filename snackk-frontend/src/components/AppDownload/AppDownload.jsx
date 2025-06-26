import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () =>{
  return(
    <div className='app-download' id='app-download'>
      <p>Keep Feasting & Munching<br/>Download The <span className='snackk-app'>Snackk App</span> Now !</p>
      <div className='app-download-platforms'>
        <img src={assets.play_store} alt="PlayStore"/>
        <img src={assets.app_store} alt="AppStore"/>
      </div>
    </div>
  )
}
export default AppDownload