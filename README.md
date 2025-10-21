# React Waterfall Timeline

<div align="center">

A waterfall timeline component similar to Chrome DevTools Network panel for visualizing time-related data.

![Waterfall Timeline Demo](./screenshots/storybook-full.png)

[![npm version](https://img.shields.io/npm/v/react-waterfall-timeline.svg)](https://www.npmjs.com/package/react-waterfall-timeline)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

<!-- [Live Demo](https://your-storybook-url.com) · [Report Bug](https://github.com/yourusername/react-waterfall-timeline/issues) · [Request Feature](https://github.com/yourusername/react-waterfall-timeline/issues) -->

</div>

---

## ✨ Features

- 🎯 **Intuitive Timeline Display**: Visual effects similar to Chrome DevTools Network panel
- 📊 **Smart Time Scale**: Automatically generates reasonable time scale rulers based on data range
- 📍 **Time Indicator Line**: Shows vertical indicator line and current time position on hover
- 🎨 **Customizable Styles**: Supports custom colors, sizes, and other properties
- 🖱️ **Interactive Experience**: Supports click and hover events with detailed tooltip information
- 📱 **Responsive Design**: Adapts to different screen sizes
- ⚡ **High Performance**: Optimized rendering performance using React.memo
- 🔧 **TypeScript Support**: Complete type definitions

## 📦 Installation

```bash
npm install react-waterfall-timeline
# or
yarn add react-waterfall-timeline
# or
pnpm add react-waterfall-timeline
```

## 🚀 Quick Start

```tsx
import { Waterfall } from 'react-waterfall-timeline';
import 'react-waterfall-timeline/style.css';

function App() {
  const items = [
    { id: '1', name: 'index.html', startTime: 0, endTime: 120, color: '#4a90e2' },
    { id: '2', name: 'app.js', startTime: 50, endTime: 300, color: '#7b68ee' },
    { id: '3', name: 'api/data', startTime: 200, endTime: 450, color: '#feca57' },
  ];

  return <Waterfall items={items} />;
}
```

## 📸 Examples

### Basic Timeline
Simple example with a few network requests.

![Basic Timeline](./screenshots/basic.png)

### Complex Timeline
More complex scenario with many overlapping requests of different types.

![Complex Timeline](./screenshots/complex.png)

### Overlapping Requests
Demonstrates how parallel requests are displayed in the timeline.

![Overlapping Requests](./screenshots/overlapping.png)

### Default Color (Gray)
Items without a custom color will use the default gray color.

![Default Color](./screenshots/default-color.png)

## 📚 API Documentation

### `<Waterfall>` Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `WaterfallItem[]` | **Required** | Array of timeline data to display |
| `labelWidth` | `number` | `200` | Width of the left label column (pixels) |
| `rowHeight` | `number` | `32` | Height of each row (pixels) |
| `rulerHeight` | `number` | `40` | Height of the ruler (pixels) |
| `onItemClick` | `(item: WaterfallItem) => void` | `undefined` | Callback function when an item is clicked |
| `onItemHover` | `(item: WaterfallItem \| null) => void` | `undefined` | Callback function when an item is hovered |
| `renderTooltip` | `RenderTooltipCallback` | `undefined` | Custom tooltip render function |
| `className` | `string` | `''` | Custom CSS class name |

### `WaterfallItem` Interface

```typescript
interface WaterfallItem {
  /** Unique identifier for the item */
  id: string;
  
  /** Display name shown on the left side */
  name: string;
  
  /** Start time in milliseconds */
  startTime: number;
  
  /** End time in milliseconds */
  endTime: number;
  
  /** Optional color for the timeline bar (default: #cccccc) */
  color?: string;
}
```

### Type Definitions

```typescript
type OnItemClickCallback = (item: WaterfallItem) => void;
type OnItemHoverCallback = (item: WaterfallItem | null) => void;
type RenderTooltipCallback = (
  item: WaterfallItem, 
  position: { x: number; y: number }
) => React.ReactNode;
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Chrome DevTools Network panel
- Built with modern React best practices
- Designed for performance and flexibility

## 📮 Contact

- **Issues**: [GitHub Issues](https://github.com/moonrailgun/react-waterfall-timeline/issues)

---

<div align="center">

Made with ❤️ by [moonrailgun](https://github.com/moonrailgun)

If you find this project useful, please consider giving it a ⭐️!

</div>
