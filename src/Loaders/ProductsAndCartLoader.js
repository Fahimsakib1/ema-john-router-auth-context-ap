import { getStoredCart } from "../utilities/LocalStorage";

export const productsAndCartLoader = async () => {
    //get products data
    const productsData = await fetch('products.json');
    const products = await productsData.json(); //products hocche array of objects

    //get cart from local storage..
    const savedCart = getStoredCart();
    
    // console.log("Saved Cart ekta object", savedCart);
    // console.log("products  ekta array", products);

    const initialCart = [];

    for(const id in savedCart){
        // console.log(id);
        const addedProduct = products.find(product => product.id === id);
        console.log(id, addedProduct);
        //find return kore object and filter return kore array
        
        if(addedProduct){
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }

    return { products, initialCart };

}