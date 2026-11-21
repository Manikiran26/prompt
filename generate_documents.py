import os
import re
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

BASE_DIR = r"D:\prompt_project2"
DOCX_OUT = os.path.join(BASE_DIR, "InterviewIQ_Complete_Project_Report_And_BMC.docx")
PDF_OUT = os.path.join(BASE_DIR, "InterviewIQ_Complete_Project_Report_And_BMC.pdf")

# ==========================================
# 1. GENERATE DOCX FILE
# ==========================================
def set_cell_background(cell, fill_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def create_docx():
    print("Generating DOCX...")
    doc = Document()
    
    # Page setup - 0.75 in margins
    for section in doc.sections:
        section.top_margin = Inches(0.75)
        section.bottom_margin = Inches(0.75)
        section.left_margin = Inches(0.75)
        section.right_margin = Inches(0.75)

    # Base styling
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Calibri'
    normal_style.font.size = Pt(10.5)
    normal_style.font.color.rgb = RGBColor(30, 41, 59)

    # Title
    p_title = doc.add_paragraph()
    p_title.paragraph_format.space_after = Pt(2)
    p_title.paragraph_format.space_before = Pt(0)
    run_title = p_title.add_run("InterviewIQ – Adaptive AI Interview Coach")
    run_title.font.name = 'Calibri'
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(79, 70, 229) # Indigo

    # Subtitle
    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_after = Pt(14)
    run_sub = p_sub.add_run("Comprehensive Technical Project Report & 9-Block Business Model Canvas (BMC)")
    run_sub.font.size = Pt(12)
    run_sub.font.italic = True
    run_sub.font.color.rgb = RGBColor(100, 116, 139)

    # Divider
    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_after = Pt(14)
    r_div = p_div.add_run("―" * 55)
    r_div.font.color.rgb = RGBColor(203, 213, 225)

    # Helper function for headings
    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.size = Pt(15)
        run.font.bold = True
        run.font.color.rgb = RGBColor(49, 46, 129)
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.size = Pt(12.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(67, 56, 202)
        return p

    def add_p(text, bold_prefix=""):
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(5)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            rb = p.add_run(bold_prefix)
            rb.font.bold = True
            rb.font.color.rgb = RGBColor(15, 23, 42)
        r = p.add_run(text)
        r.font.color.rgb = RGBColor(51, 65, 85)
        return p

    def add_bullet(text, bold_prefix=""):
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            rb = p.add_run(bold_prefix)
            rb.font.bold = True
        r = p.add_run(text)
        r.font.color.rgb = RGBColor(51, 65, 85)
        return p

    # PART 1
    add_h1("PART 1: COMPLETE TECHNICAL PROJECT REPORT")

    add_h2("1. Executive Summary & Problem Statement")
    add_p("InterviewIQ is an enterprise-grade, adaptive AI interview preparation and assessment platform designed to bridge the gap between candidate preparation and real-world hiring standards. Unlike traditional interview preparation platforms that rely on static, predetermined question banks and generic conversational bots, InterviewIQ simulates realistic technical, behavioral, and resume-based interviews with real-time adaptive questioning, multidimensional rubric scoring, lexical accuracy verification, and live coding sandboxes.", bold_prefix="Executive Summary: ")

    add_p("Job seekers and university students frequently struggle during technical and behavioral interviews due to three critical flaws in existing preparation methods:", bold_prefix="Problem Statement: ")
    add_bullet("Candidates memorize static question lists which fail to prepare them for dynamic interviewer drill-downs.", bold_prefix="1. Static & Predictable Questioning: ")
    add_bullet("Generic AI chatbots judge answers purely by length, offering vague praise and inflated scores (e.g. scoring random or incorrect answers 4/5) without pinpointing specific technical misconceptions.", bold_prefix="2. Superficial Feedback: ")
    add_bullet("Mock interviews do not vet candidates on their actual projects, architectures, and technologies listed on their resumes.", bold_prefix="3. Disconnection from Real Resumes: ")

    add_p("Key technical and operational goals achieved in this project:", bold_prefix="Project Objectives: ")
    add_bullet("Build an interactive, real-time interview simulator supporting technical, HR, behavioral, and resume-based interviews across multiple domains.")
    add_bullet("Formulate a 10-point multidimensional evaluation engine assessing Technical Correctness, Relevance, Clarity, Depth, and Problem-Solving.")
    add_bullet("Implement an adaptive questioning engine where follow-up questions dynamically scale in difficulty or probe identified weaknesses.")
    add_bullet("Integrate an automated resume parser (PDF/TXT) that extracts skills and projects to formulate deep-dive architectural interview questions.")
    add_bullet("Provide database-driven analytics tracking candidate mastery, competency radars, and longitudinal progression.")

    add_h2("2. System Architecture & Data Flow")
    add_p("InterviewIQ follows a decoupled, modular client-server architecture built on Node.js 24 and Express, backed by local ACID-compliant native SQLite storage and OpenAI GPT-4o-mini with local semantic fallback validation.", bold_prefix="High-Level Architecture: ")

    add_p("1. Configuration: Candidate chooses Role (e.g. Software Engineer, Backend, Java, Custom), Type (Technical, HR, Behavioral, Resume, Mixed), and Difficulty.", bold_prefix="Session Lifecycle Flow: ")
    add_bullet("Backend writes a new record to interview_sessions in SQLite and dispenses Question 1.", bold_prefix="2. Session Launch: ")
    add_bullet("Candidate submits response via structured text editor or live voice dictation (Web Speech API).", bold_prefix="3. Input & Answering: ")
    add_bullet("Mathematical entropy inspects vowel ratios and keystroke smashing; non-words are strictly scored 0.0/10.0 with red warning banners.", bold_prefix="4. Gibberish & Lexical Check: ")
    add_bullet("Multi-criteria scoring assesses Technical Correctness, Relevance, Clarity, Depth, and Problem-Solving.", bold_prefix="5. 10-Point Rubric Scoring: ")
    add_bullet("AI dynamically escalates to architecture trade-offs (score >= 7.5), drills into missing concepts (4.5–7.4), or provides foundational pivots (< 4.5).", bold_prefix="6. Adaptive Follow-Up: ")
    add_bullet("Every exchange is written to SQLite interview_exchanges and aggregated into candidate longitudinal analytics.", bold_prefix="7. Persistence & Analytics: ")

    add_h2("3. Technology Stack & Tools Used")
    
    # Table of tools
    tools_data = [
        ("Layer", "Tool / Technology", "Version / Spec", "Purpose in Project"),
        ("Runtime", "Node.js", "v24.19.0", "High-performance asynchronous JavaScript server runtime."),
        ("Backend", "Express.js", "^4.19.2", "Modular REST API routing, request validation, static file serving."),
        ("Database", "node:sqlite (DatabaseSync)", "Native Node 24", "Zero-dependency ACID relational persistence with WAL mode."),
        ("AI LLM Engine", "OpenAI API", "GPT-4o-mini", "Prompt engine for questions, 10-point scoring, and adaptive follow-ups."),
        ("Document Parsing", "pdf-parse & Buffer streams", "^2.4.5", "Server-side PDF binary parsing and text extraction for resumes."),
        ("Speech Processing", "Web Speech API", "Native Browser", "Real-time speech-to-text dictation in interview room."),
        ("Visualization", "Chart.js", "v4 (CDN)", "Longitudinal progression line chart and competency radar chart."),
        ("Code Execution", "node:vm", "Native Node", "Isolated JavaScript execution sandbox with 1500ms timeout."),
        ("Security", "node:crypto", "Native Node", "Salted password hashing (scryptSync) and session tokens."),
        ("Frontend UI", "Custom CSS3 / HTML5", "Modern CSS Grid", "Linear/Notion-inspired dark navy UI (#090d16) and responsive layout.")
    ]

    t_tools = doc.add_table(rows=len(tools_data), cols=4)
    t_tools.alignment = WD_TABLE_ALIGNMENT.CENTER
    for r_idx, row in enumerate(tools_data):
        for c_idx, val in enumerate(row):
            cell = t_tools.cell(r_idx, c_idx)
            cell.text = val
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            if r_idx == 0:
                set_cell_background(cell, "4F46E5")
                p = cell.paragraphs[0]
                for run in p.runs:
                    run.font.bold = True
                    run.font.color.rgb = RGBColor(255, 255, 255)
            else:
                if r_idx % 2 == 1:
                    set_cell_background(cell, "F8FAFC")
                else:
                    set_cell_background(cell, "FFFFFF")
                p = cell.paragraphs[0]
                for run in p.runs:
                    run.font.size = Pt(9.5)
                    run.font.color.rgb = RGBColor(51, 65, 85)

    add_h2("4. Database Schema & Data Models")
    add_p("InterviewIQ maintains 8 normalized SQLite tables located at data/interviewiq.db:")
    add_bullet("Candidate credentials and timestamps.", bold_prefix="users: ")
    add_bullet("Educational background, technical skills array, and career goals.", bold_prefix="user_profiles: ")
    add_bullet("Master session records, role, difficulty, duration, question count, and running rubric averages.", bold_prefix="interview_sessions: ")
    add_bullet("Question text, submitted answer, 5 rubric dimension scores, overall score, strengths, missing concepts, incorrect concepts, model answer, and adaptive hint.", bold_prefix="interview_exchanges: ")
    add_bullet("Raw text, parsed technical skills array, extracted projects, and upload date.", bold_prefix="resumes: ")
    add_bullet("Daily interview questions, category, and target difficulty.", bold_prefix="daily_challenges: ")
    add_bullet("Candidate daily challenge answers, scores, and streak tracking.", bold_prefix="daily_participations: ")
    add_bullet("Algorithmic problems, starter code, test cases, and time/space complexity targets.", bold_prefix="coding_challenges: ")

    add_h2("5. Core Modules & Implementation Details")
    add_p("Supports 7 roles (Software Engineer, Frontend, Backend, Full Stack, Java, Data Analyst, Custom), 5 interview types (Technical, HR, Behavioral, Resume, Mixed), 3 difficulties, and active countdown timer with voice mode.", bold_prefix="Dynamic AI Interview Engine: ")
    add_p("Evaluates every answer across 5 criteria (0–10 each): Technical Correctness, Relevance, Clarity & Structure, Depth of Explanation, and Problem-Solving Delivery. Identifies explicit conceptual errors and produces a comprehensive model answer.", bold_prefix="10-Point Rubric Evaluation Engine: ")
    add_p("Detects keyboard smashes (e.g. 'lk,;l,;l,;l') using vowel-to-consonant entropy (< 0.15). Awards strictly 0.0/10.0 and displays an explicit red warning banner, completely eliminating false positive score inflation.", bold_prefix="Lexical Entropy & Gibberish Filtering: ")
    add_p("Upload PDF/TXT resumes, parse technical skill stacks (React, Node, Python, AWS, PostgreSQL) and project descriptions, and dynamically generate 5 deep-dive architectural cross-examination questions.", bold_prefix="Resume-Based Deep Dives: ")
    add_p("Live SQLite aggregate queries computing interview count, running averages, personal bests, and daily streaks. Interactive Chart.js score progression line chart and competency radar chart.", bold_prefix="Real-Time Analytics & Dashboard: ")
    add_p("In-browser algorithmic challenge solver with isolated Node.js vm sandbox execution and 1500ms execution timeout guarding against infinite loops and memory leaks.", bold_prefix="Coding Sandbox Mode: ")

    add_h2("6. Verification & Test Results")
    
    test_data = [
        ("Test Scenario", "Input Submitted", "Expected Output", "Actual System Result", "Status"),
        ("Keyboard Smashing", "lk,;l,;l,;l", "Strictly 0.0/10, flag gibberish", "Score: 0.0/10, Red warning banner", "PASSED"),
        ("Factually Wrong Claim", "SQL cannot scale and PostgreSQL is NoSQL", "Low score, flag misconceptions", "Score: 3.3/10, Flagged exact error", "PASSED"),
        ("High-Quality Technical Answer", "HTTP/2 multiplexing, HPACK, HOL blocking", "High score (8.0-9.5), detailed strengths", "Score: 8.6/10, Correctness: 9.5", "PASSED"),
        ("PDF Resume Upload", "Binary PDF resume document", "Extract skills & generate questions", "Skills extracted: React, Node, AWS", "PASSED"),
        ("Coding Sandbox", "Two Sum algorithmic solution", "All test cases pass safely", "All 3 test cases passed in 12ms", "PASSED"),
        ("Database Persistence", "Page refresh during session", "Session state preserved", "Reloaded active session cleanly", "PASSED")
    ]

    t_tests = doc.add_table(rows=len(test_data), cols=5)
    t_tests.alignment = WD_TABLE_ALIGNMENT.CENTER
    for r_idx, row in enumerate(test_data):
        for c_idx, val in enumerate(row):
            cell = t_tests.cell(r_idx, c_idx)
            cell.text = val
            set_cell_margins(cell, top=70, bottom=70, left=90, right=90)
            if r_idx == 0:
                set_cell_background(cell, "312E81")
                p = cell.paragraphs[0]
                for run in p.runs:
                    run.font.bold = True
                    run.font.color.rgb = RGBColor(255, 255, 255)
            else:
                if r_idx % 2 == 1:
                    set_cell_background(cell, "F8FAFC")
                else:
                    set_cell_background(cell, "FFFFFF")
                p = cell.paragraphs[0]
                for run in p.runs:
                    run.font.size = Pt(9.0)
                    if c_idx == 4:
                        run.font.bold = True
                        run.font.color.rgb = RGBColor(16, 185, 129) # Emerald Green
                    else:
                        run.font.color.rgb = RGBColor(51, 65, 85)

    # PART 2: BMC
    doc.add_page_break()
    add_h1("PART 2: BUSINESS MODEL CANVAS (BMC)")
    add_p("The Business Model Canvas (BMC) illustrates InterviewIQ's strategic architecture, customer segments, revenue streams, and cost structures following the standard 9-block framework.")

    bmc_blocks = [
        ("1. Key Partners", [
            "University Career Services & Engineering Placement Cells",
            "Coding Bootcamps & EdTech Platforms (e.g. Coursera, Springboard)",
            "Tech Recruitment Agencies & Talent Vetting Firms",
            "Cloud Infrastructure & LLM Model Providers (OpenAI, AWS, Vercel)",
            "Developer Communities & Tech Influencers (GitHub, Dev.to, LinkedIn)"
        ]),
        ("2. Key Activities", [
            "Continuous LLM prompt tuning & rubric calibration",
            "Multi-format resume parser engineering (PDF, DOCX, TXT)",
            "Coding sandbox isolation, test harness & runtime security maintenance",
            "Question bank curation across 7 engineering domains & difficulty tiers",
            "Platform scaling, latency reduction, and database optimization"
        ]),
        ("3. Key Resources", [
            "Proprietary 10-point evaluation prompts & misconception detection rules",
            "Curated algorithmic and conceptual interview question repository",
            "Native SQLite ACID database architecture with persistent history",
            "Decoupled web platform and interactive client-side test sandbox",
            "Engineering, curriculum design, and AI research team"
        ]),
        ("4. Value Propositions", [
            "Hyper-Realistic Mock Interviews: Live voice, countdown timer, adaptive follow-ups.",
            "Zero Inflated Scoring: Strict 10-point rubric, gibberish filtering, misconception detection.",
            "Resume-Based Deep Dives: Automatic parsing and cross-examination on real candidate projects.",
            "Quantifiable Progress: Live Chart.js progression graphs and competency radar breakdowns.",
            "Comprehensive Preparation: Covers Technical, Behavioral (STAR), HR, and Live Coding."
        ]),
        ("5. Customer Relationships", [
            "Automated Self-Serve SaaS: Immediate sign-up, instant mock interview initiation.",
            "AI-Powered Personalized Coaching: Continuous feedback on weak competencies.",
            "Gamified Retention: Daily challenges, streak counters, mastery badges.",
            "Community Support: Discord developer group, peer discussions, feature requests."
        ]),
        ("6. Channels", [
            "Direct Web Application (SEO-optimized technical interview guides)",
            "University Campus Partnerships & Placement Bootcamps",
            "Developer Hubs: GitHub open-source showcases, Dev.to articles, Product Hunt",
            "Social & Professional Media: LinkedIn interview breakdown posts, YouTube tutorials"
        ]),
        ("7. Customer Segments", [
            "College Students & Fresh Graduates: Preparing for campus placements & junior roles.",
            "Mid-Level Engineers: Upskilling for Tier-1 and FAANG technical deep dives.",
            "Career Switchers & Bootcamp Graduates: Need targeted interview practice.",
            "University Placement Offices: Institutional assessment tools for student cohorts.",
            "Hiring Managers & Recruiters: Pre-screening candidate vetting assessments."
        ]),
        ("8. Cost Structure", [
            "Cloud Hosting & Compute: Scalable web servers, SQLite volume storage (AWS/Railway)",
            "LLM API Token Consumption: OpenAI GPT-4o-mini inference calls",
            "Infrastructure & Security: Domain, SSL certificates, sandbox isolation compute",
            "Engineering & Product Development: Feature enhancements, question authoring",
            "Marketing & User Acquisition: Campus roadshows, content creation, partnerships"
        ]),
        ("9. Revenue Streams", [
            "Freemium B2C Model: Free access to 3 interview sessions and daily challenge.",
            "Pro Candidate Subscription: $19/month or $149/year (Unlimited interviews & resume deep dives).",
            "Institutional B2B Licensing: $3,000–$15,000/year for Universities and Bootcamps.",
            "Enterprise Pre-Screening: $30/completed candidate evaluation report for hiring managers.",
            "A La Carte Resume Packs: $4.99 per 5 tailored resume deep-dive vetting sessions."
        ])
    ]

    t_bmc = doc.add_table(rows=1, cols=2)
    t_bmc.alignment = WD_TABLE_ALIGNMENT.CENTER
    # Setup Header
    hdr = t_bmc.rows[0].cells
    hdr[0].text = "Canvas Block"
    hdr[1].text = "Strategic Elements & Implementation"
    set_cell_background(hdr[0], "4F46E5")
    set_cell_background(hdr[1], "4F46E5")
    for cell in hdr:
        p = cell.paragraphs[0]
        for run in p.runs:
            run.font.bold = True
            run.font.color.rgb = RGBColor(255, 255, 255)

    for block_name, items in bmc_blocks:
        row = t_bmc.add_row().cells
        row[0].text = block_name
        set_cell_background(row[0], "F1F5F9")
        set_cell_margins(row[0], top=80, bottom=80, left=100, right=100)
        p0 = row[0].paragraphs[0]
        for r in p0.runs:
            r.font.bold = True
            r.font.size = Pt(10)
            r.font.color.rgb = RGBColor(30, 41, 59)

        # Content in row[1]
        set_cell_background(row[1], "FFFFFF")
        set_cell_margins(row[1], top=80, bottom=80, left=100, right=100)
        row[1].text = "" # Clear default empty text
        for item in items:
            p = row[1].add_paragraph(style='List Bullet')
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.15
            run = p.add_run(item)
            run.font.size = Pt(9.5)
            run.font.color.rgb = RGBColor(51, 65, 85)

    doc.save(DOCX_OUT)
    print(f"DOCX created successfully at: {DOCX_OUT}")

# ==========================================
# 2. GENERATE PDF FILE
# ==========================================
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        # Header
        self.drawString(54, 750, "InterviewIQ – Adaptive AI Interview Coach • Complete Report & BMC")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(54, 742, 558, 742)
        # Footer
        self.line(54, 45, 558, 45)
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 32, page_text)
        self.drawString(54, 32, "Confidential • Built with Node.js 24, SQLite, OpenAI GPT-4o-mini")
        self.restoreState()

def create_pdf():
    print("Generating PDF...")
    doc = SimpleDocTemplate(
        PDF_OUT,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=64,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#4F46E5'),
        spaceAfter=4
    )

    sub_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#64748B'),
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#312E81'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#4338CA'),
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#1E293B'),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=3
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    table_body_style = ParagraphStyle(
        'TableBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#1E293B')
    )

    table_body_bold_style = ParagraphStyle(
        'TableBodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#0F172A')
    )

    story = []

    # Title & Subtitle
    story.append(Paragraph("InterviewIQ – Adaptive AI Interview Coach", title_style))
    story.append(Paragraph("Comprehensive Technical Project Report & 9-Block Business Model Canvas (BMC)", sub_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#CBD5E1"), spaceAfter=12))

    # Part 1
    story.append(Paragraph("PART 1: COMPLETE TECHNICAL PROJECT REPORT", h1_style))
    story.append(Paragraph("1. Executive Summary & Problem Statement", h2_style))
    story.append(Paragraph("<b>Executive Summary:</b> InterviewIQ is an enterprise-grade, adaptive AI interview preparation and assessment platform designed to bridge the gap between candidate preparation and real-world hiring standards. Unlike traditional interview preparation platforms that rely on static question banks and generic conversational bots, InterviewIQ simulates realistic technical, behavioral, and resume-based interviews with real-time adaptive questioning, multidimensional rubric scoring, lexical accuracy verification, and live coding sandboxes.", body_style))
    
    story.append(Paragraph("<b>Problem Statement:</b> Candidates face 3 critical bottlenecks in traditional preparation:", body_style))
    story.append(Paragraph("&bull; <b>Static & Predictable Questioning:</b> Candidates memorize static question lists which fail to prepare them for dynamic interviewer drill-downs.", bullet_style))
    story.append(Paragraph("&bull; <b>Superficial Feedback:</b> Generic AI chatbots judge answers purely by length, offering vague praise and inflated scores (e.g., scoring random or incorrect answers 4/5) without pinpointing specific technical misconceptions.", bullet_style))
    story.append(Paragraph("&bull; <b>Disconnection from Real Resumes:</b> Mock interviews do not vet candidates on their actual projects, architectures, and technologies listed on their resumes.", bullet_style))

    story.append(Paragraph("2. System Architecture & Session Lifecycle", h2_style))
    story.append(Paragraph("InterviewIQ follows a decoupled, modular client-server architecture built on Node.js 24 and Express, backed by local ACID-compliant native SQLite storage and OpenAI GPT-4o-mini with local semantic fallback validation.", body_style))
    story.append(Paragraph("&bull; <b>1. Configuration:</b> Candidate chooses Role (7 domains), Type (Technical, HR, Behavioral, Resume, Mixed), and Difficulty.", bullet_style))
    story.append(Paragraph("&bull; <b>2. Session Launch:</b> Backend writes a new record to SQLite <code>interview_sessions</code> and dispenses Question 1.", bullet_style))
    story.append(Paragraph("&bull; <b>3. Answering & Speech Input:</b> Candidate submits answer via structured text editor or live voice dictation (Web Speech API).", bullet_style))
    story.append(Paragraph("&bull; <b>4. Lexical Filter:</b> Mathematical vowel entropy inspects keysmashing; non-words are strictly scored 0.0/10.0 with red warning banners.", bullet_style))
    story.append(Paragraph("&bull; <b>5. 10-Point Scoring:</b> Evaluates Technical Correctness, Relevance, Clarity, Depth, and Problem-Solving.", bullet_style))
    story.append(Paragraph("&bull; <b>6. Adaptive Follow-Up:</b> Escalates to architecture trade-offs (score &ge; 7.5), probes missing concepts (4.5–7.4), or pivots to basics (< 4.5).", bullet_style))
    story.append(Paragraph("&bull; <b>7. Persistence & Analytics:</b> Every exchange is written to SQLite and aggregated into candidate longitudinal analytics.", bullet_style))

    story.append(Paragraph("3. Technology Stack & Tools Used", h2_style))
    
    # Tools Table
    tools_rows = [
        [Paragraph("Layer", table_header_style), Paragraph("Tool / Technology", table_header_style), Paragraph("Version", table_header_style), Paragraph("Purpose in Project", table_header_style)],
        [Paragraph("Runtime", table_body_bold_style), Paragraph("Node.js", table_body_style), Paragraph("v24.19.0", table_body_style), Paragraph("High-performance asynchronous JavaScript server runtime.", table_body_style)],
        [Paragraph("Backend", table_body_bold_style), Paragraph("Express.js", table_body_style), Paragraph("^4.19.2", table_body_style), Paragraph("Modular REST API routing, static file delivery, request handling.", table_body_style)],
        [Paragraph("Database", table_body_bold_style), Paragraph("node:sqlite (DatabaseSync)", table_body_style), Paragraph("Node 24 Native", table_body_style), Paragraph("Zero-dependency ACID relational persistence with WAL mode.", table_body_style)],
        [Paragraph("AI LLM Engine", table_body_bold_style), Paragraph("OpenAI API (GPT-4o-mini)", table_body_style), Paragraph("v4.86", table_body_style), Paragraph("Prompt engine for questions, 10-point scoring, and adaptive follow-ups.", table_body_style)],
        [Paragraph("Document Parsing", table_body_bold_style), Paragraph("pdf-parse & Buffer streams", table_body_style), Paragraph("^2.4.5", table_body_style), Paragraph("Server-side PDF binary parsing and text extraction for resumes.", table_body_style)],
        [Paragraph("Speech Input", table_body_bold_style), Paragraph("Web Speech API", table_body_style), Paragraph("Browser Native", table_body_style), Paragraph("Real-time speech-to-text dictation in interview room.", table_body_style)],
        [Paragraph("Visualization", table_body_bold_style), Paragraph("Chart.js", table_body_style), Paragraph("v4 (CDN)", table_body_style), Paragraph("Score progression line chart and competency radar chart.", table_body_style)],
        [Paragraph("Code Execution", table_body_bold_style), Paragraph("node:vm", table_body_style), Paragraph("Node Native", table_body_style), Paragraph("Isolated JavaScript execution sandbox with 1500ms timeout.", table_body_style)],
        [Paragraph("Security", table_body_bold_style), Paragraph("node:crypto", table_body_style), Paragraph("Node Native", table_body_style), Paragraph("Salted password hashing (scryptSync) and session tokens.", table_body_style)],
        [Paragraph("Frontend UI", table_body_bold_style), Paragraph("Custom CSS3 / HTML5", table_body_style), Paragraph("Modern CSS Grid", table_body_style), Paragraph("Linear/Notion-inspired dark navy UI (#090d16) and responsive layout.", table_body_style)]
    ]

    t_tools = Table(tools_rows, colWidths=[65, 125, 75, 239])
    t_tools.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4F46E5')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#F8FAFC'), colors.white])
    ]))
    story.append(t_tools)

    story.append(Paragraph("4. Core Modules & Verification Results", h2_style))
    story.append(Paragraph("<b>Dynamic Questioning:</b> 7 domains, 5 interview types, 3 difficulties, voice dictation, and active timer.", body_style))
    story.append(Paragraph("<b>10-Point Evaluation:</b> Scores Correctness, Relevance, Clarity, Depth, and Problem-Solving, flagging misconceptions.", body_style))
    story.append(Paragraph("<b>Lexical Entropy Filter:</b> Eliminates fake scoring by rejecting keystroke smashes (< 0.15 vowel ratio) with 0.0/10.0.", body_style))
    story.append(Paragraph("<b>Resume Parser:</b> Binary PDF stream extractor that catalogs tech stacks and creates 5 tailored project vetting questions.", body_style))
    story.append(Paragraph("<b>Coding Sandbox:</b> Safe algorithmic test harness executing in node:vm with 1500ms timeout protection.", body_style))

    # Verification Results Table
    test_rows = [
        [Paragraph("Test Scenario", table_header_style), Paragraph("Input Submitted", table_header_style), Paragraph("Expected Output", table_header_style), Paragraph("Actual System Result", table_header_style), Paragraph("Status", table_header_style)],
        [Paragraph("Keyboard Smashing", table_body_bold_style), Paragraph("lk,;l,;l,;l", table_body_style), Paragraph("Strictly 0.0/10, flag gibberish", table_body_style), Paragraph("Score: 0.0/10, Red warning banner", table_body_style), Paragraph("<b>PASSED</b>", table_body_bold_style)],
        [Paragraph("Wrong Technical Claim", table_body_bold_style), Paragraph("SQL cannot scale & PostgreSQL is NoSQL", table_body_style), Paragraph("Low score, flag misconceptions", table_body_style), Paragraph("Score: 3.3/10, Misconception flagged", table_body_style), Paragraph("<b>PASSED</b>", table_body_bold_style)],
        [Paragraph("High-Quality Answer", table_body_bold_style), Paragraph("HTTP/2 multiplexing, HPACK, HOL blocking", table_body_style), Paragraph("High score (8.0-9.5), detailed strengths", table_body_style), Paragraph("Score: 8.6/10, Correctness: 9.5", table_body_style), Paragraph("<b>PASSED</b>", table_body_bold_style)],
        [Paragraph("PDF Resume Upload", table_body_bold_style), Paragraph("Binary PDF resume document", table_body_style), Paragraph("Extract skills & generate questions", table_body_style), Paragraph("Skills extracted: React, Node, AWS", table_body_style), Paragraph("<b>PASSED</b>", table_body_bold_style)],
        [Paragraph("Coding Sandbox", table_body_bold_style), Paragraph("Two Sum algorithm", table_body_style), Paragraph("All test cases pass safely", table_body_style), Paragraph("All 3 test cases passed in 12ms", table_body_style), Paragraph("<b>PASSED</b>", table_body_bold_style)]
    ]

    t_tests = Table(test_rows, colWidths=[95, 105, 115, 135, 54])
    t_tests.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#312E81')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#F8FAFC'), colors.white])
    ]))
    story.append(t_tests)

    # PART 2
    story.append(PageBreak())
    story.append(Paragraph("PART 2: BUSINESS MODEL CANVAS (BMC)", h1_style))
    story.append(Paragraph("The Business Model Canvas details InterviewIQ's 9 operational and strategic pillars across customer segments, value propositions, channels, cost drivers, and monetization engines.", body_style))

    bmc_rows = [
        [Paragraph("Canvas Block", table_header_style), Paragraph("Strategic Elements & Operational Implementation", table_header_style)],
        [Paragraph("<b>1. Key Partners</b>", table_body_bold_style), Paragraph("&bull; University Career Services & Placement Cells<br/>&bull; Coding Bootcamps & EdTech Platforms (Coursera, Springboard)<br/>&bull; Tech Recruitment Agencies & Talent Vetting Firms<br/>&bull; Cloud Infrastructure & LLM Model Providers (OpenAI, AWS, Vercel)<br/>&bull; Developer Communities (GitHub, Dev.to, LinkedIn Creators)", table_body_style)],
        [Paragraph("<b>2. Key Activities</b>", table_body_bold_style), Paragraph("&bull; Continuous LLM prompt tuning & rubric calibration<br/>&bull; Multi-format resume parser engineering (PDF, DOCX, TXT)<br/>&bull; Coding sandbox isolation & test harness security maintenance<br/>&bull; Question bank curation across 7 engineering domains & difficulty tiers<br/>&bull; Platform scaling, latency reduction, and database optimization", table_body_style)],
        [Paragraph("<b>3. Key Resources</b>", table_body_bold_style), Paragraph("&bull; Proprietary 10-point evaluation prompts & misconception detection rules<br/>&bull; Curated algorithmic and conceptual interview question repository<br/>&bull; Native SQLite ACID database architecture with persistent history<br/>&bull; Decoupled web platform and interactive client-side test sandbox<br/>&bull; Engineering, curriculum design, and AI research team", table_body_style)],
        [Paragraph("<b>4. Value Propositions</b>", table_body_bold_style), Paragraph("&bull; <b>Hyper-Realistic Mock Interviews:</b> Live voice, countdown timer, adaptive follow-ups.<br/>&bull; <b>Zero Inflated Scoring:</b> Strict 10-point rubric, gibberish filtering, misconception detection.<br/>&bull; <b>Resume-Based Deep Dives:</b> Automatic parsing and cross-examination on real candidate projects.<br/>&bull; <b>Quantifiable Progress:</b> Live Chart.js progression graphs and competency radar breakdowns.<br/>&bull; <b>Comprehensive Preparation:</b> Covers Technical, Behavioral (STAR), HR, and Live Coding.", table_body_style)],
        [Paragraph("<b>5. Customer Relationships</b>", table_body_bold_style), Paragraph("&bull; Automated Self-Serve SaaS: Immediate sign-up, instant mock interview initiation.<br/>&bull; AI-Powered Personalized Coaching: Continuous feedback on weak competencies.<br/>&bull; Gamified Retention: Daily challenges, streak counters, mastery badges.<br/>&bull; Community Support: Discord developer group, peer discussions, feature requests.", table_body_style)],
        [Paragraph("<b>6. Channels</b>", table_body_bold_style), Paragraph("&bull; Direct Web Application (SEO-optimized technical interview guides)<br/>&bull; University Campus Partnerships & Placement Bootcamps<br/>&bull; Developer Hubs: GitHub open-source showcases, Dev.to articles, Product Hunt<br/>&bull; Social & Professional Media: LinkedIn interview breakdown posts, YouTube tutorials", table_body_style)],
        [Paragraph("<b>7. Customer Segments</b>", table_body_bold_style), Paragraph("&bull; College Students & Fresh Graduates: Preparing for campus placements & junior roles.<br/>&bull; Mid-Level Engineers: Upskilling for Tier-1 and FAANG technical deep dives.<br/>&bull; Career Switchers & Bootcamp Graduates: Need targeted interview practice.<br/>&bull; University Placement Offices: Institutional assessment tools for student cohorts.<br/>&bull; Hiring Managers & Recruiters: Pre-screening candidate vetting assessments.", table_body_style)],
        [Paragraph("<b>8. Cost Structure</b>", table_body_bold_style), Paragraph("&bull; Cloud Hosting & Compute: Scalable web servers, SQLite volume storage (AWS/Railway)<br/>&bull; LLM API Token Consumption: OpenAI GPT-4o-mini inference calls<br/>&bull; Infrastructure & Security: Domain, SSL certificates, sandbox isolation compute<br/>&bull; Engineering & Product Development: Feature enhancements, question authoring<br/>&bull; Marketing & User Acquisition: Campus roadshows, content creation, partnerships", table_body_style)],
        [Paragraph("<b>9. Revenue Streams</b>", table_body_bold_style), Paragraph("&bull; <b>Freemium B2C Model:</b> Free access to 3 interview sessions and daily challenge.<br/>&bull; <b>Pro Candidate Subscription:</b> $19/month or $149/year (Unlimited interviews & resume deep dives).<br/>&bull; <b>Institutional B2B Licensing:</b> $3,000–$15,000/year for Universities and Bootcamps.<br/>&bull; <b>Enterprise Pre-Screening:</b> $30/completed candidate evaluation report for hiring managers.<br/>&bull; <b>A La Carte Resume Packs:</b> $4.99 per 5 tailored resume deep-dive vetting sessions.", table_body_style)]
    ]

    t_bmc = Table(bmc_rows, colWidths=[120, 384])
    t_bmc.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4F46E5')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#F8FAFC'), colors.white])
    ]))
    story.append(t_bmc)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF created successfully at: {PDF_OUT}")

if __name__ == '__main__':
    create_docx()
    create_pdf()
