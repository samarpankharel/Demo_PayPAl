// Form Validation
// Handles validation for checkout forms and user inputs

class FormValidator {
  constructor() {
    this.errors = {};
  }

  // Validate email
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone number
  validatePhoneNumber(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }

  // Validate name
  validateName(name) {
    return name.trim().length >= 2;
  }

  // Validate address
  validateAddress(address) {
    return address.trim().length >= 5;
  }

  // Validate postal code
  validatePostalCode(postal) {
    const postalRegex = /^[a-zA-Z0-9\s\-]{3,10}$/;
    return postalRegex.test(postal);
  }

  // Validate credit card number (basic Luhn algorithm)
  validateCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      return false;
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  }

  // Validate CVV
  validateCVV(cvv) {
    const cvvRegex = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
  }

  // Validate expiry date (MM/YY format)
  validateExpiryDate(expiryDate) {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) {
      return false;
    }

    const [month, year] = expiryDate.split("/");
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    const expYear = parseInt(year, 10);
    const expMonth = parseInt(month, 10);

    if (expYear < currentYear) {
      return false;
    }
    if (expYear === currentYear && expMonth < currentMonth) {
      return false;
    }

    return true;
  }

  // Validate entire checkout form
  validateCheckoutForm(formData) {
    this.errors = {};

    // Personal Information
    if (!this.validateName(formData.firstName)) {
      this.errors.firstName = "First name must be at least 2 characters";
    }
    if (!this.validateName(formData.lastName)) {
      this.errors.lastName = "Last name must be at least 2 characters";
    }
    if (!this.validateEmail(formData.email)) {
      this.errors.email = "Please enter a valid email address";
    }
    if (!this.validatePhoneNumber(formData.phone)) {
      this.errors.phone = "Please enter a valid phone number";
    }

    // Shipping Information
    if (!this.validateAddress(formData.address)) {
      this.errors.address = "Address must be at least 5 characters";
    }
    if (!this.validateAddress(formData.city)) {
      this.errors.city = "City must be at least 2 characters";
    }
    if (!formData.country) {
      this.errors.country = "Please select a country";
    }
    if (!this.validatePostalCode(formData.postal)) {
      this.errors.postal = "Please enter a valid postal code";
    }

    // Payment Information
    if (!this.validateCardNumber(formData.cardNumber)) {
      this.errors.cardNumber = "Please enter a valid card number";
    }
    if (!this.validateExpiryDate(formData.expiryDate)) {
      this.errors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    }
    if (!this.validateCVV(formData.cvv)) {
      this.errors.cvv = "CVV must be 3-4 digits";
    }

    return Object.keys(this.errors).length === 0;
  }

  // Get all errors
  getErrors() {
    return this.errors;
  }

  // Display form errors
  displayErrors(formElement) {
    // Clear previous error messages
    formElement.querySelectorAll(".error-message").forEach((el) => el.remove());
    formElement.querySelectorAll(".form-group").forEach((el) => el.classList.remove("error"));

    // Display new errors
    for (const [fieldName, errorMessage] of Object.entries(this.errors)) {
      const input = formElement.querySelector(`[name="${fieldName}"]`);
      if (input) {
        const formGroup = input.closest(".form-group");
        if (formGroup) {
          formGroup.classList.add("error");
          const errorEl = document.createElement("p");
          errorEl.className = "error-message";
          errorEl.textContent = errorMessage;
          errorEl.style.cssText = `
            color: #d9485f;
            font-size: 0.85rem;
            margin-top: 4px;
          `;
          formGroup.appendChild(errorEl);
        }
      }
    }
  }
}

// Initialize global validator instance
const validator = new FormValidator();
