export  const FAKEUSERAPI= new Promise(resolve=>{
    let user={
        id:"123456789",
        userName:"",
        name:"",
        phone:"",
        emailAddress:"",
        address:{
          firstName:"",
          lastName:"",
          address:"",
          city:"",
          state:"",
          country:"",
        },
        wallet:100,
        checkout:[],
        cart:[],
        liked:[]
    }
    setTimeout(resolve(user),1000)

})

