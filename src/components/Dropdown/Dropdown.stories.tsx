import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { User, Settings, Shield, LogOut, Code, FolderPlus } from 'lucide-react';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleItems = [
  { id: 'profile', label: 'User Profile', icon: <User size={16} />, onClick: () => alert('Profile clicked') },
  { id: 'settings', label: 'Account Settings', icon: <Settings size={16} />, onClick: () => alert('Settings clicked') },
  { id: 'security', label: 'Security & Access', icon: <Shield size={16} />, onClick: () => alert('Security clicked') },
  { id: 'new-repo', label: 'Create Repository', icon: <FolderPlus size={16} />, disabled: true },
  { id: 'logout', label: 'Sign Out', icon: <LogOut size={16} />, danger: true, onClick: () => alert('Logout clicked') },
];

export const Default: Story = {
  args: {
    label: 'Actions Menu',
    variant: 'primary',
    items: sampleItems,
  },
};

export const OutlineVariant: Story = {
  args: {
    label: 'Project Settings',
    variant: 'outline',
    icon: <Code size={16} />,
    items: sampleItems,
  },
};
