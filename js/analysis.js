// LLB Buddy - Document Analysis JavaScript

let currentTab = 'library';
let selectedDocument = null;
let uploadedFile = null;
let isAnalyzing = false;
let currentModalDoc = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderLibrary();
    populateLibrarySelect();
    populateCompareSelect();
    setupDragAndDrop();
});

// Tab switching
function switchTab(tab) {
    currentTab = tab;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'text-primary', 'border-b-2', 'border-primary');
        btn.classList.add('text-gray-500');
    });

    const activeBtn = document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1));
    activeBtn.classList.add('active', 'text-primary', 'border-b-2', 'border-primary');
    activeBtn.classList.remove('text-gray-500');

    // Show/hide sections
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(tab + 'Section').classList.remove('hidden');
}

// ==================== LIBRARY TAB ====================

function renderLibrary(docs = bdLegalDocuments) {
    const grid = document.getElementById('libraryGrid');
    grid.innerHTML = docs.map(doc => `
        <div class="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer" onclick="openDocumentModal(${doc.id})">
            <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                    <span class="text-4xl">${doc.icon}</span>
                    <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">${doc.category}</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">${doc.title}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">${doc.description}</p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                    <span>Year: ${doc.year}</span>
                    <button onclick="event.stopPropagation(); analyzeDocument(${doc.id})" class="text-primary hover:underline">
                        Analyze
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Setup search
    document.getElementById('librarySearch').addEventListener('input', filterLibrary);
    document.getElementById('libraryCategory').addEventListener('change', filterLibrary);
}

function filterLibrary() {
    const search = document.getElementById('librarySearch').value.toLowerCase();
    const category = document.getElementById('libraryCategory').value;

    let filtered = bdLegalDocuments.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(search) ||
            doc.description.toLowerCase().includes(search);
        const matchesCategory = !category || doc.category === category;
        return matchesSearch && matchesCategory;
    });

    renderLibrary(filtered);
}

function openDocumentModal(docId) {
    currentModalDoc = bdLegalDocuments.find(d => d.id === docId);
    if (currentModalDoc) {
        document.getElementById('modalDocTitle').textContent = currentModalDoc.title;
        document.getElementById('modalDocMeta').textContent = `${currentModalDoc.category.charAt(0).toUpperCase() + currentModalDoc.category.slice(1)} | ${currentModalDoc.year}`;
        document.getElementById('modalDocContent').innerHTML = currentModalDoc.content;
        document.getElementById('documentModal').classList.remove('hidden');
    }
}

function closeDocumentModal() {
    document.getElementById('documentModal').classList.add('hidden');
    currentModalDoc = null;
}

function analyzeThisDocument() {
    if (currentModalDoc) {
        closeDocumentModal();
        switchTab('upload');
        selectDocumentForAnalysis(currentModalDoc);
    }
}

function analyzeDocument(docId) {
    const doc = bdLegalDocuments.find(d => d.id === docId);
    if (doc) {
        switchTab('upload');
        selectDocumentForAnalysis(doc);
    }
}

function selectDocumentForAnalysis(doc) {
    selectedDocument = doc;
    document.getElementById('selectLibraryDoc').value = doc.id;

    // Update UI
    document.getElementById('uploadedFileInfo').classList.remove('hidden');
    document.getElementById('uploadedFileName').textContent = doc.title;
    document.getElementById('uploadedFileSize').textContent = 'From Library';

    // Enable analyze button
    document.getElementById('analyzeBtn').disabled = false;

    showToast(`Selected: ${doc.title}`, 'info');
}

// ==================== UPLOAD & ANALYZE TAB ====================

function setupDragAndDrop() {
    const dropZone = document.getElementById('dropZone');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('border-primary', 'bg-primary/5');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('border-primary', 'bg-primary/5');
        });
    });

    dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFile(files[0]);
        }
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
        showToast('Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.', 'error');
        return;
    }

    if (file.size > maxSize) {
        showToast('File too large. Maximum size is 10MB.', 'error');
        return;
    }

    uploadedFile = file;
    selectedDocument = null;

    // Update UI
    document.getElementById('uploadedFileInfo').classList.remove('hidden');
    document.getElementById('uploadedFileName').textContent = file.name;
    document.getElementById('uploadedFileSize').textContent = formatFileSize(file.size);
    document.getElementById('selectLibraryDoc').value = '';

    // Enable analyze button
    document.getElementById('analyzeBtn').disabled = false;

    showToast('File uploaded successfully', 'success');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeUploadedFile() {
    uploadedFile = null;
    selectedDocument = null;
    document.getElementById('uploadedFileInfo').classList.add('hidden');
    document.getElementById('fileInput').value = '';
    document.getElementById('selectLibraryDoc').value = '';
    document.getElementById('analyzeBtn').disabled = true;

    // Reset chat
    resetChat();
}

function populateLibrarySelect() {
    const select = document.getElementById('selectLibraryDoc');
    bdLegalDocuments.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = `${doc.title} (${doc.year})`;
        select.appendChild(option);
    });
}

function selectLibraryDocument() {
    const docId = document.getElementById('selectLibraryDoc').value;
    if (docId) {
        const doc = bdLegalDocuments.find(d => d.id === parseInt(docId));
        if (doc) {
            selectDocumentForAnalysis(doc);
        }
    }
}

function startAnalysis() {
    if (!selectedDocument && !uploadedFile) {
        showToast('Please upload a document or select from library', 'error');
        return;
    }

    isAnalyzing = true;

    // Update button state
    document.getElementById('analyzeBtnText').classList.add('hidden');
    document.getElementById('analyzeBtnLoader').classList.remove('hidden');
    document.getElementById('analyzeBtn').disabled = true;

    // Simulate analysis
    setTimeout(() => {
        isAnalyzing = false;
        document.getElementById('analyzeBtnText').classList.remove('hidden');
        document.getElementById('analyzeBtnLoader').classList.add('hidden');
        document.getElementById('analyzeBtn').disabled = false;

        // Enable chat
        document.getElementById('chatInput').disabled = false;
        document.getElementById('sendBtn').disabled = false;
        document.getElementById('quickQuestions').classList.remove('hidden');

        // Add initial message
        addMessage('assistant', `I've analyzed the document "${selectedDocument ? selectedDocument.title : uploadedFile.name}". You can now ask me questions about its content, provisions, legal implications, or compare it with Bangladesh law.\n\nTry asking about:\n- Main purpose of the document\n- Key provisions or sections\n- Legal compliance\n- Specific terms or clauses`);

        showToast('Document analyzed successfully!', 'success');
    }, 2000);
}

