# UK Tax Optimizer App Execution Plan

This document outlines a phased approach to building the UK Tax Optimizer App based on the PRD. Each phase is scoped to be completed in a single session and ensures the app remains in a runnable, testable state at the end of the phase.

## User Review Required

Please review the proposed phases below. Let me know if you would like to adjust the scope of any phase or if you approve to begin Phase 1.

## Proposed Changes

### Phase 1: Project Setup & Landing Page
**Goal:** Initialize the project and build the static landing page to establish the design language.
- Initialize the frontend project (e.g., using Vite + React) with Tailwind CSS.
- Configure the design system (colors, typography, spacing) as specified in the PRD.
- Build the Landing Page with the Hero section, preview cards, and footer.
- **Runnable State:** You can open the app in your browser, see the fully styled landing page, and verify the responsive layout. The "Start" button will be present but inactive.

### Phase 2: Wizard Shell & State Management
**Goal:** Build the multi-step wizard framework and initial data collection without complex tax logic.
- Implement the global state management (e.g., React Context or Zustand) to store user inputs.
- Build the wizard container, progress indicator, and next/back navigation logic.
- Create the UI for Step 1 (Location & Basic Info) and Step 2 (Monthly Take-Home Pay).
- **Runnable State:** Clicking "Start" on the landing page navigates to the wizard. You can interact with Step 1 and 2, input data, and move back and forth between them. The state is preserved during navigation.

### Phase 3: Core Tax Engine & Live Preview
**Goal:** Introduce the core tax calculation logic and the dynamic preview panel.
- Implement `taxEngine.js` with the reverse-calculation algorithm (Net to Gross) and standard tax bands (Income Tax + NIC).
- Build the Live Preview Panel (Right Side for desktop, Bottom Sheet for mobile).
- Connect Step 1 & 2 inputs to the tax engine so the preview panel updates in real-time.
- **Runnable State:** As you type your net pay in Step 2, the Live Preview Panel appears and dynamically updates to show your estimated gross salary and a basic tax breakdown.

### Phase 4: Wizard Completion & Advanced Logic
**Goal:** Finish the remaining wizard steps and integrate advanced tax rules.
- Build the UI and state connections for Steps 3 (Pension), 4 (Savings/Investments), and 5 (Deductions).
- Expand `taxEngine.js` to handle Scottish tax rates, pension relief types, ISA logic, and personal allowance tapering.
- Ensure the Live Preview updates correctly based on these new inputs.
- **Runnable State:** The full 5-step wizard is navigable. Entering complex scenarios (like salary sacrifice or savings interest) immediately reflects accurate calculations in the Live Preview panel.

### Phase 5: Results Page & Recommendations
**Goal:** Build the final summary view that compares the current path with the optimized path.
- Create the Results Page UI (Savings badge, regime comparison cards, detailed slab breakdown, pie charts).
- Implement the logic to generate the "Optimized Scenario" and personalized actionable suggestions based on the user's answers.
- Wire Step 5's completion to transition to the Results page.
- **Runnable State:** Completing the wizard successfully routes you to a comprehensive Results page showing your exact tax gap, personalized education, and a ranked action plan.

### Phase 6: Polish, Edge Cases & Animations
**Goal:** Finalize the application with micro-interactions, accessibility, and edge-case handling.
- Add Framer Motion animations (page transitions, count-up numbers, card hovers).
- Implement field validation and error messaging (e.g., "That seems high", empty field warnings).
- Add specific edge-case alerts (High Earners taper zone, High Income Child Benefit Charge).
- Verify WCAG accessibility and responsiveness.
- **Runnable State:** A fully polished, production-ready application that gracefully handles errors, looks highly dynamic, and matches the premium design requirements.

## Verification Plan

### Manual Verification
- After each phase, we will run the development server (`npm run dev`) and use the browser tool to visually inspect the app and interact with it.
- We will verify that there are no blocking errors and the UI matches the phase's "Runnable State" criteria before moving on to the next phase.
