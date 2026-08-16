import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { HelpCircle, Info } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const TopPosition: Story = {
  render: () => (
    <div style={{ padding: '4rem 2rem', display: 'flex', gap: '2rem' }}>
      <Tooltip content="Tooltip attached on top" position="top">
        <Button variant="outline" leftIcon={<HelpCircle size={16} />}>
          Hover or Focus (Top)
        </Button>
      </Tooltip>

      <Tooltip content="Tooltip on bottom position" position="bottom">
        <Button variant="secondary" leftIcon={<Info size={16} />}>
          Bottom Tooltip
        </Button>
      </Tooltip>
    </div>
  ),
};
