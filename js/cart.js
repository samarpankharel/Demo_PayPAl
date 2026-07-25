// Shopping Cart Management
// Handles cart operations: add, remove, update, and calculations


class ShoppingCart {

  constructor() {

    this.items = this.loadCart();

    this.updateCartCount();

  }



  // Add item to cart
  addToCart(productId, productName, productPrice) {


    // Convert price into number
    const price = Number(
      String(productPrice)
        .replace("$", "")
        .trim()
    );


    const existingItem = this.items.find(
      (item) => item.id === productId
    );



    if (existingItem) {


      existingItem.quantity += 1;


    } else {


      this.items.push({

        id: productId,

        name: productName,

        price: price,

        quantity: 1

      });


    }



    this.saveCart();

    this.updateCartCount();


    return true;

  }




  // Remove item from cart
  removeFromCart(productId) {


    this.items = this.items.filter(
      (item) => item.id !== productId
    );


    this.saveCart();

    this.updateCartCount();

  }





  // Update quantity
  updateQuantity(productId, quantity) {


    const item = this.items.find(
      (item) => item.id === productId
    );



    if (item) {


      if (quantity <= 0) {


        this.removeFromCart(productId);


      } else {


        item.quantity = quantity;


        this.saveCart();

        this.updateCartCount();


      }

    }

  }





  // Calculate cart total
  calculateTotal() {


    const total = this.items.reduce(

      (sum, item) => {


        return (
          sum +
          Number(item.price) *
          Number(item.quantity)
        );


      },

      0

    );


    return total.toFixed(2);


  }





  // Get number of items
  getCartCount() {


    return this.items.reduce(

      (count, item) => {

        return count + Number(item.quantity);

      },

      0

    );


  }





  // Clear cart
  clearCart() {


    this.items = [];


    this.saveCart();


    this.updateCartCount();


  }





  // Save cart
  saveCart() {


    localStorage.setItem(

      "cart",

      JSON.stringify(this.items)

    );


  }





  // Load cart
  loadCart() {


    const savedCart =
      localStorage.getItem("cart");



    if (!savedCart) {

      return [];

    }



    try {


      const cartItems =
        JSON.parse(savedCart);



      // Fix old saved prices
      return cartItems.map(item => ({


        ...item,


        price: Number(
          String(item.price)
          .replace("$","")
          .trim()
        ),


        quantity:
          Number(item.quantity)



      }));



    } catch(error) {


      console.log(
        "Cart loading error:",
        error
      );


      return [];


    }


  }





  // Update cart counter UI
  updateCartCount() {


    const count =
      this.getCartCount();



    const cartCount =
      document.getElementById(
        "cart-count"
      );



    if (cartCount) {


      cartCount.textContent = count;


      cartCount.style.display =
        count > 0
        ? "flex"
        : "none";


    }





    const cartLinkCount =
      document.getElementById(
        "cart-link-count"
      );



    if (cartLinkCount) {


      cartLinkCount.textContent =
        count;


    }


  }





  // Get cart items
  getItems() {


    return this.items;


  }


}





// Create global cart object

const cart = new ShoppingCart();