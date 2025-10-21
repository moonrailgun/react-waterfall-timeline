import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Waterfall } from '../components/Waterfall';
import type { WaterfallItem } from '../components/Waterfall/types';

const meta = {
  title: 'Components/Waterfall',
  component: Waterfall,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of waterfall items to display',
    },
    labelWidth: {
      control: { type: 'number', min: 100, max: 400, step: 10 },
      description: 'Width of the left label column in pixels',
    },
    rowHeight: {
      control: { type: 'number', min: 20, max: 60, step: 4 },
      description: 'Height of each row in pixels',
    },
    rulerHeight: {
      control: { type: 'number', min: 30, max: 80, step: 5 },
      description: 'Height of the ruler in pixels',
    },
    onItemClick: {
      action: 'item-clicked',
      description: 'Called when an item is clicked',
    },
    onItemHover: {
      action: 'item-hovered',
      description: 'Called when an item is hovered',
    },
  },
} satisfies Meta<typeof Waterfall>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example with a few network requests
const basicItems: WaterfallItem[] = [
  {
    id: '1',
    name: 'index.html',
    startTime: 0,
    endTime: 120,
    color: '#4a90e2',
  },
  {
    id: '2',
    name: 'app.js',
    startTime: 50,
    endTime: 300,
    color: '#7b68ee',
  },
  {
    id: '3',
    name: 'styles.css',
    startTime: 60,
    endTime: 180,
    color: '#50c878',
  },
  {
    id: '4',
    name: 'logo.png',
    startTime: 200,
    endTime: 450,
    color: '#ff6b6b',
  },
  {
    id: '5',
    name: 'api/user',
    startTime: 350,
    endTime: 650,
    color: '#feca57',
  },
];

