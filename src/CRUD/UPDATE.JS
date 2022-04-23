let userCart=[]

export function updateQuantity(item,operation){
    let index=userCart.findIndex(cart=> cart.id === item.id)
    if(index>=0){
        if(operation=="plus"){
            userCart[index].quantity+=1
        }
        else if(operation=="minus"){
            userCart[index].quantity-=1
        }
    }

}