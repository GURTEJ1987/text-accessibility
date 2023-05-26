function getSnapshotCartItemsOrder()
{
    db.collection('cart_items').onSnapshot(
        (querySelector) => 
        {
            var cArt_snapshot_Items = [];
            querySelector.forEach((doc) => {
                cArt_snapshot_Items.push({
                    id:doc.id,...doc.data()
                })
            });
           generateCartOrder(cArt_snapshot_Items);
           generateTotalPrice(cArt_snapshot_Items);
       })
}

function generateTotalPrice(cArt_snapshot_Items)
{    var tOtal_price = 0 ;
      cArt_snapshot_Items.forEach(
        (eAch_price_item) =>
        {
            tOtal_price +=  (eAch_price_item.quantity) * (eAch_price_item.price);
        }
    )
    document.querySelector(".total-price").innerHTML = numeral(tOtal_price).format('$10,000.00');  
}
function generateCartOrder(cArt_snapshot_Items)
{
            var itemsHtml="";
            var cArt_Item = "";
            var iTem_delete_cart  =""; 
            var cArt_items = document.createElement("div");
            cArt_items.classList.add("cart-items"); 
            document.querySelector(".list_cart_items").appendChild(cArt_items);              
            cArt_snapshot_Items.forEach(
            (doc) => 
            {
                iTem_delete_cart  =""; 
                itemsHtml +=`<div class="cart-item flex items-center justify-center grid grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5"> 
                        <div tabindex ="0" class="cart-item-image w-48 h-52 rounded-lg bg-white sm:w-1/4 md:w-2/4 lg:w-3/4 xl:w-3/4">
                        <img  aria-label="${doc.name}" class="w-3/4 h-3/4 object-contain sm:w-1/4 md:w-2/4 lg:w-3/4 xl:w-3/4" src="${doc.image}"/>
                        </div>
                        <div class="cart-item-detail">
                        <div tabindex ="0" class="cart-item-title text-center sm:text-left text-sm md:text-left text-sm lg:text-base xl:text-base">${doc.name}</div>
                        <div tabindex ="0" class="cart-item-brand text-center sm:text-left md:text-left">${doc.make}</div>
                        </div>  
                        <div class="cart-item-count flex cursor-pointer sm:text-left md:text-left">
                        <div data-id="${doc.id}" class="cart-item-decrease bg-gray-200 rounded border-opacity-75 hover:bg-gray-400"><</div>
                        <div tabindex ="0" class="item-count cart-silver-accessibility ml-1 mr-1">${doc.quantity}</div>
                        <div data-id="${doc.id}" class="cart-item-increase bg-gray-200 rounded hover:bg-gray-400 cursor-pointer">></div>
                        </div>   
                        <div tabindex ="0" class="cart-item-total-cost">${numeral((doc.quantity * doc.price)).format('$10,000.00')}</div>
                        <div  data-id="${doc.id}" class="cart-item-delete cart-silver-accessibility h-5 w-5 cursor-pointer hover:text-red-600">
                        X </div>
                        </div></div>  `
                        document.querySelector(".cart-items").innerHTML=itemsHtml;
                        createEventListener();                                     
                }                
                )
                                       
}
getSnapshotCartItemsOrder();

function dElete_cart_item(iTem_delete_cart_id)
{
db.collection("cart_items").doc(iTem_delete_cart_id).delete();
}



function Decrease_item_count(cart_item_id)
{
var iTem_exist_or_not = db.collection("cart_items").doc(cart_item_id);
iTem_exist_or_not.get().then(function(existance_check)
{
if(existance_check.exists)
{
if(existance_check.data().quantity > 1)
{
    iTem_exist_or_not.update({
        quantity: existance_check.data().quantity - 1
    })
}
}
}
)
}

function Increase_item_count(cart_item_id)
{
var iTem_exist_or_not = db.collection("cart_items").doc(cart_item_id);
iTem_exist_or_not.get().then(

    (iTem_check)=>
    {
        if(iTem_check.exists)
        {
            iTem_exist_or_not.update(
                {
                    quantity: iTem_check.data().quantity + 1
                }
            )
        }
    }

)

}

function createEventListener()
{
    var dEcrease_item_buttons=document.querySelectorAll(".cart-item-decrease");
    var iNcrease_item_buttons=document.querySelectorAll(".cart-item-increase");
    var dElete_cart_item_buttons = document.querySelectorAll(".cart-item-delete");
    dEcrease_item_buttons.forEach(
        (l_r_button)=>
        {      
            l_r_button.addEventListener("click",
            function()
            {
                Decrease_item_count(l_r_button.dataset.id);

            })
        }
    )
    iNcrease_item_buttons.forEach(
        (l_r_button)=>
        {
            l_r_button.addEventListener("click",
            function()
            {
                Increase_item_count(l_r_button.dataset.id);
            }) 
        }
    )
    dElete_cart_item_buttons.forEach(
    (dEl_button)=>
    {
        dEl_button.addEventListener("click",
                             function()
                             {
                                 dElete_cart_item(dEl_button.dataset.id);

                             }
                        ); 
    }
    )
}

