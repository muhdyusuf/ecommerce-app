let userCart=[]
export function addToCart(item){
    item.map(item=>{
        let index=userCart.findIndex(cart=>cart.id===item.id)
        if(index===-1){
            userCart.push(item)
        }
        else{
            userCart[index].quantity+=item.quantity
        }
    })
}
let userLiked=[]

export default function addToLiked(item){
    let newUser={...user}
    let userLiked=[]
    item.map(item=>{
        let index=newUser.liked.findIndex(liked=>liked.id===item.id)
        if(index===-1){
            userLiked.push(item)
        }
        
    })
    newUser.liked=userLiked
    updateUser({...newUser})

}