// ============================================
// VAULT 2K26 - MAIN JAVASCRIPT
// ============================================

let currentPage = 'home';

// DOM Elements
const pages = {
    home: document.getElementById('homePage'),
    channels: document.getElementById('channelsPage'),
    login: document.getElementById('loginPage'),
    pricing: document.getElementById('pricingPage')
};

const navItems = {
    home: document.getElementById('navHome'),
    channels: document.getElementById('navChannels'),
    login: document.getElementById('navLogin'),
    pricing: document.getElementById('navPricing')
};

const modals = {
    login: document.getElementById('loginModal'),
    channel: document.getElementById('channelAccessModal')
};

// Initialize App
function init() {
    // Setup event listeners
    setupNavigation();
    setupLoginForm();
    setupChannels();
    setupModals();
    
    // Show home page by default
    showPage('home');
}

// Navigation
function setupNavigation() {
    Object.keys(navItems).forEach(key => {
        navItems[key].addEventListener('click', () => showPage(key));
    });
}

function showPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => page.classList.remove('active'));
    
    // Remove active from all nav items
    Object.values(navItems).forEach(item => item.classList.remove('active'));
    
    // Show selected page
    pages[pageName].classList.add('active');
    navItems[pageName].classList.add('active');
    
    currentPage = pageName;
    
    // Scroll to top
    window.scrollTo(0, 0);
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
    
    CHANNELS.forEach((channel, index) => {
        const btn = document.createElement('button');
        btn.className = 'channel-button';
        btn.type = 'button';
        btn.innerHTML = `
            <div class="channel-name">${escapeHtml(channel.name)}</div>
            <div class="channel-desc">${escapeHtml(channel.description)}</div>
        `;
        btn.addEventListener('click', () => {
            modals.channel.classList.add('show');
        });
        channelsGrid.appendChild(btn);
    });
}

// Setup Features
function setupPricing() {
    const featuresList = document.querySelector('.features-list');
    
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
    // Login Modal
    const loginModal = modals.login;
    const channelModal = modals.channel;
    const modalCreateBtn = document.getElementById('modalCreateBtn');
    const loginModalCloseBtn = document.getElementById('loginModalCloseBtn');
    const modalAvailBtn = document.getElementById('modalAvailBtn');
    const channelModalCloseBtn = document.getElementById('channelModalCloseBtn');
    const buyButton = document.getElementById('buyButton');
    
    // Login modal create
    modalCreateBtn.addEventListener('click', () => {
        window.open(CONFIG.telegramURL, '_blank');
    });
    
    // Close login modal
    loginModalCloseBtn.addEventListener('click', () => {
        loginModal.classList.remove('show');
    });
    
    // Channel modal avail
    modalAvailBtn.addEventListener('click', () => {
        window.open(CONFIG.telegramURL, '_blank');
    });
    
    // Close channel modal
    channelModalCloseBtn.addEventListener('click', () => {
        channelModal.classList.remove('show');
    });
    
    // Buy button
    buyButton.addEventListener('click', () => {
        window.open(CONFIG.telegramURL, '_blank');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('show');
        }
        if (e.target === channelModal) {
            channelModal.classList.remove('show');
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
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupExternalLinks();
    setupPricing();
});
