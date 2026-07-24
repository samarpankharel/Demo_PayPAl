// UI Interactions & Notifications
// Handles product interactions, notifications, filtering, and favorites

class UIManager {
  constructor(cart) {
    this.cart = cart;
    this.favorites = this.loadFavorites();
    this.sortBy = "default";
  }

  // Initialize event listeners for all "Add to Cart" buttons
  initializeEventListeners() {
    const buttons = document.querySelectorAll(".product-card button");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.handleAddToCart(e);
      });
    });
    console.log(`✓ Attached event listeners to ${buttons.length} buttons`);
  }

  // Handle add to cart button click
  handleAddToCart(event) {
    const button = event.target;
    const card = button.closest(".product-card");
    const productId = card.dataset.productId || card.innerText.toLowerCase().replace(/\s+/g, "-");
    const productName = card.querySelector("h3").textContent;
    const productPrice = parseFloat(card.querySelector(".price").textContent.replace("$", ""));

    // Add to cart
    this.cart.addToCart(productId, productName, productPrice);

    // Show notification
    this.showNotification(`✓ ${productName} added to cart!`, "success");

    // Animate button
    this.animateButton(button);
  }

  // Show notification popup
  showNotification(message, type = "info") {
    // Create notification element
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
      animation: slideIn 0.3s ease;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Animate button on click
  animateButton(button) {
    const originalText = button.textContent;
    button.textContent = "Added!";
    button.style.background = "#28a745";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "";
    }, 1500);
  }

  // Toggle favorite item
  toggleFavorite(productId, productName) {
    if (this.favorites.includes(productId)) {
      this.favorites = this.favorites.filter((id) => id !== productId);
      this.showNotification(`Removed ${productName} from favorites`, "info");
    } else {
      this.favorites.push(productId);
      this.showNotification(`♥ ${productName} added to favorites!`, "success");
    }
    this.saveFavorites();
  }

  // Check if item is favorite
  isFavorite(productId) {
    return this.favorites.includes(productId);
  }

  // Save favorites to localStorage
  saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  // Load favorites from localStorage
  loadFavorites() {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  }

  // Sort products
  sortProducts(sortType) {
    this.sortBy = sortType;
    const products = document.querySelectorAll(".product-card");
    const productArray = Array.from(products);

    if (sortType === "price-low") {
      productArray.sort((a, b) => {
        const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
        const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
        return priceA - priceB;
      });
    } else if (sortType === "price-high") {
      productArray.sort((a, b) => {
        const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
        const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
        return priceB - priceA;
      });
    } else if (sortType === "name") {
      productArray.sort((a, b) => {
        const nameA = a.querySelector("h3").textContent;
        const nameB = b.querySelector("h3").textContent;
        return nameA.localeCompare(nameB);
      });
    }

    // Re-append sorted products
    const container = document.querySelector(".product-grid");
    productArray.forEach((product) => container.appendChild(product));

    this.showNotification(`Sorted by ${sortType}`, "info");
  }

  // Filter products by category
  filterByCategory(category) {
    const products = document.querySelectorAll(".product-card");
    products.forEach((product) => {
      const productCategory = product.querySelector(".category").textContent.toLowerCase();
      if (category === "all" || productCategory === category.toLowerCase()) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
}

// Keyboard animation for notifications
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
