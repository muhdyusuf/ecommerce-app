import React, { useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import './Checkout.css'
import {LoginContext,UserContext} from './UserContext'

import { formValidation } from '../global-function/formValidation'


function Checkout() {

    const {user,updateUser}=useContext(UserContext)
    


    let navigate=useNavigate()
    if(user.checkout.length==0){
        navigate('/shop')
    }

    
    
   

   
   

    const allState={
        "Johor": [
            "Johor Bahru",
            "Tebrau",
            "Pasir Gudang",
            "Bukit Indah",
            "Skudai",
            "Kluang",
            "Batu Pahat",
            "Muar",
            "Ulu Tiram",
            "Senai",
            "Segamat",
            "Kulai",
            "Kota Tinggi",
            "Pontian Kechil",
            "Tangkak",
            "Bukit Bakri",
            "Yong Peng",
            "Pekan Nenas",
            "Labis",
            "Mersing",
            "Simpang Renggam",
            "Parit Raja",
            "Kelapa Sawit",
            "Buloh Kasap",
            "Chaah"
          ],
          "Kedah": [
            "Sungai Petani",
            "Alor Setar",
            "Kulim",
            "Jitra / Kubang Pasu",
            "Baling",
            "Pendang",
            "Langkawi",
            "Yan",
            "Sik",
            "Kuala Nerang",
            "Pokok Sena",
            "Bandar Baharu"
          ],
          "Kelantan": [
            "Kota Bharu",
            "Pangkal Kalong",
            "Tanah Merah",
            "Peringat",
            "Wakaf Baru",
            "Kadok",
            "Pasir Mas",
            "Gua Musang",
            "Kuala Krai",
            "Tumpat"
          ],
          "Melaka": [
            "Bandaraya Melaka",
            "Bukit Baru",
            "Ayer Keroh",
            "Klebang",
            "Masjid Tanah",
            "Sungai Udang",
            "Batu Berendam",
            "Alor Gajah",
            "Bukit Rambai",
            "Ayer Molek",
            "Bemban",
            "Kuala Sungai Baru",
            "Pulau Sebang",
            "Jasin"
          ],
          "Negeri Sembilan": [
            "Seremban",
            "Port Dickson",
            "Nilai",
            "Bahau",
            "Tampin",
            "Kuala Pilah"
          ],
          "Pahang": [
            "Kuantan",
            "Temerloh",
            "Bentong",
            "Mentakab",
            "Raub",
            "Jerantut",
            "Pekan",
            "Kuala Lipis",
            "Bandar Jengka",
            "Bukit Tinggi"
          ],
          "Perak": [
            "Ipoh",
            "Taiping",
            "Sitiawan",
            "Simpang Empat",
            "Teluk Intan",
            "Batu Gajah",
            "Lumut",
            "Kampung Koh",
            "Kuala Kangsar",
            "Sungai Siput Utara",
            "Tapah",
            "Bidor",
            "Parit Buntar",
            "Ayer Tawar",
            "Bagan Serai",
            "Tanjung Malim",
            "Lawan Kuda Baharu",
            "Pantai Remis",
            "Kampar"
          ],
          "Perlis": [
            "Kangar",
            "Kuala Perlis"
          ],
          "Pulau Pinang": [
            "Bukit Mertajam",
            "Georgetown",
            "Sungai Ara",
            "Gelugor",
            "Ayer Itam",
            "Butterworth",
            "Perai",
            "Nibong Tebal",
            "Permatang Kucing",
            "Tanjung Tokong",
            "Kepala Batas",
            "Tanjung Bungah",
            "Juru"
          ],
          "Sabah": [
            "Kota Kinabalu",
            "Sandakan",
            "Tawau",
            "Lahad Datu",
            "Keningau",
            "Putatan",
            "Donggongon",
            "Semporna",
            "Kudat",
            "Kunak",
            "Papar",
            "Ranau",
            "Beaufort",
            "Kinarut",
            "Kota Belud"
          ],
          "Sarawak": [
            "Kuching",
            "Miri",
            "Sibu",
            "Bintulu",
            "Limbang",
            "Sarikei",
            "Sri Aman",
            "Kapit",
            "Batu Delapan Bazaar",
            "Kota Samarahan"
          ],
          "Selangor": [
            "Subang Jaya",
            "Klang",
            "Ampang Jaya",
            "Shah Alam",
            "Petaling Jaya",
            "Cheras",
            "Kajang",
            "Selayang Baru",
            "Rawang",
            "Taman Greenwood",
            "Semenyih",
            "Banting",
            "Balakong",
            "Gombak Setia",
            "Kuala Selangor",
            "Serendah",
            "Bukit Beruntung",
            "Pengkalan Kundang",
            "Jenjarom",
            "Sungai Besar",
            "Batu Arang",
            "Tanjung Sepat",
            "Kuang",
            "Kuala Kubu Baharu",
            "Batang Berjuntai",
            "Bandar Baru Salak Tinggi",
            "Sekinchan",
            "Sabak",
            "Tanjung Karang",
            "Beranang",
            "Sungai Pelek"
          ],
          "Terengganu": [
            "Kuala Terengganu",
            "Chukai",
            "Dungun",
            "Kerteh",
            "Kuala Berang",
            "Marang",
            "Paka",
            "Jerteh"
          ],
          "Wilayah Persekutuan": [
            "Kuala Lumpur",
            "Labuan",
            "Putrajaya"
          ]
        }
 

    const [form,updateForm]=useState({
        firstName:true,
        lastName:true,
        emailAddress:true,
        phone:true,
        address:true,
        townCity:"Johor Bahru",
        stateProvince:"Johor",
        country:"Malaysia",
        postcodeZip:true,
        orderNote:"",

    })
    

    const getCity=()=>{
        if(form.stateProvince===true)return []
        else{
            return allState[form.stateProvince]
        }
    }
    
   
   
    const totalPrice=user.checkout.reduce((total,item)=>item.price*item.quantity+total
    ,0)
    const shippingPrice=user.checkout.reduce((total,item)=>8+total,0)
    const receiveBy=()=>{
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
        ]
        let minDate = new Date()
        minDate.setDate(minDate.getDate() + 5);
        let maxDate = new Date()
        maxDate.setDate(maxDate.getDate() + 8);
        minDate=`${minDate.getDate()} ${monthNames[minDate.getMonth()]}`
        maxDate=`${maxDate.getDate()} ${monthNames[maxDate.getMonth()]}`
       
        return [minDate,maxDate]
        

    }

    // function updateInput(e){
    //     const newForm={...form}
    //     switch (e.target.name){
    //         case "phone":{
    //             const regex=/^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/g
    //             const isTrue=regex.test(e.target.value)
    //             isTrue? newForm.phone=e.target.value:newForm.phone=false
    //             console.log(newForm.phone)

    //         }
    //         break;
    //         case "postcodeZip":{
    //             const regex=/\d{5}/g
    //             const isTrue=regex.test(e.target.value)
    //             isTrue? newForm.postcodeZip=e.target.value:newForm.postcodeZip=false
    //             console.log(newForm.postcodeZip)

    //         }
    //         break;
    //         case "stateProvince":{
    //             newForm.stateProvince=e.target.value
               
                
    //         }
    //         case "TownCity":{
    //             newForm.townCity=e.target.value

    //         }
    //         case "address":{
    //             newForm.address=e.target.value
                

    //         }

    //         break;
    //         case "emailAddress":{
    //             const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    //             let isTrue=regex.test(e.target.value)
    //             isTrue? newForm.emailAddress=e.target.value:newForm.emailAddress=false
    //             console.log(newForm.emailAddress)
                
    //         }

    //         break;
    //         case "firstName":{
    //             const regex=/^[a-z]+$/i
    //             let isTrue=regex.test(e.target.value)
    //             isTrue? newForm.firstName=e.target.value:newForm.firstName=false
    //             console.log(newForm.firstName)
                
    //         }
    //         break;
    //         case "lastName":{
    //             const regex=/^[a-z]+$/i
    //             let isTrue=regex.test(e.target.value)
    //             isTrue? newForm.lastName=e.target.value:newForm.lastName=false
    //             console.log(newForm)
                
    //         }
    //         break;
            





    //     }
    //     updateForm({...newForm})

    // }





    function updateInput(e){
        console.log(formValidation(e,form))
        

    }

    function placeOrder(){
        if(Object.values(form).some(item=>item===true)){
            let newForm=form
            Object.keys(newForm).map(item=>{
                if(newForm[item]==true){
                    newForm[item]=false
                }
            })
            updateForm({...newForm})
        }
    }

     
    



  return (
    <section>
        <div className='page-header'>
                <h1>Checkout</h1>
            </div>
        <div className="container">
            
            <div className="checkout-container">
                <div className="billing-form">
                    <h3>Billing address</h3>
                    <div className="billing-input">
                        <div className={form.firstName ? "input-item":`input-item invalid`} >
                        <label>First Name</label>
                        <input type="text" name="firstName" onBlur={(e)=>updateInput(e)}/>

                        </div>
                        <div className={form.lastName ? "input-item":`input-item invalid`} >
                        <label>Last Name</label>
                        <input type="text" name="lastName" onBlur={(e)=>updateInput(e)}/>

                        </div>
                        <div className={form.emailAddress ? "input-item span":`input-item invalid span`} >
                        <label>Email address</label>
                        <input type="text" name="emailAddress" onBlur={(e)=>updateInput(e)}/>

                        </div>
                        <div className={form.phone ? "input-item span":`input-item invalid span`} >
                        <label>Phone</label>
                        <input type="text" name="phone" onBlur={(e)=>updateInput(e)}/>

                        </div>
                        <div className={form.address ? "input-item span":`input-item invalid span`} >
                        <label>Address</label>
                        <input type="text" name="address" onBlur={(e)=>updateInput(e)}/>

                        </div>

                        <div className={form.country ? "input-item":`input-item invalid`} >
                        <label>Country</label>
                        <input type="text" name="country" onBlur={(e)=>updateInput(e)} value={form.country} readOnly />

                        </div>

                        <div className="input-item" >
                        <label>State/Province</label>
                        <select name="stateProvince" onChange={(e)=>updateInput(e)}>
                            {Object.keys(allState).map(item=>{
                                return(
                                    <option key={item} value={item} >{item}</option>

                                )
                                     

                            })}
                        </select>
                        

                        </div>

                        <div className="input-item" >
                        <label>City/Town</label>
                        <select name="TownCity" onChange={(e)=>updateInput(e)}>
                            {getCity().map(item=>{
                                return(
                                    <option key={item} value={item} >{item}</option>

                                )
                                     

                            })}
                        </select>
                        

                        </div>

                        <div className={form.postcodeZip ? "input-item":`input-item invalid`} >
                        <label>Postcode/Zip</label>
                        <input type="text" name="postcodeZip" onBlur={(e)=>updateInput(e)}/>

                        </div>
                        
                        
                        





                       
                    <div className="input-item span">
                    <label>Order Note</label>
                    <textarea type="text" name="orderNote" onBlur={(e)=>updateInput(e)}/>

                     </div>
                    
                    </div>
                    
                </div>
                <div className="your-order">
                        <div>
                            <h3>Your order</h3>
                        </div>
                        {user.checkout.map(item=>{
                            return(
                                <div className='checkout-list'>
                                    <p>{item.title} <span>x{item.quantity}</span></p>
                                    <p>RM{item.price}</p>

                                </div>
                            )
                        })}
                        <div className="subtotal">
                            <p>Subtotal</p>
                            <p className='col-primary'>RM {totalPrice}</p>
                        </div>
                        <div className="shipping">
                            <div>
                                <p>Shipping</p>
                                <p>{`Receive by ${receiveBy()[0]} - ${receiveBy()[1]}`}</p>
                            </div>
                            
                            <p>RM{shippingPrice}</p>
                           
                        </div>
                        <div className="order-total">
                            <h3>Order total</h3>
                            <p className='col-primary'>RM {totalPrice+shippingPrice}</p>
                        </div>
                        <div className="wallet">
                            <h3>E.Wallet</h3>
                            <div>
                            <p>balance</p>
                            <p className={user.wallet>=totalPrice+shippingPrice?"balance" :"balance kurang"}>
                              RM  {user.wallet}
                            </p> 
                            </div>
                            
                            
                        </div>
                        {user.wallet>=totalPrice+shippingPrice && (
                            <button onClick={placeOrder} className="btn-primary">Place Order</button>
                        )}
                         {user.wallet<totalPrice+shippingPrice && (
                            <button className="btn-primary">Top Up</button>
                        )}
                        
                        
                        
                    </div>

               
                
            </div>


        </div>
    </section>
  )
}

export default Checkout