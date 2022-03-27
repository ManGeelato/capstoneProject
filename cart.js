/* plagiarism declaration 
Please Note: I used the same project I submitted on my capstone project Task 7 with HTML and CSS. 
I now added javascript functionality */
// I got help from this site creating this catalogue page, link below:
// https://www.smashingmagazine.com/2014/02/create-client-side-shopping-cart/


let carts = document.querySelectorAll('.add-item');

let allProducts = [
    {
        name: 'Ipad',
        tag: 'Iphone Ipad',
        price: 3000,
        freeDelivery: 'Yes',
        incart: 0,
        freeDelivery: 'Yes',
        discount: 500,
        VAT: 1.15
    },
    {
        name: 'Joysticks',
        tag: 'Gaming Joysticks',
        freeDelivery: 'Yes',
        price: 1500,
        incart: 0,
        freeDelivery: 'Yes',
        discount: 500,
        VAT: 1.15
    },
    {
        name: 'Virtual Reality',
        tag: 'Virtual Reality Box',
        freeDelivery: 'NO',
        price: 1000,
        incart: 0,
        freeDelivery: 'Yes',
        discount: 500,
        VAT: 1.15
    },
    {
        name: 'Iphone Watch',
        tag: 'Iphone Smart Watch',
        price: 2000,
        incart: 0,
        freeDelivery: 'Yes',
        discount: 500,
        VAT: 1.15
    },
    {
        name: 'Smart Watch',
        tag: 'Normal Smart Watch',
        price: 600,
        incart: 0,
        freeDelivery: 'Yes',
        discount: 500,
        VAT: 1.15
    },
]

//when catalogue page is loaded, we call this function setting the number
// of items in the cart from localStorage
function onLoadCataloguePage(){
    let cartAmount = localStorage.getItem('cartItems');

    if(cartAmount){
        document.querySelector(".cart span").textContent = cartAmount;
    }
}

// each time we add something to cartItems, we need to automatically increase the number of items
for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        addToCart(allProducts[i]); //calling addToCart method
        productCosts(allProducts[i]); //calling productCosts method
    });
}

//function to add items in the cart
function addToCart(product){
    let cartAmount = localStorage.getItem('cartItems'); //showing in numbers
    cartAmount = parseInt(cartAmount);

    if(cartAmount){
        localStorage.setItem('cartItems', cartAmount + 1);
        document.querySelector('.cart span').textContent = cartAmount + 1;
        alert(parseInt(cartAmount + 1)); //showing on page
    }else{
        localStorage.setItem('cartItems', 1);
        document.querySelector('.cart span').textContent = 1;
        alert(cartAmount + 1); //showing on page
    }
    setProductItem(product);
}

// function to set eachh product item 
function setProductItem(product){
    let cartItems = localStorage.getItem('cartProducts');//showing as objects
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems, [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }else{
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('cartProducts',JSON.stringify(cartItems)); //converting javascript object to a JSON string
    console.log('Cart items are now:  ', cartItems); //showing on console total items in cart
}

// function to calculate item price
function productCosts(product){
    let productPrice = localStorage.getItem('cartCosts'); //showing total amount

    if(productPrice != null){
        productPrice = parseInt(productPrice);
        localStorage.setItem('cartCosts', productPrice + product.price);
    }else{
        localStorage.setItem('cartCosts', product.price);
    }
    console.log('Price is', product.price); //showing on console, price of each product added
}

// function to display cart items
function getCartItems(){
    const cartBox = document.querySelector('.cartBox');
    let cartItems = localStorage.getItem("cartProducts");
    cartItems = JSON.parse(cartItems);

    const cartBoxTable = cartBox.querySelector('table');
    let tableData = '';
    tableData += '<tr><th>Item Name</th><th>Item Tag</th><th>Quantity</th><th id="price">Unit Price</th><th>VAT</th><th>Free Delivery</th><th>Total</th><th>Discount</th></tr>';
    //check first if there's any items in localStorage
    if(JSON.parse(localStorage.getItem('cartProducts')) === null){
        tableData += '<tr><td colspan="5">No items found</td></tr>'
    }else{
        //mapping the data from local storage one by one
        Object.values(cartItems).map(data => {
            tableData += '<tr class="row"><th>' + data.name + '</th><th>' + data.tag +
            '</th><th>' + data.incart + '</th><th>' + data.price  + '</th><th>' + data.VAT +  '</th><th>' + data.freeDelivery + 
            '</th><th>' + data.incart * data.price * data.VAT +
            '</th><th><a href="#" onclick=discountCart(this);>Discount</a></th></tr>'
        });
    }
    cartBoxTable.innerHTML = tableData;
}


function onSubmitOrder(){
    alert('Thank You For choosing us, Expect your order in 2-3 day');
}

//function to calculate and display coupons
function discountCoupons(coupon) { 
    codes = new Object();
    codes.CODE1 = 100;
    codes.CODE2 = 200;
    codes.CODE3 = 300;
    
    if (codes[coupon]){ 
      window.alert("Code Accepted! Click the Confirm Order button!"); 
    } 
    else { 
      window.alert("Coupon Code Invalid. Try again!"); 
    }
    return codes[coupon]; 
} 

//function to discount Cart
function discountCart(){
    var discountAmount = 500;
    let cost = localStorage.getItem('cartCosts');
    if(cost >= 1000){
        localStorage.setItem('cartCosts', cost - discountAmount);
        alert(cost - discountAmount);
        console.log('discount', cost - discountAmount);
    } 
}

//function to confirm orders and generate reference number
function onClickConfirmOrder() {
    alert('Order successful, Keep your reference number safe!')
    let referenceNumber = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    document.getElementById("referenceNumber").innerHTML = referenceNumber();
}

//function for chainedEffect, I referenced this from my previous task, Task 14
function chainedEffect(){
    setInterval(pageColors, 4000);
  
    var colorCount = 0;
    function pageColors() {
        var colors = ["papayawhip", "olivedrab", "dodgerblue", "greenyellow"];
    
        if (colorCount < colors.length) {
            $("body").css("background-color", colors[colorCount], 1000);
            colorCount++;
        } else {
            colorCount = 0;
        }
    }
    pageColors();
}

