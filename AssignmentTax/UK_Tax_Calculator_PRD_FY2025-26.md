# Product Requirements Document (PRD)
# UK Tax Calculator App — FY 2025-26
## Salaried Employee Tax Optimizer: Old vs New Regime Comparison

---

**Document Version:** 1.0  
**Date:** May 2026  
**Tax Year:** FY 2025-26 (6 April 2025 – 5 April 2026)  
**Target Audience:** Salaried employees in the UK (England, Wales, Northern Ireland)  
**Platform:** Browser-based, privacy-first (all calculations client-side)  
**Design Philosophy:** Minimal, modern, trustworthy, step-by-step wizard

---

## 1. Executive Summary

### 1.1 Problem Statement
Millions of UK salaried employees have no clear understanding of which tax regime or combination of deductions saves them the most money. Existing calculators are confusing, require CTC/gross salary inputs that many don't know, and lack real-time visual feedback. There is no "old vs new regime" concept in the UK like India, but there ARE critical choices around pension contributions (relief at source vs net pay vs salary sacrifice), ISA utilization, savings allowances, and marriage allowance that dramatically affect take-home pay.

### 1.2 Solution
A step-by-step wizard that starts from what everyone knows: **monthly take-home pay**. It asks one plain-English question at a time, shows a live preview panel updating in real-time, and delivers a clear recommendation: "Do this. You save £X." with personalized education and actionable suggestions.

### 1.3 Key Differentiators
- Starts from net salary (what lands in bank), not gross/CTC
- One question at a time, plain language (21-year-old friendly)
- Live preview panel with detailed tax slab breakdowns
- Per-step FAQ for immediate doubt resolution
- Personalized "why this matters" education at the end
- Actionable suggestions (pension, ISA, SIPP, salary sacrifice)
- Privacy-first: zero server communication, no data storage
- No clutter, no ads, no upsells

---

## 2. Tax Logic & Calculations (FY 2025-26)

### 2.1 Core Tax Framework

**IMPORTANT CLARIFICATION:** The UK does NOT have an "old regime vs new regime" system like India. Instead, the app will compare:
1. **Current Scenario**: What the user is likely doing now (minimal optimization)
2. **Optimized Scenario**: Maximizing available reliefs and allowances

The app will show the user their "tax gap" — how much extra tax they're paying vs. what they could save with proper planning.

### 2.2 Income Tax Rates & Thresholds (England, Wales, Northern Ireland)

| Band | Taxable Income | Rate |
|------|---------------|------|
| Personal Allowance | £0 – £12,570 | 0% |
| Basic Rate | £12,571 – £50,270 | 20% |
| Higher Rate | £50,271 – £125,140 | 40% |
| Additional Rate | Over £125,140 | 45% |

**Personal Allowance Taper:** Reduced by £1 for every £2 of income above £100,000. Fully withdrawn at £125,140. [^7^]

**Note for Scottish Users:** If user selects Scotland, apply Scottish Income Tax bands (see Section 2.8).

### 2.3 National Insurance Contributions (Class 1 Employee)

| Threshold | Weekly | Annual | Rate |
|-----------|--------|--------|------|
| Lower Earnings Limit (LEL) | £125 | £6,500 | 0% |
| Primary Threshold (PT) | £242 | £12,570 | 0% |
| Upper Earnings Limit (UEL) | £967 | £50,270 | 8% |
| Above UEL | Over £967 | Over £50,270 | 2% |

**Calculation Method:** NICs are calculated on a weekly/monthly basis, not annual. For the app, we annualize for simplicity but note this caveat. [^5^][^9^]

**Employer NIC (for reference only, not deducted from employee):**
- Rate: 15% on earnings above Secondary Threshold (£96/week or £5,000/year)
- Not shown to employee but relevant for salary sacrifice discussions [^1^]

### 2.4 Pension Tax Relief

**Annual Allowance:** £60,000 (may taper to £10,000 for high earners — see below) [^20^][^23^]

**Tax Relief Methods:**

1. **Relief at Source (Personal Pensions/SIPP):**
   - User pays net contribution
   - Pension provider claims 20% basic rate relief from HMRC
   - Higher/additional rate relief claimed via Self Assessment
   - Example: £800 net → £1,000 gross (provider adds £200)

2. **Net Pay Arrangement (Workplace Pension):**
   - Contribution deducted from gross salary before tax
   - Full relief at marginal rate immediate
   - No Self Assessment needed for extra relief

3. **Salary Sacrifice:**
   - Employee agrees to reduced salary, employer pays into pension
   - Saves Employee NIC (8% or 2%) and Employer NIC (15%)
   - **CRITICAL CHANGE FROM APRIL 2029:** NIC relief capped at £2,000/year contribution limit [^15^][^19^]
   - For FY 2025-26, full salary sacrifice NIC relief still applies
   - Cannot reduce salary below National Minimum Wage

**Tapered Annual Allowance (High Earners):**
- Threshold Income > £200,000 AND Adjusted Income > £260,000
- Allowance reduced by £1 for every £2 of adjusted income over £260,000
- Minimum allowance: £10,000 (at £360,000+ adjusted income) [^17^]

