# LLB Buddy - Legal Document Tool for Bangladesh

A comprehensive web-based legal document creation, management, and AI-powered analysis tool. Specifically designed for Bangladesh law with a built-in library of major BD legal acts and statutes.

## Quick Start

```bash
# No build required - just open in browser
open frontend/index.html
```

## Project Structure

```
LLB-Buddy/
├── CLAUDE.md                   # Project documentation
├── index.html                  # Landing page with hero & features
├── login.html                  # User login page
├── signup.html                 # User registration page
├── dashboard.html              # Document management dashboard (protected)
├── templates.html              # Legal template library (protected)
├── editor.html                 # Rich text document editor (protected)
├── analysis.html               # Document analysis & verification (protected)
├── css/
│   └── styles.css              # Custom styles (smart fields, highlights, animations)
├── js/
│   ├── auth.js                 # Authentication logic (login, signup, session)
│   ├── data.js                 # Shared utilities, dummy documents, templates, clauses
│   ├── dashboard.js            # Dashboard CRUD operations, search, filter
│   ├── templates.js            # Template browsing and preview
│   ├── editor.js               # Rich text editing, smart fields, auto-save
│   ├── bd-legal-data.js        # Bangladesh legal documents library (12 acts)
│   └── analysis.js             # Document analysis, Q&A chat, verification
└── assets/                     # (Reserved for images/icons)
```

## Hosting

This project is hosted on GitHub Pages at:
**https://toriqultonu.github.io/LLB-Buddy/**

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Vanilla JavaScript (ES6+)** - No framework dependencies

## Features

### 0. Authentication System (`login.html`, `signup.html`)
- **Login Page**:
  - Email and password fields
  - Remember me checkbox
  - Password visibility toggle
  - Social login buttons (Google, Facebook - demo)
  - Demo mode: Any credentials accepted

- **Signup Page**:
  - Full name, email, phone (optional), password fields
  - Password strength indicator (Weak/Fair/Good/Strong)
  - Password confirmation with match validation
  - Terms & conditions checkbox
  - Social signup options

- **Session Management**:
  - User data stored in localStorage
  - Protected pages redirect to login if not authenticated
  - User dropdown menu with profile, settings, logout
  - Automatic navigation update based on auth state

### 1. Landing Page (`index.html`)
- Hero section with call-to-action
- Feature highlights
- Document type showcase (8 categories)
- Statistics section
- New: AI-powered analysis feature promotion

### 2. Document Dashboard (`dashboard.html`)
- **Views**: Grid and list toggle
- **Search**: Real-time document search
- **Filters**: By category (Contract, NDA, Employment, Lease) and status (Draft, Completed, Shared)
- **Actions**: Edit, duplicate, share, delete documents
- **Stats**: Total documents, drafts, completed, shared counts
- **Dummy Data**: 12 sample documents

### 3. Template Library (`templates.html`)
- **12 Professional Templates**:
  - Standard Employment Contract
  - Non-Disclosure Agreement (NDA)
  - Residential Lease Agreement
  - Service Agreement
  - Independent Contractor Agreement
  - Commercial Lease Agreement
  - Partnership Agreement
  - Sales Contract
  - Power of Attorney
  - Last Will and Testament
  - LLC Operating Agreement
  - Mutual NDA
- **Categories**: Contract, Employment, Real Estate, Business, Personal
- **Preview Modal**: View template before using
- **Popularity Rating**: Shows usage statistics

### 4. Document Editor (`editor.html`)
- **Formatting Toolbar**: Bold, italic, underline, alignment, lists, headings
- **Smart Fields**: Auto-fill placeholders (party names, dates, addresses, amounts)
- **Clause Library**: 12 standard legal clauses ready to insert
- **Document Settings**: Category, tags
- **Export**: PDF, DOC, TXT formats
- **Share**: Email invitation and link sharing
- **Auto-save**: Automatic saving with status indicator
- **Word Count**: Real-time word counting

### 5. Document Analysis (`analysis.html`) - **Key Feature**

#### Tab 1: BD Legal Library
Browse and read 12 major Bangladesh laws:

| Act | Year | Category |
|-----|------|----------|
| Constitution of Bangladesh | 1972 | Constitution |
| Penal Code | 1860 | Criminal |
| Code of Criminal Procedure | 1898 | Criminal |
| Contract Act | 1872 | Commercial |
| Muslim Family Laws Ordinance | 1961 | Family |
| Transfer of Property Act | 1882 | Property |
| Labour Act | 2006 | Labor |
| Evidence Act | 1872 | Civil |
| Specific Relief Act | 1877 | Civil |
| Companies Act | 1994 | Commercial |
| Registration Act | 1908 | Property |
| Negotiable Instruments Act | 1881 | Commercial |

