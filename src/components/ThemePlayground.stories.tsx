import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { useToast, ToastProvider } from './Toast/ToastProvider';
import { Switch } from './Switch/Switch';
import { Tabs } from './Tabs/Tabs';
import { Accordion } from './Accordion/Accordion';
import { Dropdown } from './Dropdown/Dropdown';

const meta: Meta = {
  title: 'Theme Playground',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const ThemePlaygroundComponent = () => {
  const [accentColor, setAccentColor] = useState('#0047FF');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const [switchValue, setSwitchValue] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [activeAccordion, setActiveAccordion] = useState<string[]>(['item1']);

  useEffect(() => {
    document.documentElement.style.setProperty('--sg-color-accent', accentColor);
  }, [accentColor]);

  const accentColors = [
    { name: 'Electric Blue', value: '#0047FF' },
    { name: 'Crimson Red', value: '#FF0000' },
    { name: 'Emerald Green', value: '#00AA00' },
    { name: 'Amber Orange', value: '#FF6600' },
    { name: 'Purple Violet', value: '#9D4EDD' },
    { name: 'Hot Pink', value: '#FF0066' },
  ];

  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'var(--sg-font-family)',
      backgroundColor: 'var(--sg-color-bg)',
      color: 'var(--sg-color-text)',
      minHeight: '100vh'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
      }}>
        {/* Header */}
        <div style={{
          borderBottom: '2px solid var(--sg-color-black)',
          paddingBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '0 0 1rem 0',
            color: 'var(--sg-color-text)'
          }}>
            Theme Playground
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--sg-color-text-muted)',
            margin: 0,
            maxWidth: '600px'
          }}>
            Live theme customization. Change the accent color to see all components update in real-time. 
            This demonstrates proper tokenization — no hardcoded colors in our components.
          </p>
        </div>

        {/* Accent Color Picker */}
        <div style={{
          backgroundColor: 'var(--sg-color-bg-hover)',
          border: '2px solid var(--sg-color-black)',
          padding: '2rem',
          boxShadow: '4px 4px 0px var(--sg-color-black)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: '0 0 1.5rem 0',
            color: 'var(--sg-color-text)'
          }}>
            Accent Color
          </h2>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setAccentColor(color.value)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '2px solid var(--sg-color-black)',
                  backgroundColor: color.value,
                  color: '#FFFFFF',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  boxShadow: accentColor === color.value ? '4px 4px 0px var(--sg-color-black)' : '2px 2px 0px var(--sg-color-black)',
                  transform: accentColor === color.value ? 'translate(-2px, -2px)' : 'translate(0, 0)',
                  borderRadius: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                onMouseEnter={(e) => {
                  if (accentColor !== color.value) {
                    e.currentTarget.style.transform = 'translate(-1px, -1px)';
                    e.currentTarget.style.boxShadow = '3px 3px 0px var(--sg-color-black)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (accentColor !== color.value) {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '2px 2px 0px var(--sg-color-black)';
                  }
                }}
              >
                {color.name}
              </button>
            ))}
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              style={{
                width: '60px',
                height: '48px',
                border: '2px solid var(--sg-color-black)',
                cursor: 'pointer',
                padding: '0',
                borderRadius: '0'
              }}
            />
          </div>
          <p style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: 'var(--sg-color-text-muted)',
            margin: '1rem 0 0 0'
          }}>
            Current accent: <strong>{accentColor}</strong>
          </p>
        </div>

        {/* Component Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Buttons */}
          <div style={{
            backgroundColor: 'var(--sg-color-white)',
            border: '2px solid var(--sg-color-black)',
            padding: '2rem',
            boxShadow: '4px 4px 0px var(--sg-color-black)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1.5rem 0',
              color: 'var(--sg-color-text)'
            }}>
              Buttons
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>
          </div>

          {/* Switch */}
          <div style={{
            backgroundColor: 'var(--sg-color-white)',
            border: '2px solid var(--sg-color-black)',
            padding: '2rem',
            boxShadow: '4px 4px 0px var(--sg-color-black)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1.5rem 0',
              color: 'var(--sg-color-text)'
            }}>
              Switch
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Switch
                checked={switchValue}
                onChange={setSwitchValue}
                label="Toggle me"
              />
              <Switch
                checked={true}
                onChange={() => {}}
                label="Always on"
              />
              <Switch
                checked={false}
                onChange={() => {}}
                label="Always off"
              />
              <Switch
                checked={false}
                onChange={() => {}}
                label="Disabled"
                disabled
              />
            </div>
          </div>

          {/* Tabs */}
          <div style={{
            backgroundColor: 'var(--sg-color-white)',
            border: '2px solid var(--sg-color-black)',
            padding: '2rem',
            boxShadow: '4px 4px 0px var(--sg-color-black)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1.5rem 0',
              color: 'var(--sg-color-text)'
            }}>
              Tabs
            </h3>
            <Tabs
              tabs={[
                { id: 'tab1', label: 'Tab One', content: <p>Content for Tab One</p> },
                { id: 'tab2', label: 'Tab Two', content: <p>Content for Tab Two</p> },
                { id: 'tab3', label: 'Tab Three', content: <p>Content for Tab Three</p> },
              ]}
              activeId={activeTab}
              onChange={(id: string) => setActiveTab(id)}
            />
          </div>

          {/* Accordion */}
          <div style={{
            backgroundColor: 'var(--sg-color-white)',
            border: '2px solid var(--sg-color-black)',
            padding: '2rem',
            boxShadow: '4px 4px 0px var(--sg-color-black)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1.5rem 0',
              color: 'var(--sg-color-text)'
            }}>
              Accordion
            </h3>
            <Accordion
              items={[
                { id: 'item1', title: 'First Item', content: 'Content for the first accordion item.' },
                { id: 'item2', title: 'Second Item', content: 'Content for the second accordion item.' },
                { id: 'item3', title: 'Third Item', content: 'Content for the third accordion item.' },
              ]}
              expandedIds={activeAccordion}
              onChange={(ids: string[]) => setActiveAccordion(ids)}
            />
          </div>

          {/* Dropdown */}
          <div style={{
            backgroundColor: 'var(--sg-color-white)',
            border: '2px solid var(--sg-color-black)',
            padding: '2rem',
            boxShadow: '4px 4px 0px var(--sg-color-black)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1.5rem 0',
              color: 'var(--sg-color-text)'
            }}>
              Dropdown
            </h3>
            <Dropdown
              label="Open Dropdown"
              variant="outline"
              items={[
                { id: '1', label: 'Option One', onClick: () => console.log('Selected: Option One') },
                { id: '2', label: 'Option Two', onClick: () => console.log('Selected: Option Two') },
                { id: '3', label: 'Option Three', danger: true, onClick: () => console.log('Selected: Option Three') },
              ]}
            />
          </div>

          {/* Toast Trigger */}
          <div style={{
            backgroundColor: 'var(--sg-color-white)',
            border: '2px solid var(--sg-color-black)',
            padding: '2rem',
            boxShadow: '4px 4px 0px var(--sg-color-black)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              margin: '0 0 1.5rem 0',
              color: 'var(--sg-color-text)'
            }}>
              Toast Notifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Button
                variant="primary"
                onClick={() => toast({
                  title: 'Success',
                  description: 'Operation completed successfully',
                  variant: 'success'
                })}
              >
                Show Success Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => toast({
                  title: 'Error',
                  description: 'Something went wrong',
                  variant: 'error'
                })}
              >
                Show Error Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(true)}
              >
                Open Modal
              </Button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Theme Modal"
            description="This modal uses the current accent color for its title tag and close button hover state."
            size="md"
          >
            <p style={{ margin: 0 }}>
              Modal content demonstrating the accent color theming system.
            </p>
          </Modal>
        )}
      </div>
    </div>
  );
};

export const ThemePlayground: Story = {
  render: () => (
    <ToastProvider>
      <ThemePlaygroundComponent />
    </ToastProvider>
  ),
};
