// Cart View Page
// Displays cart items and handles checkout


document.addEventListener("DOMContentLoaded", () => {

    displayCartItems();

    updateCartSummary();

});




// Display cart items

function displayCartItems() {


    const container =
        document.getElementById(
            "cart-items-container"
        );



    const items =
        cart.getItems();



    if(items.length === 0){


        container.innerHTML = `

        <div class="cart-empty">

            <p>Your cart is empty</p>

            <p>
            Browse our collection and add some amazing T-shirts!
            </p>

            <a href="index.html">
            Continue Shopping
            </a>

        </div>

        `;


        return;

    }




    container.innerHTML = "";



    items.forEach(item => {



        const itemTotal =
            (
                Number(item.price) *
                Number(item.quantity)
            ).toFixed(2);




        const itemElement =
        document.createElement("div");



        itemElement.className =
        "cart-item";



        itemElement.innerHTML = `


        <div class="item-details">

            <div class="item-name">
                ${item.name}
            </div>


            <div class="item-price">
                $${Number(item.price).toFixed(2)} each
            </div>


        </div>




        <div class="item-controls">


            <div class="quantity-control">


                <button onclick="decreaseQuantity('${item.id}')">
                    −
                </button>


                <input 
                type="number"
                value="${item.quantity}"
                readonly
                />


                <button onclick="increaseQuantity('${item.id}')">
                    +
                </button>


            </div>




            <div>

                <strong>
                $${itemTotal}
                </strong>


                <br>


                <small>
                Qty: ${item.quantity}
                </small>


            </div>




            <button 
            class="remove-btn"
            onclick="removeItem('${item.id}')">

                Remove

            </button>



        </div>


        `;



        container.appendChild(itemElement);



    });



}






// Update price summary

function updateCartSummary(){



    const subtotal =
        Number(cart.calculateTotal());



    const shipping =
        subtotal > 0 ? 10 : 0;



    const tax =
        subtotal * 0.10;



    const total =
        subtotal + shipping + tax;



    document.getElementById(
        "subtotal"
    ).textContent =
        `$${subtotal.toFixed(2)}`;



    document.getElementById(
        "shipping"
    ).textContent =
        `$${shipping.toFixed(2)}`;



    document.getElementById(
        "tax"
    ).textContent =
        `$${tax.toFixed(2)}`;



    document.getElementById(
        "total"
    ).textContent =
        `$${total.toFixed(2)}`;


}






// Increase quantity

function increaseQuantity(productId){


    const item =
        cart.getItems()
        .find(
            item => item.id === productId
        );



    if(item){


        cart.updateQuantity(
            productId,
            item.quantity + 1
        );


        displayCartItems();

        updateCartSummary();


    }


}






// Decrease quantity

function decreaseQuantity(productId){


    const item =
        cart.getItems()
        .find(
            item => item.id === productId
        );



    if(item){


        cart.updateQuantity(
            productId,
            item.quantity - 1
        );


        displayCartItems();

        updateCartSummary();


    }


}






// Remove item

function removeItem(productId){



    cart.removeFromCart(productId);



    displayCartItems();


    updateCartSummary();



    showNotification(
        "Item removed from cart",
        "info"
    );



}








// Checkout with PayPal

async function proceedToCheckout(){



    const items =
        cart.getItems();



    if(items.length === 0){


        showNotification(
            "Please add items to cart first",
            "info"
        );


        return;


    }





    const total =
        cart.calculateTotal();




    try{


        const response =
        await fetch(
            "http://localhost:5000/api/payment/create-order",
            {


                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json"


                },



                body:JSON.stringify({


                    amount:total


                })


            }
        );





        const data =
        await response.json();




        if(data.success){



            console.log(
                "PayPal Order Created:",
                data
            );



            alert(
                "PayPal Order Created Successfully!\n\nOrder ID:\n"
                + data.id
            );



        }
        else{


            alert(
                "Payment creation failed"
            );


        }




    }
    catch(error){



        console.log(
            "Checkout error:",
            error
        );



        alert(
            "Cannot connect to payment server"
        );



    }



}








// Notification

function showNotification(
    message,
    type="info"
){



    const notification =
    document.createElement("div");



    notification.textContent =
    message;



    notification.style.cssText = `

        position:fixed;

        top:20px;

        right:20px;

        background:#333;

        color:white;

        padding:15px 20px;

        border-radius:8px;

        z-index:9999;

    `;



    document.body.appendChild(
        notification
    );



    setTimeout(()=>{


        notification.remove();


    },3000);



}