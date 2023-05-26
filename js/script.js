function getItems()
{
var aMazon_items = [];
db.collection("items").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        aMazon_items.push({
            id:doc.id,
            image:doc.data().image,
            name:doc.data().name,
            make:doc.data().make,
            rating:doc.data().rating,
            price:doc.data().price
        });
    });
    generateItems(aMazon_items);
});
}
getItems();
function addTocart(aMazon_item)
{
var cartItems = db.collection("cart_items").doc(aMazon_item.id);
cartItems.get().then(
function(doc)
{
    if(doc.exists)
    {
        cartItems.update(
            {
                quantity: doc.data().quantity + 1
            }
        )
    }
    else
    {
        cartItems.set({
            image : aMazon_item.image,
            make : aMazon_item.make,
            name : aMazon_item.name,
            price : aMazon_item.price,
            rating : aMazon_item.rating,
            quantity : 1
        })
    }

});
}

function generateItems(aMazon_items)
{    var innerAmazonhtml = "";
    aMazon_items.forEach((aMazon_item) =>{ 
    let doc = document.createElement("div");
    var addTocartbtn = document.createElement("div");      
    doc.classList.add("main-products","mr-5");                     
    doc.innerHTML +=`<div tabindex ="0" class="product-image w-48 h-52 rounded-lg bg-white p-4">
     <img aria-label="${aMazon_item.name}" class="w-full h-full object-contain" src="${aMazon_item.image}"/>
    </div>
    <div  tabindex ="0" class="product-name  mt-2 text-sm">
      <strong>${aMazon_item.name}</strong>
    </div>
    <div  tabindex ="0" class="product-make product-make-color">
      ${aMazon_item.make}
    </div>
    <div  tabindex ="0" class="product-rating flex">        
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <title>Start Icon</title>
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>  
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <title>Start Icon</title>
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>  
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <title>Start Icon</title>
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>                                      
      <span class="product-rating-color">${aMazon_item.rating}</span>                                                
    </div>  
    <div  tabindex ="0" class="product-price  product-make-color">
      ${numeral((aMazon_item.price)).format('$10,000.00')}
    </div>  `
    addTocartbtn.classList.add("add-to-cart","cursor-pointer","w-28","h-8","cart-total-button-accessibility","rounded-full","flex","justify-center","items-center","hover:bg-yellow-600");
    addTocartbtn.innerText= "Add to Cart";
    addTocartbtn.addEventListener("click",function(){
        addTocart(aMazon_item);
    });
    doc.appendChild(addTocartbtn);
    document.querySelector(".main-section-products").appendChild(doc);
});
}



