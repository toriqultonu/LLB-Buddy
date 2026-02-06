// LLB Buddy - Dummy Data

// User Data
const currentUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "JD",
    plan: "Professional"
};

// Documents Data
const documents = [
    {
        id: 1,
        title: "Employment Contract - Sarah Johnson",
        category: "employment",
        status: "completed",
        createdAt: "2024-02-01",
        modifiedAt: "2024-02-05",
        tags: ["HR", "Full-time"],
        shared: false
    },
    {
        id: 2,
        title: "Non-Disclosure Agreement - Tech Corp",
        category: "nda",
        status: "completed",
        createdAt: "2024-01-28",
        modifiedAt: "2024-02-03",
        tags: ["Confidential", "Partnership"],
        shared: true
    },
    {
        id: 3,
        title: "Commercial Lease Agreement - 123 Main St",
        category: "lease",
        status: "draft",
        createdAt: "2024-02-04",
        modifiedAt: "2024-02-06",
        tags: ["Real Estate", "Commercial"],
        shared: false
    },
    {
        id: 4,
        title: "Service Agreement - Marketing Services",
        category: "contract",
        status: "completed",
        createdAt: "2024-01-15",
        modifiedAt: "2024-01-20",
        tags: ["Marketing", "Vendor"],
        shared: true
    },
    {
        id: 5,
        title: "Independent Contractor Agreement",
        category: "employment",
        status: "draft",
        createdAt: "2024-02-05",
        modifiedAt: "2024-02-06",
        tags: ["Contractor", "Project"],
        shared: false
    },
    {
        id: 6,
        title: "Partnership Agreement - ABC Ventures",
        category: "contract",
        status: "completed",
        createdAt: "2024-01-10",
        modifiedAt: "2024-01-25",
        tags: ["Partnership", "Business"],
        shared: true
    },
    {
        id: 7,
        title: "Software License Agreement",
        category: "contract",
        status: "completed",
        createdAt: "2024-01-05",
        modifiedAt: "2024-01-15",
        tags: ["Software", "License"],
        shared: false
    },
    {
        id: 8,
        title: "Residential Lease - Apartment 5B",
        category: "lease",
        status: "completed",
        createdAt: "2023-12-20",
        modifiedAt: "2024-01-02",
        tags: ["Residential", "Tenant"],
        shared: true
    },
    {
        id: 9,
        title: "Consulting Agreement - Strategy Project",
        category: "contract",
        status: "draft",
        createdAt: "2024-02-06",
        modifiedAt: "2024-02-06",
        tags: ["Consulting", "Draft"],
        shared: false
    },
    {
        id: 10,
        title: "Employee Handbook Acknowledgment",
        category: "employment",
        status: "completed",
        createdAt: "2024-01-08",
        modifiedAt: "2024-01-08",
        tags: ["HR", "Policy"],
        shared: false
    },
    {
        id: 11,
        title: "Mutual NDA - Startup Collaboration",
        category: "nda",
        status: "completed",
        createdAt: "2024-01-22",
        modifiedAt: "2024-01-28",
        tags: ["Startup", "Mutual"],
        shared: true
    },
    {
        id: 12,
        title: "Sales Agreement - Product Distribution",
        category: "contract",
        status: "draft",
        createdAt: "2024-02-03",
        modifiedAt: "2024-02-05",
        tags: ["Sales", "Distribution"],
        shared: false
    }
];

