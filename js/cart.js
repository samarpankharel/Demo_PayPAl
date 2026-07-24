// Shopping Cart Management
// Handles cart operations: add, remove, update, and calculations

class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartCount();
  }

  // Add item to cart
  addToCart(productId, productName, productPrice) {
    const existingItem = this.items.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
      });
    }

    this.saveCart();
    this.updateCartCount();
    return true;
  }

  // Remove item from cart
  removeFromCart(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
  }

  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.items.find((item) => item.id === productId);
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

  // Calculate total price
  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }

  // Get total number of items
  getCartCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  // Load cart from localStorage
  loadCart() {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Update cart counter in UI
  updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      const count = this.getCartCount();
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? "block" : "none";
    }
  }

  // Get all cart items
  getItems() {
    return this.items;
  }
}

// Initialize global cart instance
const cart = new ShoppingCart();
