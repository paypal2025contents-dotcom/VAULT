// ============================================
// VAULT 2K26 - MAIN JAVASCRIPT
// ============================================

let currentPage = 'home';

// DOM Elements - Pages
const pages = {
    home: document.getElementById('homePage'),
    channels: document.getElementById('channelsPage'),
    login: document.getElementById('loginPage'),
    pricing: document.getElementById('pricingPage')
};

// DOM Elements - Navigation
const navItems = {
    home: document.getElementById('navHome'),
    channels: document.getElementById('navChannels'),
    login: document.getElementById('navLogin'),
    pricing: document.getElementById('navPricing')
};

// DOM Elements - Modals
const modals = {
    login: document.getElementById('loginModal'),
    channel: document.getElementById('channelAccessModal')
};

// Initialize App
function init() {
    setupNavigation();
    setupLoginForm();
    setupChannels();
    setupModals();
    setupExternalLinks();
    setupPricing();
    showPage('home');
}

// Show Page Function
function showPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => page.classList.remove('active'));
    
    // Remove active from all nav items
    Object.values(navItems).forEach(item => item.classList.remove('active'));
    
    // Show selected page and nav
    pages[pageName].classList.add('active');
    navItems[pageName].classList.add('active');
    
    currentPage = pageName;
}

// Setup Navigation
function setupNavigation() {
    // Navigation is handled by onclick in HTML
}

// Setup Login Form
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const quickCreateBtn = document.getElementById('quickCreate');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            modals.login.classList.add('show');
        }
    });
    
    quickCreateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(CONFIG.telegramURL, '_blank');
    });
}

// Setup Channels
function setupChannels() {
    const channelsGrid = document.getElementById('channelsGrid');
    
    channelsGrid.innerHTML = '';
    
    CHANNELS.forEach((channel) => {
        const btn = document.createElement('button');
        btn.className = 'channel-button';
        btn.type = 'button';
        btn.innerHTML = `
            <div class="channel-name">${escapeHtml(channel.name)}</div>
            <div class="channel-desc">${escapeHtml(channel.description)}</div>
        `;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modals.channel.classList.add('show');
        });
        channelsGrid.appendChild(btn);
    });
}

// Setup Pricing
function setupPricing() {
    const featuresList = document.getElementById('featuresList');
    const priceAmount = document.getElementById('priceAmount');
    const priceType = document.getElementById('priceType');
    
    priceAmount.textContent = CONFIG.priceAmount;
    priceType.textContent = CONFIG.priceType;
    
    featuresList.innerHTML = '';
    
    FEATURES.forEach(feature => {
        const item = document.createElement('div');
        item.className = 'feature-item';
        item.innerHTML = `
            <span class="feature-text">${escapeHtml(feature)}</span>
            <span class="check-icon">✓</span>
        `;
        featuresList.appendChild(item);
    });
}

// Setup Modals
function setupModals() {
    const modalCreateBtn = document.getElementById('modalCreateBtn');
    const loginModalCloseBtn = document.getElementById('loginModalCloseBtn');
    const modalAvailBtn = document.getElementById('modalAvailBtn');
    const channelModalCloseBtn = document.getElementById('channelModalCloseBtn');
    const buyButton = document.getElementById('buyButton');
    
    // Login modal
    modalCreateBtn.addEventListener('click', () => {
        window.open(CONFIG.telegramURL, '_blank');
    });
    
    loginModalCloseBtn.addEventListener('click', () => {
        modals.login.classList.remove('show');
    });
    
    // Channel modal
    modalAvailBtn.addEventListener('click', () => {
        window.open(CONFIG.telegramURL, '_blank');
    });
    
    channelModalCloseBtn.addEventListener('click', () => {
        modals.channel.classList.remove('show');
    });
    
    // Buy button
    buyButton.addEventListener('click', () => {
        window.open(CONFIG.telegramURL, '_blank');
    });
    
    // Close on background click
    window.addEventListener('click', (e) => {
        if (e.target === modals.login) {
            modals.login.classList.remove('show');
        }
        if (e.target === modals.channel) {
            modals.channel.classList.remove('show');
        }
    });
}

// Setup External Links
function setupExternalLinks() {
    const samplesBtn = document.getElementById('samplesBtn');
    const proofsBtn = document.getElementById('proofsBtn');
    const noAccountBtn = document.getElementById('noAccountBtn');
    
    samplesBtn.addEventListener('click', () => {
        window.open(CONFIG.samplesURL, '_blank');
    });
    
    proofsBtn.addEventListener('click', () => {
        window.open(CONFIG.proofsURL, '_blank');
    });
    
    noAccountBtn.addEventListener('click', () => {
        window.open(CONFIG.telegramURL, '_blank');
    });
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