**Money Purchase Annual Allowance (MPAA):**
- If user has flexibly accessed pension: £10,000 limit (not £60,000)
- Ask in wizard if applicable

### 2.5 ISA Allowances

| ISA Type | Annual Limit | Notes |
|----------|-------------|-------|
| Cash ISA | Part of £20,000 | Tax-free interest |
| Stocks & Shares ISA | Part of £20,000 | Tax-free dividends/gains |
| Lifetime ISA (LISA) | £4,000 (within £20k) | 25% gov bonus, age 18-39 only |
| Innovative Finance ISA | Part of £20,000 | Peer-to-peer lending |
| Junior ISA | £9,000 | For children |

**Key Point:** ISA contributions don't reduce taxable income but shield returns from tax. [^14^][^20^]

### 2.6 Savings & Dividend Allowances

**Personal Savings Allowance:**
- Basic rate taxpayers: £1,000 tax-free interest [^11^][^14^]
- Higher rate taxpayers: £500
- Additional rate taxpayers: £0

**Starting Rate for Savings:**
- £5,000 at 0% for those with low non-savings income
- Reduced by £1 for every £1 of non-savings income above Personal Allowance
- Fully eroded when non-savings income reaches £17,570 [^21^]

**Dividend Allowance:** £500 tax-free [^14^]
- Basic rate: 8.75% on dividends above £500
- Higher rate: 33.75%
- Additional rate: 39.35%

### 2.7 Other Allowances & Reliefs

**Marriage Allowance:**
- Transfer £1,260 of unused Personal Allowance to spouse/civil partner
- Recipient must be basic rate taxpayer
- Worth up to £252/year tax saving [^10^][^14^]
- Giver must earn below £12,570

**Blind Person's Allowance:** £3,130 (adds to Personal Allowance) [^16^]

**Rent-a-Room Relief:** £7,500 if letting furnished room in own home

**Property Allowance & Trading Allowance:** £1,000 each (for small income)

**Gift Aid:**
- Donations to charity: basic rate relief claimed by charity
- Higher/additional rate relief claimed via Self Assessment
- For every £1 donated, charity claims 25p, donor claims extra 20% or 25%

**Professional Subscriptions:** Tax relief if required for job and on HMRC approved list

**Working from Home:** £6/week (£312/year) flat rate if required to work from home

**Mileage Allowance:** 45p/mile first 10,000 miles, 25p thereafter (if employer pays less, claim difference)

### 2.8 Scottish Income Tax (If Applicable)

| Band | Income Range | Rate |
|------|-------------|------|
| Personal Allowance | £0 – £12,570 | 0% |
| Starter Rate | £12,571 – £15,397 | 19% |
| Basic Rate | £15,398 – £27,491 | 20% |
| Intermediate Rate | £27,492 – £43,662 | 21% |
| Higher Rate | £43,663 – £75,000 | 42% |
| Advanced Rate | £75,001 – £125,140 | 45% |
| Top Rate | Over £125,140 | 48% |

**Note:** Dividend and savings income taxed at UK-wide rates, not Scottish rates. [^7^]

### 2.9 High Income Child Benefit Charge (HICBC)

- Applies if either partner earns over £60,000 and receives Child Benefit
- Charge = 1% of Child Benefit for every £200 of income between £60,000-£80,000
- At £80,000+, charge = 100% of Child Benefit received
- Can be avoided if adjusted net income reduced below £60,000 via pension contributions [^9^]

### 2.10 Key Formulas

**Adjusted Net Income** (for taper calculations):
```
Adjusted Net Income = Total Income - Pension Contributions (gross) - Gift Aid donations
```

**Income Tax Calculation:**
```
1. Calculate taxable income: Gross Income - Personal Allowance - Allowable Deductions
2. Apply to tax bands progressively
3. Add dividend tax if applicable
4. Subtract tax reliefs (Marriage Allowance credit, etc.)
```

**NIC Calculation (Simplified Annual):**
```
Annual NIC = 0% on first £12,570
           + 8% on amount between £12,570 and £50,270
           + 2% on amount above £50,270
```

**Effective Tax Rate:**
```
Effective Rate = (Income Tax + NIC) / Gross Income × 100
```

**Take-Home Pay:**
```
Take-Home = Gross Income - Income Tax - NIC - Pension Contributions (net) - Student Loan - Other Deductions
```

---

## 3. App Architecture & User Flow

### 3.1 Overall Structure

```
Landing Page → Wizard (5-7 Steps) → Results Page
                    ↓
              Live Preview Panel (Right Side)
                    ↓
              Per-Step FAQ (Bottom)
```

### 3.2 Landing Page Design

**Hero Section:**
- Full viewport height, clean gradient background (soft blue/grey tones)
- Headline: "Find out how much tax you could save"
- Subheadline: "Answer 5 simple questions about your money. We'll show you exactly where you're overpaying tax and how to fix it."
- CTA Button: "Start — Takes 2 minutes" (large, prominent, primary color)
- Trust indicators: "No signup required", "100% private — all in your browser", "Updated for FY 2025-26"

