// Cart View Page
// Displays and manages cart items on the cart page

document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  updateCartSummary();
});

// Display cart items on the cart page
function displayCartItems() {
  const container = document.getElementById("cart-items-container");
  const items = cart.getItems();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty</p>
        <p>Browse our collection and add some amazing T-shirts!</p>
        <a href="index.html">Continue Shopping</a>
      </div>
    `;
    return;
  }

  container.innerHTML = "";

  items.forEach((item) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-price">$${item.price.toFixed(2)} each</div>
      </div>
      <div class="item-controls">
        <div class="quantity-control">
          <button onclick="decreaseQuantity('${item.id}')">−</button>
          <input type="number" value="${item.quantity}" readonly />
          <button onclick="increaseQuantity('${item.id}')">+</button>
        </div>
        <div style="min-width: 80px; text-align: right;">
          <div style="font-weight: 600; color: #d9485f;">$${itemTotal}</div>
          <small style="color: #6b6b6b;">Qty: ${item.quantity}</small>
        </div>
        <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
      </div>
    `;
    container.appendChild(itemElement);
  });
}

// Update cart summary (subtotal, tax, total)
function updateCartSummary() {
  const subtotal = parseFloat(cart.calculateTotal());
  const shipping = subtotal > 0 ? 10.0 : 0;
  const tax = (subtotal * 0.1).toFixed(2);
  const total = (subtotal + shipping + parseFloat(tax)).toFixed(2);

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
  document.getElementById("tax").textContent = `$${tax}`;
  document.getElementById("total").textContent = `$${total}`;
}

// Increase item quantity
function increaseQuantity(productId) {
  const item = cart.getItems().find((i) => i.id === productId);
  if (item) {
    cart.updateQuantity(productId, item.quantity + 1);
    displayCartItems();
    updateCartSummary();
  }
}

// Decrease item quantity
function decreaseQuantity(productId) {
  const item = cart.getItems().find((i) => i.id === productId);
  if (item) {
    cart.updateQuantity(productId, item.quantity - 1);
    displayCartItems();
    updateCartSummary();
  }
}

// Remove item from cart
function removeItem(productId) {
  cart.removeFromCart(productId);
  displayCartItems();
  updateCartSummary();
  showNotification(`Item removed from cart`, "info");
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${type === "success" ? "#28a745" : "#17a2b8"};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-weight: 600;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Proceed to checkout
function proceedToCheckout() {
  const items = cart.getItems();
  if (items.length === 0) {
    showNotification("Please add items to cart first", "info");
    return;
  }
  // Will integrate PayPal checkout here
  alert("Checkout functionality will be integrated with PayPal soon!");
  console.log("Proceeding to checkout with cart total: $" + cart.calculateTotal());
}