function resetChat() {
    document.getElementById('chatMessages').innerHTML = `
        <div class="text-center text-gray-400 py-8">
            <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <p>Upload a document to start asking questions</p>
        </div>
    `;
    document.getElementById('chatInput').disabled = true;
    document.getElementById('sendBtn').disabled = true;
    document.getElementById('quickQuestions').classList.add('hidden');
}

function addMessage(role, content) {
    const chatMessages = document.getElementById('chatMessages');

    // Remove placeholder if exists
    const placeholder = chatMessages.querySelector('.text-center');
    if (placeholder) placeholder.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;

    const bubbleClass = role === 'user'
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-gray-800';

    messageDiv.innerHTML = `
        <div class="max-w-[80%] ${bubbleClass} rounded-lg p-4">
            <div class="whitespace-pre-wrap">${content}</div>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendQuery() {
    const input = document.getElementById('chatInput');
    const query = input.value.trim();

    if (!query) return;

    // Add user message
    addMessage('user', query);
    input.value = '';

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'flex justify-start';
    typingDiv.innerHTML = `
        <div class="bg-gray-100 rounded-lg p-4">
            <div class="flex space-x-2">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        </div>
    `;
    document.getElementById('chatMessages').appendChild(typingDiv);

    // Simulate AI response
    setTimeout(() => {
        typingDiv.remove();
        const response = generateAIResponse(query);
        addMessage('assistant', response);
    }, 1500);
}

function askQuickQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendQuery();
}

function generateAIResponse(query) {
    const queryLower = query.toLowerCase();
    const docCategory = selectedDocument ? selectedDocument.category : 'general';

    // Check for specific topic matches
    if (queryLower.includes('main purpose') || queryLower.includes('what is this')) {
        if (selectedDocument) {
            return `**${selectedDocument.title}**\n\n${selectedDocument.description}\n\nThis document was enacted in ${selectedDocument.year} and falls under ${selectedDocument.category} law in Bangladesh. It contains important provisions that govern ${getDocumentPurpose(docCategory)}.`;
        }
        return "This document appears to be an employment contract. Its main purpose is to establish the terms and conditions of employment between the employer and employee, including compensation, duties, and termination procedures.";
    }

    if (queryLower.includes('key provision') || queryLower.includes('important section')) {
        return getKeyProvisions(docCategory);
    }

    if (queryLower.includes('parties') || queryLower.includes('who')) {
        return getPartiesInfo(docCategory);
    }

    if (queryLower.includes('penalt') || queryLower.includes('punishment') || queryLower.includes('consequence')) {
        return getPenalties(docCategory);
    }

    if (queryLower.includes('right') && docCategory === 'constitution') {
        return aiResponses.constitution.rights;
    }

    if (queryLower.includes('murder') || queryLower.includes('homicide')) {
        return aiResponses.criminal.murder;
    }

    if (queryLower.includes('theft') || queryLower.includes('steal')) {
        return aiResponses.criminal.theft;
    }

    if (queryLower.includes('contract') && queryLower.includes('form')) {
        return aiResponses.commercial['contract formation'];
    }

    if (queryLower.includes('working hour') || queryLower.includes('work time')) {
        return aiResponses.labor['working hours'];
    }

    if (queryLower.includes('terminat') || queryLower.includes('fire') || queryLower.includes('dismiss')) {
        return aiResponses.labor.termination;
    }

    if (queryLower.includes('leave') || queryLower.includes('vacation') || queryLower.includes('holiday')) {
        return aiResponses.labor.leave;
    }

    if (queryLower.includes('compan') && queryLower.includes('form')) {
        return aiResponses.commercial['company formation'];
    }

    // Default response
    return `Based on my analysis of the document, here's what I found regarding your query:\n\nThe document ${selectedDocument ? `"${selectedDocument.title}"` : 'you uploaded'} contains provisions related to your question. ${getGenericResponse(docCategory)}\n\nWould you like me to elaborate on any specific section or provision?`;
}

