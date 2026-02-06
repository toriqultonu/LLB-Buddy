// LLB Buddy - Editor JavaScript

let autoSaveTimer = null;
let hasUnsavedChanges = false;

// Initialize editor
document.addEventListener('DOMContentLoaded', function() {
    loadDocumentFromUrl();
    setupEditor();
    setupSmartFields();
    updateWordCount();
    populateClauseList();
});

// Load document or template from URL parameters
function loadDocumentFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get('id');
    const templateId = urlParams.get('template');

    if (docId) {
        const doc = documents.find(d => d.id === parseInt(docId));
        if (doc) {
            document.getElementById('documentTitle').value = doc.title;
            document.getElementById('docCategory').value = doc.category;
            // In a real app, we'd load the actual document content
        }
    } else if (templateId) {
        const template = templates.find(t => t.id === parseInt(templateId));
        if (template) {
            document.getElementById('documentTitle').value = template.title + ' - Copy';
            document.getElementById('editor').innerHTML = template.preview;
            document.getElementById('docCategory').value = template.category === 'real-estate' ? 'lease' :
                template.category === 'business' ? 'contract' :
                template.category === 'personal' ? 'other' : template.category;
        }
    }
}

// Setup editor event listeners
function setupEditor() {
    const editor = document.getElementById('editor');

    // Track changes for auto-save
    editor.addEventListener('input', function() {
        hasUnsavedChanges = true;
        updateSaveStatus('Saving...');
        updateWordCount();

        // Debounced auto-save
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(autoSave, 2000);
    });

    // Handle smart field clicks
    editor.addEventListener('click', function(e) {
        if (e.target.classList.contains('smart-field')) {
            highlightField(e.target);
        }
    });

    // Title change handler
    document.getElementById('documentTitle').addEventListener('input', function() {
        hasUnsavedChanges = true;
    });
}

// Setup smart fields form
function setupSmartFields() {
    const editor = document.getElementById('editor');
    const fields = editor.querySelectorAll('.smart-field');
    const formContainer = document.getElementById('smartFieldsForm');

    const uniqueFields = new Map();
    fields.forEach(field => {
        const fieldName = field.dataset.field;
        if (!uniqueFields.has(fieldName)) {
            uniqueFields.set(fieldName, field.textContent);
        }
    });

    let formHtml = '';
    uniqueFields.forEach((placeholder, fieldName) => {
        const label = fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        formHtml += `
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">${label}</label>
                <input type="text"
                       id="field-${fieldName}"
                       placeholder="${placeholder}"
                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                       onchange="updateField('${fieldName}', this.value)">
            </div>
        `;
    });

    formContainer.innerHTML = formHtml;
}

// Update a smart field in the document
function updateField(fieldName, value) {
    if (!value) return;

    const editor = document.getElementById('editor');
    const fields = editor.querySelectorAll(`.smart-field[data-field="${fieldName}"]`);

    fields.forEach(field => {
        field.textContent = value;
        field.classList.add('filled');
    });

    hasUnsavedChanges = true;
}

// Fill all fields from form
function fillAllFields() {
    const inputs = document.querySelectorAll('#smartFieldsForm input');
    inputs.forEach(input => {
        const fieldName = input.id.replace('field-', '');
        if (input.value) {
            updateField(fieldName, input.value);
        }
    });

    showToast('Fields updated successfully', 'success');
}

