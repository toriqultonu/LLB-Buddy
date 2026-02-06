// LLB Buddy - Templates JavaScript

let currentCategory = 'all';
let previewTemplateId = null;

// Initialize templates page
document.addEventListener('DOMContentLoaded', function() {
    renderTemplates();
    setupCategoryButtons();
});

// Setup category button listeners
function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            buttons.forEach(b => {
                b.classList.remove('active');
                b.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            });
            this.classList.add('active');
            this.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');

            // Filter templates
            currentCategory = this.dataset.category;
            filterTemplates();
        });
    });
}

// Render templates
function renderTemplates(templatesToRender = templates) {
    const grid = document.getElementById('templatesGrid');
    grid.innerHTML = templatesToRender.map(template => createTemplateCard(template)).join('');
}

// Create template card
function createTemplateCard(template) {
    return `
        <div class="template-card bg-white rounded-xl shadow overflow-hidden">
            <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                    <div class="text-3xl">${getCategoryIcon(template.category)}</div>
                    <div class="flex items-center text-sm text-gray-500">
                        <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        ${template.popularity}%
                    </div>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">${template.title}</h3>
                <p class="text-sm text-gray-600 mb-4 line-clamp-2">${template.description}</p>
                <div class="flex items-center justify-between">
                    <span class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">${template.category.replace('-', ' ')}</span>
                    <div class="flex gap-2">
                        <button onclick="previewTemplate(${template.id})" class="px-3 py-1.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition">
                            Preview
                        </button>
                        <a href="editor.html?template=${template.id}" class="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-secondary transition">
                            Use
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Filter templates by category
function filterTemplates() {
    let filtered = templates;

    if (currentCategory !== 'all') {
        filtered = templates.filter(t => t.category === currentCategory);
    }

    renderTemplates(filtered);
}

// Preview template
function previewTemplate(templateId) {
    previewTemplateId = templateId;
    const template = templates.find(t => t.id === templateId);

    if (template) {
        document.getElementById('previewTitle').textContent = template.title;
        document.getElementById('previewContent').innerHTML = template.preview;
        document.getElementById('useTemplateBtn').href = `editor.html?template=${templateId}`;
        document.getElementById('previewModal').classList.remove('hidden');
    }
}

// Close preview modal
function closePreviewModal() {
    previewTemplateId = null;
    document.getElementById('previewModal').classList.add('hidden');
}

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePreviewModal();
    }
});

// Close modal on backdrop click
document.getElementById('previewModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closePreviewModal();
    }
});
