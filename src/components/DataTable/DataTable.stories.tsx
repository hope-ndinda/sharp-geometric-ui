import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { Column } from './DataTable.types';

interface SampleUser {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  commits: number;
}

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;

const sampleColumns: Column<SampleUser>[] = [
  { key: 'name', header: 'Developer Name', sortable: true },
  { key: 'role', header: 'Engineering Role', sortable: true },
  { key: 'department', header: 'Department' },
  {
    key: 'commits',
    header: 'Commits (Q3)',
    sortable: true,
    render: (row) => <span style={{ fontFamily: 'var(--obl-font-mono)', fontWeight: 700 }}>{row.commits}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <span
        style={{
          padding: '0.2rem 0.5rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          border: '1px solid var(--obl-color-border)',
          background: row.status === 'Active' ? 'var(--obl-color-teal-bg)' : 'var(--obl-color-danger-bg)',
          color: row.status === 'Active' ? 'var(--obl-color-primary)' : 'var(--obl-color-danger)',
        }}
      >
        {row.status}
      </span>
    ),
  },
];

const sampleData: SampleUser[] = [
  { id: '1', name: 'Elena Rostova', role: 'Principal Architect', department: 'Core Infrastructure', status: 'Active', commits: 342 },
  { id: '2', name: 'Marcus Vance', role: 'Staff Frontend Engineer', department: 'Design Systems', status: 'Active', commits: 289 },
  { id: '3', name: 'Sora Takahashi', role: 'Systems Engineer', department: 'Compiler Optimizations', status: 'Active', commits: 512 },
  { id: '4', name: 'Aria Sterling', role: 'UX Security Lead', department: 'Identity & Access', status: 'Inactive', commits: 145 },
  { id: '5', name: 'Devon Miller', role: 'DevOps Specialist', department: 'Cloud Infrastructure', status: 'Active', commits: 420 },
  { id: '6', name: 'Zoe Kravitz', role: 'Data Analyst', department: 'Telemetry', status: 'Active', commits: 198 },
  { id: '7', name: 'Kaelen Thorne', role: 'Security Auditor', department: 'SecOps', status: 'Inactive', commits: 88 },
];

export const PrimaryTable: StoryObj = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <DataTable
        columns={sampleColumns}
        data={sampleData}
        selectable
        searchable
        pageSize={4}
        caption="Engineering Team Telemetry Directory"
      />
    </div>
  ),
};