// Templates Data
const templates = [
    {
        id: 1,
        title: "Standard Employment Contract",
        category: "employment",
        description: "Comprehensive employment agreement covering salary, benefits, duties, and termination terms.",
        popularity: 95,
        preview: `<h1 style="text-align: center;">EMPLOYMENT CONTRACT</h1>
<p>This Employment Contract is entered into between [Employer Name] ("Employer") and [Employee Name] ("Employee").</p>
<h2>1. POSITION AND DUTIES</h2>
<p>The Employee shall serve as [Job Title] and perform duties as assigned by the Employer.</p>
<h2>2. COMPENSATION</h2>
<p>The Employee shall receive a salary of [Salary Amount] per [pay period], payable in accordance with the Employer's standard payroll schedule.</p>
<h2>3. BENEFITS</h2>
<p>The Employee shall be entitled to benefits as outlined in the company's employee handbook.</p>
<h2>4. TERM</h2>
<p>This employment shall commence on [Start Date] and continue until terminated by either party.</p>`
    },
    {
        id: 2,
        title: "Non-Disclosure Agreement (NDA)",
        category: "contract",
        description: "Protect confidential information with this standard unilateral NDA template.",
        popularity: 92,
        preview: `<h1 style="text-align: center;">NON-DISCLOSURE AGREEMENT</h1>
<p>This Non-Disclosure Agreement is entered into by and between [Disclosing Party] and [Receiving Party].</p>
<h2>1. CONFIDENTIAL INFORMATION</h2>
<p>Confidential Information means any information disclosed by the Disclosing Party that is designated as confidential.</p>
<h2>2. OBLIGATIONS</h2>
<p>The Receiving Party agrees to hold all Confidential Information in strict confidence and not to disclose it to any third parties.</p>
<h2>3. TERM</h2>
<p>This Agreement shall remain in effect for [Duration] from the date of execution.</p>`
    },
    {
        id: 3,
        title: "Residential Lease Agreement",
        category: "real-estate",
        description: "Complete residential rental agreement with all essential terms and conditions.",
        popularity: 88,
        preview: `<h1 style="text-align: center;">RESIDENTIAL LEASE AGREEMENT</h1>
<p>This Lease Agreement is made between [Landlord Name] ("Landlord") and [Tenant Name] ("Tenant").</p>
<h2>1. PREMISES</h2>
<p>The Landlord agrees to rent to the Tenant the property located at [Property Address].</p>
<h2>2. TERM</h2>
<p>The lease term shall begin on [Start Date] and end on [End Date].</p>
<h2>3. RENT</h2>
<p>The Tenant agrees to pay monthly rent of [Rent Amount], due on the [Due Date] of each month.</p>
<h2>4. SECURITY DEPOSIT</h2>
<p>The Tenant shall pay a security deposit of [Deposit Amount] upon signing this Agreement.</p>`
    },
    {
        id: 4,
        title: "Service Agreement",
        category: "contract",
        description: "General service agreement for professional services between businesses.",
        popularity: 85,
        preview: `<h1 style="text-align: center;">SERVICE AGREEMENT</h1>
<p>This Service Agreement is entered into between [Service Provider] and [Client].</p>
<h2>1. SERVICES</h2>
<p>The Service Provider agrees to provide the following services: [Description of Services]</p>
<h2>2. COMPENSATION</h2>
<p>The Client agrees to pay [Amount] for the services rendered.</p>
<h2>3. TERM</h2>
<p>This Agreement shall be effective from [Start Date] to [End Date].</p>`
    },
    {
        id: 5,
        title: "Independent Contractor Agreement",
        category: "employment",
        description: "Agreement for engaging independent contractors with clear terms on deliverables and payment.",
        popularity: 82,
        preview: `<h1 style="text-align: center;">INDEPENDENT CONTRACTOR AGREEMENT</h1>
<p>This Agreement is entered into between [Company Name] ("Company") and [Contractor Name] ("Contractor").</p>
<h2>1. SERVICES</h2>
<p>The Contractor agrees to perform the following services: [Description of Services]</p>
<h2>2. COMPENSATION</h2>
<p>The Company shall pay the Contractor [Rate/Amount] for services rendered.</p>
<h2>3. RELATIONSHIP</h2>
<p>The Contractor is an independent contractor and not an employee of the Company.</p>`
    },
    {
        id: 6,
        title: "Commercial Lease Agreement",
        category: "real-estate",
        description: "Comprehensive commercial property lease for office or retail spaces.",
        popularity: 78,
        preview: `<h1 style="text-align: center;">COMMERCIAL LEASE AGREEMENT</h1>
<p>This Commercial Lease is entered into between [Landlord] and [Tenant].</p>
<h2>1. PREMISES</h2>
<p>The Landlord leases to the Tenant the commercial space located at [Address].</p>
<h2>2. USE OF PREMISES</h2>
<p>The Tenant shall use the premises solely for [Permitted Use].</p>
<h2>3. RENT</h2>
<p>The base rent shall be [Amount] per month, payable on the first day of each month.</p>`
    },
    {
        id: 7,
        title: "Partnership Agreement",
        category: "business",
        description: "Establish a legal partnership with clear terms on ownership, profits, and responsibilities.",
        popularity: 75,
        preview: `<h1 style="text-align: center;">PARTNERSHIP AGREEMENT</h1>
<p>This Partnership Agreement is entered into by and between [Partner 1] and [Partner 2].</p>
<h2>1. PARTNERSHIP NAME</h2>
<p>The partnership shall be conducted under the name [Partnership Name].</p>
<h2>2. CAPITAL CONTRIBUTIONS</h2>
<p>Each partner shall contribute capital as follows: [Contribution Details]</p>
<h2>3. PROFIT AND LOSS SHARING</h2>
<p>Profits and losses shall be shared equally between the partners.</p>`
    },
    {
        id: 8,
        title: "Sales Contract",
        category: "contract",
        description: "Agreement for the sale of goods between buyer and seller with delivery terms.",
        popularity: 72,
        preview: `<h1 style="text-align: center;">SALES CONTRACT</h1>
<p>This Sales Contract is between [Seller Name] ("Seller") and [Buyer Name] ("Buyer").</p>
<h2>1. GOODS</h2>
<p>The Seller agrees to sell and the Buyer agrees to purchase: [Description of Goods]</p>
<h2>2. PURCHASE PRICE</h2>
<p>The total purchase price is [Amount], payable as follows: [Payment Terms]</p>
<h2>3. DELIVERY</h2>
<p>The goods shall be delivered to [Delivery Address] on or before [Delivery Date].</p>`
    },
    {
        id: 9,
        title: "Power of Attorney",
        category: "personal",
        description: "Grant legal authority to another person to act on your behalf.",
        popularity: 70,
        preview: `<h1 style="text-align: center;">POWER OF ATTORNEY</h1>
<p>I, [Principal Name], hereby appoint [Agent Name] as my Attorney-in-Fact.</p>
<h2>1. POWERS GRANTED</h2>
<p>The Agent is authorized to act on my behalf in the following matters: [Scope of Authority]</p>
<h2>2. DURATION</h2>
<p>This Power of Attorney shall remain in effect until [End Date/Event].</p>
<h2>3. REVOCATION</h2>
<p>I reserve the right to revoke this Power of Attorney at any time.</p>`
    },
    {
        id: 10,
        title: "Last Will and Testament",
        category: "personal",
        description: "Basic template for creating a legally valid will to distribute your estate.",
        popularity: 68,
        preview: `<h1 style="text-align: center;">LAST WILL AND TESTAMENT</h1>
<p>I, [Your Name], being of sound mind, declare this to be my Last Will and Testament.</p>
<h2>1. REVOCATION</h2>
<p>I revoke all previous wills and codicils made by me.</p>
<h2>2. EXECUTOR</h2>
<p>I appoint [Executor Name] as the Executor of this Will.</p>
<h2>3. BEQUESTS</h2>
<p>I direct that my estate be distributed as follows: [Distribution Details]</p>`
    },
    {
        id: 11,
        title: "LLC Operating Agreement",
        category: "business",
        description: "Establish the operating rules and ownership structure for your LLC.",
        popularity: 65,
        preview: `<h1 style="text-align: center;">LLC OPERATING AGREEMENT</h1>
<p>This Operating Agreement is entered into by the Members of [LLC Name].</p>
<h2>1. FORMATION</h2>
<p>The Company was formed as a Limited Liability Company under the laws of [State].</p>
<h2>2. MEMBERS AND CAPITAL</h2>
<p>The Members and their capital contributions are: [Member Details]</p>
<h2>3. MANAGEMENT</h2>
<p>The Company shall be managed by [Members/Managers].</p>`
    },
    {
        id: 12,
        title: "Mutual NDA",
        category: "contract",
        description: "Two-way confidentiality agreement for when both parties share sensitive information.",
        popularity: 80,
        preview: `<h1 style="text-align: center;">MUTUAL NON-DISCLOSURE AGREEMENT</h1>
<p>This Mutual NDA is entered into between [Party A] and [Party B].</p>
<h2>1. PURPOSE</h2>
<p>The parties wish to explore a potential business relationship and may need to share confidential information.</p>
<h2>2. CONFIDENTIAL INFORMATION</h2>
<p>Each party agrees to protect the other's confidential information with the same degree of care it uses for its own.</p>
<h2>3. TERM</h2>
<p>This Agreement shall remain in effect for [Duration].</p>`
    }
];

