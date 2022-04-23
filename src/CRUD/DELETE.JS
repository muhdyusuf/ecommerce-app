let userCart=[]
export function deleteCart(item){
    let newUser={...user}
    let userCart=newUser.cart
    
    item.map(item=>{
        let index=userCart.findIndex(cart=>cart.id===item.id)
        if(index>=0){
            userCart.splice(index,1)
        }
        
    })
    updateUser({...newUser})

}
let userLiked=[]

export function deleteLiked(item){
    let newUser={...user}
    let userLiked=newUser.liked
    
    item.map(item=>{
        let index=userLiked.findIndex(Liked=>Liked.id===item.id)
        if(index>=0){
            userLiked.splice(index,1)
        }
        
    })

    updateUser({...newUser})

}