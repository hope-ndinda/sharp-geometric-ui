import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;

export const DefaultPlayground: StoryObj = {
  render: () => {
    const [selected, setSelected] = useState<Date | null>(new Date());
    return (
      <div style={{ padding: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Select Milestone Launch Date:</p>
        <DatePicker value={selected} onChange={(d) => setSelected(d)} placeholder="Select date..." />
        {selected && (
          <p style={{ fontSize: '0.875rem', marginTop: '1rem', fontFamily: 'var(--obl-font-mono)' }}>
            Iso Date: {selected.toISOString()}
          </p>
        )}
      </div>
    );
  },
};
