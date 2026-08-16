import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;

const sampleItems = [
  {
    id: 'arch-1',
    title: '1. Accessible ARIA Foundation',
    content:
      'Oblique UI components strictly implement WAI-ARIA 1.2 specifications. Full keyboard navigation with arrow keys, escape dismissals, focus locks, and aria-live status regions are standard across all 10 primitives.',
  },
  {
    id: 'arch-2',
    title: '2. High-Contrast Editorial Styling',
    content:
      'Avoid generic, washed-out palettes. Oblique UI uses obsidian black (#0f1115), warm canvas linen (#fcfbf9), crisp 2px geometric borders, and sharp offset shadows.',
  },
  {
    id: 'arch-3',
    title: '3. Zero-Dependency Footprint',
    content:
      'Built purely with native React primitives and modular CSS custom properties, ensuring lightweight ESM and CJS bundles ready for npm distribution.',
  },
];

export const SingleExpand: StoryObj = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
      <Accordion items={sampleItems} />
    </div>
  ),
};

export const MultiExpand: StoryObj = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '640px' }}>
      <Accordion items={sampleItems} allowMultiple />
    </div>
  ),
};
