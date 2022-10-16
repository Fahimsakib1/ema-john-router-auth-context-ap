//use Local Storage to manage cart data
const AddToLocalStorageWithObject = (id) => {
    let shoppingCart;
    
    //get the shopping cart from local storage
    const cartStoredAtLocalStorage = JSON.parse(localStorage.getItem('shopping-cart'));
    console.log(cartStoredAtLocalStorage);
    if (cartStoredAtLocalStorage) {
        // shoppingCart = JSON.parse(cartStoredAtLocalStorage);
        shoppingCart = cartStoredAtLocalStorage;
    }

    else{
        shoppingCart = {};
    }

    let quantity = shoppingCart[id];
    if(quantity){
        const newQuantity = quantity + 1;
        shoppingCart[id] = newQuantity;
    }
    else{
        shoppingCart[id] = 1;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    
}



// Ei function ta Shop.js er moddhe use kora hoiche
const getStoredCart  = () => {
    
    let shoppingCart = {};
    //get the shopping cart from local storage
    const cartStoredAtLocalStorage = JSON.parse(localStorage.getItem('shopping-cart'));
    if (cartStoredAtLocalStorage) {
        shoppingCart = cartStoredAtLocalStorage;
    }
    return shoppingCart;
}





const removeItemFromLocalStorage = (id) => { 
    //get the shopping cart
    const cartStoredAtLocalStorage = JSON.parse(localStorage.getItem('shopping-cart'));

    if(cartStoredAtLocalStorage){
        console.log(cartStoredAtLocalStorage);
        if (id in cartStoredAtLocalStorage){
            console.log(id);
            delete cartStoredAtLocalStorage[id];
            localStorage.setItem('shopping-cart', JSON.stringify(cartStoredAtLocalStorage));
            
        }
        else{
            alert("ID is Not Available in Local Storage");
        }
    }

    else{
        alert("Shopping Cart is Not Available in Local Storage");
    }
}


const deleteAllFromLocalStorage = () => {
    const cartStoredAtLocalStorage = JSON.parse(localStorage.getItem('shopping-cart'));

    if(cartStoredAtLocalStorage){
        // 2 tai same kaj korbe.. j kono 1 ta dilei kaj hobe
        localStorage.clear();
        // localStorage.removeItem('shopping-cart');
    }
    else{
        alert("No Data is Added in Local Storage");
    }
}

export {AddToLocalStorageWithObject,getStoredCart,removeItemFromLocalStorage,deleteAllFromLocalStorage}