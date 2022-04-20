import React from 'react'
import { useNavigate } from 'react-router-dom'

function PromoBox({backroundImg,justifyContent,alignItem,translate,text,button,navigation}) {
 const navigate=useNavigate()
 const BoxStyle={
     background:`url(${backroundImg}) center/cover no-repeat `,
     display:"flex",
     alignItem:alignItem? alignItem:"center",
     justifyContent:justifyContent? justifyContent:"center",
     height:"100%",
     width:"100%"

    
 }
 const ContentStyle={
    transform:translate?`translate(${translate[0]},${translate[1]})`:"translate(0)"
 }
 const BTN_STYLE={
     width:"50%",
     background:"transparent",
     textDecoration:"underline",
     padding:"1rem"

 }
  return (
    <div style={BoxStyle} >
        <div style={ContentStyle}>
            <p className="promo-title">
                {text}
            </p>
            <button style={BTN_STYLE} onClick={()=>navigate(navigation)}>{button}</button>



        </div>


    </div>
  )
}

export default PromoBox