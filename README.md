# React Waterfall Timeline

A waterfall timeline component similar to Chrome DevTools Network panel for visualizing time-related data.

## Features

- 🎯 **Intuitive Timeline Display**: Visual effects similar to Chrome DevTools Network panel
- 📊 **Smart Time Scale**: Automatically generates reasonable time scale rulers based on data range
- 📍 **Time Indicator Line**: Shows vertical indicator line and current time position on hover
- 🎨 **Customizable Styles**: Supports custom colors, sizes, and other properties
- 🖱️ **Interactive Experience**: Supports click and hover events with detailed tooltip information
- 📱 **Responsive Design**: Adapts to different screen sizes
- ⚡ **High Performance**: Optimized rendering performance using React.memo
- 🔧 **TypeScript Support**: Complete type definitions

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Start Storybook

```bash
npm run storybook
```

## Usage Example

```tsx
import { Waterfall, WaterfallItem } from './components/Waterfall';

const data: WaterfallItem[] = [
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
    name: 'api/data',
    startTime: 200,
    endTime: 450,
    color: '#feca57',
  },
];

function App() {
  const handleItemClick = (item: WaterfallItem) => {
    console.log('Clicked:', item);
  };

  return (
    <Waterfall
      items={data}
      labelWidth={200}
      rowHeight={32}
      rulerHeight={40}
      onItemClick={handleItemClick}
    />
  );
}
```

## API

### Waterfall Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `WaterfallItem[]` | **Required** | Array of timeline data to display |
| `labelWidth` | `number` | `200` | Width of the left label column (pixels) |
| `rowHeight` | `number` | `32` | Height of each row (pixels) |
| `rulerHeight` | `number` | `40` | Height of the ruler (pixels) |
| `onItemClick` | `(item: WaterfallItem) => void` | - | Callback function when an item is clicked |
| `onItemHover` | `(item: WaterfallItem \| null) => void` | - | Callback function when an item is hovered |
| `renderTooltip` | `RenderTooltipCallback` | - | Custom tooltip render function |
| `className` | `string` | `''` | Custom CSS class name |

### WaterfallItem Interface

```typescript
interface WaterfallItem {
  id: string;           // Unique identifier
  name: string;         // Display name
  startTime: number;    // Start time (milliseconds)
  endTime: number;      // End time (milliseconds)
  color?: string;       // Optional time bar color (default is gray #9ca3af)
}
```

## Project Structure

```
src/
├── components/
│   └── Waterfall/
│       ├── Waterfall.tsx        # Main component
│       ├── WaterfallRuler.tsx   # Ruler component
│       ├── WaterfallItem.tsx    # Individual item component
│       ├── types.ts             # Type definitions
│       ├── utils.ts             # Utility functions
│       ├── Waterfall.css        # Stylesheet
│       └── index.ts             # Export file
└── stories/
    └── Waterfall.stories.ts     # Storybook stories
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Storybook** - Component development and documentation
- **Vitest** - Testing framework

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run linter
npm run lint

# Build
npm run build
```

## License

MIT
