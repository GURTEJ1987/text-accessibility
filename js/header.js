function getCartItems()
{
    db.collection('cart_items').onSnapshot(
        (querySelector) => 
        {
            var itemsCount = 0;
            querySelector.forEach((doc) => {
                itemsCount += doc.data().quantity;
            });
           document.querySelector('.cart-item-number').innerText=itemsCount;
       })
}
getCartItems();