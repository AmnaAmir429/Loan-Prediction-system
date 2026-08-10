---
name: Azure Logic Dark
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#bcc7de'
  on-secondary: '#263143'
  secondary-container: '#3e495d'
  on-secondary-container: '#aeb9d0'
  tertiary: '#b9c7e0'
  on-tertiary: '#233144'
  tertiary-container: '#606e84'
  on-tertiary-container: '#eaf0ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system focuses on high-density data management and workflow automation. The personality is precise, technical, and dependable, evoking a "control center" atmosphere. 

The style is **Corporate Modern** with a lean toward **Minimalism**. It prioritizes clarity and functional hierarchy through a dark-themed interface that reduces eye strain during prolonged technical tasks. The interface uses subtle tonal layering rather than aggressive shadows to define structure, maintaining a clean, systematic appearance suitable for enterprise-grade logic building and monitoring.

## Colors
The palette is rooted in a deep midnight blue (`#0f172a`) for the primary application surface, providing a stable, high-contrast foundation. 

- **Primary Surface:** `#0f172a` (Midnight)
- **Container Surfaces:** `#1e293b` (Slate) for secondary areas and `#334155` for interactive states or tertiary nesting.
- **Accent/Action:** `#2563eb` (Azure Blue) is used exclusively for primary calls to action, focus states, and active workflow indicators.
- **Typography:** Pure white (`#ffffff`) is reserved for headings and primary labels to ensure maximum legibility, while light grays (`#cbd5e1`, `#94a3b8`) define secondary information and metadata.

## Typography
This design system utilizes **Inter** across all levels to maintain a systematic and utilitarian feel. The type scale is optimized for high-density information displays.

- **Headlines:** Use a bold weight and slightly tighter letter spacing for a grounded, authoritative look.
- **Body:** Standardized at 14px for the majority of UI controls to maximize screen real estate.
- **Labels:** Uppercase styles are used for section headers and small metadata tags to differentiate from interactive body text.
- **Hierarchy:** Contrast is achieved through weight and color (White vs. Slate-300) rather than drastic size changes.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a base-4 system. For enterprise dashboards, the layout prioritizes a flexible sidebar (240px - 280px) and a main content area that expands to fill the viewport.

- **Grid:** 12-column layout for desktop with 16px gutters.
- **Margins:** 32px on desktop to allow the content "breathe" against the dark background; 16px on mobile.
- **Rhythm:** Spacing between related logic blocks should use `sm` (8px), while spacing between major sections should use `lg` (24px).

## Elevation & Depth
In this dark mode environment, depth is communicated through **Tonal Layers** rather than shadows. 

- **Level 0 (Background):** `#0f172a` (The canvas).
- **Level 1 (Cards/Sidebar):** `#1e293b` (Elevated once).
- **Level 2 (Modals/Popovers):** `#334155` (Elevated twice).
- **Borders:** Surfaces use a 1px solid border of `#334155` to define edges clearly where tonal contrast is subtle.
- **Overlays:** Modals use a 60% opacity black backdrop blur to maintain focus on the top layer.

## Shapes
The design system follows the **ROUND_EIGHT** principle (0.5rem / 8px). This provides a professional yet approachable feel that softens the technical density of the UI.

- **Components:** Buttons, Inputs, and Cards all use `rounded-md` (8px).
- **Nested Elements:** Smaller elements like Tags or Chips may use `rounded-sm` (4px) to maintain visual balance when nested inside larger containers.
- **Selections:** Active states for list items use a full 8px radius background highlight.

## Components
- **Buttons:** Primary buttons use `#2563eb` with white text. Secondary buttons use a transparent background with a `#334155` border.
- **Inputs:** Background set to `#0f172a` with a `#334155` border. On focus, the border shifts to `#2563eb` with a subtle outer glow.
- **Cards:** Use `#1e293b` background with 8px corner radius. Grouping headers within cards should have a subtle bottom border.
- **Chips:** Compact indicators for status; use `#334155` backgrounds with `#cbd5e1` text for neutral states.
- **Lists:** Interactive list items should have a hover state of `#334155` and an active indicator (a 4px vertical bar) of `#2563eb` on the left edge.
- **Logic Nodes:** Specific to this system, nodes in a workflow should be styled as high-contrast cards with distinct icons representing the connector type.