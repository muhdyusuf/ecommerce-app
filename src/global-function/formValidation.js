
export const INPUTTYPE={
    PHONE:"phone",
    POSTCODEZIP:"postcodeZip",
    STATEPROVINCE:"stateProvince",
    TOWNCITY:"townCity",
    ADDRESS:"address",
    EMAILADDRESS:"emailAddress",
    FIRSTNAME:"firstName",
    LASNAME:"lastName",
    USERNAME:"userName"
}

export function formValidation(name,state){
    const newState={...state}
    let error=[]
    let isTrue

    if(state.value!==""){
        switch (name){
            case "phone":{
                const regex=/^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/g
                isTrue=regex.test(state.value)
          
                
            }
            break;
            case "postcodeZip":{
                const regex=/\d{5}/g
                isTrue=regex.test(state.value)
                
                
    
            }
            break;
            case "stateProvince":{
                newState.stateProvince=true
               
                
            }
            case "TownCity":{
                newState.townCity=true
    
            }
            case "address":{
                newState.address=true
                
            }
    
            break;
            case "emailAddress":{
                const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                isTrue=regex.test(state.value)
                isTrue? newState.emailAddress=state.value:newState.emailAddress=false
                
                
            }
    
            break;
            case "firstName":{
                const regex=/^[a-z]+$/i
                isTrue=regex.test(state.value)
               
            
                
            }
            break;
            case "lastName":{
                const regex=/^[a-z]+$/i
                isTrue=regex.test(state.value)
               
                
            }
            break;
            case "userName":{
                if(/^[a-z]+_?[0-9a-z]*$/i.test(state.value)){
                  isTrue=true
                }
                else{
                    error.push("username should start with letter and end with letter or number,only one underscore allowed")
                    newState.userName=false
                }
    
            }
            
    
        }

    }
    else{
        error.push("cannot leave input empty")
    }
  

    

    isTrue? newState.isValid=true:newState.isValid=false
     return {...newState,error}

}