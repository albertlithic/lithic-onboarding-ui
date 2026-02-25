# Lithic Onboarding UI — Design System Reference

> For use by agents building new components in this codebase.

---

## 1. Stack & Tooling

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| Framework    | React (Vite)                    |
| Language     | TypeScript                      |
| Styling      | Tailwind CSS (utility classes)  |
| Class merge  | `clsx`                          |
| Icons        | Inline SVG (no icon library)    |
| Theme        | Dark-only (no light mode)       |
| Config       | `tailwind.config.js` — default theme, no custom tokens |

All colors are hardcoded hex values in Tailwind classes (e.g. `bg-[#222222]`). There are no CSS custom properties or design-token files.

---

## 2. Color Palette

### Backgrounds

| Token name (semantic)  | Hex         | Usage                                              |
| ---------------------- | ----------- | -------------------------------------------------- |
| `bg-app`               | `#1A1A1A`   | Page/body background, header background            |
| `bg-surface`           | `#222222`   | Cards, inputs, dropdowns, file uploads             |
| `bg-surface-hover`     | `#2A2A2A`   | Hover state for cards and interactive surfaces      |
| `bg-elevated`          | `#333333`   | Secondary buttons, numbered badges                 |
| `bg-elevated-hover`    | `#3D3D3D`   | Hover for secondary buttons                        |
| `bg-control`           | `#444444`   | Primary buttons                                    |
| `bg-control-hover`     | `#505050`   | Hover for primary buttons                          |

### Text

| Token name (semantic)  | Hex         | Usage                                              |
| ---------------------- | ----------- | -------------------------------------------------- |
| `text-primary`         | `#F0F0F0`   | Headings, body text, labels, button text            |
| `text-secondary`       | `#AAAAAA`   | Descriptions, helper text, placeholders, icons      |
| `text-placeholder`     | `#707070`   | Input placeholder text                             |

### Accent & Semantic

| Token name (semantic)  | Hex         | Usage                                              |
| ---------------------- | ----------- | -------------------------------------------------- |
| `accent`               | `#7F94FF`   | Focus rings, active radio borders, links, progress bar, phase label |
| `accent-solid`         | `#3F54BF`   | Checked checkboxes, completed indicators, filled states |

### Borders

| Token name (semantic)  | Hex         | Usage                                              |
| ---------------------- | ----------- | -------------------------------------------------- |
| `border-default`       | `#2A2A2A`   | Header bottom border, subtle dividers              |
| `border-strong`        | `#444444`   | Dashed upload borders, inactive radio borders, progress bar track |

---

## 3. Typography

### Font Families

```
Display / Headings:  font-family: 'ABC Monument Grotesk', 'DM Sans', sans-serif
Body / Controls:     Tailwind default (system sans-serif)
```

Monument Grotesk is applied via inline `style` prop — not a Tailwind class:
```tsx
style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}
```

### Scale

| Role              | Tailwind class          | Weight          | Used for                          |
| ----------------- | ----------------------- | --------------- | --------------------------------- |
| Page title        | `text-2xl`              | `font-medium`   | Screen headings (Monument Grotesk) |
| Section title     | `text-lg`               | `font-medium`   | Header "Onboarding" title (Monument Grotesk) |
| Card title        | `text-sm`               | `font-semibold`  | SectionCard title (Monument Grotesk) |
| Label             | `text-sm`               | `font-semibold`  | Form field labels                 |
| Body              | `text-sm`               | `font-medium`    | Inputs, checkbox labels, button text |
| Helper text       | `text-sm`               | (default)        | Descriptions, helper text         |
| Caption           | `text-xs`               | (default)        | Card descriptions, progress counts |

### Line Height

- `leading-relaxed` (1.625) — used on body descriptions and helper text
- Default (1.5) — everywhere else

---

## 4. Spacing & Layout

### Page Structure

```
min-h-screen bg-[#1A1A1A] flex flex-col
├── <Header />                        — h-16, px-8
└── <main>                            — flex-1 flex justify-center py-10 px-4 overflow-y-auto
    └── <div max-w-[400px] w-full>    — content container
        └── screen content
```

- **Max content width**: `max-w-[400px]` (fixed, single-column, centered)
- **Main padding**: `py-10 px-4`
- **Header height**: `h-16` (64px)

### Common Spacing Values

