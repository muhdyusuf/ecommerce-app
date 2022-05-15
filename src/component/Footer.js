import React from 'react'
import{FaFacebookF,FaInstagram,FaTwitter,FaPinterest} from 'react-icons/fa'

export default function Footer() {
  return (
      <footer>
          
          <div className="middle">
              <h1>E-shop<span className='col-primary'>.</span></h1>
              <p>"mockup use only"</p>
              <div className="footer-nav">
                  
              </div>
          </div>
          <div className="right">
              <FaFacebookF className='footer-icon'/>
              <FaInstagram className='footer-icon'/>
              <FaTwitter className='footer-icon'/>
              <FaPinterest className='footer-icon'/>

          </div>
      </footer>

  )
}