// Highlight a field when clicked
function highlightField(field) {
    // Remove previous highlights
    document.querySelectorAll('.smart-field.highlighted').forEach(f => {
        f.classList.remove('highlighted');
        f.style.outline = '';
    });

    // Highlight the clicked field
    field.classList.add('highlighted');
    field.style.outline = '2px solid #d4a853';

    // Scroll to corresponding form field
    const fieldName = field.dataset.field;
    const formField = document.getElementById(`field-${fieldName}`);
    if (formField) {
        formField.focus();
        formField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Format text
function formatText(command) {
    document.execCommand(command, false, null);
    document.getElementById('editor').focus();
}

// Format block
function formatBlock(tag) {
    document.execCommand('formatBlock', false, tag);
    document.getElementById('editor').focus();
}

// Insert smart field at cursor
function insertField(fieldType) {
    const fieldLabels = {
        party_name: '[Party Name]',
        date: '[Date]',
        address: '[Address]',
        amount: '[Amount]',
        signature: `
            <div style="margin-top: 2rem;">
                <p>_______________________________</p>
                <p><strong>Name:</strong> <span class="smart-field" data-field="signatory_name">[Signatory Name]</span></p>
                <p><strong>Title:</strong> <span class="smart-field" data-field="signatory_title">[Title]</span></p>
                <p><strong>Date:</strong> _________________</p>
            </div>
        `
    };

    let html;
    if (fieldType === 'signature') {
        html = fieldLabels[fieldType];
    } else {
        html = `<span class="smart-field" data-field="${fieldType}">${fieldLabels[fieldType]}</span>`;
    }

    document.execCommand('insertHTML', false, html);
    hasUnsavedChanges = true;
}

// Insert clause
function insertClause() {
    document.getElementById('clauseModal').classList.remove('hidden');
}

// Close clause modal
function closeClauseModal() {
    document.getElementById('clauseModal').classList.add('hidden');
}

// Populate clause list
function populateClauseList() {
    const list = document.getElementById('clauseList');
    list.innerHTML = clauses.map(clause => `
        <div class="p-4 border border-gray-200 rounded-lg hover:border-primary cursor-pointer transition" onclick="insertClauseContent(${clause.id})">
            <h4 class="font-semibold text-gray-900 mb-1">${clause.title}</h4>
            <p class="text-sm text-gray-500 capitalize">${clause.category}</p>
        </div>
    `).join('');

    // Setup search
    document.getElementById('clauseSearch').addEventListener('input', function() {
        const search = this.value.toLowerCase();
        const filtered = clauses.filter(c =>
            c.title.toLowerCase().includes(search) ||
            c.category.toLowerCase().includes(search)
        );

        list.innerHTML = filtered.map(clause => `
            <div class="p-4 border border-gray-200 rounded-lg hover:border-primary cursor-pointer transition" onclick="insertClauseContent(${clause.id})">
                <h4 class="font-semibold text-gray-900 mb-1">${clause.title}</h4>
                <p class="text-sm text-gray-500 capitalize">${clause.category}</p>
            </div>
        `).join('');
    });
}

// Insert clause content
function insertClauseContent(clauseId) {
    const clause = clauses.find(c => c.id === clauseId);
    if (clause) {
        document.execCommand('insertHTML', false, clause.content);
        hasUnsavedChanges = true;
        closeClauseModal();
        showToast('Clause inserted', 'success');
    }
}

// Update word count
function updateWordCount() {
    const editor = document.getElementById('editor');
    const text = editor.innerText || editor.textContent;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').textContent = words;
}

// Update save status
function updateSaveStatus(status) {
    document.getElementById('saveStatus').textContent = status;
}

// Auto-save
function autoSave() {
    if (hasUnsavedChanges) {
        // Simulate saving
        setTimeout(() => {
            hasUnsavedChanges = false;
            updateSaveStatus('All changes saved');
            const now = new Date();
            document.getElementById('modifiedDate').textContent = now.toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            });
        }, 500);
    }
}

// Save document
function saveDocument() {
    updateSaveStatus('Saving...');
    setTimeout(() => {
        hasUnsavedChanges = false;
        updateSaveStatus('All changes saved');
        showToast('Document saved', 'success');
    }, 500);
}

// Export document
function exportDocument() {
    document.getElementById('exportModal').classList.remove('hidden');
}

// Close export modal
function closeExportModal() {
    document.getElementById('exportModal').classList.add('hidden');
}

// Download document
function downloadAs(format) {
    const title = document.getElementById('documentTitle').value || 'document';
    showToast(`Downloading ${title}.${format}...`, 'info');
    closeExportModal();

    // In a real app, this would generate and download the actual file
    setTimeout(() => {
        showToast('Download complete', 'success');
    }, 1500);
}

// Share document
function shareDocument() {
    document.getElementById('shareModal').classList.remove('hidden');
}

// Close share modal
function closeShareModal() {
    document.getElementById('shareModal').classList.add('hidden');
}

// Copy share link
function copyLink() {
    const link = document.getElementById('shareLink');
    link.select();
    document.execCommand('copy');
    showToast('Link copied to clipboard', 'success');
}

// Send share invite
function sendShare() {
    const email = document.getElementById('shareEmail').value;
    if (email) {
        showToast(`Invite sent to ${email}`, 'success');
        closeShareModal();
    } else {
        showToast('Please enter an email address', 'error');
    }
}

// Close modals on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeExportModal();
        closeShareModal();
        closeClauseModal();
    }
});

// Close modals on backdrop click
['exportModal', 'shareModal', 'clauseModal'].forEach(modalId => {
    document.getElementById(modalId).addEventListener('click', function(event) {
        if (event.target === this) {
            this.classList.add('hidden');
        }
    });
});

// Warn before leaving with unsaved changes
window.addEventListener('beforeunload', function(e) {
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
    }
});
