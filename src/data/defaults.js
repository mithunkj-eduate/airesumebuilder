// ─── Default Resume Data ──────────────────────────────────────────────────────
export const defaultResumeData = {
  personal_info: {
    name: "KIRAN KUMAR",
    email: "kiran@gmail.com",
    phone: "+91 6384952354",
    location: "Bengaluru, Karnataka",
    linkedin: "linkedin.com/in/kiran-kumar-8118b1245",
    portfolio: "https://kiran.shareurinterest.com/"
  },
  summary:
    "Results-driven Software Engineer with 3.5 years of experience building scalable backend and full-stack applications using Node.js, MERN stack, and Golang. Strong expertise in designing RESTful APIs, GraphQL services, and microservices-based architectures. Passionate about high-performance systems and rapidly adapting to emerging technologies.",
  experience: [
    {
      id: "e1",
      job_title: "Software Engineer (Full Stack Developer)",
      company: "Tata Consultancy Services Limited",
      location: "Bengaluru, Karnataka",
      duration: "Nov 2024 – Present",
      bullet_points: [
        "Developed scalable frontend applications using React.js and TypeScript, creating reusable UI components",
        "Integrated Google Maps API for real-time location tracking and map-based features",
        "Implemented secure auth system using access & refresh tokens with token rotation",
        "Built backend services using Golang and Entgo for relational data handling and CRUD operations",
        "Designed microservices-based architecture with focus on modular service design"
      ]
    },
    {
      id: "e2",
      job_title: "Software Engineer (Full Stack Developer)",
      company: "LNT Mindtree Pvt. Ltd.",
      location: "Bengaluru, Karnataka",
      duration: "Jan 2023 – Nov 2024",
      bullet_points: [
        "Developed and maintained full-stack applications using MERN stack",
        "Implemented JWT-based authentication and authorization systems",
        "Built e-commerce features including cart, order management, and pagination",
        "Designed and optimized RESTful APIs for scalability and performance"
      ]
    }
  ],
  education: [
    {
      id: "ed1",
      degree: "Bachelor of Engineering (Civil Engineering)",
      school: "Jain Institute of Technology",
      location: "Davanagere",
      duration: "2020"
    }
  ],
  skills: [
    "Node.js", "Express.js", "Golang (Go)", "Entgo", "React.js", "Next.js",
    "TypeScript", "JavaScript (ES6+)", "MongoDB", "PostgreSQL",
    "REST APIs", "GraphQL", "Apollo Client", "Docker", "Kubernetes",
    "AWS (EC2, S3)", "Firebase", "Git"
  ]
}

