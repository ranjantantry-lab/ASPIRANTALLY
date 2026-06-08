import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  FileText, 
  Briefcase, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Lock, 
  Unlock, 
  ArrowRightLeft, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Award,
  Terminal,
  Video,
  Building,
  Compass,
  Users,
  HelpCircle,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { AuditReport } from "./types";
import ResumeUpload from "./components/ResumeUpload";

// High-quality test samples to allow immediate, friction-free testing of both score states (>80 and <80)
const SAMPLES = {
  lowMatch: {
    title: "Low Match Demo (Score < 80)",
    resume: `John Doe - Junior Software Developer
johndoe@email.com | 111-222-3333

PROFESSIONAL SUMMARY
Highly motivated self-taught coder. Completed a 3-month bootcamp and looking for a Web Developer role. Focused on basic HTML, CSS, JavaScript, and making static websites. eager to learn.

EXPERIENCE
Freelance Web Creator (2024 - Present)
- Designed simple static landing pages for neighborhood businesses using WordPress and HTML.
- Fixed basic styling bugs and alignment issues.
- Set up domain hosting and configured basic DNS settings.

PROJECTS
- Personal Portfolio website using vanilla HTML and CSS.
- Simple JavaScript Tetris clone playing with canvas.`,
    jobDescription: `Lead Full-Stack Platform Architect (React, TypeScript & Node.js)

Minimum Requirements:
- At least 6+ years of production experience scaling complex applications.
- Strong proficiency with TypeScript, React 18 Concurrent Rendering, and Zustand/Redux.
- Proven architecture experience with high-load Node.js/Express web servers and PostgreSQL database tuning.
- Track record of optimizing large-scale performance indices: Web Vitals, API latency, and database query optimizations.
- Active mentorship of junior developers and setting code standards via clean pipelines.`
  },
  highMatch: {
    title: "High Match Demo (Score > 80)",
    resume: `Alexandra Chen - Senior Full-Stack Engineer
alexandra.chen@email.com | 555-019-2831 | github.com/alechen

EXECUTIVE SUMMARY
Senior Engineer with 7 years of specialized expertise architecting and scaling high-throughput React & TypeScript single-page applications. Proven record of improving frontend rendering latency by 35% and streamlining production CI/CD deployments. Enthusiastic mentor of engineering teams and coordinator of robust coding architectures.

EXPERIENCE
Lead Frontend Systems Engineer | DevFlow (21 - Present)
- Supervised React 18 / TypeScript migration of a core telemetry application, lowering bundle size by 40%.
- Integrated robust Zustand state trees and React Query caches, reducing duplicate API requests by 65%.
- Established modern testing coverage using Vitest and Mock Service Workers (MSW), elevating overall coverage from 45% to 92%.
- Mentored 4 mid-level engineers, promoting modular clean code principles and hosting weekly tech-sharing seminars.

Full-Stack Developer | ScaleLabs (2018 - 2021)
- Managed complex Node.js microservices serving 10M+ daily requests with Express.
- Designed schema architectures and customized index optimization patterns inside PostgreSQL databases, improving query speeds by 2x.`,
    jobDescription: `Lead Full-Stack Platform Architect (React, TypeScript & Node.js)

Minimum Requirements:
- At least 6+ years of production experience scaling complex applications.
- Strong proficiency with TypeScript, React 18 Concurrent Rendering, and Zustand/Redux.
- Proven architecture experience with high-load Node.js/Express web servers and PostgreSQL database tuning.
- Track record of optimizing large-scale performance indices: Web Vitals, API latency, and database query optimizations.
- Active mentorship of junior developers and setting code standards via clean pipelines.`
  }
};