// Clauses Library
const clauses = [
    {
        id: 1,
        title: "Confidentiality Clause",
        category: "general",
        content: `<h3>CONFIDENTIALITY</h3>
<p>Both parties agree to maintain the confidentiality of any proprietary or confidential information shared during the course of this Agreement. Neither party shall disclose such information to any third party without the prior written consent of the other party, except as required by law.</p>`
    },
    {
        id: 2,
        title: "Indemnification Clause",
        category: "general",
        content: `<h3>INDEMNIFICATION</h3>
<p>Each party agrees to indemnify, defend, and hold harmless the other party from and against any claims, damages, losses, and expenses arising out of or resulting from any breach of this Agreement or any negligent or wrongful act or omission of the indemnifying party.</p>`
    },
    {
        id: 3,
        title: "Force Majeure Clause",
        category: "general",
        content: `<h3>FORCE MAJEURE</h3>
<p>Neither party shall be liable for any failure or delay in performing their obligations under this Agreement if such failure or delay results from circumstances beyond the reasonable control of that party, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.</p>`
    },
    {
        id: 4,
        title: "Termination Clause",
        category: "general",
        content: `<h3>TERMINATION</h3>
<p>Either party may terminate this Agreement by providing [Notice Period] days written notice to the other party. Upon termination, all rights and obligations of the parties shall cease, except for those provisions which by their nature are intended to survive termination.</p>`
    },
    {
        id: 5,
        title: "Governing Law Clause",
        category: "general",
        content: `<h3>GOVERNING LAW</h3>
<p>This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles. Any disputes arising under this Agreement shall be resolved in the courts of [Jurisdiction].</p>`
    },
    {
        id: 6,
        title: "Entire Agreement Clause",
        category: "general",
        content: `<h3>ENTIRE AGREEMENT</h3>
<p>This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous understandings, agreements, negotiations, representations and warranties, and communications, both written and oral, with respect to such subject matter.</p>`
    },
    {
        id: 7,
        title: "Non-Compete Clause",
        category: "employment",
        content: `<h3>NON-COMPETE</h3>
<p>During the term of employment and for a period of [Duration] following termination, the Employee agrees not to directly or indirectly engage in any business that competes with the Employer's business within [Geographic Area]. This restriction applies to employment, consulting, ownership, or any other participation in a competing business.</p>`
    },
    {
        id: 8,
        title: "Non-Solicitation Clause",
        category: "employment",
        content: `<h3>NON-SOLICITATION</h3>
<p>For a period of [Duration] following the termination of this Agreement, the Employee agrees not to solicit, recruit, or encourage any employees, contractors, or customers of the Employer to leave or cease doing business with the Employer.</p>`
    },
    {
        id: 9,
        title: "Intellectual Property Clause",
        category: "general",
        content: `<h3>INTELLECTUAL PROPERTY</h3>
<p>All intellectual property, including but not limited to inventions, discoveries, patents, copyrights, trademarks, and trade secrets, created by the Employee during the course of employment shall be the sole property of the Employer. The Employee agrees to assign all rights to such intellectual property to the Employer.</p>`
    },
    {
        id: 10,
        title: "Limitation of Liability Clause",
        category: "general",
        content: `<h3>LIMITATION OF LIABILITY</h3>
<p>In no event shall either party be liable to the other for any indirect, incidental, special, consequential, or punitive damages, regardless of the cause of action or the form of action, even if such party has been advised of the possibility of such damages. The total liability of either party shall not exceed [Amount].</p>`
    },
    {
        id: 11,
        title: "Payment Terms Clause",
        category: "contract",
        content: `<h3>PAYMENT TERMS</h3>
<p>Payment shall be due within [Number] days of receipt of invoice. Late payments shall incur interest at a rate of [Interest Rate]% per month. The Client agrees to pay all reasonable costs of collection, including attorney fees, in the event of non-payment.</p>`
    },
    {
        id: 12,
        title: "Warranty Disclaimer Clause",
        category: "contract",
        content: `<h3>WARRANTY DISCLAIMER</h3>
<p>THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. THE SERVICE PROVIDER DOES NOT WARRANT THAT THE SERVICES WILL MEET THE CLIENT'S REQUIREMENTS OR THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.</p>`
    }
];

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function to get status badge class
function getStatusBadgeClass(status) {
    const classes = {
        draft: 'status-badge draft',
        completed: 'status-badge completed',
        shared: 'status-badge shared'
    };
    return classes[status] || 'status-badge';
}

// Helper function to get category icon
function getCategoryIcon(category) {
    const icons = {
        contract: '📜',
        nda: '🔒',
        employment: '💼',
        lease: '🏠',
        'real-estate': '🏠',
        business: '🏢',
        personal: '👤',
        other: '📄'
    };
    return icons[category] || '📄';
}

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