// ─── Template Definitions ────────────────────────────────────────────────────
export const TEMPLATES = {
  minimalist: {
    key: "minimalist",
    name: "Minimalist",
    description: "Clean, editorial serif design",
    accent: "#1a1a2e",
    headerBg: "#ffffff",
    headerText: "#1a1a2e",
    headerPad: "28px 40px 22px",
    headerBorderBottom: "3px solid #1a1a2e",
    bodyPad: "22px 40px 32px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    nameSize: "28px",
    nameWeight: "700",
    nameLetterSpacing: "1px",
    contactSize: "11px",
    contactColor: "#555",
    sectionTitleStyle: {
      textTransform: "uppercase",
      letterSpacing: "2.5px",
      fontSize: "10.5px",
      fontWeight: "700",
      color: "#1a1a2e",
      borderBottom: "2px solid #1a1a2e",
      paddingBottom: "4px",
      marginBottom: "10px"
    }
  },
  executive: {
    key: "executive",
    name: "Executive",
    description: "Bold navy header, polished serif",
    accent: "#1e3a5f",
    headerBg: "#1e3a5f",
    headerText: "#ffffff",
    headerPad: "30px 40px",
    headerBorderBottom: "none",
    bodyPad: "22px 40px 32px",
    fontFamily: "'Times New Roman', 'Georgia', serif",
    nameSize: "30px",
    nameWeight: "700",
    nameLetterSpacing: "0.5px",
    contactSize: "11px",
    contactColor: "rgba(255,255,255,0.80)",
    sectionTitleStyle: {
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontSize: "11px",
      fontWeight: "700",
      color: "#1e3a5f",
      borderBottom: "1.5px solid #1e3a5f",
      paddingBottom: "4px",
      marginBottom: "10px"
    }
  },
  tech: {
    key: "tech",
    name: "Tech",
    description: "Monospace, green-accent, terminal feel",
    accent: "#0f4c35",
    headerBg: "#f0fdf4",
    headerText: "#0f4c35",
    headerPad: "24px 40px",
    headerBorderBottom: "2px solid #0f4c35",
    bodyPad: "20px 40px 32px",
    fontFamily: "'Courier New', 'Courier', monospace",
    nameSize: "24px",
    nameWeight: "700",
    nameLetterSpacing: "3px",
    contactSize: "11px",
    contactColor: "#166534",
    sectionTitleStyle: {
      textTransform: "uppercase",
      letterSpacing: "3px",
      fontSize: "10px",
      fontWeight: "700",
      color: "#0f4c35",
      borderBottom: "2px solid #0f4c35",
      paddingBottom: "4px",
      marginBottom: "10px"
    }
  },
  modern: {
  key: "modern",
  name: "Modern",
  description: "Vibrant, clean sans-serif layout",
  accent: "#6366f1", // Indigo accent
  headerBg: "#f8fafc",
  headerText: "#1e293b",
  headerPad: "35px 45px",
  headerBorderBottom: "4px solid #6366f1",
  bodyPad: "25px 45px 35px",
  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
  nameSize: "32px",
  nameWeight: "800",
  nameLetterSpacing: "-0.5px",
  contactSize: "12px",
  contactColor: "#64748b",
  sectionTitleStyle: {
    textTransform: "capitalize", // Modern look uses normal casing
    letterSpacing: "0.5px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#6366f1",
    borderBottom: "none", // No border for a cleaner look
    paddingBottom: "0px",
    marginBottom: "12px"
  }
}

}

// ─── Editor Steps ─────────────────────────────────────────────────────────────
export const STEPS = [
  { id: "personal",    label: "Personal",   icon: "User" },
  { id: "summary",     label: "Summary",    icon: "FileText" },
  { id: "experience",  label: "Experience", icon: "Briefcase" },
  { id: "education",   label: "Education",  icon: "GraduationCap" },
  { id: "skills",      label: "Skills",     icon: "Wrench" }
]


export const Prompt = `You are an expert resume parser and portfolio JSON generator.

Your task is to convert the given resume or user input into a complete, professional, ATS-optimized JSON in the EXACT structure below.

STRICT RULES:
- Output ONLY valid JSON (no explanation, no markdown, no comments)
- Follow EXACT key names and structure (do NOT change keys)
- Fill ALL fields with realistic, meaningful content
- If any data is missing, intelligently infer or leave as empty string ""
- Use professional tone and ATS-friendly wording
- Bullet points must be strong, action-based, and impact-driven
- Keep bullet points concise (max 20 words each)

OUTPUT FORMAT:
{
  personal_info: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: ""
  },
  summary: "",
  experience: [
    {
      id: "",
      job_title: "",
      company: "",
      location: "",
      duration: "",
      bullet_points: []
    }
  ],
  education: [
    {
      id: "",
      degree: "",
      school: "",
      location: "",
      duration: ""
    }
  ],
  skills: []
}

SUMMARY RULES:
- Exactly 3 sentences
- Start with years of experience + role
- Include key technologies
- End with a strong value statement

EXPERIENCE RULES:
- Each bullet must:
  - Start with a strong action verb
  - Include metrics if possible (%, x faster, users, etc.)
  - Be ATS-optimized

INPUT RESUME / USER DATA:
{{PASTE RESUME OR USER INPUT HERE}}

Return ONLY valid JSON.`