| Pattern                    | Value              |
| -------------------------- | ------------------ |
| Between major sections     | `gap-6` (24px)     |
| Between form fields        | `gap-4` (16px)     |
| Between list items / cards | `gap-3` (12px)     |
| Between inline elements    | `gap-2` (8px)      |
| Label → input              | `gap-1.5` (6px)    |
| Tight inline spacing       | `gap-1` (4px)      |

### Component Sizes

| Element               | Size                |
| --------------------- | ------------------- |
| Button / Input height | `h-10` (40px)       |
| Checkbox / Radio      | `w-4 h-4` (16px)    |
| Status circle         | `w-6 h-6` (24px)    |
| Card padding          | `p-4` (16px)        |
| Button horizontal pad | `px-4` (16px)       |
| Input horizontal pad  | `px-3` (12px)       |

---

## 5. Component Library

All components live at the project root (`*.tsx`) or in `screens/`.

### Button (`Button.tsx`)

```tsx
<Button variant="primary" fullWidth disabled={false} onClick={fn}>
  Label
</Button>
```

| Prop        | Type                                     | Default     |
| ----------- | ---------------------------------------- | ----------- |
| `variant`   | `'primary' \| 'secondary' \| 'ghost'`   | `'primary'` |
| `fullWidth` | `boolean`                                | `false`     |
| Extends     | `ButtonHTMLAttributes<HTMLButtonElement>` |             |

Variant styles:
- **primary**: `bg-[#444444] text-white hover:bg-[#505050]`
- **secondary**: `bg-[#333333] text-[#F0F0F0] hover:bg-[#3D3D3D]`
- **ghost**: `bg-transparent text-[#AAAAAA] hover:text-[#F0F0F0]`

All variants: `h-10 px-4 rounded text-sm font-semibold transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#7F94FF]`

### Input (`Input.tsx`)

```tsx
<Input placeholder="Value" hasDropdown={false} />
```

- `forwardRef` enabled
- Base: `w-full h-10 bg-[#222222] text-[#F0F0F0] text-sm font-medium rounded px-3`
- Focus: `focus:ring-1 focus:ring-[#7F94FF] transition-shadow`
- Placeholder: `placeholder:text-[#707070]`
- `hasDropdown` adds right padding + SVG double-arrow icon

### FormField (`FormField.tsx`)

```tsx
<FormField label="Business name" labelNote="Optional" helperText="As it appears on your EIN.">
  <Input />
</FormField>
```

- Layout: `flex flex-col gap-1.5`
- Label: `text-[#F0F0F0] text-sm font-semibold`
- Label note (right-aligned): `text-[#AAAAAA] text-sm`
- Helper text: `text-[#AAAAAA] text-sm leading-relaxed`

### Checkbox (`Checkbox.tsx`)

```tsx
<Checkbox checked={value} onChange={setter} label="I agree" />
```

- Uses `<button role="checkbox">` for custom styling
- Unchecked: `bg-[#222222]`
- Checked: `bg-[#3F54BF]` with white checkmark SVG
- Label alignment: `flex items-start gap-2.5`, checkbox has `mt-0.5`
- Focus: `focus-visible:ring-2 focus-visible:ring-[#7F94FF]`

### FileUpload (`FileUpload.tsx`)

```tsx
<FileUpload value={file} onChange={setFile} accept=".pdf,.jpg" />
```

- Dashed border: `border border-dashed border-[#444444]`
- Hover: `hover:bg-[#2A2A2A] hover:border-[#7F94FF]`
- Empty state: plus icon + "Click to browse or drag files"
- Filled state: link icon (`#7F94FF`) + file name + remove button
- Supports drag & drop, keyboard activation

### SectionCard (`SectionCard.tsx`)

```tsx
<SectionCard title="..." description="..." isComplete={false} onClick={fn} />
```

- Card: `bg-[#222222] rounded p-4 hover:bg-[#2A2A2A]`
- Left: status circle (24px) — empty `border-[#444444]` or filled `bg-[#3F54BF]` with checkmark
- Center: title (Monument Grotesk, `text-sm font-semibold`) + description (`text-xs text-[#AAAAAA]`)
- Right: chevron SVG (`#AAAAAA`)

### Select (inline pattern, no dedicated component)

```tsx
<select className="w-full h-10 bg-[#222222] text-[#F0F0F0] text-sm font-medium rounded px-3 appearance-none focus:ring-1 focus:ring-[#7F94FF] transition-shadow">
```

Custom dropdown arrow is positioned via SVG overlay or `Input` with `hasDropdown`.

---

