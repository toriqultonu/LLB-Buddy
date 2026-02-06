// LLB Buddy - Dashboard JavaScript

let currentView = 'grid';
let deleteDocumentId = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderDocuments();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(filterDocuments, 300));

    // Category filter
    const filterCategory = document.getElementById('filterCategory');
    filterCategory.addEventListener('change', filterDocuments);

    // Status filter
    const filterStatus = document.getElementById('filterStatus');
    filterStatus.addEventListener('change', filterDocuments);

    // View toggle
    document.getElementById('viewGrid').addEventListener('click', () => setView('grid'));
    document.getElementById('viewList').addEventListener('click', () => setView('list'));
}

// Render documents in grid view
function renderDocuments(docs = documents) {
    const grid = document.getElementById('documentsGrid');
    const list = document.getElementById('documentsList');
    const tableBody = document.getElementById('documentsTableBody');

    if (currentView === 'grid') {
        grid.classList.remove('hidden');
        list.classList.add('hidden');
        grid.innerHTML = docs.map(doc => createDocumentCard(doc)).join('');
    } else {
        grid.classList.add('hidden');
        list.classList.remove('hidden');
        tableBody.innerHTML = docs.map(doc => createDocumentRow(doc)).join('');
    }
}

// Create document card for grid view
function createDocumentCard(doc) {
    const statusLabel = doc.shared ? 'shared' : doc.status;
    return `
        <div class="document-card bg-white rounded-xl shadow p-6 cursor-pointer" onclick="openDocument(${doc.id})">
            <div class="flex items-start justify-between mb-4">
                <div class="text-3xl">${getCategoryIcon(doc.category)}</div>
                <div class="relative">
                    <button onclick="event.stopPropagation(); toggleMenu(${doc.id})" class="p-1 hover:bg-gray-100 rounded">
                        <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                    </button>
                    <div id="menu-${doc.id}" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                        <a href="editor.html?id=${doc.id}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                        <button onclick="event.stopPropagation(); duplicateDocument(${doc.id})" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Duplicate</button>
                        <button onclick="event.stopPropagation(); shareDocument(${doc.id})" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share</button>
                        <hr class="my-1">
                        <button onclick="event.stopPropagation(); showDeleteModal(${doc.id})" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                    </div>
                </div>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">${doc.title}</h3>
            <div class="flex items-center justify-between text-sm">
                <span class="${getStatusBadgeClass(statusLabel)}">${capitalizeFirst(statusLabel)}</span>
                <span class="text-gray-500">${formatDate(doc.modifiedAt)}</span>
            </div>
            <div class="mt-3 flex flex-wrap gap-1">
                ${doc.tags.slice(0, 2).map(tag => `
                    <span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">${tag}</span>
                `).join('')}
                ${doc.tags.length > 2 ? `<span class="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">+${doc.tags.length - 2}</span>` : ''}
            </div>
        </div>
    `;
}

// Create document row for list view
function createDocumentRow(doc) {
    const statusLabel = doc.shared ? 'shared' : doc.status;
    return `
        <tr class="hover:bg-gray-50 cursor-pointer" onclick="openDocument(${doc.id})">
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <span class="text-2xl mr-3">${getCategoryIcon(doc.category)}</span>
                    <div>
                        <div class="font-medium text-gray-900">${doc.title}</div>
                        <div class="text-sm text-gray-500">
                            ${doc.tags.map(tag => `<span class="inline-block mr-1">#${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">${capitalizeFirst(doc.category)}</td>
            <td class="px-6 py-4">
                <span class="${getStatusBadgeClass(statusLabel)}">${capitalizeFirst(statusLabel)}</span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">${formatDate(doc.modifiedAt)}</td>
            <td class="px-6 py-4 text-right">
                <button onclick="event.stopPropagation(); toggleMenu(${doc.id})" class="p-1 hover:bg-gray-100 rounded relative">
                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                </button>
                <div id="menu-${doc.id}" class="hidden absolute right-8 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                    <a href="editor.html?id=${doc.id}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
                    <button onclick="event.stopPropagation(); duplicateDocument(${doc.id})" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Duplicate</button>
                    <button onclick="event.stopPropagation(); shareDocument(${doc.id})" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share</button>
                    <hr class="my-1">
                    <button onclick="event.stopPropagation(); showDeleteModal(${doc.id})" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                </div>
            </td>
        </tr>
    `;
}

// Toggle menu visibility
function toggleMenu(docId) {
    // Close all other menus first
    document.querySelectorAll('[id^="menu-"]').forEach(menu => {
        if (menu.id !== `menu-${docId}`) {
            menu.classList.add('hidden');
        }
    });

    const menu = document.getElementById(`menu-${docId}`);
    menu.classList.toggle('hidden');
}

// Close menus when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('[id^="menu-"]') && !event.target.closest('button')) {
        document.querySelectorAll('[id^="menu-"]').forEach(menu => {
            menu.classList.add('hidden');
        });
    }
});

// Set view mode
function setView(view) {
    currentView = view;

    const gridBtn = document.getElementById('viewGrid');
    const listBtn = document.getElementById('viewList');

    if (view === 'grid') {
        gridBtn.classList.add('bg-primary', 'text-white');
        gridBtn.classList.remove('bg-white', 'text-gray-600');
        listBtn.classList.remove('bg-primary', 'text-white');
        listBtn.classList.add('bg-white', 'text-gray-600');
    } else {
        listBtn.classList.add('bg-primary', 'text-white');
        listBtn.classList.remove('bg-white', 'text-gray-600');
        gridBtn.classList.remove('bg-primary', 'text-white');
        gridBtn.classList.add('bg-white', 'text-gray-600');
    }

    renderDocuments();
}

// Filter documents
function filterDocuments() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    const status = document.getElementById('filterStatus').value;

    let filtered = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm) ||
            doc.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        const matchesCategory = !category || doc.category === category;
        const matchesStatus = !status ||
            (status === 'shared' && doc.shared) ||
            (status !== 'shared' && doc.status === status && !doc.shared);

        return matchesSearch && matchesCategory && matchesStatus;
    });

    renderDocuments(filtered);
}

// Open document in editor
function openDocument(docId) {
    window.location.href = `editor.html?id=${docId}`;
}

// Duplicate document
function duplicateDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
        showToast(`"${doc.title}" duplicated successfully`, 'success');
        // In a real app, this would create a new document in the database
    }
}

// Share document
function shareDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
        showToast('Share link copied to clipboard', 'success');
        // In a real app, this would open a share modal or copy a link
    }
}

// Show delete confirmation modal
function showDeleteModal(docId) {
    deleteDocumentId = docId;
    document.getElementById('deleteModal').classList.remove('hidden');
}

// Close delete modal
function closeDeleteModal() {
    deleteDocumentId = null;
    document.getElementById('deleteModal').classList.add('hidden');
}

// Confirm delete
function confirmDelete() {
    if (deleteDocumentId) {
        const doc = documents.find(d => d.id === deleteDocumentId);
        if (doc) {
            showToast(`"${doc.title}" deleted`, 'success');
            // In a real app, this would delete from database and refresh the list
        }
    }
    closeDeleteModal();
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