**Preview of Results:**
- Below the fold, show a mockup of the results page
- Side-by-side comparison cards
- "£X saved" badge
- "Here's what you'll get" bullet points:
  - Exact tax breakdown
  - Pension optimization tips
  - ISA recommendations
  - Personalized action plan

**Footer:**
- "Not financial advice. For informational purposes only."
- "Tax year: 2025-26 (England, Wales, Northern Ireland)"
- Link to gov.uk for official rates

### 3.3 Wizard Structure (5 Steps)

#### Step 1: Where Do You Live & Basic Info
**Question:** "Where in the UK do you live?"
- Options: England, Wales, Scotland, Northern Ireland
- Default: England

**Question:** "How old are you?"
- Input: Number field, min 16, max 100
- Purpose: Determines state pension age relevance, Lifetime ISA eligibility

**Question:** "What's your employment status?"
- Options: Full-time employed, Part-time employed, Multiple jobs
- Purpose: Determines if salary sacrifice available, multiple tax codes

**Progress:** Step 1 of 5 — 20%

**FAQ for Step 1:**
- Q: "Why do you need to know where I live?"
  A: "Scotland has different income tax rates. We need to use the right ones for you."
- Q: "What if I work in England but live in Scotland?"
  A: "You pay Scottish Income Tax if Scotland is your main home."

---

#### Step 2: Your Monthly Take-Home Pay
**Question:** "How much lands in your bank account each month after all deductions?"
- Input: Currency field (£), placeholder: "e.g., £2,400"
- Helper text: "This is your net pay — after tax, National Insurance, and pension. Check your payslip or bank statement."

**Question:** "Is this the same every month or does it vary?"
- Options: Same every month, Varies (bonus/commission/overtime)
- If varies: "What's your average monthly take-home over the last 3 months?"

**Reverse Calculation Logic:**
The app must work backwards from net pay to estimate gross salary. This is an approximation but sufficient for planning purposes.

**Algorithm:**
```
1. Start with monthly net pay × 12 = annual net
2. Estimate gross using iterative calculation:
   - Assume gross = net × 1.4 (rough estimate)
   - Calculate tax and NIC on assumed gross
   - Adjust gross until calculated net matches actual net
   - Convergence usually within 5-10 iterations
3. Handle edge cases:
   - If net > £7,500/month, likely additional rate taxpayer
   - If net < £1,000/month, likely part-time or low income
```

**Progress:** Step 2 of 5 — 40%

**FAQ for Step 2:**
- Q: "I don't know my gross salary. Is that okay?"
  A: "Absolutely. Most people know their take-home pay better than their gross salary. We'll work backwards from what you know."
- Q: "My pay changes every month. What should I enter?"
  A: "Use your average over the last 3 months. For bonuses, we'll ask about those separately."
- Q: "Should I include overtime pay?"
  A: "Yes, include everything that lands in your bank account from your job."

---

#### Step 3: Pension & Salary Sacrifice
**Question:** "Does your employer deduct pension from your pay?"
- Options: Yes — auto-enrolment, Yes — I opted in extra, No, Not sure
- If yes: "How much goes into your pension each month?"
  - Input: £ amount OR percentage of salary
  - Helper: "Check your payslip — look for 'Pension' or 'AE'"

**Question:** "Do you contribute to a personal pension or SIPP outside work?"
- Options: Yes, No
- If yes: "How much do you put in each month?"
  - Input: £ amount
  - Helper: "This includes any lump sums you plan to make this tax year"

**Question:** "Does your employer offer salary sacrifice for pension?"
- Options: Yes, No, Not sure
- If yes: "Are you using it?"
  - Options: Yes, No
- If not sure: Show explanation tooltip

**Question:** "Have you ever taken money out of a pension flexibly?"
- Options: Yes, No
- Purpose: Triggers Money Purchase Annual Allowance (£10,000 limit)

**Progress:** Step 3 of 5 — 60%

**FAQ for Step 3:**
- Q: "What's salary sacrifice?"
  A: "You agree to a slightly lower salary, and your employer puts the difference straight into your pension. You save on National Insurance — it's like free money."
- Q: "What's a SIPP?"
  A: "A Self-Invested Personal Pension. It's a pension you control yourself, separate from your workplace one. You get tax relief on contributions."
- Q: "I don't have a pension yet. Is that bad?"
  A: "If you're employed, you should be auto-enrolled. Check your payslip — there should be a pension deduction. If not, ask your employer."
- Q: "What's the Money Purchase Annual Allowance?"
  A: "If you've taken money out of your pension flexibly, your annual contribution limit drops to £10,000. We need to know this to avoid suggesting illegal contributions."

---

#### Step 4: Savings, Investments & Other Income
**Question:** "Do you have money in savings earning interest?"
- Options: Yes, No
- If yes: "Roughly how much interest do you earn per year?"
  - Input: £ amount
  - Helper: "Check your savings account statements or use 4-5% of your balance as estimate"