## 6. Screen Patterns

### Standard Form Screen

```tsx
<div className="flex flex-col gap-6">
  {/* Title */}
  <h1 className="text-[#F0F0F0] text-2xl font-medium"
      style={{ fontFamily: "'ABC Monument Grotesk', 'DM Sans', sans-serif" }}>
    Screen Title
  </h1>

  {/* Optional description */}
  <p className="text-[#AAAAAA] text-sm leading-relaxed">
    Description text here.
  </p>

  {/* Form fields */}
  <div className="flex flex-col gap-4">
    <FormField label="Field">
      <Input />
    </FormField>
  </div>

  {/* Action */}
  <Button variant="primary" fullWidth onClick={onSave}>
    Save & Return to Checklist
  </Button>
</div>
```

### Hub Screen (PhaseHub)

```tsx
<div className="flex flex-col gap-6">
  <h1 ...>Phase Title</h1>
  <p ...>Description</p>
  <div className="flex flex-col gap-3">
    <SectionCard ... />
  </div>
  <p className="text-[#AAAAAA] text-xs">X of Y sections completed</p>
  <Button variant="primary" fullWidth disabled={!allComplete}>Continue</Button>
</div>
```

### List + Detail Screen (PersonList → PersonDetails)

- List view shows person cards with status badges
- "Add" button: ghost/secondary with plus icon
- Detail view: standard form screen with back navigation via header

---

## 7. Interactive States

| State        | Pattern                                                    |
| ------------ | ---------------------------------------------------------- |
| Hover (bg)   | Lighten one step: `#222222` → `#2A2A2A`, `#444444` → `#505050` |
| Hover (text) | `#AAAAAA` → `#F0F0F0`                                     |
| Focus        | `focus-visible:ring-2 focus-visible:ring-[#7F94FF]` (buttons, cards) |
| Focus        | `focus:ring-1 focus:ring-[#7F94FF]` (inputs)               |
| Disabled     | `disabled:opacity-50`                                      |
| Checked      | `bg-[#3F54BF]` with white checkmark/dot                   |
| Active/Selected | `border-[#7F94FF]` + inner indicator                   |
| Link         | `text-[#7F94FF] underline hover:opacity-80`                |

### Status Indicators

| Status     | Color      | Visual                                   |
| ---------- | ---------- | ---------------------------------------- |
| Pending    | `#444444`  | Empty circle outline                     |
| Invited    | `#7F94FF`  | Blue accent indicator                    |
| Completed  | `#3F54BF`  | Filled circle with white checkmark       |

---

## 8. Transitions

Only lightweight transitions are used — no keyframe animations:

| Property   | Class                           | Usage                     |
| ---------- | ------------------------------- | ------------------------- |
| Colors     | `transition-colors`             | Buttons, cards, text      |
| Shadow     | `transition-shadow`             | Input focus ring          |
| Opacity    | `transition-opacity`            | Link hover                |
| Width      | `transition-all duration-300`   | Progress bar fill only    |

---

## 9. Icon Conventions

- All icons are **inline SVGs** — no icon library or sprite sheet
- Standard stroke style: `strokeWidth="1.5"` `strokeLinecap="round"` `strokeLinejoin="round"`
- Color via `stroke` attribute: `#AAAAAA` (default), `#7F94FF` (active), `white` (on filled bg), or `currentColor` (inherits)
- Common sizes: `8×14` (chevrons), `14×14` (action icons), `12×12` (small icons)
- Icons are placed inside flex containers with `shrink-0`

---

## 10. Conventions for New Components

1. **File placement**: Shared components at project root, screen components in `screens/`
2. **Directive**: Add `'use client';` at top for components with state/interactivity
3. **Props interface**: Define a `ComponentNameProps` interface, extend native HTML attributes when wrapping a native element
4. **Default export**: One component per file, `export default function ComponentName`
5. **Styling**: Tailwind utility classes only — use `clsx` for conditional classes
6. **Colors**: Use the hex values from the palette above — no Tailwind color names (no `bg-gray-800`)
7. **Font**: Apply Monument Grotesk via inline `style` prop on headings only
8. **Focus states**: Always add `focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F94FF]` on interactive elements
9. **Transitions**: Add `transition-colors` on anything with a hover state
10. **No abstractions**: Keep components flat and specific — no premature shared utilities
11. **Accessibility**: Use semantic HTML, `role` attributes, `aria-*` where needed (see Checkbox for pattern)
