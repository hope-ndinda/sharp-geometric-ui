import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Code, Layout, Layers, Cpu } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleTabs = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <Layout size={16} />,
    content: (
      <div>
        <h3 style={{ margin: '0 0 0.5rem' }}>Architectural Overview</h3>
        <p style={{ margin: 0, color: '#575c66' }}>
          Oblique UI uses modern CSS custom properties and pure ARIA roles to ensure top-notch accessibility.
        </p>
      </div>
    ),
  },
  {
    id: 'tokens',
    label: 'Design Tokens',
    icon: <Layers size={16} />,
    content: (
      <div>
        <h3 style={{ margin: '0 0 0.5rem' }}>Design Tokens Reference</h3>
        <p style={{ margin: 0, color: '#575c66' }}>
          Colors: Obsidian (#0f1115), Linen (#fcfbf9), Teal (#00d2c4).
        </p>
      </div>
    ),
  },
  {
    id: 'source',
    label: 'Source Code',
    icon: <Code size={16} />,
    content: (
      <pre style={{ padding: '1rem', background: '#14161d', color: '#00d2c4', borderRadius: '4px', margin: 0 }}>
        <code>{`import { Button } from '@oblique-ui/react';\n\n<Button variant="primary">Submit</Button>`}</code>
      </pre>
    ),
  },
  {
    id: 'benchmark',
    label: 'Benchmark System',
    icon: <Cpu size={16} />,
    disabled: true,
    content: <div>Disabled section</div>,
  },
];

export const Horizontal: Story = {
  args: {
    tabs: sampleTabs,
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    tabs: sampleTabs,
    orientation: 'vertical',
  },
};
