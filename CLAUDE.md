# LLB Buddy - Legal Document Tool

A comprehensive web-based legal document creation, management, and analysis tool built with HTML, CSS (Tailwind), and vanilla JavaScript. Specifically designed for Bangladesh law.

## Project Structure

```
frontend/
├── index.html              # Landing page
├── dashboard.html          # Document management dashboard
├── templates.html          # Template library
├── editor.html             # Document editor
├── analysis.html           # Document analysis & verification
├── css/
│   └── styles.css          # Custom styles
├── js/
│   ├── data.js             # Shared utilities and document data
│   ├── dashboard.js        # Dashboard functionality
│   ├── templates.js        # Templates page functionality
│   ├── editor.js           # Document editor functionality
│   ├── bd-legal-data.js    # Bangladesh legal documents library
│   └── analysis.js         # Document analysis functionality
└── assets/                 # (For future images/icons)
```

## Features

### 1. Document Creation (Editor)
- Rich text editing with formatting toolbar
- Smart fields for auto-filling common data
- Clause library for inserting standard legal clauses
- Export to PDF/DOC/TXT
- Share documents with others
- Auto-save functionality

### 2. Template Library
- 12+ professional legal document templates
- Categories: Contracts, Employment, Real Estate, Business, Personal
- Preview before use
- Direct editing from templates

### 3. Dashboard
- View, search, filter documents
- Grid and list view toggle
- Document management (edit, duplicate, share, delete)
- Status tracking (draft, completed, shared)

### 4. Document Analysis (NEW)
- **BD Legal Library**: 12 major Bangladesh laws including:
  - Constitution of Bangladesh (1972)
  - Penal Code (1860)
  - Code of Criminal Procedure (1898)
  - Contract Act (1872)
  - Muslim Family Laws Ordinance (1961)
  - Transfer of Property Act (1882)
  - Labour Act (2006)
  - Evidence Act (1872)
  - Specific Relief Act (1877)
  - Companies Act (1994)
  - Registration Act (1908)
  - Negotiable Instruments Act (1881)

- **AI-Powered Q&A**: Ask questions about documents in plain language
  - Get explanations of legal provisions
  - Understand rights and obligations
  - Learn about penalties and procedures

- **Document Verification**: Upload your documents to verify against BD law
  - Authenticity checking
  - Legal compliance verification
  - Standard clause verification
  - Highlighted issues with color coding:
    - Green: Valid/Verified clauses
    - Yellow: Warnings (needs review)
    - Red: Issues/Non-compliant sections
  - Detailed findings with suggestions for fixes

## Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript (ES6+)

## Running Locally

Simply open `frontend/index.html` in a web browser. No build process required.

## Pages

1. **Home** (`index.html`) - Landing page with features overview
2. **Dashboard** (`dashboard.html`) - Manage your documents
3. **Templates** (`templates.html`) - Browse and use templates
4. **Analysis** (`analysis.html`) - Analyze and verify documents
5. **Editor** (`editor.html`) - Create and edit documents

## Future Enhancements

- Backend integration for persistent storage
- Real AI/LLM integration for document analysis
- User authentication
- PDF generation
- Document comparison
- More BD legal documents and acts
