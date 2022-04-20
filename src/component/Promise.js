import React from 'react'
import {GrDeliver} from 'react-icons/gr'
import{AiOutlineCreditCard} from 'react-icons/ai'
import {BiSupport} from 'react-icons/bi'
import {BsArrowLeftRight} from 'react-icons/bs'

function Promise() {
  return (
    <div className="home-promise">
            <div>
            <GrDeliver className='promise-icon'/>
            <div className="icon-label">
                <h4>Free Delivery</h4>
            <p>For Order Over 99$</p>

            </div>
        
            </div>
            <div>
            <BsArrowLeftRight className='promise-icon'/>
            <div className="icon-label">
                <h4>30 Days Return</h4>
            <p>If Goods Have Problem</p>
            </div>
        

            </div>
            <div>
            <AiOutlineCreditCard className='promise-icon'/>
            <div className="icon-label">
                <h4>Secure Payment</h4>
                <p>100% Secure Payment</p>
            </div>
            </div>
            <div>
            <BiSupport className='promise-icon'/>
            <div className="icon-label">
            <h4 >24/7 Support</h4>
            <p>Dedicated Support</p>
            </div>

            </div>

   </div>
  )
}

export default Promise