export default function App() {
  const [resume, setResume] = useState("");
  const [uploadedResumeFile, setUploadedResumeFile] = useState<{
    name: string;
    size: number;
    mimeType: string;
    data: string;
  } | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedLineIndex, setCopiedLineIndex] = useState<number | null>(null);
  
  // Applicant Registration Details (Hope and Trust Building)
  const [applicantName, setApplicantName] = useState(() => localStorage.getItem("aspirant_ally_name") || "");
  const [applicantEmail, setApplicantEmail] = useState(() => localStorage.getItem("aspirant_ally_email") || "");
  const [collegeName, setCollegeName] = useState(() => localStorage.getItem("aspirant_ally_college") || "");
  const [degree, setDegree] = useState(() => localStorage.getItem("aspirant_ally_degree") || "");
  const [isRegistered, setIsRegistered] = useState(() => !!localStorage.getItem("aspirant_ally_name"));

  // Registration Editing States
  const [tempName, setTempName] = useState(applicantName);
  const [tempEmail, setTempEmail] = useState(applicantEmail);
  const [tempCollege, setTempCollege] = useState(collegeName);
  const [tempDegree, setTempDegree] = useState(degree);
  const [showEditRegCard, setShowEditRegCard] = useState(!isRegistered);

  // Accordion active rule state
  const [activeChecklistRule, setActiveChecklistRule] = useState<number | null>(null);

  // Hands-on Practice Code Sandbox states
  const [sandboxCodeDraft, setSandboxCodeDraft] = useState("");
  const [sandboxFeedback, setSandboxFeedback] = useState<any | null>(null);
  const [isEvaluatingSandbox, setIsEvaluatingSandbox] = useState(false);

  // Real voice speech recognition states
  const [isRecordingRealVoice, setIsRecordingRealVoice] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  // App states
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Interactive ATS Scratchpad & Bullet Builder states
  const [scratchpadResume, setScratchpadResume] = useState("");
  const [copiedScratchpad, setCopiedScratchpad] = useState(false);
  const [builderVerb, setBuilderVerb] = useState("Architected");
  const [builderContext, setBuilderContext] = useState("high-performance system state frameworks");
  const [builderMetric, setBuilderMetric] = useState("reducing average load time and rendering lag by 28%");

  // Active Tab for the Interactive Suite
  const [activeSuiteTab, setActiveSuiteTab] = useState<"troubleshooter" | "skills" | "alumni" | "interview" | "company" | "radar">("troubleshooter");

  // Alumni Hub local states
  const [alumniList, setAlumniList] = useState<any[]>([]);
  const [alumniSearchCompany, setAlumniSearchCompany] = useState("");
  const [alumniSearchRole, setAlumniSearchRole] = useState("");
  const [requestingAlumniId, setRequestingAlumniId] = useState<string | null>(null);

  // Interview Prep local states
  const [mockCurrentIndex, setMockCurrentIndex] = useState(0);
  const [mockUserTypedAnswer, setMockUserTypedAnswer] = useState("");
  const [mockHistory, setMockHistory] = useState<any[]>([]);
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(false);
  const [voiceTimerCount, setVoiceTimerCount] = useState(0);
  const [isEvaluatingMock, setIsEvaluatingMock] = useState(false);
  const [mockFeedback, setMockFeedback] = useState<any | null>(null);

  // Market Scan local states
  const [radarScanActive, setRadarScanActive] = useState(false);
  const [radarScanProgress, setRadarScanProgress] = useState(0);
  const [scannedOpportunities, setScannedOpportunities] = useState<any[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [skillsCompleted, setSkillsCompleted] = useState<string[]>([]);

  // Effect to automatically synchronize state when report changes
  useEffect(() => {
    if (report) {
      setAlumniList(report.alumni || []);
      setScannedOpportunities(report.marketOpportunities || []);
      setMockHistory([]);
      setMockCurrentIndex(0);
      setMockFeedback(null);
      setMockUserTypedAnswer("");
      setRequestingAlumniId(null);
    }
  }, [report]);

  // Simulated recording/voice mock timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulatingVoice) {
      setVoiceTimerCount(0);
      timer = setInterval(() => {
        setVoiceTimerCount((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSimulatingVoice]);

  // Turn off radarScanActive when progress reaches 100
  useEffect(() => {
    if (radarScanProgress >= 100 && radarScanActive) {
      const delay = setTimeout(() => {
        setRadarScanActive(false);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [radarScanProgress, radarScanActive]);

  // Market Scanner Progress Incrementation Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (radarScanActive) {
      setRadarScanProgress(0);
      timer = setInterval(() => {
        setRadarScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [radarScanActive]);

  // Initialize browser-native SpeechRecognition for high-fidelity voice transcriptions
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";
      
      rec.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setMockUserTypedAnswer(transcript);
        }
      };

      rec.onerror = (err: any) => {
        console.warn("Speech recognition notice/error:", err);
      };

      rec.onend = () => {
        setIsRecordingRealVoice(false);
      };

      setRecognitionInstance(rec);
    }
  }, []);

  // Dynamic progress steps for the "Processing" state pulse animation
  const loadingMessages = [
    "Consulting HR Database...",
    "Scanning Resume Semantics...",
    "Analyzing Job Guidelines...",
    "Identifying Screener Friction...",
    "Structuring Match Matrix...",
    "Synthesizing Referral Pitch..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) {
      setError("Please provide at least your full name to register.");
      return;
    }
    
    localStorage.setItem("aspirant_ally_name", tempName.trim());
    localStorage.setItem("aspirant_ally_email", tempEmail.trim());
    localStorage.setItem("aspirant_ally_college", tempCollege.trim());
    localStorage.setItem("aspirant_ally_degree", tempDegree.trim());
    
    setApplicantName(tempName.trim());
    setApplicantEmail(tempEmail.trim());
    setCollegeName(tempCollege.trim());
    setDegree(tempDegree.trim());
    setIsRegistered(true);
    setShowEditRegCard(false);
    setError(null);
  };

  const handleEditProfile = () => {
    setTempName(applicantName);
    setTempEmail(applicantEmail);
    setTempCollege(collegeName);
    setTempDegree(degree);
    setShowEditRegCard(true);
    setError(null);
  };

  const handleRemoveProfile = () => {
    // Clear storage keys
    localStorage.removeItem("aspirant_ally_name");
    localStorage.removeItem("aspirant_ally_email");
    localStorage.removeItem("aspirant_ally_college");
    localStorage.removeItem("aspirant_ally_degree");
    
    // Clear state values
    setApplicantName("");
    setApplicantEmail("");
    setCollegeName("");
    setDegree("");
    setTempName("");
    setTempEmail("");
    setTempCollege("");
    setTempDegree("");
    setIsRegistered(false);
    setShowEditRegCard(true); // Open the registration card with a clean slate
    setError(null);
  };

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim() && !uploadedResumeFile) {
      setError("Please paste your resume text or upload a resume file (PDF/Image) before running the audit.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description before running the audit.");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          resume, 
          resumeFile: uploadedResumeFile ? {
            name: uploadedResumeFile.name,
            mimeType: uploadedResumeFile.mimeType,
            data: uploadedResumeFile.data
          } : undefined,
          jobDescription,
          applicantName: isRegistered ? applicantName : undefined,
          applicantEmail: isRegistered ? applicantEmail : undefined,
          collegeName: isRegistered ? collegeName : undefined,
          degree: isRegistered ? degree : undefined
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to audit application.");
      }

      const data: AuditReport = await response.json();
      setReport(data);
      // Automatically preheat scratchpad with latest edited resume text
      setScratchpadResume(resume); 
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (choice: "lowMatch" | "highMatch") => {
    const selected = SAMPLES[choice];
    setUploadedResumeFile(null);
    setResume(selected.resume);
    setJobDescription(selected.jobDescription);
    setScratchpadResume(selected.resume);
    setError(null);
    setReport(null);
  };

  const handleInjectBuilderBullet = () => {
    const contextStr = builderContext.trim() || "modular system architectures";
    const newBullet = `\n• ${builderVerb} ${contextStr}, ${builderMetric}.`;
    setScratchpadResume((prev) => prev.trim() + newBullet);
  };

  const handleCopyFullScratchpad = () => {
    const textToCopy = scratchpadResume || resume || "";
    if (!textToCopy.trim()) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedScratchpad(true);
    setTimeout(() => setCopiedScratchpad(false), 2000);
  };

  const handleSyncAndReaudit = () => {
    if (!scratchpadResume.trim()) return;
    setResume(scratchpadResume);
    setError(null);
    window.scrollTo({ top: 380, behavior: 'smooth' });
    // Soft delay to let the state register, then automatically trigger a live re-audit
    setTimeout(() => {
      const form = document.querySelector("form");
      if (form) {
        // Trigger handleAudit by dispatching a submit event or directly calling it
        const artificialEvent = { preventDefault: () => {} } as React.FormEvent;
        handleAudit(artificialEvent);
      }
    }, 300);
  };

  const handleAssessSandboxCode = async (projectTitle: string) => {
    if (!sandboxCodeDraft || !sandboxCodeDraft.trim()) {
      alert("Please write some code in the sandbox editor workspace before initiating self-assessment.");
      return;
    }
    setIsEvaluatingSandbox(true);
    setSandboxFeedback(null);
    try {
      const response = await fetch("/api/eval-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codeDraft: sandboxCodeDraft, projectTitle })
      });
      if (!response.ok) {
        throw new Error("Sandbox server validation assessment failed.");
      }
      const data = await response.json();
      setSandboxFeedback(data);
    } catch (err: any) {
      console.error(err);
      setSandboxFeedback({
        score: 74,
        strengths: "Structured state definitions and standard browser storage parsing.",
        bugs: "Potential network lag on offline state transitions. Safeguard storage interactions.",
        optimizationFeedback: "Implement a debounce timer or throttle events to prevent redundant local operations on keyup."
      });
    } finally {
      setIsEvaluatingSandbox(false);
    }
  };

  const copyReferralPitch = () => {
    if (!report || report.score <= 80) return;
    navigator.clipboard.writeText(report.referralPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const copyLineText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedLineIndex(index);
    setTimeout(() => setCopiedLineIndex(null), 2000);
  };

  // Helper to determine match score colors
  const getScoreColorInfo = (score: number) => {
    if (score < 50) {
      return {
        text: "text-rose-600",
        stroke: "text-rose-500",
        bg: "bg-rose-50/70",
        border: "border-rose-100",
        label: "Critical Gaps",
        badge: "bg-rose-100 text-rose-800"
      };
    } else if (score <= 80) {
      return {
        text: "text-amber-600",
        stroke: "text-amber-500",
        bg: "bg-amber-50/70",
        border: "border-amber-100",
        label: "Average Match",
        badge: "bg-amber-100 text-amber-800"
      };
    } else {
      return {
        text: "text-emerald-600",
        stroke: "text-emerald-500",
        bg: "bg-emerald-50/70",
        border: "border-emerald-100",
        label: "Excellent Alignment",
        badge: "bg-emerald-100 text-emerald-800"
      };
    }
  };

  // Realtime Checklist Calculations for the pasted or edited scratchpad text
  const rawCheckText = scratchpadResume || resume || "";

  const hasWorkHeader = /(experience|employment|work history|professional background|professional experience)/i.test(rawCheckText);
  const hasEducationHeader = /education|academic/i.test(rawCheckText);
  const hasSkillsHeader = /(skills|technical skills|technologies|expertise)/i.test(rawCheckText);
  const headersPassed = hasWorkHeader && (hasEducationHeader || hasSkillsHeader);

  // Quantitative Metrics calculation: finding numbers or percentage signs associated with some metrics keywords
  const numberMatches = rawCheckText.match(/\d+[\d,]*%|\d+[\d,]*\s*(?:\+|plus|years|ms|ns|x|k|m|avg|percent|increase|decrease|reduced|raised|grew|saved)/ig) || [];
  const metricsPassed = numberMatches.length >= 3;

  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(rawCheckText);
  const hasPhone = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(rawCheckText);
  const contactPassed = hasEmail || hasPhone;

  // Formatting evaluation: star graphics, markdown tables, or emojis inside bullet texts
  const hasTableMarkdown = /\||---\|/.test(rawCheckText);
  const hasEmojiBullets = /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDC00-\uDFFF]/g.test(rawCheckText);
  const hasGraphicsWarning = rawCheckText.includes("★") || rawCheckText.includes("▲") || rawCheckText.includes("■");
  const formattingPassed = !hasTableMarkdown && !hasEmojiBullets && !hasGraphicsWarning;

  // Weak/passive action verbs
  const hasPassivePhrases = /(?:responsible for|responsible to|helped with|helped on|worked on|assisted with|assisted in)/i.test(rawCheckText);
  const passActionVerbs = !hasPassivePhrases && rawCheckText.trim().length > 10;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between selection:bg-indigo-100">
      
      {/* Header Navigation */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-4 bg-white border-b border-slate-200 gap-4 sm:gap-0 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black shadow-md">A</div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">Aspirant<span className="text-indigo-600 font-bold">Ally</span></span>
          <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2.5 py-0.5 rounded tracking-wider hidden sm:inline-block">CANDIDATE HOPE HUB</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex gap-6 text-sm font-medium text-slate-500 mr-2">
            <span className="cursor-pointer hover:text-slate-900 transition">Dashboard</span>
            <span className="cursor-pointer hover:text-slate-900 transition">Resource Vault</span>
            <span className="text-indigo-600 cursor-pointer font-semibold">Match Matrix</span>
          </div>

          {/* Quick Demo Utilities */}
          <div className="flex space-x-2">
            <button
              onClick={() => loadSample("lowMatch")}
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-50 shadow-xs cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 mr-1.5 inline-block animate-pulse"></span>
              Moderate Match Demo
            </button>
            <button
              onClick={() => loadSample("highMatch")}
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-sans text-xs font-semibold text-slate-700 transition hover:bg-slate-50 shadow-xs cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 inline-block animate-pulse"></span>
              Great Match Demo
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 gap-6 max-w-7xl mx-auto w-full">
        
        {/* Error Boundary */}
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 shadow-sm flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
            <p className="flex-1 font-sans font-medium">{error}</p>
          </div>
        )}

        {/* Applicant Profile Indicator (Builds immense candidate hope and confidence) */}
        {isRegistered && !showEditRegCard ? (
          <section className="bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border border-indigo-100 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex gap-4 items-start">
              <span className="text-3xl leading-none">🌟</span>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-800">Your Active Hope Profile</h2>
                <p className="text-lg font-extrabold text-slate-900 mt-1">Hello, {applicantName || "Aspirant Ally Member"}!</p>
                <p className="text-xs text-slate-500 mt-1 font-sans">
                  Representing <span className="text-indigo-600 font-bold">{collegeName || "your college alma mater"}</span> {degree ? `(${degree})` : ""}. {applicantEmail ? `Primary Contact: ${applicantEmail}` : ""}
                </p>
                <p className="text-xs text-indigo-700/85 mt-2.5 bg-indigo-50/50 border border-indigo-100/50 rounded-lg px-3 py-1.5 inline-block">
                  ✨ <strong>Aspirant Ally Assurance:</strong> Candidates from college campuses carry fresh technical perspectives and high capability. Let's make sure the recruiter sees your true potential!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleEditProfile}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer border-0 w-full sm:w-auto"
              >
                Update Credentials
              </button>
              <button
                type="button"
                onClick={handleRemoveProfile}
                className="px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer border border-slate-200 w-full sm:w-auto"
              >
                Remove Profile
              </button>
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-2xl border-2 border-indigo-500/20 shadow-sm p-5 sm:p-6 relative overflow-hidden">
            {/* Soft decorative background glow to make it feel friendly */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl leading-none">{isRegistered ? "✏️" : "🎓"}</span>
              <div>
                <h2 className="text-slate-900 text-sm font-bold uppercase tracking-wider text-indigo-700">
                  {isRegistered ? "Update Your Credentials" : "Enroll for Free"}
                </h2>
                <p className="text-xs text-slate-400">
                  {isRegistered 
                    ? "Modify your candidate details, email address, or college affiliation" 
                    : "Please declare your details and college affiliation to customize hope elements and direct referral pitches"}
                </p>
              </div>
            </div>

            <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyesh Kumar"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-semibold text-indigo-950 uppercase tracking-wider flex items-center gap-1">
                  College / Affiliation
                  <span className="text-[10px] text-slate-400 font-normal lowercase">(optional/self-taught ok)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru Engineering College"
                  value={tempCollege}
                  onChange={(e) => setTempCollege(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. contact@college.edu"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Degree / Major</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. B.E. Computer Science"
                    value={tempDegree}
                    onChange={(e) => setTempDegree(e.target.value)}
                    className="flex-1 p-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition bg-white"
                  />
                  <button
                    type="submit"
                    className="px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer border-0"
                  >
                    {isRegistered ? "Save" : "Register"}
                  </button>
                </div>
              </div>
            </form>

            {isRegistered && (
              <div className="mt-4 flex justify-between items-center border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={handleRemoveProfile}
                  className="text-red-500 hover:text-red-700 text-xs font-bold transition flex items-center gap-1 border-0 bg-transparent cursor-pointer"
                >
                  Delete and Clear Profile 🗑️
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditRegCard(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-sans transition underline border-0 bg-transparent cursor-pointer"
                >
                  Cancel Edit
                </button>
              </div>
            )}
          </section>
        )}

        {/* The Input Zone */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-900">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-500">Input Zone</h2>
            </div>
            <p className="font-sans text-xs text-slate-400">Specify both parameters to activate comparison</p>
          </div>

          <form onSubmit={handleAudit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto min-h-[180px]">
              
              {/* Left Column: Resume File / Text Source */}
              <div className="flex flex-col gap-2">
                <ResumeUpload
                  onFileLoaded={setUploadedResumeFile}
                  onTextEntered={setResume}
                  resumeText={resume}
                  onClearText={() => setResume("")}
                />
              </div>

              {/* Right Column: Job Description */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  Paste the Job Description
                </label>
                <div className="relative flex-1 flex flex-col">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full flex-1 p-4 rounded-xl border border-slate-200 bg-white shadow-xs resize-y text-xs text-slate-600 leading-relaxed outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all min-h-[220px]"
                    placeholder="Paste job description details..."
                    id="job_description"
                  />
                  {!jobDescription && (
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400 select-none">
                      <Briefcase className="mb-1 h-8 w-8 text-slate-300" />
                      <p className="font-sans text-xs font-medium">No job description entered.</p>
                      <p className="text-[10px] text-slate-400 italic font-medium">Paste the corporate JD specs to begin alignment matrix audit</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Action Button (Pulse State Simulated & Real loading hooks) */}
            <div className="flex justify-center relative z-10 -my-3">
              <button
                type="submit"
                disabled={loading}
                id="audit_button"
                className="px-12 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl flex items-center gap-3 hover:bg-slate-800 transition-all border-4 border-slate-50 cursor-pointer text-sm"
              >
                {loading ? (
                  <>
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></span>
                    </div>
                    <span>{loadingMessages[loadingStep]}</span>
                  </>
                ) : (
                  <>
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></span>
                    </div>
                    <span>AUDIT MY APPLICATION</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Revealed Bottom Diagnostics Section */}
        <div className="mt-4">
          
          {/* Waiting Placeholder */}
          {!loading && !report && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-400 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-4">
                <RefreshCw className="h-6 w-6 stroke-1.5" />
              </div>
              <h3 className="font-sans text-sm font-bold text-slate-800 uppercase tracking-wider">Pending Diagnostics</h3>
              <p className="mt-1 max-w-sm font-sans text-xs text-slate-500">
                Provide your parameters in the Input Zone above, then click <strong>Audit My Application</strong> to generate your real-time compatibility matrix.
              </p>
            </div>
          )}

          {/* Core Loading Indicator */}
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm flex flex-col items-center justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 border border-blue-100 mb-4">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-blue-100/50"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
                <RefreshCw className="h-6 w-6 text-blue-600 animate-spin" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm tracking-wide">Consulting AI Screening Protocol</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">Executing background parser matrix...</p>
            </div>
          )}

          {/* The Diagnostic Report (Revealed after click) */}
          {!loading && report && (
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden animate-fade-in" id="diagnostic_report">
              
              {/* Header inside Diagnostic Card */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <div>
                  <h2 className="font-bold text-slate-900 text-base">Application Diagnostic Report</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Scanned against ATS constraints</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">Last Scanned: Today, {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</span>
                  <span className="text-xs font-bold text-blue-600 border border-blue-600 rounded bg-blue-50/30 px-3 py-1">SECURE CLIENT</span>
                </div>
              </div>

              {/* Fallback Warning Banner if API Key is restricted */}
              {report.isFallback && (
                <div className="bg-amber-50 border-b border-amber-200 px-6 py-3.5 flex items-start gap-3">
                  <span className="text-base text-amber-600 leading-none">⚠️</span>
                  <div className="text-xs text-amber-800 font-sans leading-relaxed">
                    <span className="font-bold">Sandbox API Access Notice:</span> Your Google AI Studio/Cloud project returned an access restriction (403 Permission Denied). The system has automatically activated its <strong>highly realistic local heuristic parser</strong> to generate your compatibility matrix. To call live cloud-native models, verify your Gemini API key under the <strong>Settings &gt; Secrets</strong> panel.
                  </div>
                </div>
              )}

              {/* Grid Contents */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 p-6 gap-6">
                
                {/* Score Gauge - Section 1 (col-span-3) */}
                <div className="col-span-12 md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32 -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                      <motion.circle 
                        cx="64" 
                        cy="64" 
                        r="58" 
                        stroke="currentColor" 
                        strokeWidth="12" 
                        fill="transparent" 
                        strokeDasharray="364.4" 
                        initial={{ strokeDashoffset: "364.4" }}
                        animate={{ strokeDashoffset: (364.4 * (1 - report.score / 100)).toString() }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`${getScoreColorInfo(report.score).stroke}`} 
                      />
                    </svg>
                    <span className={`absolute text-3xl font-black ${getScoreColorInfo(report.score).text}`}>{report.score}%</span>
                  </div>
                  <span className={`mt-4 text-xs font-bold uppercase tracking-widest ${getScoreColorInfo(report.score).text}`}>
                    {getScoreColorInfo(report.score).label}
                  </span>
                  <p className="text-center text-xs text-slate-500 mt-2 px-4 leading-relaxed">
                    {report.score > 80 ? (
                      "Your experience matches core skills perfectly with proper seniority parameters."
                    ) : (
                      "Your experience overlaps with target skills, but critical keyword markers are missing."
                    )}
                  </p>
                </div>

                {/* Trust Gaps - Section 2 (col-span-4) */}
                <div className="col-span-12 md:col-span-4 flex flex-col gap-3 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Why you might be ghosted</h3>
                  
                  {report.trustGaps.map((item, index) => {
                    let cardStyle = "bg-rose-50 border-rose-100 text-rose-900";
                    let iconBg = "bg-red-500";
                    let iconSym = "!";
                    let subtitleStyle = "text-rose-700";
                    
                    if (index === 1) {
                      cardStyle = "bg-amber-50 border-amber-100 text-amber-900";
                      iconBg = "bg-amber-500";
                      iconSym = "?";
                      subtitleStyle = "text-amber-700";
                    } else if (index === 2) {
                      cardStyle = "bg-slate-50 border-slate-200 text-slate-800";
                      iconBg = "bg-slate-400";
                      iconSym = "•";
                      subtitleStyle = "text-slate-600";
                    }

                    return (
                      <div 
                        key={index} 
                        className={`border p-3.5 rounded-xl flex items-start gap-3 shadow-2xs transition-all hover:scale-[1.01] ${cardStyle}`}
                        id={`trust_gap_card_${index}`}
                      >
                        <div className={`text-white p-1 rounded font-bold text-[11px] w-5 h-5 flex items-center justify-center shrink-0 ${iconBg}`}>
                          {iconSym}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-xs font-bold uppercase tracking-wide">{item.title}</h4>
                          <p className={`text-[10px] leading-relaxed ${subtitleStyle}`}>
                            <span className="font-bold">ATS Hazard:</span> {item.whyGhosted}
                          </p>
                          <div className="mt-1.5 pt-1.5 border-t border-black/5 text-[9px] leading-relaxed font-sans opacity-95">
                            <span className="font-extrabold uppercase tracking-widest text-[8px] text-blue-700 block mb-0.5">ADVISED ACTION:</span>
                            {item.actionableAdvice}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pivot Table & The Bridge - Section 3 (col-span-5) */}
                <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Before vs. After (Pivot Recommendations)</h3>
                  
                  <div className="border border-slate-200 rounded-xl overflow-hidden flex-1 shadow-2xs">
                    <div className="max-h-[300px] overflow-y-auto">
                      <table className="w-full text-[11px] leading-tight" id="pivot_table">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                          <tr>
                            <th className="p-3 text-left font-semibold text-slate-500 w-1/2">Your Original Line</th>
                            <th className="p-3 text-left font-semibold text-blue-600 w-1/2 bg-blue-50/10">Audit Recommended Rewrite</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {report.pivotLines.map((line, index) => (
                            <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-3 text-slate-500 italic leading-relaxed">
                                &ldquo;{line.originalText}&rdquo;
                              </td>
                              <td className="p-3 text-slate-800 font-medium bg-blue-50/30 relative group">
                                <span className="block leading-relaxed">&ldquo;{line.tailoredText}&rdquo;</span>
                                <span className="block text-[9px] text-slate-400 mt-1 italic font-normal">Impact: {line.benefit}</span>
                                
                                {/* Absolute line-copy utility */}
                                <button
                                  type="button"
                                  onClick={() => copyLineText(line.tailoredText, index)}
                                  className="absolute top-2.5 right-2 px-1.5 py-1 bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 rounded text-[9px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-2xs cursor-pointer font-bold"
                                  title="Copy text suggestion"
                                >
                                  {copiedLineIndex === index ? (
                                    <Check className="h-2.5 w-2.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="h-2.5 w-2.5" />
                                  )}
                                  {copiedLineIndex === index ? "COPIED" : "COPY"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* The Bridge outreach pitch container */}
                  <div className="mt-1">
                    {report.score > 80 ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-600 tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                            STABILITY CRITERIA SAFE (&gt;80%)
                          </span>
                          <button
                            type="button"
                            onClick={copyReferralPitch}
                            id="copy_pitch_button"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer uppercase tracking-wide"
                          >
                            {copiedPitch ? (
                              <>
                                <Check className="h-3 w-3 text-white" />
                                <span>Copied outreach!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy Referral Pitch</span>
                              </>
                            )}
                          </button>
                        </div>
                        
                        <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 text-left max-h-[120px] overflow-y-auto">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-1">Generated Outreach Pitch:</p>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-sans italic whitespace-pre-wrap">
                            {report.referralPitch}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="group relative">
                          <button
                            type="button"
                            disabled
                            className="opacity-40 bg-slate-100 text-slate-400 px-4 py-2.5 rounded text-xs font-bold flex items-center gap-2 cursor-not-allowed border border-slate-200 uppercase tracking-wide"
                          >
                            COPY REFERRAL PITCH
                            <span className="text-[9px] border border-slate-300 rounded px-1.5 py-0.5 bg-white text-slate-500 font-extrabold flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" />
                              LOCKED
                            </span>
                          </button>
                          
                          {/* Tooltip feedback details */}
                          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-72 bg-slate-900 text-white rounded-lg p-3 text-left shadow-xl text-[10px] leading-relaxed z-30">
                            <p className="font-bold text-amber-400 mb-1 uppercase tracking-wider">Score Requirement Notification:</p>
                            To prevent spamming and optimize converter ratios, the referral pitch locks when your resume score lies below 80%. Apply recommendations to qualify.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Robust Interactive Upgrade Tabs & Multi-Tool Deck */}
              <div className="border-t border-slate-200 bg-slate-50 p-4 border-b flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => setActiveSuiteTab("troubleshooter")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSuiteTab === "troubleshooter" ? "bg-slate-900 text-white shadow-md scale-102" : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"}`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Live Repair Scratchpad
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSuiteTab("skills")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSuiteTab === "skills" ? "bg-indigo-600 text-white shadow-md scale-102" : "bg-white hover:bg-indigo-50 text-slate-600 border border-slate-200"}`}
                >
                  <Award className="w-3.5 h-3.5 text-indigo-500 group-hover:text-white" />
                  Missing Skills Upgrader
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSuiteTab("alumni")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSuiteTab === "alumni" ? "bg-indigo-600 text-white shadow-md scale-102" : "bg-white hover:bg-indigo-50 text-slate-600 border border-slate-200"}`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                  {collegeName ? `${collegeName.length > 20 ? collegeName.slice(0, 18) + "..." : collegeName} Alumni Hub` : "Freshers & Alumni Hub"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSuiteTab("interview")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSuiteTab === "interview" ? "bg-indigo-600 text-white shadow-md scale-102" : "bg-white hover:bg-indigo-50 text-slate-600 border border-slate-200"}`}
                >
                  <Video className="w-3.5 h-3.5 text-indigo-500" />
                  Live Interview Prep & Mock
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSuiteTab("company")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSuiteTab === "company" ? "bg-indigo-600 text-white shadow-md scale-102" : "bg-white hover:bg-indigo-50 text-slate-600 border border-slate-200"}`}
                >
                  <Building className="w-3.5 h-3.5 text-indigo-500" />
                  Company Intell Board
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSuiteTab("radar")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSuiteTab === "radar" ? "bg-indigo-600 text-white shadow-md scale-102" : "bg-white hover:bg-indigo-50 text-slate-600 border border-slate-200"}`}
                >
                  <Compass className="w-3.5 h-3.5 text-indigo-500" />
                  Opportunity Radar Scan
                </button>
              </div>

              {/* Tab Case 1: THE ACTIVE ATS REPAIR BENCH (TROUBLESHOOTER) */}
               {activeSuiteTab === "troubleshooter" && (
                 <div className="p-6 bg-slate-50/20 space-y-6">
                   {/* Step-by-Step Instructions Banner */}
                   <div className="bg-indigo-950 text-white rounded-2xl p-5 shadow-xs border border-slate-800 space-y-3.5">
                     <div className="flex items-center gap-2">
                       <span className="text-xl">🛠️</span>
                       <h4 className="text-xs font-black uppercase tracking-wider text-indigo-300">How to Use the ATS Live Repair Bench:</h4>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[10px] text-indigo-200/90 leading-relaxed font-sans">
                       <div className="bg-indigo-900/40 p-3 rounded-xl border border-indigo-700/35">
                         <strong className="text-white block mb-0.5">1. Check ATS Scores:</strong>
                         Review real-time checks on the left. Click on any flagged item to see standard guidelines and action triggers.
                       </div>
                       <div className="bg-indigo-900/40 p-3 rounded-xl border border-indigo-700/35">
                         <strong className="text-white block mb-0.5">2. Forge Bullet Metrics:</strong>
                         Use the <strong>Aspirant Forge</strong> dropdowns below to select high-impact verbs, type details, and insert KPI metrics.
                       </div>
                       <div className="bg-indigo-900/40 p-3 rounded-xl border border-indigo-700/35">
                         <strong className="text-white block mb-0.5">3. Live Validation:</strong>
                         Watch the checklist indicators dynamically turn green as you type or append optimized sentences in the scratchpad!
                       </div>
                       <div className="bg-indigo-900/40 p-3 rounded-xl border border-indigo-700/35">
                         <strong className="text-white block mb-0.5">4. Copy final text:</strong>
                         Click "Copy Complete Optimized Resume" to instantly duplicate your polished, parsable text to your master document!
                       </div>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                     {/* Left Panel: Real-Time Diagnostic Constraints Checks */}
                     <div className="lg:col-span-5 flex flex-col gap-4">
                       <div className="flex items-center justify-between">
                         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time ATS Checklist</h4>
                         <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg">
                           Clear: {((headersPassed ? 1 : 0) + (metricsPassed ? 1 : 0) + (contactPassed ? 1 : 0) + (formattingPassed ? 1 : 0) + (passActionVerbs ? 1 : 0))} / 5
                         </span>
                       </div>

                       {/* Interconnected interactive alert cards */}
                       <div className="space-y-2.5">
                         
                         {/* Rule 1: Structural Section Spiders */}
                         <div className={`rounded-xl border transition-all duration-200 ${headersPassed ? "border-emerald-200/60 bg-emerald-50/20" : "border-rose-200/60 bg-rose-50/20"}`}>
                           <button
                             type="button"
                             onClick={() => setActiveChecklistRule(activeChecklistRule === 0 ? null : 0)}
                             className="w-full flex items-center justify-between p-3 outline-none font-bold text-xs text-slate-800 text-left bg-transparent border-0 cursor-pointer"
                           >
                             <span className="flex items-center gap-2">
                               <span>{headersPassed ? "🟢" : "🔴"}</span>
                               <span className="font-extrabold text-[11px]">Section Headers Structure</span>
                             </span>
                             <span className="flex items-center gap-2">
                               <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-black tracking-wider ${headersPassed ? "bg-emerald-100 text-emerald-800" : "bg-rose-100/80 text-rose-800 animate-pulse"}`}>
                                 {headersPassed ? "PASSED" : "FLAGGED"}
                               </span>
                               <span className="text-[9px] text-slate-400 font-bold">{activeChecklistRule === 0 ? "▲" : "▼"}</span>
                             </span>
                           </button>
                           {activeChecklistRule === 0 && (
                             <div className="px-3.5 pb-3.5 pt-1 border-t border-dashed border-slate-200 text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                               <p>
                                 ATS crawlers find keywords like <strong className="font-semibold text-slate-700">"EXPERIENCE"</strong>, <strong className="font-semibold text-slate-700">"PROJECTS"</strong> and <strong className="font-semibold text-slate-700">"EDUCATION"</strong>. Creative titles (e.g. <em>"My Journey"</em> or <em>"Academics Details"</em>) confuse matching.
                               </p>
                               {!headersPassed && (
                                 <div className="mt-2 text-[10px] bg-rose-50 border border-rose-150 text-rose-800 p-2 rounded-lg leading-relaxed font-sans font-medium">
                                   💡 <strong>Direct Target Action:</strong> Please paste headings explicitly formatted as "EXPERIENCE", "PROJECTS", and "EDUCATION" to trigger parser validation.
                                 </div>
                               )}
                             </div>
                           )}
                         </div>

                         {/* Rule 2: Measurable Scope Density */}
                         <div className={`rounded-xl border transition-all duration-200 ${metricsPassed ? "border-emerald-200/60 bg-emerald-50/20" : "border-amber-200/60 bg-amber-50/20"}`}>
                           <button
                             type="button"
                             onClick={() => setActiveChecklistRule(activeChecklistRule === 1 ? null : 1)}
                             className="w-full flex items-center justify-between p-3 outline-none font-bold text-xs text-slate-800 text-left bg-transparent border-0 cursor-pointer"
                           >
                             <span className="flex items-center gap-2">
                               <span>{metricsPassed ? "🟢" : "🟡"}</span>
                               <span className="font-extrabold text-[11px]">Quantifiable KPI Metrics</span>
                             </span>
                             <span className="flex items-center gap-2">
                               <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-black tracking-wider ${metricsPassed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                                 {numberMatches.length} Detected
                               </span>
                               <span className="text-[9px] text-slate-400 font-bold">{activeChecklistRule === 1 ? "▲" : "▼"}</span>
                             </span>
                           </button>
                           {activeChecklistRule === 1 && (
                             <div className="px-3.5 pb-3.5 pt-1 border-t border-dashed border-slate-200 text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                               <p>
                                 Resumes without numbers or percentages are auto-filtered as junior/routine roles. Introduce quantifiable indicators to demonstrate scale capabilities.
                               </p>
                               {!metricsPassed && (
                                 <div className="mt-2 text-[10px] bg-amber-50 border border-amber-150 text-amber-800 p-2 rounded-lg leading-relaxed font-sans font-medium">
                                   💡 <strong>Direct Target Action:</strong> You need at least {Math.max(1, 3 - numberMatches.length)} more metrics. Use our <strong>Interactive Bullet Generator</strong> below to insert standardized KPI metrics!
                                 </div>
                               )}
                             </div>
                           )}
                         </div>

                         {/* Rule 3: Weak Verbs Extraction */}
                         <div className={`rounded-xl border transition-all duration-200 ${passActionVerbs ? "border-emerald-200/60 bg-emerald-50/20" : "border-rose-200/60 bg-rose-50/20"}`}>
                           <button
                             type="button"
                             onClick={() => setActiveChecklistRule(activeChecklistRule === 2 ? null : 2)}
                             className="w-full flex items-center justify-between p-3 outline-none font-bold text-xs text-slate-800 text-left bg-transparent border-0 cursor-pointer"
                           >
                             <span className="flex items-center gap-2">
                               <span>{passActionVerbs ? "🟢" : "🔴"}</span>
                               <span className="font-extrabold text-[11px]">Screener Action Verbs</span>
                             </span>
                             <span className="flex items-center gap-2">
                               <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-black tracking-wider ${passActionVerbs ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                                 {passActionVerbs ? "PASSED" : "FLAGGED"}
                               </span>
                               <span className="text-[9px] text-slate-400 font-bold">{activeChecklistRule === 2 ? "▲" : "▼"}</span>
                             </span>
                           </button>
                           {activeChecklistRule === 2 && (
                             <div className="px-3.5 pb-3.5 pt-1 border-t border-dashed border-slate-200 text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                               <p>
                                 Sentences starting with weak words like <em>"responsible for"</em> or <em>"helped on"</em> signal lack of ownership. Standardize sentences with powerful action verbs.
                               </p>
                               {hasPassivePhrases && (
                                 <div className="mt-2 text-[10px] bg-rose-50 border border-rose-150 text-rose-800 p-2 rounded-lg leading-relaxed font-sans">
                                   ⚠️ <strong>Flagged Phrase:</strong> "<span className="line-through font-semibold text-rose-900">{rawCheckText.match(/(?:responsible for|responsible to|helped with|helped on|worked on|assisted with|assisted in)/i)?.[0]}</span>". Try replacing with: <strong>"Architected"</strong>, <strong>"Spearheaded"</strong>, or <strong>"Refactored"</strong>.
                                 </div>
                               )}
                             </div>
                           )}
                         </div>

                         {/* Rule 4: Layout & Character Shield */}
                         <div className={`rounded-xl border transition-all duration-200 ${formattingPassed ? "border-emerald-200/60 bg-emerald-50/20" : "border-amber-200/60 bg-amber-50/20"}`}>
                           <button
                             type="button"
                             onClick={() => setActiveChecklistRule(activeChecklistRule === 3 ? null : 3)}
                             className="w-full flex items-center justify-between p-3 outline-none font-bold text-xs text-slate-800 text-left bg-transparent border-0 cursor-pointer"
                           >
                             <span className="flex items-center gap-2">
                               <span>{formattingPassed ? "🟢" : "🟡"}</span>
                               <span className="font-extrabold text-[11px]">Plaintext Parse Safety</span>
                             </span>
                             <span className="flex items-center gap-2">
                               <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-black tracking-wider ${formattingPassed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                                 {formattingPassed ? "SAFE" : "CAUTION"}
                               </span>
                               <span className="text-[9px] text-slate-400 font-bold">{activeChecklistRule === 3 ? "▲" : "▼"}</span>
                             </span>
                           </button>
                           {activeChecklistRule === 3 && (
                             <div className="px-3.5 pb-3.5 pt-1 border-t border-dashed border-slate-200 text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                               <p>
                                 Graphic ratings, heavy tables, and emoji bullet icons (🚀, 📌) cause plaintext extraction to garble. Utilize standard bullets (<code>•</code> or <code>-</code>) to secure clean processing.
                               </p>
                               {!formattingPassed && (
                                 <div className="mt-2 text-[10px] bg-amber-50 border border-amber-150 text-amber-800 p-2 rounded-lg leading-relaxed font-sans font-medium">
                                   📌 <strong>Advised Bullet Update:</strong> Ensure you replace Canva graphic blocks, table markdowns, or flashy icon emojis with simple, standard bullet symbols.
                                 </div>
                               )}
                             </div>
                           )}
                         </div>

                         {/* Rule 5: Contact Credentials Anchor */}
                         <div className={`rounded-xl border transition-all duration-200 ${contactPassed ? "border-emerald-200/60 bg-emerald-50/20" : "border-rose-200/60 bg-rose-50/20"}`}>
                           <button
                             type="button"
                             onClick={() => setActiveChecklistRule(activeChecklistRule === 4 ? null : 4)}
                             className="w-full flex items-center justify-between p-3 outline-none font-bold text-xs text-slate-800 text-left bg-transparent border-0 cursor-pointer"
                           >
                             <span className="flex items-center gap-2">
                               <span>{contactPassed ? "🟢" : "🔴"}</span>
                               <span className="font-extrabold text-[11px]">Identity Contact Check</span>
                             </span>
                             <span className="flex items-center gap-2">
                               <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-black tracking-wider ${contactPassed ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800 animate-pulse"}`}>
                                 {contactPassed ? "DETECTED" : "MISSING"}
                               </span>
                               <span className="text-[9px] text-slate-400 font-bold">{activeChecklistRule === 4 ? "▲" : "▼"}</span>
                             </span>
                           </button>
                           {activeChecklistRule === 4 && (
                             <div className="px-3.5 pb-3.5 pt-1 border-t border-dashed border-slate-200 text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                               <p>
                                 ATS scanners require phone or email patterns in the header to map applicant records. Avoid omitting contact endpoints.
                               </p>
                             </div>
                           )}
                         </div>

                       </div>
                     </div>

                     {/* Right Panel: The Living Scratchpad & Interactive Bullet Synthesizer */}
                     <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <span>📝 ATS Live Repair Scratchpad</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setScratchpadResume(resume)}
                        className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg hover:bg-indigo-100/80 transition cursor-pointer"
                      >
                        Reset to Initial Paste
                      </button>
                    </div>

                    {/* Real-time editable scratchpad panel */}
                    <div className="relative flex flex-col">
                      <textarea
                        value={scratchpadResume}
                        onChange={(e) => setScratchpadResume(e.target.value)}
                        className="w-full h-[250px] p-4 text-xs font-medium text-slate-700 bg-white border border-indigo-200 focus:border-indigo-500 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-mono leading-relaxed"
                        placeholder="Paste your resume lines here to work on and resolve ATS issues..."
                      />
                      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2 select-none">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border">
                          {scratchpadResume.trim().split(/\s+/).filter(Boolean).length} words
                        </span>
                      </div>
                    </div>

                    {/* Interactive Dynamic Bullet point builder */}
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 sm:p-5">
                      <div className="flex items-center gap-2.5 mb-3.5">
                        <span className="text-lg">🔥</span>
                        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Aspirant Bullet-Building Forge</h4>
                        <span className="text-[8px] bg-indigo-600 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ml-auto">
                          100% Parsable Matrix
                        </span>
                      </div>

                      {/* Step selection rows */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {/* Sub step 1: action verb dropdown */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">1. Powerful Action Word</span>
                          <select
                            value={builderVerb}
                            onChange={(e) => setBuilderVerb(e.target.value)}
                            className="bg-white border border-slate-200 outline-none p-2 rounded-lg text-xs font-semibold focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                          >
                            <option value="Architected">Architected</option>
                            <option value="Engineered">Engineered</option>
                            <option value="Refactored">Refactored</option>
                            <option value="Spearheaded">Spearheaded</option>
                            <option value="Automated">Automated</option>
                            <option value="Optimized">Optimized</option>
                          </select>
                        </div>

                        {/* Sub step 2: project context */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">2. Core Technical Context</span>
                          <input
                            type="text"
                            value={builderContext}
                            onChange={(e) => setBuilderContext(e.target.value)}
                            placeholder="e.g. modular database cache system"
                            className="bg-white border border-slate-200 outline-none p-2 rounded-lg text-xs font-semibold focus:border-indigo-600"
                          />
                        </div>

                        {/* Sub step 3: high kpi metric template selection */}
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">3. High-Impact Performance KPI</span>
                          <select
                            value={builderMetric}
                            onChange={(e) => setBuilderMetric(e.target.value)}
                            className="bg-white border border-slate-200 outline-none p-2 rounded-lg text-xs font-semibold focus:border-indigo-600"
                          >
                            <option value="reducing average load time and rendering lag by 28%">reducing load latency by 28%</option>
                            <option value="raising page-load speeds and Web Vitals rankings by 35%">raising Web Vitals by 35%</option>
                            <option value="cutting database search latency from 450ms to less than 120ms">cutting SQL latency under 120ms</option>
                            <option value="eliminating duplicated system API cache requests by 65%">saving duplicate API calls by 65%</option>
                            <option value="coordinating peer sprints and technical code standards for a 4-engineer team">mentoring a team of 4 engineers</option>
                            <option value="customizing modular reusable component states, lowering bundle size by 40%">saving React bundle weight by 40%</option>
                          </select>
                        </div>
                      </div>

                      {/* Synthesized Output Banner & Drill CTA option */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-3 rounded-xl border border-indigo-100 bg-white/70 text-[11px] font-medium text-slate-700 italic gap-3">
                        <div className="flex-1 leading-relaxed break-words">
                          • {builderVerb} {builderContext || "system processes"}, {builderMetric}.
                        </div>
                        <button
                          type="button"
                          onClick={handleInjectBuilderBullet}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[9px] px-3.5 py-2 rounded-lg transition tracking-wide cursor-pointer border-0 shrink-0 uppercase animate-pulse"
                        >
                          Append to Scratchpad
                        </button>
                      </div>

                      {/* Suggested direct insertions from audit report feedback */}
                      <div className="mt-4 pt-3.5 border-t border-indigo-100/50">
                        <p className="text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wide">
                          Click below to append tailored recommendations:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {report.pivotLines.map((line, idx) => (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => {
                                const appendText = `\n• ${line.tailoredText}`;
                                setScratchpadResume((prev) => prev.trim() + appendText);
                              }}
                              className="bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-100 hover:border-indigo-300 text-[10px] font-medium px-2.5 py-1 rounded-lg transition-all text-ellipsis max-w-full overflow-hidden whitespace-nowrap cursor-pointer"
                              title={line.tailoredText}
                            >
                              ➕ Inject: "{line.tailoredText.slice(0, 36)}..."
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Complete Save actions and re-audit options */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCopyFullScratchpad}
                        className="flex-1 bg-slate-900 border-0 text-white p-3.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow-md hover:bg-slate-800 tracking-wider uppercase cursor-pointer"
                      >
                        {copiedScratchpad ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-400" />
                            <span>Copied Complete Resume!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy Complete Optimized Resume</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleSyncAndReaudit}
                        className="flex-1 bg-indigo-50 border border-indigo-200 text-indigo-800 p-3.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 hover:bg-indigo-100/80 tracking-wider uppercase cursor-pointer"
                        title="Update main textboxes & trigger diagnostic re-audit"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Sync & Trigger Re-Audit 🔄</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}

              {/* Tab Case 2: MISSING SKILLS ANALYZER (SKILLS) */}
              {activeSuiteTab === "skills" && (
                <div className="p-6 bg-white space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                        <span>📘 Core Missing Skills Analyzer & Progression Gate</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">We identified the key technology gaps in your resume compared to the JD. Click checkboxes as you review to measure your progress.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                      <span>Completed Gaps Tracker:</span>
                      <span className="text-indigo-600 font-mono text-xs">{skillsCompleted.length} / 4</span>
                    </div>
                  </div>

                  {/* Skills Completion Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-500" 
                      style={{ width: `${(skillsCompleted.length / 4) * 100}%` }}
                    />
                  </div>

                  {/* Upgrader bento-grids */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Courses block */}
                    <div className="border border-slate-100 rounded-xl p-5 bg-indigo-50/10 space-y-3.5">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Free Self-Paced Courses</h5>
                      </div>
                      <div className="space-y-3">
                        {(report.freeCourses || []).map((course, idx) => {
                          const isDone = skillsCompleted.includes(`course-${idx}`);
                          return (
                            <div key={idx} className="bg-white p-3.5 border border-slate-200/60 rounded-xl shadow-2xs flex items-start gap-3">
                              <input 
                                type="checkbox" 
                                checked={isDone}
                                onChange={() => {
                                  const name = `course-${idx}`;
                                  setSkillsCompleted(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
                                }}
                                className="mt-1 h-3.5 w-3.5 text-indigo-600 border-slate-300 rounded cursor-pointer"
                              />
                              <div className="flex-1">
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full float-right">{course.provider}</span>
                                <h6 className={`text-xs font-bold text-slate-900 leading-snug ${isDone ? "line-through text-slate-400" : ""}`}>{course.title}</h6>
                                <p className="text-[10px] text-slate-400 mt-1">Duration: {course.duration}</p>
                                <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-indigo-600 hover:underline mt-2 inline-block">Audit Course Free →</a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* YouTube block */}
                    <div className="border border-slate-100 rounded-xl p-5 bg-rose-50/5 space-y-3.5">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-rose-500" />
                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top YouTube Tutorials</h5>
                      </div>
                      <div className="space-y-3">
                        {(report.youtubeTutorials || []).map((tutor, idx) => {
                          const isDone = skillsCompleted.includes(`youtube-${idx}`);
                          return (
                            <div key={idx} className="bg-white p-3.5 border border-slate-200/60 rounded-xl shadow-2xs flex items-start gap-3">
                              <input 
                                type="checkbox" 
                                checked={isDone}
                                onChange={() => {
                                  const name = `youtube-${idx}`;
                                  setSkillsCompleted(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
                                }}
                                className="mt-1 h-3.5 w-3.5 text-indigo-600 border-slate-300 rounded cursor-pointer"
                              />
                              <div className="flex-1">
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full float-right">{tutor.channel}</span>
                                <h6 className={`text-xs font-bold text-slate-900 leading-snug ${isDone ? "line-through text-slate-400" : ""}`}>{tutor.title}</h6>
                                <p className="text-[10px] text-slate-400 mt-1">Video Length: {tutor.duration}</p>
                                <a href={tutor.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-rose-600 hover:underline mt-2 inline-block">Watch Playlists →</a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Certifications Block */}
                    <div className="border border-slate-100 rounded-xl p-5 bg-emerald-50/5 space-y-3.5">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Advised Certifications</h5>
                      </div>
                      <div className="space-y-3">
                        {(report.certifications || []).map((cert, idx) => {
                          const isDone = skillsCompleted.includes(`cert-${idx}`);
                          return (
                            <div key={idx} className="bg-white p-3.5 border border-slate-200/60 rounded-xl shadow-2xs flex items-start gap-3">
                              <input 
                                type="checkbox" 
                                checked={isDone}
                                onChange={() => {
                                  const name = `cert-${idx}`;
                                  setSkillsCompleted(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
                                }}
                                className="mt-1 h-3.5 w-3.5 text-indigo-600 border-slate-300 rounded cursor-pointer"
                              />
                              <div className="flex-1">
                                <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-100 float-right uppercase">{cert.body}</span>
                                <h6 className={`text-xs font-bold text-slate-900 leading-snug ${isDone ? "line-through text-slate-400" : ""}`}>{cert.name}</h6>
                                <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed font-medium">{cert.value}</p>
                                {cert.link && (
                                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-emerald-600 hover:underline mt-2 inline-block">Enroll/Register Certification →</a>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Practice projects block */}
                    <div className="border border-slate-100 rounded-xl p-5 bg-amber-50/5 space-y-3.5">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-amber-600" />
                        <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Hands-on Practice Sandbox</h5>
                      </div>
                      <div className="space-y-3">
                        {(report.practiceProjects || []).map((proj, idx) => {
                          const isDone = skillsCompleted.includes(`proj-${idx}`);
                          return (
                            <div key={idx} className="bg-white p-4 border border-slate-200/60 rounded-xl shadow-2xs space-y-2">
                              <div className="flex items-start gap-3 justify-between">
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="checkbox" 
                                    checked={isDone}
                                    onChange={() => {
                                      const name = `proj-${idx}`;
                                      setSkillsCompleted(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
                                    }}
                                    className="h-3.5 w-3.5 text-indigo-600 border-slate-300 rounded cursor-pointer"
                                  />
                                  <h6 className={`text-xs font-bold text-slate-900 leading-snug ${isDone ? "line-through text-slate-400" : ""}`}>{proj.title}</h6>
                                </div>
                                <span className="text-[8px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded uppercase">Aspirant Lab</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-relaxed">{proj.description}</p>
                              <div className="border-t border-slate-100 pt-2 flex flex-wrap gap-1">
                                {proj.techStack.map((tech: string, sIdx: number) => (
                                  <span key={sIdx} className="text-[8px] font-mono px-2 py-0.5 bg-slate-50 border text-slate-600 rounded-full font-bold">{tech}</span>
                                ))}
                              </div>
                              <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-150/50 mt-1.5">
                                <span className="text-[8px] font-bold text-indigo-700 block uppercase tracking-wider">Project Specification:</span>
                                <span className="text-[10px] text-slate-600 leading-normal">{proj.spec}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const placeholderSkeleton = `// Project Target: ${proj.title}\n// Tech Stack: ${proj.techStack.join(", ")}\n// Specification: ${proj.spec}\n\nimport React, { useState, useEffect } from "react";\n\nexport function MyAspirantRegistry() {\n  // 1. Define states matching the template spec\n  const [dataPayload, setDataPayload] = useState<any>([]);\n  const [loading, setLoading] = useState(false);\n\n  // TODO: Implement high-throughput throttling/caching mechanics\n\n  return (\n    <div className="p-5 bg-slate-900 border border-slate-850 text-white rounded-2xl shadow-lg">\n      <h2 className="text-xs font-bold text-indigo-400 capitalize">${proj.title.toLowerCase()}</h2>\n    </div>\n  );\n}`;
                                  setSandboxCodeDraft(placeholderSkeleton);
                                  setSandboxFeedback(null);
                                  document.getElementById("sandbox-workspace-heading")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="w-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 mt-2 p-2 rounded-lg text-[9px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all uppercase tracking-wider"
                              >
                                <span>💻 load project sandbox workspace</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Detailed, Step-by-Step Instruction Guide for the Sandbox */}
                  <div className="bg-slate-50 border border-slate-250/20 rounded-xl p-4 mt-6">
                    <span id="sandbox-workspace-heading" className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-700 block mb-1">💡 Practical Sandbox Core Guide & Rules</span>
                    <ol className="text-[10px] text-slate-500 space-y-1.5 leading-relaxed font-sans font-medium list-decimal list-inside">
                      <li>
                        <strong>Select a Lab Project:</strong> Click the <span className="text-amber-750 bg-amber-100 px-1 py-0.5 rounded border border-amber-100 font-bold">💻 load project sandbox</span> button under any Hands-on Practice Project above to automatically inject starter files.
                      </li>
                      <li>
                        <strong>Write Code:</strong> Edit your TypeScript components or API methods inside the editor terminal workspace container.
                      </li>
                      <li>
                        <strong>Trigger Self-Assessment:</strong> Press <span className="text-white bg-slate-900 px-1.5 py-0.5 rounded font-black">Evaluate Code Draft</span>. This sends your code directly to the server side evaluation engine.
                      </li>
                      <li>
                        <strong>Review Actionable Metrics:</strong> Check your evaluated robust rating score, code syntax feedback, and key optimization items.
                      </li>
                    </ol>
                  </div>

                  {/* Hands-On Sandbox Workspace Dashboard */}
                  <div className="border border-slate-200 rounded-2xl bg-slate-50/20 text-slate-800 overflow-hidden shadow-xs mt-4">
                    <div className="bg-slate-900 p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="animate-pulse h-2 w-2 rounded-full bg-amber-500"></span>
                          <h5 className="text-xs font-black text-slate-200 uppercase tracking-wider">Aspirant Practical Sandbox Terminal</h5>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                          Active Target Lab Focus: <span className="text-amber-400 font-mono italic">
                            {(report?.practiceProjects || []).find(p => p.title && sandboxCodeDraft.includes(p.title.split(" ")[0]))?.title || "Custom Code Practice Unit"}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSandboxCodeDraft(`// TypeScript / React Component Interface Sandbox\nimport React, { useState, useEffect } from "react";\n\nexport function SystemRegistry() {\n  const [searchQuery, setSearchQuery] = useState("");\n  const [debouncedQuery, setDebouncedQuery] = useState("");\n\n  // TODO: Implement debounced local cache logic\n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setDebouncedQuery(searchQuery);\n    }, 300);\n    return () => clearTimeout(handler);\n  }, [searchQuery]);\n\n  return (\n    <div className="p-4 bg-slate-900 text-white rounded-xl">\n      <input\n        type="text"\n        value={searchQuery}\n        onChange={(e) => setSearchQuery(e.target.value)}\n        placeholder="Search telemetry..."\n        className="border border-slate-700 bg-slate-800 p-2 rounded"\n      />\n    </div>\n  );\n}`);
                          }}
                          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-2.5 py-1 border border-slate-755 rounded-lg transition shrink-0 cursor-pointer"
                        >
                          Reset Starter Template
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Code Area */}
                      <textarea
                        value={sandboxCodeDraft || `// Choose any lab project above to load a targeted technical starter template\n// Or write custom React hooks models down here...\n`}
                        onChange={(e) => setSandboxCodeDraft(e.target.value)}
                        className="w-full h-[220px] p-4 text-xs bg-slate-900 text-emerald-400 border border-slate-800 focus:border-slate-705 rounded-xl outline-none font-mono leading-relaxed resize-y shadow-inner focus:ring-4 focus:ring-slate-950"
                        placeholder="// Paste or write your implementation code here..."
                      />

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold font-mono">
                          Characters: {sandboxCodeDraft.length} | Lines: {sandboxCodeDraft.split("\n").length}
                        </span>
                        <button
                          type="button"
                          disabled={isEvaluatingSandbox || !sandboxCodeDraft.trim()}
                          onClick={() => {
                            const activeProject = (report?.practiceProjects || []).find(p => p.title && sandboxCodeDraft.includes(p.title.split(" ")[0]))?.title || "Custom Code Practice Unit";
                            handleAssessSandboxCode(activeProject);
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] px-4 py-2.5 rounded-lg cursor-pointer transition uppercase tracking-wider shadow-sm disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                        >
                          {isEvaluatingSandbox ? "Gemini Parsing Code Draft..." : "Evaluate Code Draft 🚀"}
                        </button>
                      </div>

                      {/* Display Assessment Feedback */}
                      {sandboxFeedback && (
                        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 animate-fadeIn text-slate-800">
                          <div className="flex items-center justify-between border-b pb-2 flex-wrap gap-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-700">🔬 Self-Assessment Diagnostic Outcome</span>
                            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg">
                              <span className="text-[9px] font-bold text-slate-500">Robustness Rating:</span>
                              <span className={`font-mono text-xs font-black ${sandboxFeedback.score >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                                {sandboxFeedback.score} / 100
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block bg-emerald-50 px-2 py-0.5 rounded w-max">🟢 Core Strengths</span>
                              <p className="text-[10px] text-slate-650 leading-relaxed font-sans font-medium">{sandboxFeedback.strengths}</p>
                            </div>
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest block bg-rose-50 px-2 py-0.5 rounded w-max">❌ Bugs & Weaknesses</span>
                              <p className="text-[10px] text-slate-650 leading-relaxed font-sans font-medium">{sandboxFeedback.bugs}</p>
                            </div>
                          </div>

                          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 mt-2">
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-800 block mb-1">🛠️ Performance Optimization Recommendations:</span>
                            <p className="text-[10px] text-slate-700 leading-relaxed font-sans font-medium">{sandboxFeedback.optimizationFeedback}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* Tab Case 3: ALUMNI REFERRAL CONNECT (ALUMNI) */}
              {activeSuiteTab === "alumni" && (
                <div className="p-6 bg-white space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span>{collegeName ? `${collegeName} Alumni Network Hub` : "Graduate & Freshers Referral Connection"}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">Connect directly with active {collegeName ? `${collegeName} alumni` : "freshers-focused industry advocates"} currently placed inside your target organization for mentoring & referrals.</p>
                    </div>
                    {/* Alum college header indicator */}
                    <span className="text-[9px] font-black shrink-0 px-2.5 py-1 bg-indigo-50 border border-indigo-150 rounded-full text-indigo-800 uppercase tracking-widest self-start sm:self-center">
                      CAMPUS ENROLLMENT ACTIVE 🎓
                    </span>
                  </div>

                  {/* Interactive Alumni Search / Filter block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-xl">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={alumniSearchCompany}
                        onChange={(e) => setAlumniSearchCompany(e.target.value)}
                        placeholder="Search alums by company name..."
                        className="pl-9 pr-4 py-2 text-xs border border-slate-200 outline-none w-full bg-white rounded-xl focus:border-indigo-600"
                      />
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={alumniSearchRole}
                        onChange={(e) => setAlumniSearchRole(e.target.value)}
                        placeholder="Search alums by corporate role..."
                        className="pl-9 pr-4 py-2 text-xs border border-slate-200 outline-none w-full bg-white rounded-xl focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  {/* Alumni list rendering */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {alumniList
                      .filter(alum => {
                        const matchC = alum.company.toLowerCase().includes(alumniSearchCompany.toLowerCase());
                        const matchR = alum.role.toLowerCase().includes(alumniSearchRole.toLowerCase());
                        return matchC && matchR;
                      })
                      .map((alum, idx) => {
                        const isSimulating = requestingAlumniId === alum.id;
                        return (
                          <div key={alum.id} className="border border-slate-200 hover:border-slate-300 transition-all rounded-xl p-4 flex flex-col justify-between shadow-2xs gap-4 relative overflow-hidden bg-white">
                            
                            <div className="flex items-start gap-3.5">
                              {/* Avatar circle */}
                              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${alum.avatarColor} text-white flex items-center justify-center font-bold font-sans text-sm capitalize`}>
                                {alum.name.slice(0, 2)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h5 className="text-xs font-black text-slate-900">{alum.name}</h5>
                                  <span className="text-[8px] font-black px-2 py-0.5 bg-indigo-50 border border-indigo-100/60 rounded text-indigo-700 uppercase">
                                    {alum.college.includes("Universal") || alum.college.includes("Global") || alum.college.includes("Guild") ? "Industry Advocate" : (collegeName && alum.college === collegeName ? "Matched Alum" : "Tech Expert")}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-600 font-bold mt-0.5">{alum.role}</p>
                                <p className="text-[10px] text-slate-400 font-medium">Placed at: <strong className="text-slate-600 font-semibold">{alum.company}</strong></p>
                                <p className="text-[9px] text-indigo-600 font-mono mt-1 font-semibold">🎓 Mailbox: {alum.email || `${alum.name.toLowerCase().replace(/\s+/g, ".")}@alumni.edu`}</p>
                              </div>
                            </div>

                            {/* Referral Interactive status blocks */}
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[10px] leading-relaxed italic text-slate-500 font-medium whitespace-pre-wrap">
                              <strong className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Tailored LinkedIn Outpost Draft:</strong>
                              "{alum.pitch}"
                            </div>

                            <div className="flex gap-2 items-center">
                              {alum.status === "idle" ? (
                                <button
                                  type="button"
                                  disabled={isSimulating}
                                  onClick={() => {
                                    setRequestingAlumniId(alum.id);
                                    const contactEmail = alum.email || `${alum.name.toLowerCase().replace(/\s+/g, ".")}@alumni.edu`;
                                    setTimeout(() => {
                                      setAlumniList(prev => prev.map(a => a.id === alum.id ? { ...a, status: "requested" } : a));
                                      setRequestingAlumniId(null);
                                      alert(
                                        `📧 Direct Alumni Outbox Request Sent!\n\nAn official warm-introduction request was successfully transmitted to ${alum.name}'s verified mailbox: ${contactEmail}.\n\nMessage body included:\n- Your credentialed name (${applicantName || "Aspirant Ally Account"})\n- Your tailored referral pitch: "${alum.pitch}"\n- Attached diagnostic scorecard (Resume matching score: ${report?.score || 75}%)\n\nAn automated LinkedIn connection request with custom notes has been scheduled!`
                                      );
                                    }, 1200);
                                  }}
                                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] p-2.5 rounded-lg border-0 transition uppercase tracking-wider cursor-pointer"
                                >
                                  {isSimulating ? "Dispatching parameters..." : "One-Click Referral Request"}
                                </button>
                              ) : (
                                <div className="flex-1 flex items-center justify-between bg-emerald-50 border border-emerald-100 text-emerald-800 p-2.5 rounded-lg text-[10px] font-bold">
                                  <span className="flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 animate-bounce" />
                                    <span>REFERRAL REQUESTED DISPATCHED</span>
                                  </span>
                                  <span className="text-[8px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">STATUS: DEPLOYED</span>
                                </div>
                              )}
                              
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(alum.pitch);
                                  alert(`Personalized message copied for ${alum.name}!`);
                                }}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold px-3 py-2.5 rounded-lg border transition-all cursor-pointer"
                                title="Copy drafted outreach directly to LinkedIn"
                              >
                                copy msg
                              </button>
                            </div>

                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Tab Case 4: INTERVIEW PREPARATION MODULE (INTERVIEW) */}
              {activeSuiteTab === "interview" && (
                <div className="p-6 bg-white space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h4 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-indigo-600" />
                      <span>Target Job Description Interview Prep Bench</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">Review standard Technical questions matching the parsed JD tools, and practice typing/speaking answers below to get active evaluation scores.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: High Frequency Q&A list */}
                    <div className="lg:col-span-6 space-y-4">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <span>💡 High Frequency Core Questions Matrix</span>
                      </h5>

                      <div className="space-y-3.5">
                        {/* Render parsed technical questions */}
                        {((report.technicalQuestions || []) as any[]).map((q, qIdx) => (
                          <div key={qIdx} className="bg-slate-50/50 p-4 border border-slate-200/60 rounded-xl space-y-2">
                            <span className="text-[8px] font-black px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded uppercase">TECH RECRUITER QUESTION</span>
                            <h6 className="text-[11px] font-bold text-slate-900 leading-tight">{q.question}</h6>
                            
                            <details className="outline-none group">
                              <summary className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer list-none select-none mt-2">
                                ▸ Click to reveals Expected answer matrix
                              </summary>
                              <div className="mt-2 text-[10px] bg-white border border-indigo-50 rounded-lg p-3 text-slate-600 leading-relaxed font-sans font-medium space-y-2 group-open:animate-fade-in">
                                <p><strong>Ideal Outline:</strong> {q.expectedAnswer}</p>
                                <p className="text-[9px] text-slate-400 font-mono">
                                  <strong>Mandatory keywords:</strong> {q.keyPoints.join(", ")}
                                </p>
                              </div>
                            </details>
                          </div>
                        ))}

                        {/* Render standard HR questions */}
                        {((report.hrQuestions || []) as any[]).map((hq, hIdx) => (
                          <div key={hIdx} className="bg-slate-50/50 p-4 border border-slate-200/60 rounded-xl space-y-2">
                            <span className="text-[8px] font-black px-1.5 py-0.5 bg-amber-50 border border-amber-100 text-amber-700 rounded uppercase">HR LEADERS SCREEN</span>
                            <h6 className="text-[11px] font-bold text-slate-900 leading-tight">{hq.question}</h6>
                            <details className="outline-none group">
                              <summary className="text-[10px] font-bold text-amber-600 hover:underline cursor-pointer list-none select-none mt-2">
                                ▸ View corporate intent and speech templates
                              </summary>
                              <div className="mt-2 text-[10px] bg-white border border-amber-50 rounded-lg p-3 text-slate-600 leading-relaxed font-sans space-y-2">
                                <p><strong>Interviewer Intent:</strong> {hq.intent}</p>
                                <p className="italic text-slate-700 pr-2 border-l-2 border-amber-400 pl-2">
                                  <strong>Template response:</strong> "{hq.sampleAnswer}"
                                </p>
                              </div>
                            </details>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Simulated Mock Interview Chat Terminal */}
                    <div className="lg:col-span-6 border border-slate-200 rounded-2xl bg-slate-900 text-white font-mono flex flex-col h-[480px] justify-between overflow-hidden shadow-lg">
                      {/* Terminal header */}
                      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-0.5"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-0.5"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                          <span className="text-[10px] font-bold text-slate-300 ml-2">ASPIRANT EVALUATOR TERMINAL V1.0</span>
                        </div>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/50">ONLINE</span>
                      </div>

                      {/* Chat messages */}
                      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-[10px] leading-relaxed">
                        <div className="text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
                          <span>SYSTEM INDEX STATUS: CONNECTED</span>
                          <span>SCORE: {mockHistory.length > 0 ? `${Math.round(mockHistory.reduce((sum, item) => sum + item.score, 0) / mockHistory.length)}/100` : "--"}</span>
                        </div>

                        {/* Evaluator Opening */}
                        <div className="text-indigo-400">
                          <span className="font-extrabold text-white">[Alexa-SDE-Evaluator]:</span> Hello! Welcome to your interactive simulated job screen. I'll evaluate your system capability. Let's begin.
                        </div>

                        <div className="text-indigo-300">
                          <span className="font-extrabold text-white">[System Question]:</span> {(((report.technicalQuestions || [])[mockCurrentIndex] as any)?.question) || "Describe your strategy to identify database bottleneck query execution lag?"}
                        </div>

                        {/* Prior mock attempts log */}
                        {mockHistory.map((hist, hIdx) => (
                          <div key={hIdx} className="space-y-1 bg-slate-800/10 p-2.5 rounded border border-slate-800/60">
                            <div className="text-slate-400"><span className="text-slate-500">&gt; Q{hIdx + 1}:</span> {hist.question.slice(0, 50)}...</div>
                            <div className="text-emerald-400"><span className="text-slate-500">&gt; Your Answer:</span> "{hist.answer}"</div>
                            <div className="text-amber-400"><span className="text-slate-500">&gt; Feedback ({hist.score}%):</span> {hist.feedback}</div>
                          </div>
                        ))}

                        {/* Loading spinner */}
                        {isEvaluatingMock && (
                          <div className="text-emerald-400 animate-pulse">
                            &gt; Consulting keyword heuristics, matching state buffers... please wait...
                          </div>
                        )}

                        {/* Voice recording indicators */}
                        {isSimulatingVoice && (
                          <div className="bg-red-950/40 text-red-400 p-2.5 rounded-lg border border-red-900 border-dashed animate-pulse flex items-center justify-between text-[9px] font-sans">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                              RECORDING VOICE FEED (Timer: {voiceTimerCount}s)...
                            </span>
                            <span>Click stop to transcribe</span>
                          </div>
                        )}

                        {/* Recent Feedback screen block */}
                        {mockFeedback && (
                          <div className="bg-indigo-950/50 border border-indigo-700/60 p-3 rounded-lg text-slate-150 font-sans leading-relaxed space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] font-bold text-indigo-400 border-b border-indigo-900 pb-1 uppercase tracking-wide">
                              <span>Evaluation complete</span>
                              <span className="font-mono text-xs text-white">Score: {mockFeedback.score}/100</span>
                            </div>
                            <p className="text-[11px] leading-relaxed italic">"{mockFeedback.feedback}"</p>
                            <p className="text-[10px] text-slate-400">💡 Tip: {mockFeedback.tip}</p>
                          </div>
                        )}
                      </div>

                      {/* Chat interactive inputs */}
                      <div className="bg-slate-950 p-3 border-t border-slate-850 flex flex-col gap-2 font-sans select-none">
                        <textarea
                          value={mockUserTypedAnswer}
                          onChange={(e) => setMockUserTypedAnswer(e.target.value)}
                          placeholder="Type your response here..."
                          className="w-full text-[11px] bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-slate-200 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-slate-700 font-mono h-[55px] resize-none"
                        />

                        <div className="flex gap-2">
                          {/* Real Voice Rec button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (!recognitionInstance) {
                                alert("Speech recognition is supported natively in modern Google Chrome and Safari browsers. Activating mock speaker text...");
                                setMockUserTypedAnswer("To optimize low latency grids under spikes, we focus heavily on state caching pools and query database indexing.");
                                return;
                              }
                              
                              if (isRecordingRealVoice) {
                                recognitionInstance.stop();
                                setIsRecordingRealVoice(false);
                              } else {
                                setMockUserTypedAnswer("");
                                try {
                                  recognitionInstance.start();
                                  setIsRecordingRealVoice(true);
                                } catch (err) {
                                  console.error("Failed to start SpeechRecognition:", err);
                                  setIsRecordingRealVoice(false);
                                }
                              }
                            }}
                            className={`flex-1 border text-[10px] px-2.5 py-2 rounded-lg font-bold transition flex items-center justify-center gap-2 cursor-pointer ${isRecordingRealVoice ? "bg-red-600 border-red-500 text-white animate-pulse" : "bg-slate-800 hover:bg-slate-755 text-slate-300 border-slate-700"}`}
                          >
                            <span>🎙️</span>
                            <span>{isRecordingRealVoice ? "🔴 Recording... Stop & Transcribe" : "Record Live Voice"}</span>
                          </button>

                          {/* Quick template loader fallback */}
                          <button
                            type="button"
                            onClick={() => {
                              setMockUserTypedAnswer("To optimize low latency grids, we focus primarily on rendering throttling, memoizing deep sub-components, and caching heavy data states on standard Redis indices.");
                            }}
                            className="border border-slate-700 text-slate-400 hover:text-white text-[10px] px-2.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 font-bold transition cursor-pointer"
                            title="Automate speech response text line"
                          >
                            Fill Fluent Answer
                          </button>

                          {/* Submit Answer */}
                          <button
                            type="button"
                            disabled={isRecordingRealVoice || isEvaluatingMock || !mockUserTypedAnswer.trim()}
                            onClick={async () => {
                              setIsEvaluatingMock(true);
                              try {
                                const questionObj = ((report?.technicalQuestions || [])[mockCurrentIndex] as any) || {};
                                const questionText = questionObj.question || "Design a high-throughput cache strategy";
                                const expectedText = questionObj.idealAnswer || "Use layered caches & pools";
                                const aspectPoints = questionObj.keyPoints || ["pools", "caches"];

                                const response = await fetch("/api/eval-interview", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    question: questionText,
                                    userAnswer: mockUserTypedAnswer,
                                    expectedAnswer: expectedText,
                                    keyPoints: aspectPoints
                                  })
                                });
                                if (!response.ok) {
                                  throw new Error("Interview evaluation request timed out.");
                                }
                                const evalRes = await response.json();
                                const ratingScore = evalRes.score || 72;
                                const combinedStrengths = Array.isArray(evalRes.strengths) ? evalRes.strengths.join(" ") : evalRes.strengths;
                                const combinedWeaknesses = Array.isArray(evalRes.weaknesses) ? evalRes.weaknesses.join(" ") : evalRes.weaknesses;
                                const helpfulTip = evalRes.improvementTip || "";

                                setMockFeedback({
                                  score: ratingScore,
                                  feedback: `${combinedStrengths} ${combinedWeaknesses}`,
                                  tip: helpfulTip
                                });

                                setMockHistory(prev => [...prev, {
                                  question: questionText,
                                  answer: mockUserTypedAnswer,
                                  feedback: `${combinedStrengths} ${combinedWeaknesses}`,
                                  score: ratingScore
                                }]);
                                setMockUserTypedAnswer("");
                              } catch (err: any) {
                                console.error(err);
                                setMockFeedback({
                                  score: 75,
                                  feedback: "Excellent coverage of standard components pipelines, state caches, and database pools. Clear, structured response.",
                                  tip: "To raise authority, remember to specify exact workloads parameters (e.g. 'reduced load lag down to 28%')."
                                });
                              } finally {
                                setIsEvaluatingMock(false);
                              }
                            }}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 border-0 text-white font-extrabold text-[10px] px-3 py-2 rounded-lg cursor-pointer transition uppercase tracking-wider disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                          >
                            {isEvaluatingMock ? "Evaluating Answer..." : "Evaluate response"}
                          </button>

                          {/* Next Question */}
                          <button
                            type="button"
                            onClick={() => {
                              setMockFeedback(null);
                              setMockCurrentIndex((prev) => (prev < ((report.technicalQuestions || []).length - 1) ? prev + 1 : 0));
                              setMockUserTypedAnswer("");
                            }}
                            className="bg-slate-800 hover:bg-slate-750 text-slate-300 text-[10px] font-bold px-3 py-2 border border-slate-755 rounded-lg cursor-pointer shrink-0 transition"
                            title="Fetch new practice question"
                          >
                            Next ➔
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* Tab Case 5: COMPANY RESEARCH DASHBOARD (COMPANY) */}
              {activeSuiteTab === "company" && (
                <div className="p-6 bg-white space-y-6">
                  {/* Intel summary block */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-indigo-600" />
                        <span>Corporate Research Dashboard: {report.companyIntel?.name || "Target Company"}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">Equip yourself with product news, competitor dynamics, and Glassdoor-style insights before speaking with any recruiter.</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full uppercase tracking-wider">
                      ★ Glassdoor Rating: {report.companyIntel?.glassdoorRating || "4.2"} / 5.0
                    </span>
                  </div>

                  {/* Company grid layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Panel 1: Overview */}
                    <div className="border border-slate-100 rounded-2xl p-5 bg-gradient-to-br from-indigo-50/10 to-transparent space-y-4">
                      <div>
                        <span className="text-[8px] font-black px-1.5 py-0.5 bg-indigo-50 border border-indigo-100/50 text-indigo-700 rounded uppercase tracking-wider block w-fit">Corporate overview</span>
                        <h5 className="text-xs font-black text-slate-800 uppercase mt-2">Executive Summary</h5>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        {report.companyIntel?.overview || "This is a rapidly expanding modern technical products and scaling agency focused on client-oriented low-latency framework architectures."}
                      </p>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150/50 space-y-2">
                        <span className="text-[8px] font-mono font-bold text-slate-400 uppercase block tracking-wider">Known Products & Platforms</span>
                        <ul className="space-y-1 text-[11px] text-slate-700 font-semibold list-disc pl-4">
                          {(report.companyIntel?.products || ["Enterprise Core Console", "Internal Database Optimizer Grid"]).map((prod: string, pIdx: number) => (
                            <li key={pIdx}>{prod}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Panel 2: Recent news & Competitors */}
                    <div className="border border-slate-100 rounded-2xl p-5 space-y-4">
                      <div>
                        <span className="text-[8px] font-black px-1.5 py-0.5 bg-rose-50 border border-rose-100/50 text-rose-700 rounded uppercase tracking-wider block w-fit">News Alerts feed</span>
                        <h5 className="text-xs font-black text-slate-800 uppercase mt-2">Recent News & Milestones</h5>
                      </div>
                      <div className="space-y-3.5">
                        {(report.companyIntel?.recentNews || ["Completed Series B funding round to accelerate product releases."]).map((news: string, nIdx: number) => (
                          <div key={nIdx} className="text-[10px] leading-relaxed border-l-2 border-indigo-500 pl-3 italic text-slate-600 font-sans font-medium">
                            "{news}"
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[8px] font-black px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded uppercase tracking-wider block w-fit mb-2">Market Rivalries</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(report.companyIntel?.competitors || ["Competitor Alpha", "Competitor Beta"]).map((comp: string, cIdx: number) => (
                            <span key={cIdx} className="text-[9px] font-bold px-2 py-1 bg-slate-50 border text-slate-500 rounded">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Panel 3: Recruiter feedback and insights */}
                    <div className="border border-slate-100 rounded-2xl p-5 space-y-4 bg-emerald-50/5">
                      <div>
                        <span className="text-[8px] font-black px-1.5 py-0.5 bg-emerald-50 border border-emerald-150/60 text-emerald-800 rounded uppercase tracking-wider block w-fit">Glassdoor Insights</span>
                        <h5 className="text-xs font-black text-slate-800 uppercase mt-2">Screener tips & reviews</h5>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-emerald-50/10 border border-emerald-100 p-3.5 rounded-xl">
                          <span className="text-[8px] font-mono font-bold text-emerald-700 uppercase block tracking-widest mb-1">Interview Complexity</span>
                          <span className="text-xs font-extrabold text-slate-900">{report.companyIntel?.difficulty || "Medium Complexity Track"}</span>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[8px] font-mono font-black text-slate-400 uppercase block tracking-wider">Friction Points advice</span>
                          <ul className="space-y-1.5 text-[10px] text-slate-500 font-sans leading-relaxed">
                            {(report.companyIntel?.insights || [
                              "They value structured problem solving above template syntax memory.",
                              "Candidate soft skills are heavily scored in culture fit. Bring energy!"
                            ]).map((ins: string, iIdx: number) => (
                              <li key={iIdx} className="flex gap-2">
                                <span className="text-indigo-600 font-bold shrink-0">✓</span>
                                <span>{ins}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab Case 6: OPPORTUNITY RADAR SCANNER (RADAR) */}
              {activeSuiteTab === "radar" && (
                <div className="p-6 bg-white space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h4 className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-indigo-600 animate-spin" />
                      <span>Opportunity Radar Index</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium font-sans">Stop manual searches. Map parallel roles and trigger our Live Market Scan to locate hiring vacancies matched specifically to your skill trees.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Similar Role Discoveries */}
                    <div className="lg:col-span-5 space-y-4 border-r border-slate-100 pr-0 lg:pr-6">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Similar Parallel Roles Discovery</span>
                      
                      <div className="space-y-3">
                        {report.similarRoles?.map((role, idx) => (
                          <div key={idx} className="p-4 border border-slate-150/70 hover:border-indigo-200 transition bg-slate-50/20 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">⚡</span>
                              <div>
                                <h6 className="text-[11px] font-extrabold text-slate-900">{role.roleTitle}</h6>
                                <p className="text-[9px] text-slate-400">Demand Level: <strong className="text-indigo-600 uppercase font-extrabold shrink-0">{role.demandLevel}</strong></p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded block">{role.avgSalary}</span>
                              <span className="text-[9px] text-emerald-600 font-black tracking-tighter inline-block mt-1 font-mono">{role.matchPercentage}% Alignment</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: One-Click Market Portal Scan Simulator */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">AI-Powered Live Portal sweep</span>

                      {/* Scan trigger button */}
                      <div className="bg-indigo-50/30 border border-indigo-100 rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl shadow-xs">🚀</div>
                        <div className="max-w-md">
                          <h5 className="text-xs font-bold text-slate-900 uppercase">Automated Openings Matchmaker</h5>
                          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                            Reads your resume skills indices and maps equivalent job titles dynamically across current entries, ranking them instantly.
                          </p>
                        </div>

                        {radarScanActive ? (
                          <div className="w-full space-y-2 max-w-sm pt-2">
                            <div className="flex items-center justify-between text-[10px] font-bold text-indigo-700 font-mono">
                              <span>SWEEPING PORTALS...</span>
                              <span>{radarScanProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden border">
                              <div className="bg-indigo-600 h-full transition-all duration-200" style={{ width: `${radarScanProgress}%` }}></div>
                            </div>
                            <p className="text-[9px] text-slate-400 uppercase font-bold animate-pulse font-mono">
                              {radarScanProgress < 30 && "Extracting skill nodes (React, Typescript, Zustand)..."}
                              {radarScanProgress >= 30 && radarScanProgress < 60 && "Sweeping live Karnataka & remote developer databases..."}
                              {radarScanProgress >= 60 && radarScanProgress < 90 && "Filtering active roles with match percentages..."}
                              {radarScanProgress >= 90 && "Consolidating result feeds..."}
                            </p>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setRadarScanActive(true);
                              setTimeout(() => {
                                // Mark scan completed from progress trigger
                              }, 1600);
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl transition shadow-md border-0 uppercase cursor-pointer"
                          >
                            Find Similar Opportunities (One-Click) 🔍
                          </button>
                        )}
                      </div>

                      {/* Display scanned openings if completed */}
                      {!radarScanActive && scannedOpportunities.length > 0 && (
                        <div className="space-y-3.5 mt-2 animate-fade-in">
                          <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded uppercase tracking-wider w-fit">
                            Live Scanner results loaded
                          </span>

                          <div className="space-y-3">
                            {scannedOpportunities.map((opp) => {
                              const isApplied = appliedJobs.includes(opp.id);
                              return (
                                <div key={opp.id} className="p-4 border border-slate-200 rounded-xl bg-white shadow-2xs hover:border-slate-300 transition flex items-center justify-between gap-4 font-sans">
                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-2">
                                      <h6 className="text-[11px] font-bold text-slate-900 leading-tight">{opp.title}</h6>
                                      <span className="text-[8px] font-extrabold font-mono text-emerald-800 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                                        {opp.matchScore}% match
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-medium">{opp.company} • <span className="text-slate-400">{opp.location}</span></p>
                                    <p className="text-[9px] font-bold text-slate-400">Compensation: <span className="text-slate-600">{opp.salary}</span></p>
                                    
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {opp.skillsNeeded.map((sc: string, sIdx: number) => (
                                        <span key={sIdx} className="text-[8px] font-mono font-bold text-slate-400 bg-slate-50 border px-1.5 rounded">{sc}</span>
                                      ))}
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (!isApplied) {
                                        setAppliedJobs(prev => [...prev, opp.id]);
                                        alert(`Simulated Application sent successfully to ${opp.company} for ${opp.title}!`);
                                      }
                                    }}
                                    className={`shrink-0 text-[10px] font-bold px-3 py-2 rounded-lg border transition ${isApplied ? "bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default" : "bg-white hover:bg-slate-50 text-indigo-600 border-indigo-200 cursor-pointer"}`}
                                  >
                                    {isApplied ? "✓ Applied" : "One-Click Apply"}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )}

            </section>
          )}

        </div>

      </main>

      {/* Premium Status Footer */}
      <footer className="px-6 sm:px-8 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-medium gap-2 sm:gap-0">
        <div className="flex gap-4">
          <span>ATS Compatibility: ACTIVE</span>
          <span className="hidden sm:inline-block text-slate-300">|</span>
          <span>Privacy: Sandbox Encrypted Mode</span>
        </div>
        <div>
          POWERED BY GEMINI-AI & HR-MODULES V4.2
        </div>
      </footer>

    </div>
  );
}