**Question:** "Do you have a Cash ISA or Stocks & Shares ISA?"
- Options: Yes — Cash ISA, Yes — Stocks & Shares ISA, Yes — both, No
- If yes: "How much do you put in each year?"
  - Input: £ amount
  - Helper: "The annual limit is £20,000 total across all ISAs"

**Question:** "Do you receive dividends from shares outside an ISA?"
- Options: Yes, No
- If yes: "Roughly how much per year?"
  - Input: £ amount

**Question:** "Do you have a partner?"
- Options: Married/Civil partner, Living together, Single
- If married: "Do you or your partner earn less than £12,570/year?"
  - Purpose: Marriage Allowance eligibility

**Question:** "Do you receive Child Benefit and earn over £60,000?"
- Options: Yes, No, Not applicable
- Purpose: High Income Child Benefit Charge

**Progress:** Step 4 of 5 — 80%

**FAQ for Step 4:**
- Q: "Why do you need to know about my savings?"
  A: "If you earn more than £1,000 in interest (or £500 if you're a higher earner), you pay tax on it. An ISA protects you from this."
- Q: "What's the difference between Cash ISA and Stocks & Shares ISA?"
  A: "Cash ISA = savings account, no tax on interest. Stocks & Shares ISA = investments, no tax on dividends or gains. You can have both."
- Q: "What's Marriage Allowance?"
  A: "If one partner earns under £12,570, they can transfer £1,260 of their tax-free allowance to the other partner. Worth up to £252/year."
- Q: "What's the High Income Child Benefit Charge?"
  A: "If you earn over £60,000 and get Child Benefit, you might have to pay some or all of it back. Pension contributions can reduce your income below this threshold."

---

#### Step 5: Deductions & Expenses
**Question:** "Do you pay for anything work-related that your employer doesn't cover?"
- Checkboxes:
  - Professional subscriptions (e.g., union fees, professional body memberships)
  - Work from home (required by employer)
  - Mileage for work travel (employer pays less than 45p/mile)
  - Uniform or specialist clothing
  - Other tools/equipment
- For each selected: "Roughly how much per year?"

**Question:** "Do you make charitable donations through Gift Aid?"
- Options: Yes, No
- If yes: "Roughly how much per year?"
  - Input: £ amount

**Question:** "Do you have a student loan?"
- Options: Plan 1, Plan 2, Plan 4 (Scotland), Postgraduate, No
- Purpose: Student loan repayments affect take-home but not tax

**Question:** "Any other monthly deductions from your pay?"
- Text area: "e.g., cycle to work scheme, childcare vouchers, private medical insurance"
- Purpose: Adjust gross salary estimate

**Progress:** Step 5 of 5 — 100%

**FAQ for Step 5:**
- Q: "Can I claim tax relief on work expenses?"
  A: "Yes, for things you MUST buy for work and use yourself. Not for commuting or everyday clothes."
- Q: "What's Gift Aid?"
  A: "When you donate to charity, they claim basic rate tax back from HMRC. If you're a higher earner, you can claim extra relief too."
- Q: "Do student loans affect my tax?"
  A: "No, they're not tax. But they are deducted from your pay, so we include them to show your true take-home."

---

### 3.4 Live Preview Panel (Right Side)

**Position:** Fixed right panel on desktop, collapsible bottom sheet on mobile
**Updates:** Real-time after each question

**Panel Contents:**

1. **Estimated Gross Salary** (derived from net)
   - Show calculation: "Based on your £X/month take-home, we estimate your gross salary is approximately £Y/year"
   - Note: "This is an estimate — your actual gross may vary slightly"

2. **Tax Breakdown Table**

   | Component | Amount | Rate |
   |-----------|--------|------|
   | Gross Salary | £X | — |
   | Personal Allowance | -£12,570 | 0% |
   | Taxable Income | £Y | — |
   | Basic Rate Tax | £A | 20% |
   | Higher Rate Tax | £B | 40% |
   | Additional Rate Tax | £C | 45% |
   | **Total Income Tax** | **£D** | — |
   | Employee NIC | £E | 8% / 2% |
   | **Total Tax + NIC** | **£F** | — |
   | Effective Tax Rate | X% | — |

3. **Current vs Optimized Comparison**

   | Scenario | Take-Home | Tax Paid | You Keep |
   |----------|-----------|----------|----------|
   | Current (estimated) | £X | £Y | Z% |
   | Optimized | £X+Δ | £Y-Δ | Z+% |
   | **You could save** | **£Δ/year** | | |

4. **Slab Visualization**
   - Horizontal bar chart showing income distribution across tax bands
   - Color-coded: Green (tax-free), Blue (20%), Orange (40%), Red (45%)
   - NIC overlay as dotted line

5. **Pension Impact**
   - "If you put £X more into pension: Save £Y in tax, get £Z from government"
   - Show relief at source vs net pay vs salary sacrifice comparison

**Update Rules:**
- After Step 2: Show basic tax estimate
- After Step 3: Add pension relief calculations
- After Step 4: Add savings/dividend tax, marriage allowance
- After Step 5: Final optimization suggestions

---

## 4. Results Page

### 4.1 Hero Result

