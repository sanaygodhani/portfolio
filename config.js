// ============================================================
//  PORTFOLIO CONFIG — Edit this file to make it yours.
//  No React/JS knowledge needed. Just fill in your details.
// ============================================================

const config = {

    // ── PERSONAL INFO ─────────────────────────────────────────
    name: "Sanay Godhani",
    heroTagline: ["Engineering intelligence", "at production scale."],  // Tagline displayed in the Hero section
    aboutTagline: ["Think distributed,", "act atomic."],  // Tagline displayed in the About section heading
    bio: "Software Engineer with expertise in full-stack development, ML systems, and data pipelines. CS graduate from Carleton University.",
    location: "Toronto, ON",
    email: "sanaygodhani@cmail.carleton.ca",
    phone: "343-558-0186",
    linkedin: "https://www.linkedin.com/in/sanay-godhani", // your full LinkedIn URL
    github: "https://github.com/sanaygodhani",        // your GitHub URL

    // ── EMAILJS CONFIG ─────────────────────────────────────────
    emailjs: {
      publicKey: "uHfNmGsSv1BTZSRJL",
      serviceId: "service_9h7ut43",
      templateId: "template_zz1s0nh",
    },
  
    // ── HERO STATS ─────────────────────────────────────────────
    // Small numbers displayed at the bottom of the hero section
    stats: [
      { value: "3+",  label: "Years building" },
      { value: "10+", label: "Technologies" },
      { value: "40%", label: "RL survival improvement" },
      { value: "1K+", label: "Simulation episodes" },
    ],
  
    // ── SKILLS ─────────────────────────────────────────────────
    // Each card has a category label, a title, and a list of tags
    skills: [
      {
        category: "[SYSTEM_LANGUAGES]",
        title: "Full-Stack Development",
        tags: ["Python", "Java", "C++", "Spring Boot", "ReactJS", "NodeJS", "JavaScript", "Flask", "Django"],
      },
      {
        category: "[MACHINE_LEARNING]",
        title: "Machine Learning",
        tags: ["TensorFlow", "Pandas", "NumPy", "Scikit-Learn", "PPO", "Actor-Critic", "Q-Learning"],
      },
      {
        category: "[INFRASTRUCTURE_&_TOOLS]",
        title: "DevOps & Tooling",
        tags: ["Redis", "Git", "GitHub", "REST APIs", "Docker", "Bash", "VS Code", "Postman"],
      },
      {
        category: "[DATA_STORAGE]",
        title: "Data Storage",
        tags: ["SQL", "PostgreSQL", "Schema Design", "Query Optimization", "ORM"],
      },
      {
        category: "[RESEARCH_&_AI]",
        title: "AI / Research",
        tags: ["Deep Learning", "Automation", "RAG Architectures", "LLM Fine-Tuning"],
      },
    ],
  
    // ── WORK EXPERIENCE ────────────────────────────────────────
    experience: [
      {
        company: "Mishal Reborn Metals",
        role: "Trade Strategist & Sales Analyst",
        location: "Hybrid",
        date: "Feb 2026 – Present",
        bullets: [
            "Market Intelligence: Continuously monitoring global and domestic metal markets, tracking price fluctuations, supply chain disruptions, and geopolitical factors affecting scrap and refined metal pricing (e.g., LME trends).",
            "Sourcing Optimization: Developing data-driven strategies for sourcing raw materials. Identify cost-effective purchasing windows and evaluate vendor/supplier performance to maximize margins.",
            "Pricing Strategy: Collaborating with the procurement and sales teams to establish dynamic pricing models that reflect real-time market conditions and maintain competitive advantage.",
            "Risk Management: Identifying potential market risks and propose hedging strategies or diversification tactics to protect company margins.",
            "Data Analytics: Analyzed sales data, customer purchasing behaviors, and historical trends to identify growth opportunities and areas for improvement.",
            "Forecasting: Developed accurate short-term and long-term sales forecasts to guide inventory management and procurement strategies.",
            "Reporting: Creating and maintaining comprehensive dashboards and reports detailing key performance indicators (KPIs), revenue metrics, and profit margins for executive review.",
            "Sales Optimization: Working closely with the sales team to analyze pipeline velocity, conversion rates, and account profitability. Provide actionable insights to improve sales tactics and territory management.",
            "Cross-Functional Collaboration: Acted as the primary liaison between the purchasing/trading desk and the sales department, ensuring alignment between what we buy and what the market demands. Presented complex market data and sales metrics in a clear, digestible format to stakeholders and executive leadership."
        ],
      },
      {
        company: "Nirmal Bang",
        role: "Software Engineer",
        location: "Mumbai, Maharashtra",
        date: "Dec 2025 – Feb 2026",
        bullets: [
          "Architected and deployed a full-stack internal communication platform using Flask and SQL, featuring a dynamic template engine, role-based recipient selection, and real-time data hydration from the firm's production database.",
          "Engineered a robust backend API layer for template rendering and transactional email dispatch via smtplib and Flask-Mail, integrating directly with existing SQL infrastructure.",
          "Researched and prototyped a deep learning model for automated extraction of structured financial data from unstructured sources such as scanned images and PDFs using TableNet and Tesseract OCR.",
          "Gained hands-on experience within a production financial services environment at one of India's leading broking firms.",
        ],
      },
      {
        company: "Barkat Landscaping",
        role: "Jr. Project Manager",
        location: "Ottawa, ON",
        date: "May 2025 – Dec 2025",
        bullets: [
          "Managed multiple residential construction projects from cradle to commissioning, ensuring drawings, scope, and sequencing aligned with project requirements and client expectations.",
          "Oversaw project documentation including schedules, daily progress logs, purchase tracking, change updates, and cost monitoring.",
          "Assisted with RFI preparation, vendor communication, and procurement timelines to maintain schedule integrity.",
        ],
      },
    ],
  
    // ── PROJECTS ───────────────────────────────────────────────
    projects: [
        {
        name: "ERP & CRM",
        description:
          "Designed and developed a robust inventory and financial management system using PostgreSQL, featuring an immutable ledger architecture, ACID-compliant transactions, real-time profit analytics, and strict data validation to ensure auditability, consistency, and accurate tracking of high-value scrap metal operations.",
        stack: ["FastAPI", "JavaScript", "Postgres", "Redis"],
        link: "https://conload.vercel.app", // optional: URL to live demo or GitHub repo
      },
      {
        name: "Full-Stack E-Commerce Platform",
        description:
          "Production-grade e-commerce app with secure session auth, RESTful catalogue API, Redis cart caching, and a normalized SQL schema managing users, inventory, and orders.",
        stack: ["Flask", "JavaScript", "SQL", "Redis", "REST API"],
        link: "https://github.com/sanaygodhani", // optional: URL to live demo or GitHub repo
      },
      {
        name: "Corp. Website (Live)",
        description:
          "Led the rebranding and development of a new corporate website",
        stack: ["JavaScript"],
        link: "https://sanaygodhani.github.io/mrm/", // optional: URL to live demo or GitHub repo
      },
      {
        name: "Multi-Agent RL Simulation",
        description:
          "2D grid-world simulation investigating the exploration-exploitation trade-off in resource management. Implemented PPO, Actor-Critic, and Q-Learning across 4 environments with 1,000 episodes each — achieving 40% better survival rates and 20% faster convergence.",
        stack: ["Python", "PPO", "Actor-Critic", "Q-Learning", "NumPy"],
        link: "https://github.com/Zyreal/COMP4010-Survival-RL.git",
      },
      {
        name: "Audio Visualizer",
        description:
          "A real-time 3D music visualizer built with Python, OpenGL, and librosa. Drop in any audio file and watch it come alive with beat-reactive rings, particle bursts, and a scrolling ticker — all rendered in a custom red, gold, and black color palette.",
        stack: ["Python", "OpenGL", "librosa"],
        link: "https://github.com/sanaygodhani/MP3Visualizer",
      },
    ],
  
    // ── EDUCATION ──────────────────────────────────────────────
    education: {
      school: "Carleton University",
      location: "Ottawa, ON",
      degree: "Bachelor of Computer Science",
      minor: "Minor in Statistics",
      graduated: "Graduated Jan. 2025",
      interests: ["Deep Learning", "Automation", "RAG Architectures", "LLM Fine-Tuning", "Ecological Modelling"],
    },
  
    // ── HOBBIES & VENTURES ──────────────────────────────────────
    hobbies: [
      {
        name: "Indrith Studio",
        role: "Founder",
        details: "Launching an independent studio dedicated to crafting immersive interactive applications, game worlds, and physics simulations.",
        stampColor: "var(--color-sunset-coral)",
        date: "EST. 2026"
      },
      {
        name: "Generative Art",
        role: "Creative Coder",
        details: "Developing real-time, beat-reactive visualizers and graphics simulations using OpenGL, GLSL, and Librosa.",
        stampColor: "var(--color-warm-gold)",
        date: "3D AUDIO"
      },
      {
        name: "Open Source",
        role: "Contributor",
        details: "Building developer tooling, custom automation pipelines, and scripting plugins to streamline developer environments.",
        stampColor: "var(--color-palm-green)",
        date: "SCRIPTS"
      }
    ],
  
    // ── TICKER (scrolling banner) ───────────────────────────────
    // Words that scroll across the ticker strip between hero and skills
    ticker: [
      "Python", "React", "Flask", "TensorFlow", "PostgreSQL",
      "Redis", "Docker", "Spring Boot", "Reinforcement Learning",
      "RAG Architectures", "LLM Fine-Tuning", "REST APIs",
    ],
  
  };
  
  export default config;
