# Oblique UI (`@oblique-ui/react`)

> **Architectural Editorial React Component Library**  
> Built with zero compromise on WAI-ARIA accessibility, sharp geometric design tokens, and full TypeScript precision.

[![npm version](https://img.shields.io/npm/v/@oblique-ui/react.svg?style=flat-square)](https://www.npmjs.com/package/@oblique-ui/react)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

##  Design Philosophy: "Architectural Editorial"

Unlike generic Tailwind/Material/shadcn clones, **Oblique UI** embraces a distinct, high-contrast **Architectural Editorial** design language:

- **Monospaced Numerical Accents**: Numerical indicators, dates, and metrics use precision monospace typography (`JetBrains Mono`).
- **Tactile High-Contrast Borders**: Solid 2px dark framing (`#0f1115`) with warm linen canvas backgrounds (`#fcfbf9`).
- **Sharp Offset Micro-Elevations**: Micro-displacements on click/press states with 2px/4px/6px sharp offset shadows (`box-shadow: 4px 4px 0px #0f1115`).
- **Kinetic Focus System**: Clear 2px focus outlines with 3px ring offsets to ensure maximum contrast and visibility for keyboard-only users.

---

##  Installation

Install via npm, yarn, or pnpm:

```bash
npm install @oblique-ui/react
# or
yarn add @oblique-ui/react
# or
pnpm add @oblique-ui/react
```

### CSS Import

Include the bundled design tokens & global CSS styles at the root of your application (e.g. `main.tsx` or `_app.tsx`):

```tsx
import '@oblique-ui/react/dist/style.css';
```

---

##  Accessibility Compliance

Accessibility is non-negotiable in Oblique UI. Every component strictly follows **WAI-ARIA 1.2** patterns:

| Component | ARIA Roles / Attributes | Keyboard Navigation Features |
| :--- | :--- | :--- |
| **Button** | `aria-busy`, `disabled` | <kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd> |
| **Modal** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby` | Focus trap (<kbd>Tab</kbd>/<kbd>Shift+Tab</kbd>), <kbd>Escape</kbd> to close, restore focus on close |
| **Toast** | `role="status"` / `role="alert"`, `aria-live="polite"` | Auto-dismiss timer, dismiss button with screen reader label |
| **Dropdown** | `role="menu"`, `role="menuitem"`, `aria-haspopup="true"`, `aria-expanded` | <kbd>ArrowUp</kbd>, <kbd>ArrowDown</kbd>, <kbd>Home</kbd>, <kbd>End</kbd>, <kbd>Escape</kbd> |
| **Tabs** | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls` | <kbd>ArrowLeft</kbd>, <kbd>ArrowRight</kbd>, <kbd>Home</kbd>, <kbd>End</kbd> |
| **Tooltip** | `role="tooltip"`, `aria-describedby` | Shown on hover & keyboard <kbd>Focus</kbd>, <kbd>Escape</kbd> to dismiss |
| **DataTable**| `aria-sort="ascending\|descending"`, `aria-label` search | Full keyboard cell selection, sort headers, select checkboxes |
| **DatePicker**| `role="grid"`, `role="row"`, `role="gridcell"`, `aria-selected` | <kbd>ArrowLeft/Right</kbd> (days), <kbd>ArrowUp/Down</kbd> (weeks), <kbd>PageUp/Down</kbd> (months) |
| **Switch** | `role="switch"`, `aria-checked`, `aria-labelledby` | <kbd>Space</kbd>, <kbd>Enter</kbd> toggling |
| **Accordion**| `aria-expanded`, `aria-controls`, `role="region"` | <kbd>ArrowUp/Down</kbd> trigger traversal, <kbd>Enter</kbd> expand/collapse |

---

##  Component Usage Examples

### 1. Button
```tsx
import { Button } from '@oblique-ui/react';
import { ArrowRight } from 'lucide-react';

export function Example() {
  return (
    <Button 
      variant="primary" 
      size="md" 
      rightIcon={<ArrowRight size={16} />}
      onClick={() => alert('Clicked')}
    >
      Deploy System
    </Button>
  );
}
```

### 2. Modal
```tsx
import { useState } from 'react';
import { Modal, Button } from '@oblique-ui/react';

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Spec Sheet</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Architectural Specification"
        description="Verify system parameters before deployment."
        footer={
          <Button variant="primary" onClick={() => setIsOpen(false)}>Confirm</Button>
        }
      >
        <p>Tactile geometry and high contrast ratios loaded.</p>
      </Modal>
    </>
  );
}
```

### 3. Toast Notifications
```tsx
import { ToastProvider, useToast, Button } from '@oblique-ui/react';

function ToastTrigger() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: 'Build Completed',
          description: 'Bundled in 140ms.',
          variant: 'success',
        })
      }
    >
      Show Notification
    </Button>
  );
}

export function App() {
  return (
    <ToastProvider position="bottom-right">
      <ToastTrigger />
    </ToastProvider>
  );
}
```

### 4. Dropdown Menu
```tsx
import { Dropdown } from '@oblique-ui/react';
import { User, Settings, LogOut } from 'lucide-react';

export function DropdownExample() {
  return (
    <Dropdown
      label="Account Settings"
      variant="outline"
      items={[
        { id: 'profile', label: 'User Profile', icon: <User size={16} /> },
        { id: 'settings', label: 'Preferences', icon: <Settings size={16} /> },
        { id: 'logout', label: 'Sign Out', icon: <LogOut size={16} />, danger: true },
      ]}
    />
  );
}
```

### 5. Tabs
```tsx
import { Tabs } from '@oblique-ui/react';

export function TabsExample() {
  return (
    <Tabs
      tabs={[
        { id: 't1', label: 'Overview', content: <div>System Overview</div> },
        { id: 't2', label: 'Telemetry', content: <div>Real-time metrics</div> },
      ]}
    />
  );
}
```

### 6. Tooltip
```tsx
import { Tooltip, Button } from '@oblique-ui/react';

export function TooltipExample() {
  return (
    <Tooltip content="Attached to button" position="top">
      <Button variant="outline">Hover / Focus Me</Button>
    </Tooltip>
  );
}
```

### 7. DataTable
```tsx
import { DataTable } from '@oblique-ui/react';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
];

const data = [
  { id: '1', name: 'Elena Rostova', role: 'Principal Architect' },
  { id: '2', name: 'Marcus Vance', role: 'Staff Engineer' },
];

export function TableExample() {
  return <DataTable columns={columns} data={data} selectable searchable pageSize={5} />;
}
```

### 8. DatePicker
```tsx
import { useState } from 'react';
import { DatePicker } from '@oblique-ui/react';

export function DateExample() {
  const [date, setDate] = useState<Date | null>(new Date());
  return <DatePicker value={date} onChange={setDate} placeholder="YYYY-MM-DD" />;
}
```

### 9. Switch
```tsx
import { useState } from 'react';
import { Switch } from '@oblique-ui/react';

export function SwitchExample() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      label="Enable GPU Acceleration"
    />
  );
}
```

### 10. Accordion
```tsx
import { Accordion } from '@oblique-ui/react';

export function AccordionExample() {
  return (
    <Accordion
      items={[
        { id: 'a1', title: '1. Accessibility Guarantee', content: 'WAI-ARIA 1.2 compliant.' },
        { id: 'a2', title: '2. Design Tokens', content: 'Obsidian & Linen high-contrast pairing.' },
      ]}
    />
  );
}
```

---

##  Storybook local server

To run Storybook locally:

```bash
npm run dev
# Storybook starts at http://localhost:6006
```

To build a static Storybook site:

```bash
npm run build-storybook
```

---

##  Publishing to npm

This package is pre-configured for npm publishing with CJS, ESM, `.d.ts` declaration maps, and CSS bundle entries.

To dry-run publish or release to npm:

```bash
# 1. Typecheck and bundle library
npm run build

# 2. Dry run package contents
npm publish --dry-run

# 3. Publish to registry
npm publish --access public
```

---

##  License

MIT © [Oblique UI Authors](LICENSE)
