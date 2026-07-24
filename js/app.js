// Main Application Initialization
// Initializes all components and sets up the e-commerce store

// Global UI Manager instance
let ui;

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔄 Initializing e-commerce store...");

  // Initialize UI Manager
  ui = new UIManager(cart);

  // Attach event listeners to buttons
  ui.initializeEventListeners();

  // Add data-product-id to each product card for easier reference
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card, index) => {
    if (!card.dataset.productId) {
      card.dataset.productId = `product-${index + 1}`;
    }
  });

  // Add cart icon/counter to header if not already present
  addCartCounter();

  // Setup sorting and filtering
  setupSortingAndFiltering(ui);

  console.log("✓ E-commerce store initialized successfully");
  console.log("Cart items:", cart.getItems());
});

// Add cart counter to header
function addCartCounter() {
  // Check if counter already exists
  if (document.getElementById("cart-count")) {
    return;
  }

  // Create cart counter element
  const header = document.querySelector("header.hero");
  if (header) {
    const cartCounter = document.createElement("div");
    cartCounter.id = "cart-count";
    cartCounter.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #d9485f;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      z-index: 1000;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s ease;
      display: none;
    `;
    cartCounter.textContent = "0";

    // Click to open cart page
    cartCounter.addEventListener("click", () => {
      window.location.href = "cart.html";
    });

    // Hover effect
    cartCounter.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });

    cartCounter.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });

    document.body.appendChild(cartCounter);

    // Update initial count
    cart.updateCartCount();
  }
}

// Setup sorting and filtering functionality
function setupSortingAndFiltering(ui) {
  // Example: Sort by price (you can call this from a dropdown in the UI)
  window.sortByPrice = (order) => {
    ui.sortProducts(order === "low" ? "price-low" : "price-high");
  };

  // Example: Filter by category (you can call this from filter buttons in the UI)
  window.filterByCategory = (category) => {
    ui.filterByCategory(category);
  };

  // Example: Toggle favorite
  window.toggleFavorite = (productId, productName) => {
    ui.toggleFavorite(productId, productName);
  };
}

// Global function to handle form submission for checkout
function handleCheckout(event) {
  event.preventDefault();

  // Get form data
  const form = event.target;
  const formData = {
    firstName: form.querySelector('[name="firstName"]')?.value || "",
    lastName: form.querySelector('[name="lastName"]')?.value || "",
    email: form.querySelector('[name="email"]')?.value || "",
    phone: form.querySelector('[name="phone"]')?.value || "",
    address: form.querySelector('[name="address"]')?.value || "",
    city: form.querySelector('[name="city"]')?.value || "",
    country: form.querySelector('[name="country"]')?.value || "",
    postal: form.querySelector('[name="postal"]')?.value || "",
    cardNumber: form.querySelector('[name="cardNumber"]')?.value || "",
    expiryDate: form.querySelector('[name="expiryDate"]')?.value || "",
    cvv: form.querySelector('[name="cvv"]')?.value || "",
  };

  // Validate form
  if (validator.validateCheckoutForm(formData)) {
    console.log("✓ Form is valid");
    console.log("Cart total:", cart.calculateTotal());
    // Proceed with payment (will integrate PayPal here)
  } else {
    validator.displayErrors(form);
    console.log("✗ Form validation failed");
  }
}
