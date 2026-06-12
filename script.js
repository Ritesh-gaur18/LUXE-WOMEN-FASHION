const products = [
{
id:1,
name:"Banarasi Saree",
price:3999,
image:"https://picsum.photos/300/400?random=1"
},
{
id:2,
name:"Designer Suit",
price:2499,
image:"https://picsum.photos/300/400?random=2"
},
{
id:3,
name:"Printed Kurti",
price:999,
image:"https://picsum.photos/300/400?random=3"
},
{
id:4,
name:"Bridal Lehenga",
price:8999,
image:"https://picsum.photos/300/400?random=4"
},
{
id:5,
name:"Party Dress",
price:1799,
image:"https://picsum.photos/300/400?random=5"
},
{
id:6,
name:"Denim Jeans",
price:1499,
image:"https://picsum.photos/300/400?random=6"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsContainer =
document.getElementById("products");

const cartItems =
document.getElementById("cart-items");

const cartCount =
document.getElementById("cart-count");

const cartTotal =
document.getElementById("cart-total");

function displayProducts(data){

productsContainer.innerHTML="";

data.forEach(product=>{

productsContainer.innerHTML += `
<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>
`;

});
}

function addToCart(id){

const product =
products.find(item=>item.id===id);

const existing =
cart.find(item=>item.id===id);

if(existing){

existing.qty++;

}else{

cart.push({
...product,
qty:1
});

}

saveCart();
}

function renderCart(){

cartItems.innerHTML="";

let total=0;

cart.forEach(item=>{

total += item.price * item.qty;

cartItems.innerHTML += `
<div class="cart-item">


<div>
<h4>${item.name}</h4>
<p>₹${item.price}</p>
</div>

<div class="controls">

<button onclick="decreaseQty(${item.id})">
-
</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${item.id})">
+
</button>

<button
class="remove"
onclick="removeItem(${item.id})">
Delete
</button>

</div>

</div>
`;

});

cartCount.textContent =
cart.reduce((sum,item)=>sum+item.qty,0);

cartTotal.textContent = total;
}

function increaseQty(id){

const item =
cart.find(product=>product.id===id);

item.qty++;

saveCart();
}

function decreaseQty(id){

const item =
cart.find(product=>product.id===id);

if(item.qty>1){

item.qty--;

}else{

cart =
cart.filter(product=>product.id!==id);

}

saveCart();
}

function removeItem(id){

cart =
cart.filter(product=>product.id!==id);

saveCart();
}

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

renderCart();
}

document
.getElementById("search")
.addEventListener("input",e=>{

const keyword =
e.target.value.toLowerCase();

const filtered =
products.filter(product=>
product.name
.toLowerCase()
.includes(keyword)
);

displayProducts(filtered);

});

displayProducts(products);
renderCart();