#### Tab 2: Upload & Analyze
- **File Upload**: Drag & drop or click to upload (PDF, DOC, DOCX, TXT - max 10MB)
- **Library Selection**: Choose from BD Legal Library
- **AI Chat Interface**:
  - Ask questions in plain language
  - Quick question buttons for common queries
  - Context-aware responses based on document category
  - Covers: main purpose, key provisions, parties, penalties, rights, procedures

#### Tab 3: Verify Document
- **Upload**: Upload your document for verification
- **Verification Types**:
  - Authenticity check
  - Legal compliance check
  - Standard clause verification
- **Compare With**: Reference against BD legal documents
- **Results Display**:
  - Verification score (percentage)
  - Color-coded highlights in document:
    - 🟢 Green: Valid/Verified clauses
    - 🟡 Yellow: Warnings (needs review)
    - 🔴 Red: Issues/Non-compliant
  - Detailed findings list with suggestions
  - Summary counts (valid, warnings, issues)

## Dummy Data

### Documents (12 items)
- Employment contracts, NDAs, lease agreements, service agreements
- Various statuses: draft, completed, shared
- Tags for organization

### Templates (12 items)
- Professional legal document templates
- HTML preview content
- Popularity ratings

### Clauses (12 items)
- Confidentiality, Indemnification, Force Majeure
- Termination, Governing Law, Entire Agreement
- Non-Compete, Non-Solicitation, IP
- Limitation of Liability, Payment Terms, Warranty Disclaimer

### BD Legal Documents (12 acts)
- Full content with sections and articles
- Categorized by law type
- Searchable and filterable

## Key JavaScript Functions

### auth.js
- `isLoggedIn()` - Check if user is authenticated
- `getCurrentUser()` - Get current user object from localStorage
- `getUserInitials(name)` - Get initials for avatar display
- `handleLogin(event)` - Process login form submission
- `handleSignup(event)` - Process signup form submission
- `handleLogout()` - Clear session and redirect
- `socialLogin(provider)` - Handle social login (demo)
- `togglePassword(inputId)` - Toggle password visibility
- `checkPasswordStrength()` - Calculate and display password strength
- `checkPasswordMatch()` - Validate password confirmation
- `requireAuth()` - Protect page, redirect if not authenticated
- `updateNavigation()` - Update nav based on auth state
- `toggleUserMenu()` - Toggle user dropdown menu

### analysis.js
- `switchTab(tab)` - Tab navigation
- `renderLibrary(docs)` - Display legal documents
- `handleFileUpload(event)` - Process uploaded files
- `startAnalysis()` - Begin document analysis
- `sendQuery()` - Send chat message
- `generateAIResponse(query)` - Generate contextual AI response
- `startVerification()` - Begin document verification
- `applyHighlights()` - Apply color-coded highlights
- `showVerificationResults()` - Display verification findings

### editor.js
- `formatText(command)` - Apply text formatting
- `insertField(fieldType)` - Insert smart field
- `insertClauseContent(clauseId)` - Insert legal clause
- `fillAllFields()` - Auto-fill all smart fields
- `autoSave()` - Save document automatically
- `exportDocument()` - Export to file

### dashboard.js
- `renderDocuments(docs)` - Display document cards/rows
- `filterDocuments()` - Search and filter
- `setView(view)` - Toggle grid/list view

## CSS Classes

### Smart Fields
```css
.smart-field          /* Unfilled field (yellow dashed border) */
.smart-field.filled   /* Filled field (green solid border) */
```

### Status Badges
```css
.status-badge.draft      /* Yellow badge */
.status-badge.completed  /* Green badge */
.status-badge.shared     /* Purple badge */
```

### Highlights (Verification)
```css
highlight-valid    /* Green background */
highlight-warning  /* Yellow background */
highlight-issue    /* Red background */
```

## Pages

| Page | URL | Auth Required | Description |
|------|-----|---------------|-------------|
| Home | `index.html` | No | Landing page |
| Login | `login.html` | No | User login |
| Sign Up | `signup.html` | No | User registration |
| Dashboard | `dashboard.html` | Yes | Document management |
| Templates | `templates.html` | Yes | Template library |
| Analysis | `analysis.html` | Yes | Document analysis |
| Editor | `editor.html` | Yes | Document editor |

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- [ ] Backend API integration (Node.js/Python)
- [ ] Real AI/LLM integration (OpenAI, Anthropic)
- [x] User authentication & accounts (Frontend only - demo mode)
- [ ] PDF generation with proper formatting
- [ ] Document version history
- [ ] Collaborative editing
- [ ] More BD legal documents (100+ acts)
- [ ] Bengali language support
- [ ] Mobile responsive improvements
- [ ] Dark mode theme
- [ ] Password reset functionality
- [ ] Email verification
- [ ] User profile page
- [ ] Account settings page

## License

This project is for educational purposes. Legal documents should be reviewed by qualified legal professionals.