export const Basic: Story = {
  args: {
    items: basicItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
};

// Complex example with many requests
const complexItems: WaterfallItem[] = [
  { id: '1', name: 'index.html', startTime: 0, endTime: 85, color: '#4a90e2' },
  { id: '2', name: 'main.js', startTime: 45, endTime: 380, color: '#7b68ee' },
  { id: '3', name: 'vendor.js', startTime: 48, endTime: 520, color: '#7b68ee' },
  {
    id: '4',
    name: 'styles.css',
    startTime: 52,
    endTime: 145,
    color: '#50c878',
  },
  { id: '5', name: 'reset.css', startTime: 55, endTime: 98, color: '#50c878' },
  { id: '6', name: 'logo.svg', startTime: 150, endTime: 280, color: '#ff6b6b' },
  {
    id: '7',
    name: 'icon-home.png',
    startTime: 155,
    endTime: 320,
    color: '#ff6b6b',
  },
  {
    id: '8',
    name: 'icon-user.png',
    startTime: 160,
    endTime: 310,
    color: '#ff6b6b',
  },
  {
    id: '9',
    name: 'background.jpg',
    startTime: 165,
    endTime: 680,
    color: '#ff6b6b',
  },
  {
    id: '10',
    name: 'api/auth',
    startTime: 400,
    endTime: 720,
    color: '#feca57',
  },
  {
    id: '11',
    name: 'api/user/profile',
    startTime: 730,
    endTime: 950,
    color: '#feca57',
  },
  {
    id: '12',
    name: 'api/dashboard',
    startTime: 960,
    endTime: 1200,
    color: '#feca57',
  },
  {
    id: '13',
    name: 'font-regular.woff2',
    startTime: 200,
    endTime: 450,
    color: '#9b59b6',
  },
  {
    id: '14',
    name: 'font-bold.woff2',
    startTime: 205,
    endTime: 470,
    color: '#9b59b6',
  },
  {
    id: '15',
    name: 'analytics.js',
    startTime: 600,
    endTime: 850,
    color: '#34495e',
  },
];

export const Complex: Story = {
  args: {
    items: complexItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
};

// Single item
const singleItem: WaterfallItem[] = [
  {
    id: '1',
    name: 'single-request.json',
    startTime: 100,
    endTime: 500,
    color: '#e74c3c',
  },
];

export const SingleItem: Story = {
  args: {
    items: singleItem,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
};

// Overlapping requests (common in real scenarios)
const overlappingItems: WaterfallItem[] = [
  { id: '1', name: 'request-1', startTime: 0, endTime: 500, color: '#3498db' },
  {
    id: '2',
    name: 'request-2',
    startTime: 100,
    endTime: 400,
    color: '#2ecc71',
  },
  {
    id: '3',
    name: 'request-3',
    startTime: 200,
    endTime: 600,
    color: '#e74c3c',
  },
  {
    id: '4',
    name: 'request-4',
    startTime: 250,
    endTime: 450,
    color: '#f39c12',
  },
  {
    id: '5',
    name: 'request-5',
    startTime: 500,
    endTime: 800,
    color: '#9b59b6',
  },
  {
    id: '6',
    name: 'request-6',
    startTime: 550,
    endTime: 750,
    color: '#1abc9c',
  },
];

export const Overlapping: Story = {
  args: {
    items: overlappingItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
};

// Very short duration items
const shortItems: WaterfallItem[] = [
  { id: '1', name: 'cached-1.js', startTime: 0, endTime: 15, color: '#27ae60' },
  { id: '2', name: 'cached-2.js', startTime: 5, endTime: 22, color: '#27ae60' },
  {
    id: '3',
    name: 'cached-3.css',
    startTime: 10,
    endTime: 28,
    color: '#27ae60',
  },
  { id: '4', name: 'api-fast', startTime: 30, endTime: 85, color: '#16a085' },
  {
    id: '5',
    name: 'cached-image.png',
    startTime: 40,
    endTime: 58,
    color: '#27ae60',
  },
];

export const FastRequests: Story = {
  args: {
    items: shortItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
};

// Long duration with varied timings
const longDurationItems: WaterfallItem[] = [
  {
    id: '1',
    name: 'quick-initial',
    startTime: 0,
    endTime: 150,
    color: '#3498db',
  },
  {
    id: '2',
    name: 'medium-load',
    startTime: 200,
    endTime: 1500,
    color: '#f39c12',
  },
  {
    id: '3',
    name: 'very-slow-api',
    startTime: 500,
    endTime: 5000,
    color: '#e74c3c',
  },
  {
    id: '4',
    name: 'parallel-1',
    startTime: 1600,
    endTime: 3200,
    color: '#9b59b6',
  },
  {
    id: '5',
    name: 'parallel-2',
    startTime: 1650,
    endTime: 3100,
    color: '#9b59b6',
  },
  {
    id: '6',
    name: 'final-request',
    startTime: 5100,
    endTime: 6200,
    color: '#2ecc71',
  },
];

export const LongDuration: Story = {
  args: {
    items: longDurationItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    items: [],
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
};

// Custom styling example
export const CustomStyling: Story = {
  args: {
    items: basicItems,
    labelWidth: 250,
    rowHeight: 40,
    rulerHeight: 50,
    className: 'custom-waterfall',
  },
};

// With interaction callbacks
export const WithInteractions: Story = {
  args: {
    items: basicItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Click on items or hover over them to see the interaction callbacks in the Actions panel.',
      },
    },
  },
};

// Custom tooltip
export const CustomTooltip: Story = {
  args: {
    items: basicItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
    renderTooltip: (item, position) => {
      const duration =
        item.endTime !== undefined && item.startTime !== undefined
          ? item.endTime - item.startTime
          : null;
      return React.createElement(
        'div',
        {
          style: {
            position: 'fixed',
            zIndex: 1000,
            left: `${position.x + 15}px`,
            top: `${position.y + 15}px`,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '13px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            minWidth: '200px',
          },
        },
        React.createElement(
          'div',
          {
            style: {
              fontWeight: 'bold',
              fontSize: '15px',
              marginBottom: '8px',
            },
          },
          `📊 ${item.name}`
        ),
        duration !== null
          ? React.createElement(
              'div',
              { style: { opacity: 0.9 } },
              `⏱️ Duration: ${duration}ms`
            )
          : React.createElement(
              'div',
              { style: { opacity: 0.9 } },
              '⏱️ In Progress'
            ),
        React.createElement(
          'div',
          { style: { opacity: 0.9, marginTop: '4px' } },
          '🎨 Custom styled tooltip'
        )
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example with a custom tooltip renderer. Hover over items to see the custom tooltip design.',
      },
    },
  },
};

// Default color (gray)
const itemsWithoutColor: WaterfallItem[] = [
  {
    id: '1',
    name: 'request-1.json',
    startTime: 0,
    endTime: 150,
  },
  {
    id: '2',
    name: 'request-2.json',
    startTime: 80,
    endTime: 280,
  },
  {
    id: '3',
    name: 'request-3.json',
    startTime: 200,
    endTime: 450,
  },
  {
    id: '4',
    name: 'request-4.json',
    startTime: 350,
    endTime: 600,
  },
  {
    id: '5',
    name: 'request-5.json',
    startTime: 500,
    endTime: 720,
  },
];

export const DefaultColor: Story = {
  args: {
    items: itemsWithoutColor,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Items without color property will use the default gray color (#9ca3af).',
      },
    },
  },
};

// Items without startTime (won't show on timeline)
const itemsWithoutStartTime: WaterfallItem[] = [
  {
    id: '1',
    name: 'pending-task-1',
    color: '#e0e0e0',
  },
  {
    id: '2',
    name: 'request-1.json',
    startTime: 0,
    endTime: 200,
    color: '#4a90e2',
  },
  {
    id: '3',
    name: 'pending-task-2',
    color: '#e0e0e0',
  },
  {
    id: '4',
    name: 'request-2.json',
    startTime: 150,
    endTime: 400,
    color: '#7b68ee',
  },
  {
    id: '5',
    name: 'pending-task-3',
    color: '#e0e0e0',
  },
];

export const WithoutStartTime: Story = {
  args: {
    items: itemsWithoutStartTime,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Items without startTime will only show the name label on the left, but won't display on the timeline.",
      },
    },
  },
};

// Items with only startTime (in progress, shown as dashed lines)
const inProgressItems: WaterfallItem[] = [
  {
    id: '1',
    name: 'completed-task',
    startTime: 0,
    endTime: 300,
    color: '#2ecc71',
  },
  {
    id: '2',
    name: 'in-progress-1',
    startTime: 250,
    color: '#f39c12',
  },
  {
    id: '3',
    name: 'completed-request',
    startTime: 400,
    endTime: 800,
    color: '#3498db',
  },
  {
    id: '4',
    name: 'in-progress-2',
    startTime: 750,
    color: '#e74c3c',
  },
  {
    id: '5',
    name: 'in-progress-3',
    startTime: 900,
    color: '#9b59b6',
  },
];

export const InProgress: Story = {
  args: {
    items: inProgressItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Items with only startTime (no endTime) will be displayed as dashed lines extending to the end of the timeline, representing tasks that are currently in progress.',
      },
    },
  },
};

// Mixed scenario: some without startTime, some in progress, some completed
const mixedItems: WaterfallItem[] = [
  {
    id: '1',
    name: 'not-started-yet',
    color: '#95a5a6',
  },
  {
    id: '2',
    name: 'initial-load',
    startTime: 0,
    endTime: 150,
    color: '#3498db',
  },
  {
    id: '3',
    name: 'fetch-data',
    startTime: 160,
    endTime: 450,
    color: '#2ecc71',
  },
  {
    id: '4',
    name: 'processing-data',
    startTime: 460,
    color: '#f39c12',
  },
  {
    id: '5',
    name: 'render-component',
    startTime: 480,
    endTime: 680,
    color: '#e74c3c',
  },
  {
    id: '6',
    name: 'waiting-for-user',
    startTime: 700,
    color: '#9b59b6',
  },
  {
    id: '7',
    name: 'queued-task',
    color: '#95a5a6',
  },
];

export const MixedStates: Story = {
  args: {
    items: mixedItems,
    labelWidth: 200,
    rowHeight: 32,
    rulerHeight: 40,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A realistic scenario showing: items without startTime (not started), items with both times (completed), and items with only startTime (in progress).',
      },
    },
  },
};