**Main Message:**
- "You could save £[X] per year"
- Subtitle: "Here's exactly how, and what to do next"
- Visual: Large green badge with savings amount

**Regime Comparison Cards:**

| | Current Path | Optimized Path |
|---|---|---|
| **Take-Home Pay** | £X/month | £(X+Δ)/month |
| **Tax Paid** | £Y/year | £(Y-Δ)/year |
| **Effective Rate** | X% | Y% |
| **Pension Contribution** | £A | £B (recommended) |
| **ISA Utilization** | £C | £D (recommended) |

### 4.2 Detailed Breakdown

**Section 1: Where Your Money Goes (Pie Chart)**
- Gross Salary: 100%
- Income Tax: X%
- National Insurance: Y%
- Pension: Z%
- Student Loan: A%
- Take-Home: B%

**Section 2: Tax Slab Breakdown**

| Band | Income in Band | Tax Rate | Tax Paid |
|------|---------------|----------|----------|
| Personal Allowance | £12,570 | 0% | £0 |
| Basic Rate | £37,700 | 20% | £7,540 |
| Higher Rate | £X | 40% | £Y |
| Additional Rate | £Z | 45% | £W |
| **Total** | | | **£Total** |

**NIC Breakdown:**

| Band | Earnings | Rate | NIC Paid |
|------|----------|------|----------|
| Below PT | £12,570 | 0% | £0 |
| Main Rate | £37,700 | 8% | £3,016 |
| Upper Rate | £X | 2% | £Y |
| **Total NIC** | | | **£Total** |

### 4.3 Personalized Education Section

**"How Your Answers Affected Your Tax"**

For each user input, explain the tax impact:

1. **Your Location:** "You live in [England/Scotland], so we used [X] tax bands. Scottish taxpayers pay slightly more on middle incomes."

2. **Your Pension:** "You contribute £X/month to your pension. This reduces your taxable income by £Y, saving you £Z in tax. If you used salary sacrifice, you'd also save £W in National Insurance."

3. **Your Savings:** "You earn £X in interest. As a [basic/higher] rate taxpayer, your personal savings allowance covers £Y of this. The remaining £Z is taxed at [20/40/45]%. A Cash ISA would protect all of it."

4. **Marriage Allowance:** "You [are/are not] eligible for Marriage Allowance. [If eligible: Transferring £1,260 to your partner would save you £252/year.]"

5. **Child Benefit:** "You earn £X. [If over £60k: You're in the High Income Child Benefit Charge zone. Pension contributions could bring you below this threshold.]"

### 4.4 Actionable Suggestions

**Ranked by Impact (Highest to Lowest):**

1. **Pension Optimization:**
   - "Increase pension contribution by £X/month"
   - "Tax saved: £Y/year"
   - "If your employer offers salary sacrifice: Extra NI saving of £Z/year"
   - "Note: Don't exceed £60,000 annual limit (or £10,000 if you've flexibly accessed pension)"

2. **ISA Utilization:**
   - "You have £X of ISA allowance remaining"
   - "Move £Y from savings to Cash ISA: Save £Z in tax on interest"
   - "Consider Stocks & Shares ISA for dividends"

3. **Marriage Allowance:**
   - "Apply for Marriage Allowance at gov.uk"
   - "Worth £252/year, backdateable 4 years"

4. **SIPP for Higher Earners:**
   - "If you're a higher rate taxpayer, a SIPP gives you 40% tax relief"
   - "£800 contribution costs you only £480 after higher rate relief"

5. **Gift Aid:**
   - "If you donate £X through Gift Aid, claim extra £Y relief via Self Assessment"

6. **Work Expenses:**
   - "Claim tax relief on £X of work expenses"
   - "Apply at gov.uk or via Self Assessment"

7. **Salary Sacrifice (if not using):**
   - "Ask your employer about salary sacrifice pension"
   - "Potential saving: £X/year in National Insurance"

### 4.5 Warnings & Caveats

- "These figures are estimates based on your inputs. Actual tax depends on your full circumstances."
- "Scottish taxpayers: Dividend and savings tax uses UK rates, not Scottish rates."
- "If you earn over £100,000, your Personal Allowance tapers — we accounted for this."
- "Pension annual allowance may taper for incomes over £260,000."
- "This is not financial advice. Consider speaking to a financial adviser for complex situations."

---

## 5. UI/UX Specifications

### 5.1 Design System

**Colors:**
- Primary: #2563EB (Trust blue)
- Success/Savings: #10B981 (Green)
- Warning: #F59E0B (Amber)
- Danger/High Tax: #EF4444 (Red)
- Background: #F8FAFC (Cool grey)
- Card Background: #FFFFFF
- Text Primary: #1E293B
- Text Secondary: #64748B
- Border: #E2E8F0

**Typography:**
- Headlines: Inter, 32-48px, weight 700
- Body: Inter, 16-18px, weight 400
- Labels: Inter, 14px, weight 500
- Mono (for numbers): SF Mono or JetBrains Mono

**Spacing:**
- Base unit: 8px
- Section padding: 48px (desktop), 24px (mobile)
- Card padding: 24px
- Input height: 48px
- Button height: 56px (primary), 48px (secondary)

