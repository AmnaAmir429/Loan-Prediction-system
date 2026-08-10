---
name: Azure Logic
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#434655'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#585f67'
  on-secondary: '#ffffff'
  secondary-container: '#dce3ec'
  on-secondary-container: '#5e656d'
  tertiary: '#0051b1'
  on-tertiary: '#ffffff'
  tertiary-container: '#0f69dc'
  on-tertiary-container: '#edf0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dce3ec'
  secondary-fixed-dim: '#c0c7d0'
  on-secondary-fixed: '#151c23'
  on-secondary-fixed-variant: '#40484f'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

This design system is engineered for a fintech environment that balances high-stakes financial data with advanced machine learning predictions. The brand personality is authoritative yet transparent, aimed at users who require clarity in complex decision-making processes. 

The aesthetic is **Modern Corporate with Glassmorphic accents**, utilizing a "layered intelligence" approach. It features high-fidelity surfaces that feel premium and precise, characteristic of a top-tier university research project evolved into a commercial dashboard. The emotional response should be one of confidence, reliability, and technological sophistication.

## Colors

The palette is centered on a "Trust Blue" foundation, optimized for a clean, professional banking environment.

- **Primary (#2563EB):** Used for primary actions, success indicators, and core brand moments.
- **Surface/Light Blue (#EFF6FF):** Used for background fills and subtle section grouping to reduce visual fatigue.
- **Slate Gray (#334155):** The primary color for typography and iconography, ensuring high legibility and a grounded feel.
- **Gradients:** Use linear gradients from Primary Blue to Tertiary Blue at 135 degrees for active states and hero progress indicators.

## Typography

This design system utilizes **Inter** exclusively to maintain a systematic, utilitarian aesthetic that excels in data-dense environments. 

- **Scale:** Use tight line-heights for headlines to create a compact, "dashboard" feel. 
- **Hierarchy:** Use Slate Gray for body text, but transition to the Primary Blue for interactive labels or highlighted data points.
- **Numerical Data:** For loan amounts and percentages, ensure the use of tabular spacing (tnum) if available to keep columns aligned.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop dashboards to ensure data visualization remains consistent across ultra-wide monitors.

- **Desktop:** 12-column grid with a 1280px max-width.
- **Tablet:** 8-column fluid grid with 24px margins.
- **Mobile:** 4-column fluid grid with 16px margins.
- **Philosophy:** Use generous white space (stack-lg) between major sections (e.g., Input Form vs. Prediction Result) to prevent the "form-heavy" fatigue common in banking apps.

## Elevation & Depth

This design system uses a combination of **Glassmorphism** and **Ambient Shadows** to create a multi-dimensional workspace.

- **Background:** A soft gradient background (White to Light Blue) provides the base.
- **Cards:** Use a semi-transparent white fill (opacity 80%) with a `backdrop-filter: blur(12px)`.
- **Shadows:** Apply "Extra Large" (xl) diffused shadows. Shadows should be tinted with the Primary Blue (e.g., `rgba(37, 99, 235, 0.08)`) rather than pure black to maintain the clean, airy aesthetic.
- **Borders:** Use a 1px solid border on glass cards with a very low opacity (10% White) to simulate a light-catching edge.

## Shapes

The design system employs a **Rounded** language to soften the clinical nature of financial data.

- **Base Radius:** 0.5rem (8px) for small components like checkboxes and tags.
- **Container Radius:** 1.5rem (24px) for cards and main dashboard panels to create a friendly, modern "app-like" feel.
- **Buttons:** Fully rounded (Pill-shaped) for primary actions to distinguish them from data containers.

## Components

### Input Fields
Inputs are modern and minimalist. Use a White background with a 1px Light Blue border. On focus, the border transitions to Primary Blue with a subtle outer glow. Icons (e.g., currency symbols, user profile) should be placed on the left, rendered in Slate Gray at 70% opacity.

### Stylish Cards
Main containers for the "Loan Predictor" results. These must utilize the glassmorphism effect. For the "Approval Probability" card, use a subtle inner glow and a Primary Blue accent bar at the top or left edge.

### Circular Progress Indicators
Used to show ML confidence scores. Use a thick stroke (8-12px) with the Primary Blue gradient. The background track should be a faint version of Light Blue. Center the percentage using the `headline-lg` typography.

### Accordion-style FAQs
Flat design with no borders between items, only a subtle horizontal divider. Use the "Plus/Minus" icon pattern. The active header should use a Light Blue background to highlight the selected query.

### Buttons
Primary buttons use a solid Primary Blue fill with white text. Secondary buttons use a Light Blue fill with Primary Blue text. All buttons should have a subtle shadow that grows slightly on hover to indicate interactivity.