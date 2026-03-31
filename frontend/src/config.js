// ============================================================
//  PORTFOLIO CONFIG — Edit this file to make it yours.
//  No React/JS knowledge needed. Just fill in your details.
// ============================================================

const config = {

  // ── PERSONAL INFO ─────────────────────────────────────────
  name: "Sanay Godhani",
  tagline: ["Building systems", "that think.", "Scale. Perform."],  // 3 lines for the hero heading
  bio: "Software Engineer with expertise in full-stack development, ML systems, and data pipelines. CS graduate from Carleton University.",
  location: "Toronto, ON",
  email: "sanaygodhani@cmail.carleton.ca",
  phone: "343-558-0186",
  linkedin: "http://www.linkedin.com/in/sanay-godhani", // your full LinkedIn URL
  github: "https://github.com/sanaygodhani",        // your GitHub URL
  available: true,   // true = shows the "Available for roles" green badge

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
      category: ">_Languages & 🧩Frameworks",
      title: "Full-Stack Development",
      tags: ["Python", "Java", "C++", "Spring Boot", "ReactJS", "NodeJS", "JavaScript", "Flask", "Django"],
    },
    {
      category: "📈Data & 🤖ML",
      title: "Machine Learning",
      tags: ["TensorFlow", "Pandas", "NumPy", "Scikit-Learn", "PPO", "Actor-Critic", "Q-Learning"],
    },
    {
      category: "🌐Infrastructure & 🛠️Tools",
      title: "DevOps & Tooling",
      tags: ["Redis", "Git", "GitHub", "REST APIs", "Docker", "Bash", "VS Code", "Postman"],
    },
    {
      category: "⛁Databases",
      title: "Data Storage",
      tags: ["SQL", "PostgreSQL", "Schema Design", "Query Optimization", "ORM"],
    },
    {
      category: "💡Interests",
      title: "AI / Research",
      tags: ["Deep Learning", "Automation", "RAG Architectures", "LLM Fine-Tuning"],
    },
  ],

  // ── WORK EXPERIENCE ────────────────────────────────────────
  experience: [
    {
      company: "Nirmal Bang",
      role: "Software Engineer Intern",
      location: "Mumbai, Maharashtra",
      date: "Dec 2025 – Present",
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
      name: "Full-Stack E-Commerce Platform",
      description:
        "Production-grade e-commerce app with secure session auth, RESTful catalogue API, Redis cart caching, and a normalized SQL schema managing users, inventory, and orders.",
      stack: ["Flask", "JavaScript", "HTML/CSS", "SQL", "Redis", "REST API"],
      link: "https://github.com/sanaygodhani", // optional: URL to live demo or GitHub repo
    },
    {
      name: "Corp. Website (Live)",
      description:
        "Led the rebranding and development of a new corporate website",
      stack: ["JavaScript", "HTML/CSS"],
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

  // ── TICKER (scrolling banner) ───────────────────────────────
  // Words that scroll across the ticker strip between hero and skills
  ticker: [
    "Python", "React", "Flask", "TensorFlow", "PostgreSQL",
    "Redis", "Docker", "Spring Boot", "Reinforcement Learning",
    "RAG Architectures", "LLM Fine-Tuning", "REST APIs",
  ],

};

export default config;
