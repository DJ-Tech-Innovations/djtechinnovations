export const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Projects", href: "#projects" },
  { label: "Our Process", href: "#process" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const values = [
  { icon: "layers", title: "Simplify Your Operations", body: "Replace disconnected spreadsheets and manual processes with organized digital workflows." },
  { icon: "zap", title: "Work Smarter, Not Harder", body: "Automate repetitive tasks and give your team more time to focus on what matters." },
  { icon: "sprout", title: "Build for the Future", body: "Invest in flexible software designed to adapt as your business grows." },
] as const;

export type Service = {
  id: string;
  icon: string;
  title: string;
  body: string;
  examples: string[];
  need: string;
  detail: string;
};

export const services: Service[] = [
  {
    id: "web", icon: "globe", title: "Web Application Development", need: "Web Application",
    body: "Fast, responsive, and scalable web applications designed to deliver exceptional experiences for your customers and team.",
    examples: ["Customer portals", "Admin dashboards", "Booking platforms", "Online platforms and business portals"],
    detail: "We start from the people who will use the app, then design the screens, data and permissions around their daily tasks. Typical stack: Next.js, React, TypeScript and a managed database.",
  },
  {
    id: "software", icon: "boxes", title: "Business Software Development", need: "Business Management Software",
    body: "Purpose-built software that brings your business operations into one organized, easy-to-manage system.",
    examples: ["ERP and CRM systems", "Inventory management", "Sales and purchasing systems", "Accounting and reporting applications"],
    detail: "Instead of juggling separate files, your records, approvals and reports live in one system. We can build it in stages so your team starts benefiting early.",
  },
  {
    id: "mobile", icon: "smartphone", title: "Mobile Application Development", need: "Mobile Application",
    body: "Mobile experiences that help your customers and employees access essential services and information wherever they are.",
    examples: ["Business applications", "Customer-facing apps", "Internal operations apps", "Mobile-friendly service platforms"],
    detail: "From field staff updating job status to customers placing requests, we shape mobile apps around short, focused tasks that work on everyday devices.",
  },
  {
    id: "custom", icon: "puzzle", title: "Custom Business Solutions", need: "Custom-Built Application",
    body: "Software designed around your unique processes, requirements, and goals instead of forcing your business into a one-size-fits-all product.",
    examples: ["Industry-specific applications", "Internal management tools", "Workflow systems", "Custom operational platforms"],
    detail: "If off-the-shelf tools keep forcing workarounds, we map how your business actually runs and build software that matches it.",
  },
  {
    id: "automation", icon: "workflow", title: "Business Automation and Integrations", need: "Automation and API Integration",
    body: "Connect your existing tools, streamline workflows, and reduce the manual work slowing your business down.",
    examples: ["API integrations", "Third-party service integrations", "Automated notifications and workflows", "Data synchronization"],
    detail: "We connect the tools you already pay for so data moves on its own, and add notifications and approvals where people currently copy and paste.",
  },
  {
    id: "maintenance", icon: "wrench", title: "Maintenance and Modernization", need: "Existing System Improvement",
    body: "Keep your applications reliable, improve existing systems, and modernize outdated software as your business evolves.",
    examples: ["Bug fixes and enhancements", "Legacy application upgrades", "Performance optimization", "Ongoing technical support"],
    detail: "We review what you have, fix what is fragile, and plan upgrades step by step so your operations are not interrupted.",
  },
];

export type Industry = { id: string; icon: string; title: string; summary: string; points: string[]; goal: string; note: string };

export const industries: Industry[] = [
  {
    id: "retail", icon: "store", title: "Retail and Trading", goal: "Manage inventory, sales, or purchasing",
    summary: "Inventory tracking, sales management, purchasing, stock monitoring, and business reporting.",
    points: ["Stock levels per branch or warehouse with low-stock alerts", "Point-of-sale style order entry and sales records", "Purchase orders and supplier tracking", "Daily and monthly sales and stock reports"],
    note: "Interested in software for a retail or trading business.",
  },
  {
    id: "manufacturing", icon: "factory", title: "Manufacturing and Distribution", goal: "Improve business operations",
    summary: "Production workflows, material tracking, purchase orders, warehouse operations, and inventory visibility.",
    points: ["Bills of materials and production job tracking", "Raw material and finished goods inventory", "Purchase orders and receiving", "Warehouse transfers and dispatch records"],
    note: "Interested in software for manufacturing or distribution.",
  },
  {
    id: "construction", icon: "hard-hat", title: "Construction and Project-Based Businesses", goal: "Solve a specific business problem",
    summary: "Project tracking, quotations, procurement, cost monitoring, documentation, and progress reporting.",
    points: ["Project records with budgets, timelines and milestones", "Quotations and bills of quantities", "Procurement and cost monitoring", "Document storage and progress reports"],
    note: "Interested in software for a construction or project-based business.",
  },
  {
    id: "services", icon: "briefcase", title: "Service-Based Businesses", goal: "Improve customer experience",
    summary: "Customer management, scheduling, invoicing, workflow automation, and service delivery tracking.",
    points: ["Customer records and communication history", "Scheduling and assignment of staff", "Invoicing and payment tracking", "Automated reminders and status updates"],
    note: "Interested in software for a service-based business.",
  },
];

export const differentiators = [
  { icon: "target", title: "Built Around Your Business", body: "Your workflows, requirements, and priorities guide the solution." },
  { icon: "users", title: "Designed for Real People", body: "Intuitive interfaces help your team work confidently and efficiently." },
  { icon: "check-circle", title: "Focused on Practical Results", body: "We prioritize useful features that solve actual operational challenges." },
  { icon: "trending-up", title: "Ready to Grow With You", body: "Build a foundation that can evolve alongside your business." },
] as const;

export const steps = [
  { n: "01", title: "Discover", body: "We learn about your business, challenges, objectives, and requirements." },
  { n: "02", title: "Plan and Design", body: "We define the solution, map the workflows, and design an intuitive user experience." },
  { n: "03", title: "Develop", body: "We build the application with attention to functionality, performance, security, and maintainability." },
  { n: "04", title: "Test and Launch", body: "We validate the functionality, resolve issues, and prepare the application for deployment." },
  { n: "05", title: "Improve and Support", body: "We help refine the solution as your requirements and business needs evolve." },
];

export const faqs = [
  { q: "What types of software do you develop?", a: "We develop web applications, business management systems, mobile applications, custom software, integrations, and automation tools based on your requirements." },
  { q: "Can you build software specifically for my business?", a: "Yes. We can design a solution around your business processes, operational needs, and objectives rather than relying on a generic, one-size-fits-all system." },
  { q: "How much does a custom application cost?", a: "Pricing depends on the scope, complexity, integrations, and features involved. We first understand your requirements and then discuss an appropriate project scope and quotation." },
  { q: "How long does a project take?", a: "Timelines depend on the project's requirements and complexity. After discussing your objectives, we can establish a realistic scope and delivery plan." },
  { q: "Can you improve an existing application?", a: "Yes. Depending on the system, we can help with enhancements, integrations, bug fixes, performance improvements, and modernization." },
  { q: "Do you provide ongoing support?", a: "Support and maintenance options can be discussed based on the application, technical requirements, and the level of assistance your business needs." },
  { q: "What if I am not sure what software I need?", a: "That's completely fine. Tell us about your current process and the challenges you're facing. We can help explore suitable digital solutions." },
];

export const needs = [
  { v: "Web Application", d: "Portals, dashboards, booking and online platforms", icon: "globe" },
  { v: "Business Management Software", d: "ERP, CRM, inventory, sales and accounting", icon: "boxes" },
  { v: "Mobile Application", d: "Apps for customers or your team", icon: "smartphone" },
  { v: "Custom-Built Application", d: "Software shaped around your workflow", icon: "puzzle" },
  { v: "Automation and API Integration", d: "Connect tools and remove manual work", icon: "workflow" },
  { v: "Existing System Improvement", d: "Upgrade, fix or modernize what you have", icon: "wrench" },
  { v: "Not Sure Yet", d: "Describe the problem, we will help explore", icon: "help-circle" },
];

export const goals = [
  "Automate manual tasks",
  "Improve business operations",
  "Manage inventory, sales, or purchasing",
  "Improve customer experience",
  "Build a new digital product",
  "Connect existing systems",
  "Solve a specific business problem",
];

export const budgets = ["Below ₱25,000", "₱25,000–₱75,000", "₱75,000–₱150,000", "₱150,000–₱300,000", "₱300,000+", "Still exploring"];

export const contactMethods = ["Email", "Phone call", "Messaging app", "Video call"];