**Border Radius:**
- Cards: 16px
- Buttons: 12px
- Inputs: 8px
- Badges: 9999px (full round)

**Shadows:**
- Cards: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
- Elevated: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)

### 5.2 Component Specifications

**Wizard Step Container:**
- Max-width: 640px (centered)
- Animation: Slide in from right (300ms ease-out)
- Previous step: Slide out to left

**Question Card:**
- White background, rounded corners
- Question text: 24px, bold
- Input field: Full width, large touch target
- Helper text: 14px, grey, below input
- "Why we ask this" tooltip: Small info icon, expands on hover/click

**Progress Indicator:**
- Top of wizard, sticky
- 5 dots, connected by line
- Current: Filled primary color
- Completed: Filled with checkmark
- Upcoming: Empty grey
- Mobile: Progress bar (0-100%) instead of dots

**Live Preview Panel:**
- Desktop: Fixed right, 400px wide, scrollable
- Mobile: Bottom sheet, draggable handle, collapsible
- Updates with smooth number transitions (count-up animation)
- Background: Slightly darker than main (#F1F5F9)

**FAQ Accordion:**
- Bottom of each step
- "Common questions about this step"
- Expand/collapse with chevron icon
- Max 4 questions per step

**CTA Buttons:**
- Primary: "Continue" — Full width, blue, white text
- Secondary: "Back" — Outline, grey
- Tertiary: "Skip this question" — Text only, small

### 5.3 Responsive Breakpoints

- Mobile: < 640px (single column, bottom sheet preview)
- Tablet: 640-1024px (wizard centered, preview below)
- Desktop: > 1024px (wizard left 60%, preview right 40%)

### 5.4 Animations & Micro-interactions

- Page transitions: 300ms fade + slight translateY
- Number updates: 500ms count-up animation
- Button hover: Scale 1.02, shadow increase
- Input focus: Border color change + subtle glow
- Card hover: Slight lift (translateY -2px)
- Progress dot completion: Pulse animation + checkmark draw
- Savings reveal: Confetti-like particle burst (subtle, CSS-only)

### 5.5 Accessibility

- WCAG 2.1 AA compliance
- All inputs have associated labels
- Color contrast ratios: 4.5:1 minimum
- Keyboard navigation: Tab order logical, Enter to submit
- Screen reader: ARIA labels on all interactive elements
- Reduced motion: Respect `prefers-reduced-motion`
- Focus indicators: Visible, high contrast

---

## 6. Technical Specifications

### 6.1 Architecture

**Frontend Only:**
- Framework: React 18+ (or Vue 3 / Svelte)
- State Management: React Context + useReducer (or Zustand)
- Styling: Tailwind CSS + custom design tokens
- Animations: Framer Motion (React) or GSAP
- Charts: Recharts or Chart.js
- No backend, no API calls, no database

**Data Storage:**
- All user inputs stored in component state only
- No localStorage, no cookies, no tracking
- On refresh: Data lost (by design — privacy first)

### 6.2 Tax Calculation Engine

**Core Module:** `taxEngine.js`

```javascript
// Key functions
function estimateGrossFromNet(netMonthly, options) {
  // Iterative binary search to find gross that produces given net
  // Handles pension, student loan, NIC, income tax
}

function calculateIncomeTax(grossSalary, options) {
  // Apply personal allowance (with taper if >£100k)
  // Apply Scottish or UK bands
  // Calculate band-by-band tax
  // Return breakdown object
}

function calculateNIC(grossSalary, options) {
  // Annualized Class 1 NIC calculation
  // Handle multiple jobs caveat
  // Return breakdown
}

function calculatePensionRelief(contribution, method, taxBand) {
  // Relief at source: basic rate automatic, higher rate via SA
  // Net pay: immediate marginal rate relief
  // Salary sacrifice: NI savings calculation
}

function calculateOptimizedScenario(currentInputs) {
  // Run multiple scenarios:
  // 1. Max pension contribution (up to allowance)
  // 2. ISA utilization
  // 3. Marriage allowance
  // 4. Gift Aid optimization
  // Return best combination
}

function calculateTakeHome(gross, tax, nic, pension, studentLoan, other) {
  // Final take-home calculation
}
```

**Edge Cases to Handle:**
- Personal Allowance taper (£100k-£125,140)
- Scottish tax bands
- Tapered Annual Allowance (£260k+ adjusted income)
- Money Purchase Annual Allowance (£10k)
- Starting rate for savings (low income)
- Dividend allowance stacking
- Marriage Allowance eligibility
- HICBC threshold
- Student loan plans (different thresholds)
- National Minimum Wage floor for salary sacrifice
- Blind Person's Allowance

### 6.3 Validation Rules

**Input Validation:**
- All currency fields: £0 to £9,999,999
- Percentage fields: 0% to 100%
- Age: 16 to 100
- Pension contributions: Cannot exceed 100% of estimated gross
- ISA contributions: Cannot exceed £20,000
- Salary sacrifice: Cannot reduce salary below NMW (£11.44/hour × hours)

**Cross-Field Validation:**
- If "flexibly accessed pension" = yes, cap pension suggestions at £10,000
- If location = Scotland, use Scottish bands for non-savings/dividend income
- If income > £100,000, show Personal Allowance taper warning
- If income > £260,000 adjusted, show tapered annual allowance warning

### 6.4 Performance

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse score: > 90
- Bundle size: < 200KB gzipped
- Tax calculations: < 50ms (non-blocking)

---

## 7. Content & Copy

### 7.1 Tone of Voice

- Friendly but authoritative
- No jargon without explanation
- "You" not "User"
- Active voice
- Short sentences
- Encouraging, not alarmist

### 7.2 Key Messages

**Landing Page:**
- "Find out how much tax you could save"
- "No forms. No signups. No data collection."
- "Takes 2 minutes. Completely private."
- "Built for the 2025-26 tax year."

**Wizard:**
- "Let's start with what you know"
- "How much lands in your bank each month?"
- "Does your company take pension money?"
- "Any savings earning interest?"

**Results:**
- "You could save £X per year"
- "Here's exactly how"
- "Pick this: [Recommendation]"
- "Why this works for you"

### 7.3 Error Messages

- "Please enter a number" (empty field)
- "That seems high — are you sure?" (suspicious input)
- "This can't be more than your take-home pay" (logic error)
- "Please select an option" (unanswered required)

---

## 8. Edge Cases & Special Scenarios

### 8.1 High Earners (£100k+)

**Personal Allowance Taper Zone (£100k-£125,140):**
- Effective tax rate in this zone: 60% (40% tax + loss of allowance)
- Critical optimization zone: Pension contributions extremely valuable
- Show warning: "Every £2 you earn here costs you £1 of tax-free allowance"
- Suggest: "A £X pension contribution could save you £Y in tax AND restore £Z of personal allowance"

**Additional Rate (£125,140+):**
- No Personal Allowance
- 45% tax rate
- £0 Personal Savings Allowance
- £0 Starting Rate for Savings
- ISA becomes critical
- SIPP very attractive (45% relief)

### 8.2 Low Earners (< £12,570)

- No income tax
- May still pay NIC if earning > £6,500/year
- Pension relief at source still gets basic rate relief even with no tax liability
- Marriage Allowance: Can GIVE allowance but not receive
- Starting Rate for Savings: Full £5,000 available

### 8.3 Multiple Jobs

- Each job has separate tax code
- May have unused Personal Allowance in one job
- NIC calculated per job (not aggregated — potential underpayment)
- Show warning: "You have multiple jobs — your actual tax may differ. Consider asking HMRC to split your tax code."

### 8.4 Scottish Taxpayers

- Use Scottish bands for employment/pension income
- Use UK bands for savings/dividend income
- Show both calculations clearly
- Note: "Scottish rates apply to your salary, UK rates to your savings interest"

### 8.5 Salary Sacrifice Constraints

- Cannot reduce below National Minimum Wage (£11.44/hour for 23+)
- Must be contractual change (not just payroll adjustment)
- Affects other benefits (mortgage applications may use lower salary)
- Show warning: "Salary sacrifice reduces your official salary — consider this if applying for a mortgage soon"

### 8.6 Pension Annual Allowance Taper

- Only relevant if Adjusted Income > £260,000
- Show warning if user indicates high income + large pension contributions
- Suggest: "Your pension contributions may exceed your tapered annual allowance. Consider carry forward from previous years."

### 8.7 Student Loans

**Plan 1:** Repay 9% on income > £24,990/year
**Plan 2:** Repay 9% on income > £27,295/year
**Plan 4 (Scotland):** Repay 9% on income > £31,395/year
**Postgraduate:** Repay 6% on income > £21,000/year

- Student loans deducted from pay but NOT tax
- Show separately in results
- Do not include in "tax saved" calculations

---

## 9. Compliance & Legal

### 9.1 Disclaimers

**Required on every page:**
- "This calculator provides estimates only. It is not financial advice."
- "Tax rules are complex. For personalized advice, speak to a qualified financial adviser or accountant."
- "We use the official HMRC rates for 2025-26. Rates may change in future years."

**Results page additional:**
- "Your actual tax liability depends on your complete circumstances, including any untaxed income, benefits in kind, or other factors not captured here."
- "Pension and ISA rules have limits and conditions. Ensure you understand these before acting."

### 9.2 Privacy

**Privacy-first claims must be verifiable:**
- No cookies set
- No localStorage usage
- No analytics scripts (or if used, clearly disclosed and optional)
- No external API calls for tax calculations
- All computation in browser
- "We don't see your data. We don't want your data."

### 9.3 Accessibility Statement

- "This tool is designed to be accessible to everyone."
- "If you have difficulty using it, please [contact method]."
- WCAG 2.1 AA compliance target

---

## 10. Success Metrics

### 10.1 User Experience

- Completion rate: > 70% of starters finish all steps
- Average time to complete: < 3 minutes
- Return rate: > 30% return to adjust inputs
- Mobile usage: > 50% of sessions

### 10.2 Business (if applicable)

- Social shares: > 10% of completers share results
- Newsletter signups (if offered): > 5% of completers
- Trust indicators: High time-on-page, low bounce rate

### 10.3 Accuracy

- Tax estimates within £200/year of actual liability for 90% of users
- Edge case detection: 100% of high earners shown taper warnings
- No incorrect optimization suggestions (e.g., exceeding annual allowance)

---

## 11. Future Enhancements (Post-MVP)

1. **Previous Year Comparison:** Compare FY 2024-25 vs 2025-26
2. **Self-Employed Mode:** Add Class 2/4 NIC, trading allowance
3. **Capital Gains:** Basic CGT calculator for share sales
4. **Childcare:** Tax-Free Childcare vs childcare vouchers
5. **Inheritance Tax:** Basic IHT planning section
6. **Export:** PDF summary (if user requests)
7. **Save & Return:** Optional localStorage (opt-in only)
8. **Multi-year Planning:** Project next 3 years with frozen thresholds

---

## 12. Appendix: Tax Rate Reference Tables

### 12.1 UK (England, Wales, NI) Income Tax 2025-26

| Band | From | To | Rate |
|------|------|-----|------|
| Personal Allowance | £0 | £12,570 | 0% |
| Basic Rate | £12,571 | £50,270 | 20% |
| Higher Rate | £50,271 | £125,140 | 40% |
| Additional Rate | £125,141 | ∞ | 45% |

### 12.2 Scottish Income Tax 2025-26

| Band | From | To | Rate |
|------|------|-----|------|
| Personal Allowance | £0 | £12,570 | 0% |
| Starter Rate | £12,571 | £15,397 | 19% |
| Basic Rate | £15,398 | £27,491 | 20% |
| Intermediate | £27,492 | £43,662 | 21% |
| Higher Rate | £43,663 | £75,000 | 42% |
| Advanced Rate | £75,001 | £125,140 | 45% |
| Top Rate | £125,141 | ∞ | 48% |

### 12.3 National Insurance 2025-26 (Employee)

| Threshold | Annual | Weekly | Rate |
|-----------|--------|--------|------|
| Lower Earnings Limit | £6,500 | £125 | 0% |
| Primary Threshold | £12,570 | £242 | 0% |
| Upper Earnings Limit | £50,270 | £967 | 8% |
| Above UEL | >£50,270 | >£967 | 2% |

### 12.4 Pension Allowances 2025-26

| Allowance | Amount |
|-----------|--------|
| Annual Allowance | £60,000 |
| Tapered Minimum | £10,000 |
| Money Purchase Annual Allowance | £10,000 |
| Minimum for non-earners | £3,600 (gross) |

### 12.5 ISA Allowances 2025-26

| ISA Type | Limit |
|----------|-------|
| Total ISA | £20,000 |
| Lifetime ISA (within total) | £4,000 |
| Junior ISA | £9,000 |

### 12.6 Savings & Dividend Allowances 2025-26

| Allowance | Basic Rate | Higher Rate | Additional Rate |
|-----------|----------|-------------|-----------------|
| Personal Savings Allowance | £1,000 | £500 | £0 |
| Starting Rate for Savings | £5,000* | £5,000* | £5,000* |
| Dividend Allowance | £500 | £500 | £500 |

*Starting rate reduced by non-savings income above Personal Allowance

### 12.7 Other Allowances 2025-26

| Allowance | Amount |
|-----------|--------|
| Marriage Allowance | £1,260 (transferable) |
| Blind Person's Allowance | £3,130 |
| Rent-a-Room | £7,500 |
| Property/Trading Allowance | £1,000 each |
| Gift Aid (basic rate relief) | 25% of donation |

---

## 13. Glossary (For User-Facing Content)

**Auto-enrolment:** The law requiring employers to put eligible staff into a workplace pension.
**Basic Rate:** 20% tax band for income between £12,571-£50,270.
**Dividend:** Money companies pay to shareholders from profits.
**Gift Aid:** Scheme where charities claim tax back on your donations.
**Gross Salary:** Your total pay before any deductions.
**Higher Rate:** 40% tax band for income between £50,271-£125,140.
**ISA:** Individual Savings Account — tax-free wrapper for savings/investments.
**National Insurance (NIC):** Tax on earnings that funds state benefits.
**Net Pay:** Your take-home pay after all deductions.
**Personal Allowance:** £12,570 you can earn tax-free each year.
**Pension Relief:** Tax back from the government when you pay into a pension.
**Salary Sacrifice:** Agreeing to lower salary in exchange for employer benefits (like pension).
**SIPP:** Self-Invested Personal Pension — a pension you manage yourself.
**Tax Band:** Range of income taxed at a specific rate.
**Tax Code:** HMRC code telling your employer how much tax to deduct.
**Tax Year:** 6 April to 5 April the following year.

---

**Document End**

*This PRD is designed to be handed to any developer or AI coding tool to build the complete application from scratch. All tax figures, thresholds, and rules are verified against official HMRC and government sources for FY 2025-26.*
