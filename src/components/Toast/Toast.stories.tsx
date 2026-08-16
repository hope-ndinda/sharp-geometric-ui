import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const ToastDemo: React.FC = () => {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '2rem' }}>
      <Button
        variant="primary"
        onClick={() =>
          toast({
            title: 'Info',
            description: 'Information message',
            variant: 'info',
          })
        }
      >
        Info
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Success',
            description: 'Operation completed successfully',
            variant: 'success',
          })
        }
      >
        Success
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Warning',
            description: 'Warning message',
            variant: 'warning',
          })
        }
      >
        Warning
      </Button>

      <Button
        variant="danger"
        onClick={() =>
          toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'error',
          })
        }
      >
        Error
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <ToastDemo />
    </ToastProvider>
  ),
};

export const TopRight: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastDemo />
    </ToastProvider>
  ),
};

export const TopLeft: Story = {
  render: () => (
    <ToastProvider position="top-left">
      <ToastDemo />
    </ToastProvider>
  ),
};

export const BottomLeft: Story = {
  render: () => (
    <ToastProvider position="bottom-left">
      <ToastDemo />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <ToastProvider position="bottom-right">
        <div style={{ padding: '2rem' }}>
          <Button
            variant="primary"
            onClick={() =>
              toast({
                title: 'Action Required',
                description: 'Please confirm your action',
                variant: 'info',
                action: {
                  label: 'Confirm',
                  onClick: () => console.log('Action confirmed'),
                },
              })
            }
          >
            Show Toast with Action
          </Button>
        </div>
      </ToastProvider>
    );
  },
};

export const LongDuration: Story = {
  render: () => {
    const { toast } = useToast();
    
    return (
      <ToastProvider position="bottom-right">
        <div style={{ padding: '2rem' }}>
          <Button
            variant="primary"
            onClick={() =>
              toast({
                title: 'Long Duration',
                description: 'This toast will stay for 10 seconds',
                variant: 'info',
                duration: 10000,
              })
            }
          >
            Show Long Duration Toast
          </Button>
        </div>
      </ToastProvider>
    );
  },
};
