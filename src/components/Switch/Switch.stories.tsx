import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: 'Toggle Switch',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: 'Enabled Switch',
  },
};

export const Small: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: 'Small Switch',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: 'Large Switch',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    onChange: () => {},
    label: 'Disabled Switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    onChange: () => {},
    label: 'Disabled Checked Switch',
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true);
    return (
      <Switch
        checked={enabled}
        onChange={setEnabled}
        label="Interactive Toggle"
      />
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <Switch checked={false} onChange={() => {}} label="Small Switch" size="sm" />
      <Switch checked={false} onChange={() => {}} label="Medium Switch" size="md" />
      <Switch checked={false} onChange={() => {}} label="Large Switch" size="lg" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <Switch checked={false} onChange={() => {}} label="Unchecked" />
      <Switch checked={true} onChange={() => {}} label="Checked" />
      <Switch checked={false} onChange={() => {}} label="Disabled Unchecked" disabled />
      <Switch checked={true} onChange={() => {}} label="Disabled Checked" disabled />
    </div>
  ),
};
