// ps.js - Clean version 2025 - WhatsApp redirect + core features

// 1. Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 2. WhatsApp redirect on every "Buy Now" click
const WHATSAPP_NUMBER = '16728981189'; //+1 (672) 898-1189 without +

document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // prevent any default behavior

        const productName = this.getAttribute('data-product') || 'this product';
        const price = this.getAttribute('data-price') || 'not listed';
        
        const message = `Hello!\nI'm interested in:\n→ ${productName}\nPrice shown: ${price}\nPlease send full details, quantity available, shipping info and payment method. Thanks!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Try to open in new tab/window
        const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        // Fallback if popup is blocked or fails
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            console.warn('Popup blocked → falling back to redirect');
            window.location.href = whatsappUrl;
        }
    });
});

// 3. Live search/filter products
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const allProducts = document.querySelectorAll('.product');

        allProducts.forEach(product => {
            const titleElement = product.querySelector('p');
            const titleText = titleElement ? titleElement.textContent.toLowerCase() : '';
            
            if (titleText.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
}

// 4. Toggle "More" dropdowns
document.querySelectorAll('.more').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        if (!productName) return;

        // Create safe ID (same logic as before)
        const safeId = 'dropdown-' + productName
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        const dropdown = document.getElementById(safeId);
        if (dropdown) {
            dropdown.classList.toggle('open');
        } else {
            console.warn(`Dropdown not found for product: ${productName} (expected id: ${safeId})`);
        }
    });
});

// Optional: Log when script loads (for debugging)
console.log('ps.js loaded • WhatsApp target: +' + WHATSAPP_NUMBER);