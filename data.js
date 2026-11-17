// All content of the site lives here. Edit this file to change the page; app.js renders it.
// Text with { en, id } is shown in the language the visitor picks. Dates use "YYYY-MM"; end: null means "present".
const PORTFOLIO = {
  person: {
    name: "Asep Diki Hermansyah",
    nick: "Diki",
    timezone: "Asia/Jakarta",
    email: "asepdiki54@gmail.com",
    whatsapp: "6287783871081",
    linkedin: "https://www.linkedin.com/in/asep-diki-hermansyah-80b8ab194",
    github: "https://github.com/hermansyah8",
    role: { en: "Software QA Engineer · East Jakarta", id: "Software QA Engineer · Jakarta Timur" },
    lead: {
      en: "I'm a Software QA Engineer with over 4 years of experience testing web, mobile and core banking systems, by hand and with automation. Right now I work on the BRIVA and Cash Card projects at Bank BRI, focusing on API testing.",
      id: "Saya Software QA Engineer dengan pengalaman lebih dari 4 tahun menguji sistem web, mobile dan core banking, secara manual maupun dengan automation. Saat ini saya menangani proyek BRIVA dan Cash Card di Bank BRI, dengan fokus pada API testing."
    },
    // the About text is the Summary from the CV
    about: {
      en: "Detail-oriented and results-driven Software Quality Assurance (SQA) Engineer with over 4 years of proven experience in manual, automated, and API testing across web, mobile, and core banking platforms. Solid mastery of Software Development Life Cycle (SDLC) and Software Testing Life Cycle (STLC) methodologies within Agile/Scrum environments. Proficient with testing tools and frameworks including Postman, Cypress, Playwright, Katalon Studio, and DBeaver. Fast learner with strong analytical skills, adept at defect root-cause analysis, cross-functional collaboration, and ensuring high system reliability under tight release cycles.",
      id: "Software Quality Assurance (SQA) Engineer yang teliti dan berorientasi hasil, dengan pengalaman lebih dari 4 tahun dalam manual, automated, dan API testing di platform web, mobile, dan core banking. Menguasai metodologi Software Development Life Cycle (SDLC) dan Software Testing Life Cycle (STLC) di lingkungan Agile/Scrum. Mahir memakai tools dan framework testing seperti Postman, Cypress, Playwright, Katalon Studio, dan DBeaver. Cepat belajar dengan kemampuan analisis yang kuat, terampil dalam analisis akar masalah defect, kolaborasi lintas tim, dan menjaga keandalan sistem di siklus rilis yang ketat."
    }
  },

  projects: [
    {
      category: "API Testing",
      years: [2026, null],
      title: { en: "BRIVA and Cash Card", id: "BRIVA dan Cash Card" },
      desc: {
        en: "End-to-end API testing of core banking integration services: contract and payload checks, ledger validation in the database, and failure tracing through logs.",
        id: "API testing end-to-end untuk layanan integrasi core banking: pengecekan kontrak dan payload, validasi ledger di database, dan pelacakan kegagalan lewat log."
      },
      tech: ["Postman", "DBeaver", "Kibana", "BRIGate", "Jira"]
    },
    {
      category: "E2E Testing",
      years: [2022, 2025],
      title: { en: "Daihatsuku Revamp and OSP MRA", id: "Daihatsuku Revamp dan OSP MRA" },
      desc: {
        en: "Functional and E2E testing for multi-platform web and mobile apps, with test plans, test cases and bugs tracked through the full lifecycle.",
        id: "Functional dan E2E testing untuk aplikasi web dan mobile multi-platform, dengan test plan, test case, dan bug yang dilacak sampai tuntas."
      },
      tech: ["E2E", "Test plans", "Jira"]
    },
    {
      category: "Automation",
      years: [2025, 2026],
      title: { en: "API Automation", id: "API Automation" },
      desc: {
        en: "Cypress API automation plus manual API testing to check endpoints, data accuracy and reliability.",
        id: "API automation dengan Cypress ditambah API testing manual untuk memeriksa endpoint, akurasi data dan keandalan."
      },
      tech: ["Cypress", "Postman", "AIO Tests", "DBeaver"]
    }
  ],

  experience: [
    {
      role: "Software Quality Assurance / Tester",
      company: "PT Bank Rakyat Indonesia (Persero) Tbk",
      start: "2026-08", end: null,
      desc: {
        en: "End-to-end API testing on core banking services for BRIVA and Cash Card. Validates contracts and payloads, checks ledger data in DBeaver, traces failures in Kibana and BRIGate, and reports bugs in Jira.",
        id: "API testing end-to-end pada layanan core banking untuk BRIVA dan Cash Card. Memvalidasi kontrak dan payload, mengecek data ledger di DBeaver, melacak kegagalan di Kibana dan BRIGate, serta melaporkan bug di Jira."
      }
    },
    {
      role: "Software Quality Assurance Engineer",
      company: "Bythen",
      start: "2026-01", end: "2026-07",
      desc: {
        en: "E2E testing against business requirements, test cases from functional and non-functional requirements, regression and retesting each release, UAT support and test reports.",
        id: "E2E testing sesuai kebutuhan bisnis, test case dari functional dan non-functional requirement, regression dan retesting di tiap rilis, dukungan UAT, serta laporan testing."
      }
    },
    {
      role: "Software Quality Assurance Engineer",
      company: "PT. KB Finansia Multi Finance",
      start: "2025-07", end: "2026-01",
      desc: {
        en: "API automation with Cypress, manual API testing and test cases. Used Postman, Jira, AIO Tests and DBeaver, and worked with developers on defects until they were resolved.",
        id: "API automation dengan Cypress, API testing manual, dan penyusunan test case. Memakai Postman, Jira, AIO Tests dan DBeaver, serta bekerja dengan developer sampai defect selesai."
      }
    },
    {
      role: "Software Quality Assurance Engineer",
      company: "PT. Astra International Tbk",
      start: "2022-09", end: "2025-05",
      desc: {
        en: "Functional and E2E testing for Daihatsuku Revamp and OSP MRA across web and mobile. Wrote test plans and test cases, tracked bugs in Jira, and worked with data engineers, developers and business analysts.",
        id: "Functional dan E2E testing untuk Daihatsuku Revamp dan OSP MRA di web dan mobile. Menyusun test plan dan test case, melacak bug di Jira, dan bekerja dengan data engineer, developer dan business analyst."
      }
    },
    {
      role: "Software Helpdesk Specialist",
      company: "SehatQ",
      start: "2022-06", end: "2022-09",
      desc: {
        en: "Analyzed customer complaints about the app, reproduced bugs and escalated verified defects to the QA team.",
        id: "Menganalisis keluhan pelanggan tentang aplikasi, mereproduksi bug, dan mengeskalasi defect yang terverifikasi ke tim QA."
      }
    },
    {
      role: "Helpdesk Specialist",
      company: "PT Bank Central Asia Tbk",
      start: "2021-04", end: "2022-05",
      desc: {
        en: "Front-line phone and email support for credit system questions from BCA branch offices nationwide.",
        id: "Dukungan lini depan lewat telepon dan email untuk pertanyaan sistem kredit dari kantor cabang BCA di seluruh Indonesia."
      }
    }
  ],

  education: [
    {
      title: { en: "Bachelor's Degree in Informatics Engineering", id: "S1 Teknik Informatika" },
      school: "Gunadarma University",
      start: "2015-09", end: "2019-09",
      desc: { en: "GPA 3.39.", id: "IPK 3,39." }
    },
    {
      title: { en: "Vocational High School", id: "Sekolah Menengah Kejuruan" },
      school: "SMK Islam PB Sudirman 1",
      start: "2012-07", end: "2015-06",
      desc: { en: "Multimedia major.", id: "Jurusan Multimedia." }
    }
  ],

  skills: [
    "Manual testing", "Automation testing", "API testing", "E2E", "Regression", "SDLC / STLC", "Agile / Scrum",
    "Postman", "Cypress", "Playwright", "Katalon Studio", "Selenium", "JMeter", "k6", "BRIGate",
    "DBeaver", "SQL Server", "Kibana", "Jira", "AIO Tests", "Confluence", "Excel"
  ],

  // issuer = who organised the course. date = "YYYY-MM" (optional; entries without a date go last).
  // url = link or file of the certificate, e.g. "https://..." or "certificates/bootcamp.pdf";
  // a row with a url becomes a link that opens the certificate directly
  certs: [
    {
      name: "Software Testing Bootcamp", issuer: "Udemy", date: "2024-05",
      url: "https://www.udemy.com/certificate/UC-7e2774dd-c629-4a76-837a-861289ca0f14/"
    },
    {
      name: "Software Quality Assurance", issuer: "Juara Coding", date: "2022-05",
      url: "https://drive.google.com/file/d/1DxBs6KLpGPRyzu7V2qWZyIh45vogMWJP/view"
    },
    {
      name: "Basic Spoken English Program", issuer: "Central Course", date: "2025-09",
      url: "https://drive.google.com/file/d/1Ay8RT9jnsiz7pW-3NTRgGTW1CjlFS2nA/view"
    },
    {
      name: "Junior Web Programming", issuer: "Badan Nasional Sertifikasi Profesi (BNSP)", date: "2019-10",
      url: "https://drive.google.com/file/d/1p9DM_AGeTXQGXIzvBpcs7P165O-aEF0n/view?usp=sharing"
    },
    {
      name: "Fundamental DBMS", issuer: "Gunadarma University", date: "2018-07",
      url: "https://drive.google.com/file/d/1-WWuVumusYIunRwsRTOZCfjFaQk2VbCH/view?usp=sharing"
    },
    {
      name: "Java Programming Language Fundamentals", issuer: "Gunadarma University", date: "2018-01",
      url: "https://drive.google.com/file/d/11pMXNO4DX93enJBI_fXAc06vzQ_gz8OK/view?usp=sharing"
    },
    {
      name: "Fundamental Networking", issuer: "Gunadarma University", date: "2016-02",
      url: "https://drive.google.com/file/d/1rK9OzL3ND4KpErTMkTahEuiNjDxNdD5K/view?usp=sharing"
    },
    // TODO: add date: "YYYY-MM" to the two entries below (the certificate pages do not show it)
    {
      name: "SQL (Intermediate)", issuer: "HackerRank",
      url: "https://www.hackerrank.com/certificates/ee79093f325d"
    },
    {
      name: "Katalon Studio Beginner", issuer: "Katalon",
      url: "https://drive.google.com/file/d/1cJIJ0Oo9QngB5WN2ybOtAIEYnQGM-c43/view"
    }
  ],

  languages: [
    { name: { en: "Indonesian", id: "Bahasa Indonesia" }, level: { en: "Native", id: "Penutur asli" } },
    { name: { en: "English", id: "Bahasa Inggris" }, level: { en: "Professional working proficiency", id: "Kemampuan kerja profesional" } }
  ],

  // interface text
  ui: {
    en: {
      "nav.proj": "Projects", "nav.exp": "Experience", "nav.edu": "Education", "nav.about": "About", "nav.contact": "Contact",
      "hi": "Hi, I'm",
      "hero.cta": "See my work", "hero.mail": "Email me",
      "certs.open": "Open certificate",
      "proj.title": "Projects", "proj.sub": "Main projects from my QA work.",
      "exp.title": "Work Experience", "edu.title": "Education",
      "about.title": "About", "about.skills": "Skills", "about.certs": "Training and certifications", "about.langs": "Languages",
      "ct.title": "Get in touch", "ct.sub": "Feel free to reach out by email or WhatsApp.",
      "present": "Present", "now": "now",
      "ft.top": "Back to top ↑"
    },
    id: {
      "nav.proj": "Proyek", "nav.exp": "Pengalaman", "nav.edu": "Pendidikan", "nav.about": "Tentang", "nav.contact": "Kontak",
      "hi": "Hai, saya",
      "hero.cta": "Lihat proyek", "hero.mail": "Kirim email",
      "certs.open": "Buka sertifikat",
      "proj.title": "Proyek", "proj.sub": "Proyek utama dari pekerjaan QA saya.",
      "exp.title": "Pengalaman Kerja", "edu.title": "Pendidikan",
      "about.title": "Tentang", "about.skills": "Keahlian", "about.certs": "Pelatihan dan sertifikasi", "about.langs": "Bahasa",
      "ct.title": "Hubungi saya", "ct.sub": "Silakan hubungi saya lewat email atau WhatsApp.",
      "present": "Sekarang", "now": "sekarang",
      "ft.top": "Kembali ke atas ↑"
    }
  }
};
