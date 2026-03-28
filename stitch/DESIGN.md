```markdown
# Design System Documentation: Industrial Premium

## 1. Overview & Creative North Star
### The Creative North Star: "The Kinetic Monolith"
This design system is built to bridge the gap between heavy-industry reliability and cutting-edge artificial intelligence. It draws inspiration from the precision of aerospace engineering and the ethereal fluidity of high-compute neural networks. 

To move beyond the "SaaS template" look, we employ **Kinetic Layouts**. This means breaking the rigid 12-column grid with intentional asymmetry—large, bold typography scales offset by expansive negative space. Elements should feel like they are "machined" out of a single block of digital matter, using overlapping layers and glassmorphism to create a sense of three-dimensional depth.

---

## 2. Colors & Surface Architecture
Our palette is rooted in the "Deep Space" spectrum, utilizing high-contrast accents to guide the eye through complex hardware data.

### Surface Hierarchy & Nesting
We reject the flat UI. We treat the interface as a physical object with varying depths.
- **Base Layer:** `surface` (#0b1326) is the bedrock.
- **Nesting Logic:** Instead of using borders to define sections, use the `surface-container` tiers. A `surface-container-low` section should sit on the `surface` background. To highlight a specific module within that section, use `surface-container-high`.
- **The "No-Line" Rule:** 1px solid borders for sectioning are strictly prohibited. Boundaries are defined solely through background color shifts or subtle tonal transitions.

### The "Glass & Gradient" Rule
To achieve the "Tesla meets OpenAI" aesthetic, floating panels (modals, dropdowns, navigation) must use **Glassmorphism**.
- **Recipe:** Use `surface-container-highest` at 60% opacity with a `20px` to `40px` backdrop-blur.
- **Signature Textures:** For primary CTAs, do not use a flat color. Apply a linear gradient from `primary` (#ffb693) to `primary_container` (#ff6b00) at a 135-degree angle. This adds "soul" and a metallic sheen to the industrial components.

---

## 3. Typography
The typography system uses a dual-font approach to balance technical precision with modern editorial flair.

*   **Display & Headlines (Space Grotesk):** This is our "Industrial" voice. It is wide, bold, and authoritative. Use `display-lg` (3.5rem) for hero sections to create an immediate impact.
*   **Body & Labels (Inter):** This is our "Intelligence" voice. Inter provides maximum legibility for technical specifications and data-heavy interfaces.

**Typographic Intent:** Always lead with a massive headline, but allow the body copy to breathe with generous line heights (1.5x - 1.6x) and ample tracking (letter-spacing: -0.01em for headers, +0.01em for labels).

---

## 4. Elevation & Depth
Depth is a functional tool, not a decoration. We use **Tonal Layering** to convey hierarchy.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift. This mimics the way light interacts with recessed or extruded hardware parts.
*   **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    *   *Shadow Token:* `0px 24px 48px rgba(6, 14, 32, 0.4)`. 
    *   The shadow should never be pure black; it must be a deeper tint of the `surface` color.
*   **The "Ghost Border" Fallback:** If a container lacks contrast against its background, use a "Ghost Border." Apply the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Industrial Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`). `0.25rem` (DEFAULT) radius. On hover, apply a `primary_fixed` outer glow (4px blur).
*   **Secondary:** Ghost style. `outline` color for text and border (at 20% opacity). On hover, fill with `surface_container_high`.
*   **Tertiary:** All-caps `label-md` text with a `primary` color. No container.

### Sleek Cards & Lists
*   **The Divider Rule:** Forbid the use of divider lines in lists. Use `1.4rem` (Spacing 4) of vertical white space or a subtle shift to `surface_container_low` for alternating rows.
*   **Cards:** Use `surface_container` with a `0.5rem` (lg) corner radius. Content should be padded using the `Spacing 6` (2rem) token for an editorial, high-end feel.

### Glassmorphism Inputs
*   **Text Fields:** Use a semi-transparent `surface_variant` background. The active state should not change the border color to a thick line; instead, increase the backdrop-blur intensity and change the `outline` opacity to 50%.

### Additional Hardware Components
*   **Status Orbs:** Use `secondary` (Trust Green) for "System Online" indicators, utilizing a pulsing animation with a `secondary_container` outer glow to simulate a physical LED.
*   **Data telemetry chips:** Small, high-contrast badges using `tertiary_container` to highlight real-time hardware metrics.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Align a large `display-md` headline to the left and leave the right 40% of the screen empty or occupied by a high-fidelity hardware render.
*   **Use Tonal Shifts:** Transition from `surface` to `surface_container_low` to indicate a new section of the page.
*   **Micro-interactions:** Ensure every button has a slight "compression" effect (scale: 0.98) when clicked to mimic industrial haptics.

### Don't:
*   **Don't use 1px borders:** They make the UI look like a legacy software application.
*   **Don't crowd the content:** If a section feels "busy," double the spacing using the `20` (7rem) or `24` (8.5rem) tokens.
*   **Don't use pure black:** Use `surface_container_lowest` (#060e20) for the deepest shadows to maintain the "Deep Space Blue" tonal integrity.
*   **Don't use standard icons:** Opt for ultra-thin (1pt to 1.5pt) stroke icons to match the precision of the Inter typeface.