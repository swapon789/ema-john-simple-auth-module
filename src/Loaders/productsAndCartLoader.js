import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // get products
    const productsData = await fetch('Product.json');
    const products = await productsData.json();

    // get cart 
    
    const savedCart = getStoredCart();
    const innitialCart = [];
    console.log( 'savedcart', savedCart);
    for (const id in savedCart){
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            innitialCart.push(addedProduct);
        }
        
    }

    return {products: products, innitialCart:innitialCart }
}