function getDocumentPurpose(category) {
    const purposes = {
        constitution: 'the fundamental rights, state structure, and governance of Bangladesh',
        criminal: 'criminal offences, their definitions, and punishments',
        civil: 'civil rights, evidence rules, and legal procedures',
        commercial: 'commercial transactions, contracts, and business operations',
        family: 'marriage, divorce, inheritance, and family matters for Muslims',
        property: 'transfer, registration, and rights related to property',
        labor: 'employment conditions, worker rights, and industrial relations'
    };
    return purposes[category] || 'legal matters in Bangladesh';
}

function getKeyProvisions(category) {
    const provisions = {
        constitution: "Key provisions of the Constitution include:\n\n1. **Fundamental Rights (Part III)** - Articles 27-44 guarantee equality, freedom of speech, religion, and protection of life\n2. **Directive Principles (Part II)** - Guidelines for state policy\n3. **Parliament (Part IV)** - Legislative structure and powers\n4. **The Executive (Part V)** - President, Prime Minister, and Cabinet\n5. **The Judiciary (Part VI)** - Supreme Court structure and independence",
        criminal: "Key provisions of the Penal Code include:\n\n1. **Offences Against State** - Sections 121-130\n2. **Offences Against Human Body** - Sections 299-377 (murder, hurt, kidnapping)\n3. **Offences Against Property** - Sections 378-462 (theft, robbery, extortion)\n4. **Offences Against Public Tranquility** - Sections 141-160\n5. **General Exceptions** - Sections 76-106 (self-defense, insanity)",
        commercial: "Key provisions include:\n\n1. **Contract Formation** - Sections 2-10 (offer, acceptance, consideration)\n2. **Void Agreements** - Sections 20-30 (mistake, unlawful consideration)\n3. **Performance** - Sections 37-67 (obligations, joint promises)\n4. **Breach and Remedies** - Sections 73-75 (compensation, damages)",
        labor: "Key provisions of the Labour Act include:\n\n1. **Working Hours** - Sections 100-108 (8 hours/day, 48 hours/week)\n2. **Wages** - Sections 120-126 (payment, deductions)\n3. **Leave** - Sections 115-119 (annual, sick, maternity leave)\n4. **Termination** - Sections 20-27 (notice, compensation)\n5. **Safety** - Sections 51-88 (workplace conditions)"
    };
    return provisions[category] || "The key provisions cover the main subject matter of the document, including definitions, rights and obligations of parties, procedures, and enforcement mechanisms.";
}

