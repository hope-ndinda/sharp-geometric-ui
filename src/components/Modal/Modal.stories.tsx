import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
          description="Modal description text"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            Modal content goes here.
          </p>
        </Modal>
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Small Modal"
          size="sm"
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              OK
            </Button>
          }
        >
          <p style={{ margin: 0 }}>
            Small modal content.
          </p>
        </Modal>
      </div>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Modal"
          size="lg"
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          }
        >
          <p style={{ margin: 0 }}>
            Large modal content with more space.
          </p>
        </Modal>
      </div>
    );
  },
};

export const FullScreen: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Full Screen Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Full Screen Modal"
          size="full"
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          }
        >
          <p style={{ margin: 0 }}>
            Full screen modal content.
          </p>
        </Modal>
      </div>
    );
  },
};

export const WithoutFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Modal Without Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Footer"
        >
          <p style={{ margin: 0 }}>
            This modal has no footer actions.
          </p>
        </Modal>
      </div>
    );
  },
};

export const DangerConfirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '2rem' }}>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          description="This action cannot be undone."
          size="sm"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setIsOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            Are you sure you want to delete this item?
          </p>
        </Modal>
      </div>
    );
  },
};
