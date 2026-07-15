// Single source of truth for the 104-week roadmap seed data.
// Imported by the seed API route (src/app/api/tasks/route.ts) and the
// standalone CLI seed script (src/scripts/seed.ts) so the two never drift.

export interface RoadmapTask {
  weekNumber: number;
  phase: string;
  title: string;
  description: string;
  category: string;
  sequenceOrder: number;
}

export interface RoadmapUniversity {
  name: string;
  city: string;
  ranking: string;
  tuitionFees: string;
  scholarships: string;
  ieltsRequirement: string;
  deadline: string;
  duration: string;
  livingCost: string;
  status: 'Researching' | 'Applying' | 'Submitted' | 'Accepted' | 'Rejected';
}

export interface RoadmapProjectFeature {
  name: string;
  completed: boolean;
}

export interface RoadmapProject {
  name: string;
  type: 'SaaS' | 'Enterprise' | 'AI' | 'Open Source' | 'Portfolio';
  description: string;
  techStack: string[];
  features: RoadmapProjectFeature[];
  status: 'Idea' | 'In Progress' | 'Completed' | 'Deployed';
}

export const roadmapTasks: RoadmapTask[] = [
  // Phase 1: IELTS & Portfolio (Weeks 1 - 14)
  { weekNumber: 1, phase: 'Phase 1: IELTS & Portfolio', title: 'Register for IELTS Exam', description: 'Create an account on the IELTS registration portal (British Council or IDP), choose a date between September and October 2026, and pay the registration fee.', category: 'IELTS', sequenceOrder: 1 },
  { weekNumber: 2, phase: 'Phase 1: IELTS & Portfolio', title: 'Establish IELTS Study Routine & Daily Speaking', description: 'Set up a daily routine: 30 minutes of speaking practice with a partner, mirror, or app. Review IELTS marking criteria.', category: 'IELTS', sequenceOrder: 2 },
  { weekNumber: 3, phase: 'Phase 1: IELTS & Portfolio', title: 'Start Daily IELTS Essay Writing', description: 'Write one Task 1 (report/chart description) and one Task 2 (argumentative essay) daily. Focus on coherence, cohesion, and grammatical range.', category: 'IELTS', sequenceOrder: 3 },
  { weekNumber: 4, phase: 'Phase 1: IELTS & Portfolio', title: 'IELTS Listening & Reading Mock Exams', description: 'Take at least 3 full-length listening and reading mock tests under timed conditions. Review mistakes and learn techniques for different question types.', category: 'IELTS', sequenceOrder: 4 },
  { weekNumber: 5, phase: 'Phase 1: IELTS & Portfolio', title: 'Redesign murshedkoli.com: Architecture & Wireframes', description: 'Plan the pages, draft content, and create wireframes for the premium portfolio site. Identify custom features (case studies, dark mode, custom sections).', category: 'Portfolio', sequenceOrder: 5 },
  { weekNumber: 6, phase: 'Phase 1: IELTS & Portfolio', title: 'Redesign murshedkoli.com: Premium UI Implementation', description: 'Implement the front-end layout with a sleek dark mode, rich glassmorphism, responsive grids, and smooth CSS animations.', category: 'Portfolio', sequenceOrder: 6 },
  { weekNumber: 7, phase: 'Phase 1: IELTS & Portfolio', title: 'Redesign murshedkoli.com: Speed Optimization & Dark Mode', description: 'Ensure perfect lighthouse scores: optimize image formats, implement lazy-loading, ensure fast static generation (SSG) in Next.js, and finalize theme toggle.', category: 'Portfolio', sequenceOrder: 7 },
  { weekNumber: 8, phase: 'Phase 1: IELTS & Portfolio', title: 'Redesign murshedkoli.com: Add Case Studies & Diagrams', description: 'Write deep-dive case studies for your projects, detailing challenges, technical choices, and outcomes. Include system design/architecture diagrams.', category: 'Portfolio', sequenceOrder: 8 },
  { weekNumber: 9, phase: 'Phase 1: IELTS & Portfolio', title: 'Redesign murshedkoli.com: Add Project Videos & Testimonials', description: 'Embed video walk-throughs of your major projects. Reach out to previous clients/collaborators and add professional testimonials to the landing page.', category: 'Portfolio', sequenceOrder: 9 },
  { weekNumber: 10, phase: 'Phase 1: IELTS & Portfolio', title: 'Redesign murshedkoli.com: Professional About Me Page', description: 'Write a compelling, professional bio detailing your tech stack, goals, interest in studying in Italy, and freelance background.', category: 'Portfolio', sequenceOrder: 10 },
  { weekNumber: 11, phase: 'Phase 1: IELTS & Portfolio', title: 'GitHub Optimization: Pin 6 Best Repositories', description: 'Review your public repositories. Select and pin the 6 best ones. Ensure they showcase clean code, TypeScript usage, and solid design.', category: 'GitHub', sequenceOrder: 11 },
  { weekNumber: 12, phase: 'Phase 1: IELTS & Portfolio', title: 'GitHub Optimization: Write Professional READMEs', description: 'Upgrade README.md files for your pinned repos. Include project descriptions, screenshots, tech stacks, installation guides, and architecture summaries.', category: 'GitHub', sequenceOrder: 12 },
  { weekNumber: 13, phase: 'Phase 1: IELTS & Portfolio', title: 'GitHub Optimization: Deploy Projects & Clean Commits', description: 'Deploy every pinned project (on Vercel, Netlify, or Fly.io). Clean up commit histories by rebasing messy commits if possible.', category: 'GitHub', sequenceOrder: 13 },
  { weekNumber: 14, phase: 'Phase 1: IELTS & Portfolio', title: 'Buy Custom Domain Email & Finalize IELTS Exam', description: 'Purchase your professional email address (e.g., hello@murshedkoli.com) and sit for your scheduled IELTS exam. Target: Overall 6.5-7.0.', category: 'Portfolio', sequenceOrder: 14 },

  // Phase 2: Build Enterprise SaaS & Advanced Skills (Weeks 15 - 26)
  { weekNumber: 15, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'Learn Advanced TypeScript & Design Patterns', description: 'Study advanced TypeScript topics: generics, utility types, conditional types, decorators, and implementation of Clean Architecture concepts.', category: 'Skills', sequenceOrder: 15 },
  { weekNumber: 16, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'Learn Next.js (Advanced Router & Caching)', description: 'Master App Router features, parallel/intercepting routes, Next.js cache mechanisms, Server Actions, and rendering strategies (ISR/SSR).', category: 'Skills', sequenceOrder: 16 },
  { weekNumber: 17, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'Learn Prisma & PostgreSQL Database Integration', description: 'Study Prisma schema creation, relationships, migrations, seeding, query optimization, and connect to a PostgreSQL database on AWS or Vercel.', category: 'Skills', sequenceOrder: 17 },
  { weekNumber: 18, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'Learn Docker Containers, Redis Caching, & AWS Basics', description: 'Understand containerizing Next.js/Node apps with Docker, setting up Redis for session caching, and deployment basics on AWS ECS/EC2.', category: 'Skills', sequenceOrder: 18 },
  { weekNumber: 19, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'Enterprise SaaS: Project Ideation & DB Design', description: 'Plan your complex SaaS. Define its core value proposition. Write database schemas with Mongoose/Prisma and plan system design/architecture.', category: 'SaaS', sequenceOrder: 19 },
  { weekNumber: 20, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'SaaS: Authentication & Role-Based Access Control (RBAC)', description: 'Implement secure login, sign up, session management, and RBAC (Admin, Org Owner, Member, Guest) using NextAuth/Auth.js or custom JWT.', category: 'SaaS', sequenceOrder: 20 },
  { weekNumber: 21, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'SaaS: Dashboard Shell & Analytical Charts', description: 'Build a premium responsive dashboard layout. Add data visualization components using Recharts (bar, line, pie charts representing mock metrics).', category: 'SaaS', sequenceOrder: 21 },
  { weekNumber: 22, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'SaaS: Notifications System & File Uploads', description: 'Implement real-time/database notifications and secure file uploading (images, PDFs) using AWS S3, Uploadthing, or Cloudinary.', category: 'SaaS', sequenceOrder: 22 },
  { weekNumber: 23, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'SaaS: Payments & Subscriptions Integration', description: 'Integrate Stripe payments, custom pricing tiers, webhooks, billing dashboards, and handle credit cards safely in sandbox mode.', category: 'SaaS', sequenceOrder: 23 },
  { weekNumber: 24, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'SaaS: Email System & AI Integration', description: 'Set up email delivery (Resend/Nodemailer) for transactional receipts. Add an AI feature (LLM integration via OpenAI/Gemini API) to automate a key SaaS flow.', category: 'SaaS', sequenceOrder: 24 },
  { weekNumber: 25, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'SaaS: Admin Panel, Docker, & GitHub Actions CI/CD', description: 'Build an admin control panel for system metrics. Write a Dockerfile, configure GitHub Actions to automatically run tests, build, and deploy.', category: 'SaaS', sequenceOrder: 25 },
  { weekNumber: 26, phase: 'Phase 2: Build Enterprise SaaS & Advanced Skills', title: 'SaaS: Testing, API Documentation, & Launch', description: 'Write unit tests (Jest/Vitest) and End-to-End tests (Playwright). Write Swagger/OpenAPI docs. Deploy to production (AWS or Vercel).', category: 'SaaS', sequenceOrder: 26 },

  // Phase 3: University Research & Documents (Weeks 27 - 38)
  { weekNumber: 27, phase: 'Phase 3: University Research & Documents', title: 'Identify 5-8 Italian Universities & Courses', description: 'Research English-taught Master\'s programs in Computer Science or Software Engineering in Italy. Look into Politecnico di Milano, Sapienza, Bologna, etc.', category: 'University', sequenceOrder: 27 },
  { weekNumber: 28, phase: 'Phase 3: University Research & Documents', title: 'Populate University Spreadsheet Metrics', description: 'Record crucial metrics: tuition fees, scholarship availability, rankings, deadlines, city living costs, and IELTS minimum requirements.', category: 'University', sequenceOrder: 28 },
  { weekNumber: 29, phase: 'Phase 3: University Research & Documents', title: 'Verify Passport Validity', description: 'Ensure your passport is valid for at least 2 years. If it is expiring, submit an urgent renewal application to prevent delay.', category: 'Documents', sequenceOrder: 29 },
  { weekNumber: 30, phase: 'Phase 3: University Research & Documents', title: 'Collect SSC & HSC Certificates & Marksheets', description: 'Retrieve original SSC and HSC certificates. Arrange for their attestation from the Education Board, Ministry of Education, and Ministry of Foreign Affairs (MoFA).', category: 'Documents', sequenceOrder: 30 },
  { weekNumber: 31, phase: 'Phase 3: University Research & Documents', title: 'Retrieve Bachelor\'s Certificate & Transcripts', description: 'Apply at your university for the official Bachelor\'s degree certificate and complete academic transcripts. Verify they are sealed and ready.', category: 'Documents', sequenceOrder: 31 },
  { weekNumber: 32, phase: 'Phase 3: University Research & Documents', title: 'Obtain Professional Recommendation Letters', description: 'Contact two academic professors or senior professional managers. Request detailed recommendation letters on university/company letterheads.', category: 'Documents', sequenceOrder: 32 },
  { weekNumber: 33, phase: 'Phase 3: University Research & Documents', title: 'Format CV: ATS-friendly & Europass format', description: 'Create two versions of your resume: an ATS-optimized layout for automated screeners and a Europass CV which is highly preferred in Europe.', category: 'Documents', sequenceOrder: 33 },
  { weekNumber: 34, phase: 'Phase 3: University Research & Documents', title: 'Write Statement of Purpose (SOP)', description: 'Draft a compelling SOP explaining your academic background, career goals, reasons for choosing Italy, and your projects (Premium SaaS, etc.).', category: 'Documents', sequenceOrder: 34 },
  { weekNumber: 35, phase: 'Phase 3: University Research & Documents', title: 'Collect Experience & Freelance Certificates', description: 'Organize employment letters, client project completion records, and Upwork/Fiverr earning statements to prove your professional background.', category: 'Documents', sequenceOrder: 35 },
  { weekNumber: 36, phase: 'Phase 3: University Research & Documents', title: 'Finalize Digital Profiles (LinkedIn, GitHub, Portfolio)', description: 'Ensure your portfolio, LinkedIn, and GitHub profiles look elite. These links will be submitted alongside your university applications.', category: 'Documents', sequenceOrder: 36 },
  { weekNumber: 37, phase: 'Phase 3: University Research & Documents', title: 'Submit University Portal Applications', description: 'Submit your online applications to your chosen 5-8 Italian universities. Keep receipts, log login details, and track application deadlines.', category: 'University', sequenceOrder: 37 },
  { weekNumber: 38, phase: 'Phase 3: University Research & Documents', title: 'Review Applications & Application Fee Payments', description: 'Double check that all application fees have been paid, and that references have uploaded their recommendation letters. Confirm receipt emails.', category: 'University', sequenceOrder: 38 },

  // Phase 4: Financial Preparation (Weeks 39 - 46)
  { weekNumber: 39, phase: 'Phase 4: Financial Preparation', title: 'Finance Checkpoint: Target Savings Goal', description: 'Evaluate your current savings progress (target is BDT 15-20 Lakhs). Log details in the Financial section of your dashboard.', category: 'Finance', sequenceOrder: 39 },
  { weekNumber: 40, phase: 'Phase 4: Financial Preparation', title: 'Collect Sponsor Documents', description: 'Determine your visa sponsors (recognized: parents/close relatives). Gather their national ID cards, proof of relationship, and letters of intent.', category: 'Finance', sequenceOrder: 40 },
  { weekNumber: 41, phase: 'Phase 4: Financial Preparation', title: 'Verify Bank Account Transaction History', description: 'Ensure the sponsor\'s bank accounts have regular, genuine transaction history. A sudden bulk deposit is flagged as suspicious by the embassy.', category: 'Finance', sequenceOrder: 41 },
  { weekNumber: 42, phase: 'Phase 4: Financial Preparation', title: 'Organize Business Income & Tax Returns', description: 'If you or your sponsors are business owners, compile trade licenses, tax return files, VAT certificates, and bank statements showing business revenue.', category: 'Finance', sequenceOrder: 42 },
  { weekNumber: 43, phase: 'Phase 4: Financial Preparation', title: 'Assemble Italian Embassy Financial Package', description: 'Confirm the specific financial support rules from the Italian Embassy in Dhaka. Prepare draft bank solvency certificates and tax documents.', category: 'Finance', sequenceOrder: 43 },
  { weekNumber: 44, phase: 'Phase 4: Financial Preparation', title: 'Verify Language Proof for Visa Application', description: 'Prepare your official IELTS certificate. Make copies. The Italian Embassy requires recognized language proof for student visa processing.', category: 'Finance', sequenceOrder: 44 },
  { weekNumber: 45, phase: 'Phase 4: Financial Preparation', title: 'Obtain Final Bank Certificates and Solvency Letters', description: 'Request formal bank statements (covering the last 6 months) and bank solvency certificates stamped by branch managers.', category: 'Finance', sequenceOrder: 45 },
  { weekNumber: 46, phase: 'Phase 4: Financial Preparation', title: 'Perform Final Financial Document Audit', description: 'Verify that all asset details, bank statement values, and sponsor declarations match perfectly. Prepare translations if any document is in Bengali.', category: 'Finance', sequenceOrder: 46 },

  // Phase 5: University & Universitaly (Weeks 47 - 55)
  { weekNumber: 47, phase: 'Phase 5: University & Universitaly', title: 'Monitor & Receive University Admission Letters', description: 'Regularly check university portals. Secure admission letters from your target universities. Celebrate your acceptance!', category: 'University', sequenceOrder: 47 },
  { weekNumber: 48, phase: 'Phase 5: University & Universitaly', title: 'Accept Admission Offer & Pay Fees', description: 'Formally accept the offer from your chosen university. Pay the enrollment validation fee if required, and download the formal acceptance document.', category: 'University', sequenceOrder: 48 },
  { weekNumber: 49, phase: 'Phase 5: University & Universitaly', title: 'Prepare Scholarship Applications (DSU/Laziodisco)', description: 'Research the regional scholarship requirements. Prepare family composition certificates, global income certificates, and get them translated.', category: 'University', sequenceOrder: 49 },
  { weekNumber: 50, phase: 'Phase 5: University & Universitaly', title: 'Apply for DOV or CIMEA Statement of Comparability', description: 'Submit your academic documents to CIMEA online portal or Italian Embassy to obtain the comparability statement required for enrollment.', category: 'Documents', sequenceOrder: 50 },
  { weekNumber: 51, phase: 'Phase 5: University & Universitaly', title: 'Create Universitaly Portal Account & Start Pre-enrollment', description: 'Create an account on the Universitaly portal. Fill out the pre-enrollment application for the academic year 2027-2028, selecting your university.', category: 'Universitaly', sequenceOrder: 51 },
  { weekNumber: 52, phase: 'Phase 5: University & Universitaly', title: 'Submit Universitaly Pre-enrollment', description: 'Upload your Bachelor\'s certificate, transcript, IELTS card, CIMEA certificate, and acceptance letter. Review and submit the pre-enrollment.', category: 'Universitaly', sequenceOrder: 52 },
  { weekNumber: 53, phase: 'Phase 5: University & Universitaly', title: 'Wait for University Validation on Universitaly', description: 'The selected university will review your documents. Check daily for the "Validated" status update which is sent to the embassy.', category: 'Universitaly', sequenceOrder: 53 },
  { weekNumber: 54, phase: 'Phase 5: University & Universitaly', title: 'Submit Regional Scholarship Application', description: 'Submit the family income/asset data (ISEE Parificato) to the regional scholarship board to compete for tuition waivers and cash stipends.', category: 'University', sequenceOrder: 54 },
  { weekNumber: 55, phase: 'Phase 5: University & Universitaly', title: 'Universitaly Validation Confirmation', description: 'Confirm that the university has fully validated your application and forwarded it to VFS/Embassy. Download the Universitaly Summary PDF.', category: 'Universitaly', sequenceOrder: 55 },

  // Phase 6: Visa (Weeks 56 - 63)
  { weekNumber: 56, phase: 'Phase 6: Visa', title: 'Assemble Visa Document Package', description: 'Review the VFS document check-list. Print and arrange: Passport, Admission Letter, Universitaly Summary, and language proof.', category: 'Visa', sequenceOrder: 56 },
  { weekNumber: 57, phase: 'Phase 6: Visa', title: 'Compile Financial Sponsor Files for Visa', description: 'Add the fresh bank statements, bank solvency letters, sponsor declarations, tax returns, and business documents to your visa folder.', category: 'Visa', sequenceOrder: 57 },
  { weekNumber: 58, phase: 'Phase 6: Visa', title: 'Secure Accommodation Proof in Italy', description: 'Obtain accommodation proof: a lease agreement, declaration of hospitality (invitation letter), or a confirmed hotel/hostel booking for the first month.', category: 'Visa', sequenceOrder: 58 },
  { weekNumber: 59, phase: 'Phase 6: Visa', title: 'Purchase Student Travel Health Insurance', description: 'Purchase a Schengen-approved student health insurance policy covering emergency medical treatments and repatriation (minimum cover €30,000).', category: 'Visa', sequenceOrder: 59 },
  { weekNumber: 60, phase: 'Phase 6: Visa', title: 'Fill Visa Application Form & Photo Prep', description: 'Fill out the National D-type Visa application form. Take recent passport-size photographs conforming to Schengen visa photo specifications.', category: 'Visa', sequenceOrder: 60 },
  { weekNumber: 61, phase: 'Phase 6: Visa', title: 'Book Flight Itinerary Reservation', description: 'Secure a round-trip or one-way flight reservation/dummy ticket for your intended entry date to Italy (typically early September 2027).', category: 'Visa', sequenceOrder: 61 },
  { weekNumber: 62, phase: 'Phase 6: Visa', title: 'Monitor VFS Global Bangladesh for Appointment Slot', description: 'VFS Global will contact eligible applicants after validation, or you must book an appointment slot on the VFS portal. Secure a visa slot.', category: 'Visa', sequenceOrder: 62 },
  { weekNumber: 63, phase: 'Phase 6: Visa', title: 'Submit Visa Application at VFS Center', description: 'Attend your visa appointment at VFS Dhaka. Submit your passport, complete document package, biometrics, and pay the visa processing fees.', category: 'Visa', sequenceOrder: 63 },

  // Phase 7: Landing in Italy (Weeks 64 - 68)
  { weekNumber: 64, phase: 'Phase 7: Landing in Italy', title: 'Await Visa Approval & Collect Passport', description: 'Monitor application status. Collect your passport containing the D-type National Student Visa from the VFS center.', category: 'Arrival', sequenceOrder: 64 },
  { weekNumber: 65, phase: 'Phase 7: Landing in Italy', title: 'Book Actual Flight & Fly to Italy!', description: 'Purchase your actual flight ticket, pack your belongings (academic certificates, winter clothes, spices), and fly to your university city in Italy!', category: 'Arrival', sequenceOrder: 65 },
  { weekNumber: 66, phase: 'Phase 7: Landing in Italy', title: 'Submit Residence Permit (Permesso di Soggiorno) Application', description: 'Within 8 days of arriving in Italy, go to a post office (Poste Italiane) with Sportello Amico. Fill out the "yellow kit" to apply for your residence permit.', category: 'Arrival', sequenceOrder: 66 },
  { weekNumber: 67, phase: 'Phase 7: Landing in Italy', title: 'Get SIM Card, Bank Account, & Codice Fiscale', description: 'Get an Italian mobile number (Iliad, WindTre). Open a student bank account (Revolut, N26, or UniCredit). Obtain your Tax Code (Codice Fiscale) from Agenzia delle Entrate.', category: 'Arrival', sequenceOrder: 67 },
  { weekNumber: 68, phase: 'Phase 7: Landing in Italy', title: 'Complete University Enrollment & Get Transport Pass', description: 'Go to the university student secretariat. Submit your physical documents to finalize enrollment, collect your student ID card, and buy a monthly public transit pass.', category: 'Arrival', sequenceOrder: 68 },

  // Phase 8: Career & Professional Growth in Italy (Weeks 69 - 104)
  { weekNumber: 69, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Continue Speaking Practice & Connect in Italy', description: 'Join local meetup groups, hackathons, or university developer clubs. Keep up daily English conversations and learn basic Italian speaking.', category: 'Career', sequenceOrder: 69 },
  { weekNumber: 70, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 20 Problems Milestone', description: 'Begin coding practice on LeetCode. Solve 20 questions in the "Top Interview 150" list, focusing on arrays and strings.', category: 'Career', sequenceOrder: 70 },
  { weekNumber: 71, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 40 Problems Milestone', description: 'Solve 20 more LeetCode questions, focusing on two-pointers, sliding windows, and hashing.', category: 'Career', sequenceOrder: 71 },
  { weekNumber: 72, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'System Design: Learn Core Architectures', description: 'Study system design basics: client-server architecture, database indexing, caching layers, load balancers, and CDN mechanisms.', category: 'Career', sequenceOrder: 72 },
  { weekNumber: 73, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Contribute to an Open-Source Project', description: 'Identify an issue in a popular library (e.g., in Next.js, Radix UI, or Mongoose). Write a pull request to solve it, and get it merged.', category: 'Career', sequenceOrder: 73 },
  { weekNumber: 74, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Setup International Freelance Profiles', description: 'Optimize Upwork, Fiverr, and LinkedIn profiles for freelance contracts. Write compelling proposals demonstrating your Premium SaaS experience.', category: 'Career', sequenceOrder: 74 },
  { weekNumber: 75, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Freelancing: Secure First International Client', description: 'Pitch to potential clients. Win your first contract from an international client. Define scope, timeline, and budget.', category: 'Career', sequenceOrder: 75 },
  { weekNumber: 76, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 60 Problems Milestone', description: 'Solve 20 more questions on LeetCode, covering stacks, linked lists, and binary trees.', category: 'Career', sequenceOrder: 76 },
  { weekNumber: 77, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Freelancing: Complete Project 1 & Secure Review', description: 'Deliver high-quality work to your client. Secure your first 5-star review, laying a foundation for future freelancing.', category: 'Career', sequenceOrder: 77 },
  { weekNumber: 78, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Build Enterprise Project 1 (Real-time App)', description: 'Build a production-grade enterprise application. Example: A real-time document collaboration dashboard using WebSockets or Liveblocks.', category: 'Career', sequenceOrder: 78 },
  { weekNumber: 79, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 80 Problems Milestone', description: 'Solve 20 more questions on LeetCode, covering binary search trees and depth-first search (DFS) algorithms.', category: 'Career', sequenceOrder: 79 },
  { weekNumber: 80, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Freelancing: Secure Client 2 & Deliver Project', description: 'Win another contract. Complete the task and earn your second 5-star review to build profile momentum.', category: 'Career', sequenceOrder: 80 },
  { weekNumber: 81, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 100 Problems Milestone', description: 'Reach the 100-problem milestone. Cover breath-first search (BFS) and graph algorithms.', category: 'Career', sequenceOrder: 81 },
  { weekNumber: 82, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Build Enterprise Project 2 (Management System)', description: 'Build your second major enterprise project. Example: A multi-tenant inventory or warehouse management dashboard with CSV importing and export PDF options.', category: 'Career', sequenceOrder: 82 },
  { weekNumber: 83, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Freelancing: Establish Monthly Retainer Contracts', description: 'Propose monthly maintenance or recurring development contracts to previous clients to secure stable monthly income.', category: 'Career', sequenceOrder: 83 },
  { weekNumber: 84, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 120 Problems Milestone', description: 'Solve 20 more LeetCode questions, covering heap priority queues and basic dynamic programming.', category: 'Career', sequenceOrder: 84 },
  { weekNumber: 85, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Build AI Project (RAG / Agentic Application)', description: 'Build a complex AI application. Example: A vector database-powered research helper or customer service agent integrated with LLMs.', category: 'Career', sequenceOrder: 85 },
  { weekNumber: 86, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 140 Problems Milestone', description: 'Solve 20 questions, practicing backtracking and advanced dynamic programming.', category: 'Career', sequenceOrder: 86 },
  { weekNumber: 87, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Freelancing: Complete Project 3 & Collect Review', description: 'Deliver the third client project. Aim for 3-5 comprehensive client reviews to strengthen your profile.', category: 'Career', sequenceOrder: 87 },
  { weekNumber: 88, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 160 Problems Milestone', description: 'Practice advanced LeetCode problems (trie structures, intervals, and sliding window maximums).', category: 'Career', sequenceOrder: 88 },
  { weekNumber: 89, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Build Enterprise Project 3 (Multi-tenant CRM)', description: 'Build your third enterprise project. Example: A CRM dashboard with analytics, email campaigns, contact tracking, and RBAC.', category: 'Career', sequenceOrder: 89 },
  { weekNumber: 90, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Solved 180 Problems Milestone', description: 'Solve 20 additional coding questions, focusing on matrix-based problems and divide-and-conquer strategies.', category: 'Career', sequenceOrder: 90 },
  { weekNumber: 91, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Prepare Behavioral Interview Preparation', description: 'Study common behavioral questions. Draft answers using the STAR (Situation, Task, Action, Result) format, highlighting your portfolio projects.', category: 'Career', sequenceOrder: 91 },
  { weekNumber: 92, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'LeetCode Grind: Complete 200 Problems Target!', description: 'Reach your ultimate LeetCode milestone of 200 solved coding problems. Maintain speed and correctness.', category: 'Career', sequenceOrder: 92 },
  { weekNumber: 93, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Conduct Mock System Design Interviews', description: 'Do peer practice or use developer tools to conduct system design mocks. Practice explaining scaling databases, CDN caches, and message queues.', category: 'Career', sequenceOrder: 93 },
  { weekNumber: 94, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Conduct Mock Technical Interviews', description: 'Practice explaining algorithms while coding. Use platforms like Pramp or mock with peers under timed conditions.', category: 'Career', sequenceOrder: 94 },
  { weekNumber: 95, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Optimize LinkedIn Profile for European Jobs', description: 'Revise location tags, highlight European-style CV details, write summary of your portfolio SaaS, and set profile visibility to "Open to Work".', category: 'Career', sequenceOrder: 95 },
  { weekNumber: 96, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Connect with Tech Recruiters in Milan/Rome', description: 'Find and connect with IT recruiters operating in Italy and Europe. Send short professional intro messages showing your GitHub, SaaS, and CV.', category: 'Career', sequenceOrder: 96 },
  { weekNumber: 97, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Submit Junior Developer & Internship Applications', description: 'Start applying for junior developer or software engineering internships in Italy. Log your applications in a tracker.', category: 'Career', sequenceOrder: 97 },
  { weekNumber: 98, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Consolidate Code Portfolios & Review Tech Stacks', description: 'Audit all your deployed projects. Ensure code bases are polished and live demo endpoints are fully operational.', category: 'Career', sequenceOrder: 98 },
  { weekNumber: 99, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Audit First Year University Progress', description: 'Ensure you have registered all credits (CFUs) for the first year. Prepare study plans for the second year.', category: 'Career', sequenceOrder: 99 },
  { weekNumber: 100, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Target Local Job/Career Fairs in Italy', description: 'Research local tech job fairs (e.g., at Politecnico or Sapienza) or national virtual fairs. Register to attend and print resumes.', category: 'Career', sequenceOrder: 100 },
  { weekNumber: 101, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Refine CV for Specialized Roles', description: 'Tailor specialized resumes for Front-end, Full-stack, or AI/ML roles depending on where you got the best recruiter feedback.', category: 'Career', sequenceOrder: 101 },
  { weekNumber: 102, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Freelance Business Stability Check', description: 'Verify your monthly recurring revenue (MRR) from freelance contracts. Assess if it can sustain your second year in Italy.', category: 'Career', sequenceOrder: 102 },
  { weekNumber: 103, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Update Portfolio with Italy Accomplishments', description: 'Update murshedkoli.com with new university projects, client logos, updated case studies, and local European experience.', category: 'Career', sequenceOrder: 103 },
  { weekNumber: 104, phase: 'Phase 8: Career & Professional Growth in Italy', title: 'Review 104-Week Goals & Plan Next Phase', description: 'Reflect on your achievements: IELTS cleared, SaaS built, university enrolled, landing in Italy, local network, and freelance growth. Plan your next goals!', category: 'Career', sequenceOrder: 104 },
];

export const initialUniversities: RoadmapUniversity[] = [
  { name: 'Politecnico di Milano', city: 'Milan', ranking: '111', tuitionFees: '€3,900/year', scholarships: 'DSU Scholarship (Full waiver + stipend)', ieltsRequirement: '6.0', deadline: 'March 2027', duration: '2 Years', livingCost: '€800-1000/month', status: 'Researching' },
  { name: 'Sapienza University of Rome', city: 'Rome', ranking: '134', tuitionFees: '€2,900/year', scholarships: 'Laziodisco Scholarship (Full waiver + stipend)', ieltsRequirement: '6.0', deadline: 'April 2027', duration: '2 Years', livingCost: '€700-900/month', status: 'Researching' },
  { name: 'University of Bologna', city: 'Bologna', ranking: '133', tuitionFees: '€3,000/year', scholarships: 'ER.GO Scholarship (Full waiver + stipend)', ieltsRequirement: '6.0', deadline: 'February 2027', duration: '2 Years', livingCost: '€750-950/month', status: 'Researching' },
  { name: 'University of Padova', city: 'Padua', ranking: '219', tuitionFees: '€2,600/year', scholarships: 'Regional (ALISEO) & Merit Scholarships', ieltsRequirement: '6.5', deadline: 'March 2027', duration: '2 Years', livingCost: '€600-800/month', status: 'Researching' },
  { name: 'Politecnico di Torino', city: 'Turin', ranking: '252', tuitionFees: '€3,800/year', scholarships: 'EDISU Scholarship (Full waiver + stipend)', ieltsRequirement: '6.0', deadline: 'March 2027', duration: '2 Years', livingCost: '€700-900/month', status: 'Researching' },
];

export const initialProjects: RoadmapProject[] = [
  {
    name: 'murshedkoli.com',
    type: 'Portfolio',
    description: 'Personal professional developer portfolio site featuring case studies, project architecture diagrams, client testimonials, and speed optimization.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    features: [
      { name: 'Premium UI Redesign', completed: false },
      { name: 'Dark Mode Switcher', completed: false },
      { name: 'Lighthouse PageSpeed (>95)', completed: false },
      { name: 'Case Studies Section', completed: false },
      { name: 'Project Architecture Diagrams', completed: false },
      { name: 'Demo Video Embeds', completed: false },
      { name: 'Testimonials Slider', completed: false },
      { name: 'About Me Page', completed: false },
      { name: 'Custom Domain Email Setup', completed: false },
    ],
    status: 'Idea',
  },
  {
    name: 'Enterprise SaaS',
    type: 'SaaS',
    description: 'A production-level multi-tenant Software-as-a-Service application with subscription billing, admin dashboard, file uploads, and AI features.',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Stripe', 'Redis'],
    features: [
      { name: 'Secure Authentication & RBAC', completed: false },
      { name: 'Stripe Payment Gateway Sandbox', completed: false },
      { name: 'Responsive Dashboard Shell', completed: false },
      { name: 'Analytics Charts (Recharts)', completed: false },
      { name: 'Real-time & DB Notifications', completed: false },
      { name: 'Secure S3/Uploadthing Uploads', completed: false },
      { name: 'Transactional Email Delivery', completed: false },
      { name: 'AI LLM Automations Integration', completed: false },
      { name: 'Admin Metrics Panel', completed: false },
      { name: 'Dockerized Deployment Config', completed: false },
      { name: 'GitHub Actions CI/CD Pipeline', completed: false },
      { name: 'Vitest Unit & Integration Tests', completed: false },
      { name: 'Swagger / OpenAPI Documentation', completed: false },
    ],
    status: 'Idea',
  },
  {
    name: 'Enterprise Project 1: Real-time Doc Editor',
    type: 'Enterprise',
    description: 'A complex enterprise-level real-time document collaboration suite utilizing WebSockets and state synchronization.',
    techStack: ['React', 'Node.js', 'Socket.io', 'Redis', 'TypeScript'],
    features: [
      { name: 'Real-time Collaborative Editing', completed: false },
      { name: 'Document History & Versioning', completed: false },
      { name: 'Operational Transformation / CRDT sync', completed: false },
    ],
    status: 'Idea',
  },
  {
    name: 'Enterprise Project 2: Multi-Tenant Inventory Manager',
    type: 'Enterprise',
    description: 'Warehouse inventory control manager with automated notifications, invoice PDFs generation, and Excel uploading/exporting.',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    features: [
      { name: 'Multi-warehouse Stock Tracking', completed: false },
      { name: 'Bulk Import CSV/Excel parser', completed: false },
      { name: 'Automated Purchase Orders PDFs', completed: false },
    ],
    status: 'Idea',
  },
  {
    name: 'Enterprise Project 3: Sales CRM Dashboard',
    type: 'Enterprise',
    description: 'An enterprise sales automation portal tracking lead funnels, active conversations, and team performances.',
    techStack: ['Next.js', 'Mongoose', 'MongoDB', 'Tailwind CSS'],
    features: [
      { name: 'Visual Kanban Deal Board', completed: false },
      { name: 'Email Campaign Builder Integration', completed: false },
      { name: 'Lead Assignment Automation Rules', completed: false },
    ],
    status: 'Idea',
  },
  {
    name: 'AI Agent RAG Tool',
    type: 'AI',
    description: 'A retrieval-augmented generation app connecting files to local vector embeddings for interactive chats.',
    techStack: ['Next.js', 'Pinecone', 'LangChain', 'OpenAI API', 'TypeScript'],
    features: [
      { name: 'PDF/TXT Document Chunking & Ingestion', completed: false },
      { name: 'Vector Embedding Generation', completed: false },
      { name: 'Contextual Semantic Search Chatbot', completed: false },
    ],
    status: 'Idea',
  },
];

export const initialFinance = {
  description: 'Initial Starter Savings',
  amount: 150000,
  type: 'Deposit' as const,
  category: 'Savings' as const,
};