function getPartiesInfo(category) {
    if (selectedDocument) {
        const parties = {
            constitution: "The Constitution establishes relationships between:\n\n1. **The State** - Government of Bangladesh\n2. **The Citizens** - People of Bangladesh with fundamental rights\n3. **Parliament** - Elected representatives (300+50 members)\n4. **Judiciary** - Supreme Court and subordinate courts",
            criminal: "In criminal proceedings, the parties are:\n\n1. **The State** - Represented by Public Prosecutor\n2. **The Accused** - Person charged with the offence\n3. **The Victim/Complainant** - Person affected by the crime\n4. **Witnesses** - Persons providing evidence",
            commercial: "Commercial transactions typically involve:\n\n1. **Promisor** - Party making the promise\n2. **Promisee** - Party to whom promise is made\n3. **Third Party Beneficiary** - May benefit from contract\n4. **Agents** - May act on behalf of parties"
        };
        return parties[category] || "The parties involved depend on the specific transaction or matter covered by the document.";
    }
    return "Based on the document, the main parties appear to be the employer and employee, with their respective rights and obligations defined in the contract terms.";
}

function getPenalties(category) {
    const penalties = {
        criminal: "The Penal Code prescribes various penalties:\n\n1. **Death Penalty** - For murder (Section 302), waging war (Section 121)\n2. **Imprisonment for Life** - For culpable homicide, robbery with hurt\n3. **Rigorous Imprisonment** - Hard labor, for serious offences\n4. **Simple Imprisonment** - Confinement only\n5. **Fine** - Monetary penalty\n6. **Forfeiture of Property** - For certain offences",
        labor: "Penalties under the Labour Act 2006:\n\n1. **For Employer Violations** - Fines up to Tk. 25,000 for first offence\n2. **Repeat Offences** - Increased fines and possible imprisonment\n3. **Safety Violations** - Fines up to Tk. 1,00,000\n4. **Child Labour** - Imprisonment up to 2 years or fine up to Tk. 50,000",
        commercial: "Consequences for contract breach:\n\n1. **Damages** - Compensation for loss (Section 73)\n2. **Specific Performance** - Court orders performance\n3. **Injunction** - Court orders to stop actions\n4. **Rescission** - Contract cancellation\n5. **Quantum Meruit** - Payment for work done"
    };
    return penalties[category] || "Penalties depend on the nature of violation. Generally, they may include fines, imprisonment, or other legal consequences as specified by law.";
}

function getGenericResponse(category) {
    const responses = {
        constitution: "The Constitution is the supreme law of Bangladesh. Any law inconsistent with it is void to the extent of such inconsistency.",
        criminal: "Criminal matters in Bangladesh are primarily governed by the Penal Code 1860 and the Code of Criminal Procedure 1898.",
        commercial: "Commercial matters are governed by various laws including the Contract Act 1872, Companies Act 1994, and specific sector regulations.",
        labor: "Employment matters fall under the Bangladesh Labour Act 2006, which consolidates and modernizes labor laws.",
        family: "Family law matters for Muslims are governed by the Muslim Family Laws Ordinance 1961 and personal law.",
        property: "Property transfers are governed by the Transfer of Property Act 1882 and Registration Act 1908."
    };
    return responses[category] || "For specific legal advice, please consult a qualified lawyer.";
}

// ==================== VERIFY TAB ====================

function populateCompareSelect() {
    const select = document.getElementById('compareWith');
    bdLegalDocuments.forEach(doc => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = `${doc.title} (${doc.year})`;
        select.appendChild(option);
    });
}

function handleVerifyUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedFile = file;
        document.getElementById('verifyBtn').disabled = false;

        // Show demo document content
        showDemoVerificationDocument();
        showToast('Document uploaded for verification', 'success');
    }
}

function showDemoVerificationDocument() {
    const viewer = document.getElementById('documentViewer');
    viewer.innerHTML = sampleUploadedDocument.content;
}

function startVerification() {
    const verifyType = document.querySelector('input[name="verifyType"]:checked').value;

    // Show loading state
    document.getElementById('verifyBtn').disabled = true;
    document.getElementById('verifyBtn').textContent = 'Verifying...';

    setTimeout(() => {
        // Reset button
        document.getElementById('verifyBtn').disabled = false;
        document.getElementById('verifyBtn').textContent = 'Start Verification';

        // Show results
        showVerificationResults(verifyType);
    }, 2000);
}

function showVerificationResults(verifyType) {
    const results = verificationResults.employment;

    // Update counts
    document.getElementById('validCount').textContent = results.valid.length;
    document.getElementById('warningCount').textContent = results.warnings.length;
    document.getElementById('issueCount').textContent = results.issues.length;

    // Calculate score
    const total = results.valid.length + results.warnings.length + results.issues.length;
    const score = Math.round((results.valid.length / total) * 100);
    document.getElementById('scoreValue').textContent = score + '%';

    // Update score badge color
    const scoreBadge = document.getElementById('scoreValue');
    if (score >= 80) {
        scoreBadge.className = 'px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold';
    } else if (score >= 60) {
        scoreBadge.className = 'px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold';
    } else {
        scoreBadge.className = 'px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold';
    }

    // Show summary and legend
    document.getElementById('verificationScore').classList.remove('hidden');
    document.getElementById('verificationSummary').classList.remove('hidden');
    document.getElementById('highlightLegend').classList.remove('hidden');

    // Apply highlights to document
    applyHighlights();

    // Show issues list
    showIssuesList(results);

    showToast('Verification complete!', 'success');
}

function applyHighlights() {
    const viewer = document.getElementById('documentViewer');

    // Apply highlighting based on data attributes in the demo content
    const content = viewer.innerHTML;

    // Replace highlight markers with actual styling
    viewer.innerHTML = content
        .replace(/highlight-valid/g, 'style="background-color: #d1fae5; padding: 2px 4px; border-radius: 4px;"')
        .replace(/highlight-warning/g, 'style="background-color: #fef3c7; padding: 2px 4px; border-radius: 4px;"')
        .replace(/highlight-issue/g, 'style="background-color: #fee2e2; padding: 2px 4px; border-radius: 4px;"');
}

function showIssuesList(results) {
    document.getElementById('issuesList').classList.remove('hidden');
    const container = document.getElementById('issuesContainer');

    let html = '';

    // Valid sections
    if (results.valid.length > 0) {
        html += `<div class="mb-4">
            <h4 class="font-medium text-green-700 mb-2 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Valid Clauses (${results.valid.length})
            </h4>
            ${results.valid.map(v => `
                <div class="ml-7 p-3 bg-green-50 rounded-lg mb-2">
                    <p class="font-medium text-gray-800">${v.section}</p>
                    <p class="text-sm text-gray-600">${v.text}</p>
                </div>
            `).join('')}
        </div>`;
    }

    // Warnings
    if (results.warnings.length > 0) {
        html += `<div class="mb-4">
            <h4 class="font-medium text-yellow-700 mb-2 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                Warnings (${results.warnings.length})
            </h4>
            ${results.warnings.map(w => `
                <div class="ml-7 p-3 bg-yellow-50 rounded-lg mb-2">
                    <p class="font-medium text-gray-800">${w.section}</p>
                    <p class="text-sm text-gray-600">${w.text}</p>
                    <p class="text-sm text-yellow-700 mt-1"><strong>Suggestion:</strong> ${w.suggestion}</p>
                </div>
            `).join('')}
        </div>`;
    }

    // Issues
    if (results.issues.length > 0) {
        html += `<div class="mb-4">
            <h4 class="font-medium text-red-700 mb-2 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Issues Found (${results.issues.length})
            </h4>
            ${results.issues.map(i => `
                <div class="ml-7 p-3 bg-red-50 rounded-lg mb-2">
                    <p class="font-medium text-gray-800">${i.section}</p>
                    <p class="text-sm text-gray-600">${i.text}</p>
                    <p class="text-sm text-red-700 mt-1"><strong>Required:</strong> ${i.suggestion}</p>
                </div>
            `).join('')}
        </div>`;
    }

    container.innerHTML = html;
}

// Close modal on escape and backdrop click
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDocumentModal();
    }
});

document.getElementById('documentModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeDocumentModal();
    }
});
